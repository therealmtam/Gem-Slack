/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const Files = require('../database/Models/Files.js');
const Messages = require('../database/Models/Messages.js');
const Room = require('../database/Models/Rooms.js');
const User = require('../database/Models/User.js');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const authConfig = require('../config/oauth.js');
const Promise = require('bluebird');

const app = express();

const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Listening to port', process.env.PORT);
});


const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../client/dist/')));

setTimeout(() => {
  //  Initialize User,Room,Messages Tables in the Database
  User.initUser();
  Room.initRoom();
  Messages.initMessage();
}, 2000);

setTimeout(() => {
  // Initially create the Max User:
  User.getUserById('Max').then((exists) => {
    if (!exists) {
      User.addUser({
        username: 'Max',
        userImgUrl: 'https://avatars0.githubusercontent.com/u/8771006?s=460&v=4',
        rooms: ['Lobby'],
      });
    }
  });

  // Initially create the first Message:
  Messages.addMessage({
    message: 'Welcome to Gem Slack!',
    username: 'Max',
    roomname: 'Lobby',
    createdAt: new Date(),
    userImgUrl: 'https://avatars0.githubusercontent.com/u/8771006?s=460&v=4',
  });
}, 4000);

// Clear out all messages in the DB at a set interval
setInterval(() => {
  Messages.deleteAllMessages()
    .then(() => {
      Messages.addMessage({
        message: 'Welcome to Gem Slack!',
        username: 'Max',
        roomname: 'Lobby',
        createdAt: new Date(),
        userImgUrl: 'https://avatars0.githubusercontent.com/u/8771006?s=460&v=4',
      });
    });
}, 600000);

//  Live Feed of Current Users in Database
const connections = [];

//  Socket Events Listener
io.on('connection', (socket) => {
  // User Login Listener
  socket.on('user login', (data) => {
    //  Add each connection to the server
    connections.push({ socket: socket.id, username: data.username });
    console.log('Connected: %s sockets connected', connections.length);

    const bigObj = {};
    const roomMessages = [];
    const onlineUsers = connections.map((obj) => {
      return obj.username;
    });

    io.sockets.emit('connects', onlineUsers);

    // Get All Users from Database
    User.getUsers().then((result) => {
      bigObj.allUsersInLobby = result.reduce((acc, userEntry) => {
        acc[userEntry.username] = userEntry.userImgUrl;
        return acc;
      }, {});

      // Search if User already exists in Database
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
              const key = Object.keys(obj._rejectionHandler0)[0];
              sentMessages[key] = obj._rejectionHandler0[key];
            });
            bigObj.roomMsgs = sentMessages;
            socket.emit('sign in', bigObj);
          });
      });
    });
  });

  //  User Disconnect Listener
  socket.on('disconnect', (data) => {
    connections.splice(connections.findIndex(x => x.socket === socket.id), 1);
    const onlineUsers = connections.map((obj) => {
      return obj.username;
    });
    console.log('Disconnected: %s sockets connected', connections.length);
    io.sockets.emit('disconnects', onlineUsers);
  });

  // User Add Message Listener
  socket.on('add message', (message) => {
    Messages.addMessage(message);
    io.sockets.emit('new message', message);
  });

  // User Direct Message Listener
  socket.on('new room for user', (data) => {
    User.updateUser(data.username, data.room);
  });

  //  User Create New Room Listener
  socket.on('create new room', (room) => {
    Room.addRoom({ roomname: room });
  });

  //  User Typing Listener
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });

  // User File Send Listener
  socket.on('file send', (file) => {
    Files.addFile(data);
    //  Broadcast to only the users specified
    socket.broadcast.emit('file send', file);
  });
});

// //  Passport Authorization
// app.use(session({
//   secret: 'gemguys',
//   resave: false,
//   saveUninitialized: false,
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// /**
//  * Simple route middleware to ensure user is authenticated
//  * @param  {} req - request
//  * @param  {} res - response
//  * @param  {} next
//  */
// const ensureAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   }
//   res.status(404).send('User not found: incorrect username or password');
// };

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// passport.use(new GoogleStrategy(
//   authConfig.google,
//   (accessToken, refreshToken, profile, done) => done(null, profile),
// ));

// app.get(
//   '/auth/google',
//   passport.authenticate('google', { scope: ['openid email profile'] }),
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // go to correct page
//   },
// );

// passport.use(new FacebookStrategy(
//   authConfig.facebook,
//   (accessToken, refreshToken, profile, cb) => {
//     User.findOrCreate({ facebookId: profile.id }, (err, user) => cb(err, user));
//   },
// ));

// app.get(
//   '/auth/facebook',
//   passport.authenticate('facebook'),
// );

// app.get(
//   '/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   },
// );

// app.get('/logout', (req, res) => {
//   req.logout();
//   // go back to main page
// });


