/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20');
const authConfig = require('../config/oauth.js');

const app = express();

const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Listening to port 4000');
});

app.use(express.static(path.join(__dirname, '../client/dist/')));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('made a socket connection', socket.id);

  socket.on('chat', (data) => {
    console.log(data);
    io.sockets.emit('chat', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
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
  // done(null, user.id);
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  // Users.findById(obj, done);
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

app.get('/logout', (req, res) => {
  req.logout();
  // go back to main page
});
