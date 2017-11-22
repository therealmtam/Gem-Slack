import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const sampleData = {
  username: 'theJohn',
  userImgUrl: 'http://localhost:4000/img3',
  myRooms: ["therealmtam, theericlau, theJohn, theJeff", "therealmtam, theJeff", "Lobby"],
  roomMsgs: {
    "therealmtam, theericlau, theJohn, theJeff": [{
      username: 'therealmtam',
      message: "Hello world1!",
      createdAt: "2017-11-21T19:39:48.279Z",
      roomname: "Lobby",
      userImgUrl: "http://localhost:3000/uploads/userimgs/img3"
    }],
    "therealmtam, theJeff": [{
      username: 'therealmtam',
      message: "Hello world2!",
      createdAt: "2017-11-21T19:39:48.279Z",
      roomname: "Lobby",
      userImgUrl: "http://localhost:3000/uploads/userimgs/img3"
    }],
    "Lobby": [{
      username: 'therealmtam',
      message: "Hello world3!",
      createdAt: "2017-11-21T19:39:48.279Z",
      roomname: "Lobby",
      userImgUrl: "http://localhost:3000/uploads/userimgs/img3"
    }]
  },
    usersInRoom: {
    "therealmtam, theericlau, theJohn, theJeff": ["therealmtam", "theericlau", "theJohn", "theJeff"],
    "therealmtam, theJeff": ["therealmtam", "theJeff"],
    "Lobby": ["therealmtam", "theericlau", "theJohn", "theJeff"]
  }
};


ReactDOM.render(<App sampleData={sampleData}/>, document.getElementById('app'));
