/*eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignIn from './Signin.jsx';
import Chat from './Chat.jsx';
import NewDirectMsg from './NewDirectMsg.jsx';
import axios from 'axios';
import io from 'socket.io-client';

// import Sockets from './Sockets.jsx';

const socket = io('http://localhost:4000');

/**
 * Description:
 * App component renders all views for the application.
 * Its State holds all data and disseminates it to all
 * React sub-components.
 * It is the only component that communicates with the server.
 *
 * @param - none.
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'signin',
      username: '',
      userImgUrl: '',
      myRooms: [],
      roomMsgs: this.props.sampleData.roomMsgs,
      currentRoom: 'Lobby',
      usersInRoom: {}
    }
  }

  componentWillMount() {

    //  Sets state with SAMPLE DATA
    // this.setState({
    //   // view: 'signin',
    //   // username: this.props.sampleData.username,
    //   // userImgUrl: this.props.sampleData.userImgUrl,
    //   // myRooms: this.props.sampleData.myRooms,
    //   roomMsgs: this.props.sampleData.roomMsgs,
    //   currentRoom: 'Lobby',
    //   // usersInRoom: this.props.sampleData.usersInRoom
    // });

    socket.on('sign in', (data) => {

      this.setState({
        username: data.username,
        userImgUrl: data.userImgUrl,
        myRooms: data.myRooms,
        roomMsgs: data.roomMsgs,
        usersInRoom: data.usersInRoom,
      });
    });

    socket.on('new message', (message) => {
      console.log('i get here', message);
      // const currentRoomMsgs = this.state.roomMsgs;
      // currentRoomMsgs[this.state.currentRoom].push(message);
      // console.log('this is the currentroommsgs', currentRoomMsgs);
      // console.log('this is updated roommsgs', this.state.roomMsgs);
      // this.setState({
      //   roomMsgs: currentRoomMsgs,
      // });
    });

  }


  // Sockets Helper Functions
  signInUser(user) {
    socket.emit('user login', {
      username: user,
      userImgUrl: 'hello',
      rooms: ["Lobby", "therealmtam, theJeff", "therealmtam, theericlau, theJohn, theJeff"],
    });
  }


  // Front End Helper Functions
  changeCurrentRoom(selectedRoom) {
    this.setState({
      currentRoom: selectedRoom,
    });
  }

  /**
   * sendMessage:
   * Function sends a message via Socket.
   * All clients in the same room, will receive the message.
   *
   * @param {String} message - User entered message
   */
  sendMessage(message) {
    const newMsg = {
      username: this.state.username,
      message: message,
      createdAt: new Date(),
      roomname: this.state.currentRoom,
    };
    socket.emit('add message', newMsg);
  }

  /**
   * sendUserNameToServer:
   * Function sends a username to the Server.
   * The Server will return all the data necessary
   * to render the Lobby (the room where all users are sent to first
   * after typing in their username) Chat view.
   *
   * @param {String} username - Username typed in by the user
   */
  sendUserNameToServer(username) {
    this.signInUser(username);
    this.changeView('chat');
  }

  /**
   * ajaxRequest:
   * Function is a helper function that sends a GET or POST
   * request to a specified server route along with specified data
   * if applicable. It returns a Promise with the response
   * from the server route.
   *
   * @param {String} reqType - Request type ('post', 'get')
   * @param {String} route - endpoing to send the request to (ex. '/test')
   * @param {Object} data - Data to send to the server specified as object ex. {name: max}
   * @returns {Promise} Using the .then((results) => {}) method, the results from
   * the Request can be retrieved by any function utilizing this helper function.
   */
  ajaxRequest(reqType, route, data) {
    if (reqType === 'post') {
      return axios.post(route, data)
    } else if (reqType === 'get') {
      return axios.get(route)
    }
  }

  /**
   * createNewRoom:
   * Function adds information to the State for the creation of a new room.
   * Function also changes the 'view' State to 'chat'.
   * Function is used by the NewDirectMsg component.
   *
   * @param {Object} newRoomData - Data used to create a new room view under the chat view
   */
  createNewRoom(newRoomData) {

    let myRooms = this.state.myRooms;
    myRooms.push(newRoomData.roomname);

    let roomMsgs = this.state.roomMsgs;
    roomMsgs[newRoomData.roomname] = [];

    let usersInRoom = this.state.usersInRoom;
    usersInRoom[newRoomData.roomname] = newRoomData.usersInRoom;

    this.setState({
      // view: 'chat',
      myRooms: myRooms,
      roomMsgs: roomMsgs,
      usersInRoom: usersInRoom
    });
  }

  /**
   * changeView:
   * Updates the State property 'view' to
   * a new passed in view.
   *
   * @param {String} view - View to update State with ('signin', 'chat', 'newdm')
   */
  changeView(view) {
    this.setState({
      view: view
    });
  }

  /**
   * renderView:
   * Called by the React Component's render() to conditionally
   * render a view based on the view value passed in.
   *
   * @param {String} view - View to render ('signin', 'chat', 'newDirectMessage')
   */
  renderView(view) {
    if (view === 'signin') {
      return (
        <SignIn sendUserNameToServer={this.sendUserNameToServer.bind(this)}/>
      )

    } else if (view === 'chat') {
      return (
        <Chat data={this.state} sendMessage={this.sendMessage.bind(this)} changeCurrentRoom={this.changeCurrentRoom.bind(this)} changeView={this.changeView.bind(this)}/>
      )
    } else if (view === 'newDirectMessage') {
      return (
        <NewDirectMsg
          createNewRoom={this.createNewRoom.bind(this)}
          allSelectableUsers={this.state.usersInRoom.Lobby}
        />
      )
    }
  }

  /**
   * render:
   * Essential function of all React Components.
   * It App.jsx's render() renders all view components
   * for the web application.
   */
  render() {
    return (
      <div>
      { this.renderView(this.state.view) }
      </div>
    );
  }
}

App.propTypes = {

};

export default App;