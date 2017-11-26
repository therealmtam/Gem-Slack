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
      userImgUrl: "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg"
    }],
    "therealmtam, theJeff": [{
      username: 'therealmtam',
      message: "Hello world2!",
      createdAt: "2017-11-21T19:39:48.279Z",
      roomname: "Lobby",
      userImgUrl: "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg"
    }],
    "Lobby": [{
      username: 'therealmtam',
      message: "Hello world3!",
      createdAt: "2017-11-21T19:39:48.279Z",
      roomname: "Lobby",
      userImgUrl: "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg"
    }]
  },
    usersInRoom: {
    "therealmtam, theericlau, theJohn, theJeff": ["therealmtam", "theericlau", "theJohn", "theJeff"],
    "therealmtam, theJeff": ["therealmtam", "theJeff"],
    "Lobby": ["therealmtam", "theericlau", "theJohn", "theJeff"]
  }
};


ReactDOM.render(<App sampleData={sampleData}/>, document.getElementById('app'));
