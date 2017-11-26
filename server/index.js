/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const Files = require('../database/Models/Files.js');
const Messages = require('../database/Models/Messages.js');
const Room = require('../database/Models/Rooms.js');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const authConfig = require('../config/oauth.js');
const User = require('../database/Models/User.js');
const Promise = require('bluebird');

const app = express();

const connections = [];

const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Listening to port 4000');
});

app.use(express.static(path.join(__dirname, '../client/dist/')));

const io = socketIO(server);
const currentMsgs = {};

User.initUser();
Room.initRoom();
Messages.initMessage();

io.on('connection', (socket) => {
  // User Connects
  socket.on('user login', (data) => {
    //  Add each connection to the server
    connections.push({ socket: socket.id, username: data.username });
    console.log('Connected: %s sockets connected', connections.length);

    // Search if User already exists in server
    const bigObj = {};
    const roomMessages = [];
    const onlineUsers = connections.map((obj) => {
      return obj.username;
    });

    User.getUsers().then((result) => {
      bigObj.allUsersInLobby = result.reduce((acc, userEntry) => {
        acc[userEntry.username] = userEntry.userImgUrl;
        return acc;
      }, {});

      User.getUserById(data.username).then((exists) => {
        bigObj.username = data.username;
        bigObj.onlineUsers = onlineUsers;
        if (!exists) {
          User.addUser(data);
          bigObj.userImgUrl = data.userImgUrl;
          bigObj.myRooms = data.rooms;
        } else {
          bigObj.userImgUrl = exists.dataValues.userImgUrl;
          bigObj.myRooms = exists.dataValues.rooms;
        }
        // console.log('current bigobj', bigObj);
        //  Iterate through each room to get the messages of user
        bigObj.myRooms.forEach((room) => {
          roomMessages.push(Messages.getRoomMessages(room).then((message) => {
            const currentMessage = {};
            currentMessage[room] = message;
            return currentMessage;
          }));
        });
        Promise.all(roomMessages)
          .then(() => {
            const sentMessages = {};
            roomMessages.map((obj) => {
              // console.log('im the obj', obj._rejectionHandler0);
              const key = Object.keys(obj._rejectionHandler0)[0];
              sentMessages[key] = obj._rejectionHandler0[key];
            });
            bigObj.roomMsgs = sentMessages;
            socket.emit('sign in', bigObj);
          });
      });
    });
  });

  /**
   * DISCONNECT IS NOT FIRING:
   */
  //  Disconnect
  socket.on('disconnect', (data) => {
    connections.splice(connections.findIndex(x => x.socket === socket.id), 1);
    const onlineUsers = connections.map((obj) => {
      return obj.username;
    });
    console.log('disconnected online users', onlineUsers);
    console.log('Disconnected: %s sockets connected', connections.length);
    io.sockets.emit('disconnects', onlineUsers);
  });

  /**
   * NEED TO CREATE NEW ROOM IF INCOMING MESSAGE IS FROM ROOM THAT DOESN'T EXIST:
   */
  socket.on('add message', (message) => {
    console.log('im the message', message);
    let room = message.roomname;
    Messages.addMessage(message);
    // io.sockets.emit('new message', message);
    // if (!currentMsgs[room]) {
    //   currentMsgs[room] = [];
    // }
    // currentMsgs[room] = currentMsgs[room].concat([message]);
    // console.log('do i get to the room name', typeof room);
    io.sockets.emit('new message', message);
  });

  socket.on('new room for user', (data) => {
    User.updateUser(data.username, data.room);
  });

  socket.on('create new room', (room) => {
    Room.addRoom({ roomname: room });
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  socket.on('file send', (data) => {
    console.log('add file');
    Files.addFile(data);
    //  Broadcast to only users available
  });
});


/*
//  Make connection Front End

const socket = io.connect('http://localhost:4000');

//  Query DOM

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

//  Emit events

btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

//  Listen for events
socket.on('chat', (data) => {
  feedback.innerHTML = '';
  output.innerHTML += `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
});

socket.on('typing', (data) => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});
*/

app.use(session({
  secret: 'gemguys',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

/**
 * Simple route middleware to ensure user is authenticated
 * @param  {} req - request
 * @param  {} res - response
 * @param  {} next
 */
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.status(404).send('User not found: incorrect username or password');
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy(
  authConfig.google,
  (accessToken, refreshToken, profile, done) => done(null, profile),
));

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['openid email profile'] }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // go to correct page
  },
);

passport.use(new FacebookStrategy(
  authConfig.facebook,
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ facebookId: profile.id }, (err, user) => cb(err, user));
  },
));

app.get(
  '/auth/facebook',
  passport.authenticate('facebook'),
);

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  },
);

app.get('/logout', (req, res) => {
  req.logout();
  // go back to main page
});
