/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const app = express();
const socketIO = require('socket.io');
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
