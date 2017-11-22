import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:4000');

const signInUser = (user) => {
  console.log('signInuser', user);
  socket.emit('user login', {
    username: user,
    avatar: 'hello',
  });
};

const sendMessage = (message) => {
  socket.emit('add message', message);
};

module.exports = {
  signInUser: signInUser,
  sendMessage: sendMessage,
};
