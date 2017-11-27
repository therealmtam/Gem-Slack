import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

const sampleData = {
  username: 'theJohn',
  userImgUrl: 'http://localhost:4000/img3',
  myRooms: ["therealmtam, theericlau, theJohn, theJeff", "therealmtam, theJeff", "Lobby"],
  roomMsgs: {
    "therealmtam, theericlau, theJohn, theJeff": [{
      username: 'therealmtam',
      message: "Hello world1!",
      createdAt: "2017-11-21T19:39:48.279Z",
      roomname: "therealmtam, theericlau, theJohn, theJeff",
      userImgUrl: "http://localhost:3000/uploads/userimgs/img3"
    }],
    "therealmtam, theJeff": [{
      username: 'therealmtam',
      message: "Hello world2!",
      createdAt: "2017-11-21T19:39:48.279Z",
      roomname: "therealmtam, theJeff",
      userImgUrl: "http://localhost:3000/uploads/userimgs/img3"
    }],
    "Lobby": [{
      username: 'therealmtam',
      message: "Hello world3!",
      createdAt: "2017-11-21T19:39:48.279Z",
      roomname: "Lobby",
      userImgUrl: "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg"
    }]
  },
  onlineUsers: ["therealmtam", "theericlau", "theJohn", "theJeff"],
  allUsersInLobby: { 'therealmtam': "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg", 'theJeff': "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg", 'theericlau': "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg", 'theJohn': "https://www.planwallpaper.com/static/images/desktop-year-of-the-tiger-images-wallpaper.jpg" }
};


ReactDOM.render(<App />, document.getElementById('app'));
