/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const Files = require('../database/Models/Files.js');
const Messages = require('../database/Models/Messages.js');
const Rooms = require('../database/Models/Rooms.js');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const authConfig = require('../config/oauth.js');
const User = require('../database/Models/User.js');

const app = express();

const connections = [];

const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Listening to port 4000');
});

app.use(express.static(path.join(__dirname, '../client/dist/')));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('im the socketid', socket.id);
  Messages.getMessages()
    .then((data) => {
      socket.emit('old messages', data);
    });

  // User Connects
  socket.on('user login', (data) => {
    console.log('im getting into userlogin');
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    User.addUser(data);
    //  assign userId to user
    if (!socket.userId) {
      socket.userId = 2;
    }

    socket.emit('sign in', {hello: 8});
    io.sockets.emit('userInput', data);
  });


  //  Disconnect
  socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnected: %s sockets connected', connections.length);
  });

  socket.on('add message', (message) => {
    const newMessage = {
      message,
      userId: 1,
      roomId: 1,
      // createdAt: socket.handshake.time,
    };
    Messages.addMessage(newMessage);
    io.sockets.emit('new message', { message });
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
