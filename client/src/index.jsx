import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

/**
//sampleData for testing

const sampleData = {
  username: 'theJohn',
  userImgUrl: 'http://bit.ly/2iTgJoT',
  myRooms: ['therealmtam, theericlau, theJohn, theJeff', 'therealmtam, theJeff', 'Lobby'],
  roomMsgs: {
    'therealmtam, theericlau, theJohn, theJeff': [{
      username: 'therealmtam',
      message: 'Hello world1!',
      createdAt: '2017-11-21T19:39:48.279Z',
      roomname: 'therealmtam, theericlau, theJohn, theJeff',
      userImgUrl: 'http://bit.ly/2iTgJoT',
    }],
    'therealmtam, theJeff': [{
      username: 'therealmtam',
      message: 'Hello world2!',
      createdAt: '2017-11-21T19:39:48.279Z',
      roomname: 'therealmtam, theJeff',
      userImgUrl: 'http://bit.ly/2iTgJoT',
    }],
    Lobby: [{
      username: 'therealmtam',
      message: 'Hello world3!',
      createdAt: '2017-11-21T19:39:48.279Z',
      roomname: 'Lobby',
      userImgUrl: 'http://bit.ly/2iTgJoT',
    }],
  },
  onlineUsers: ['therealmtam', 'theericlau', 'theJohn', 'theJeff'],
  allUsersInLobby: {
    therealmtam: 'http://bit.ly/2iTgJoT',
    theJeff: 'http://bit.ly/2iTgJoT',
    theericlau: 'http://bit.ly/2iTgJoT',
    theJohn: 'http://bit.ly/2iTgJoT',
  },
};
*/


ReactDOM.render(<App />, document.getElementById('app'));
