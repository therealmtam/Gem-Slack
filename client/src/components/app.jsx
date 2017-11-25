/*eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignIn from './Signin.jsx';
import Chat from './Chat.jsx';
import NewDirectMsg from './NewDirectMsg.jsx';
import axios from 'axios';
import openSocket from 'socket.io-client';

import Sockets from './Sockets.jsx';

const socket = openSocket('http://localhost:4000');

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
      roomMsgs: {},
      currentRoom: '',
      usersInRoom: {}
    }
  }

  componentDidMount(){

    //Sets state with SAMPLE DATA
    this.setState({
      view: 'signin',
      username: this.props.sampleData.username,
      userImgUrl: this.props.sampleData.userImgUrl,
      myRooms: this.props.sampleData.myRooms,
      roomMsgs: this.props.sampleData.roomMsgs,
      currentRoom: 'Lobby',
      usersInRoom: this.props.sampleData.usersInRoom
    }, () => {console.log(this.state);});

    socket.on('sign in', (data) => {
      // this.setState({
      //   username: result.data.username,
      //   userImgUrl: result.data.userImgUrl,
      //   myRooms: result.data.myRooms,
      //   currentRoom: 'Lobby',
      //   roomMsgs: result.data.roomMsgs,
      //   usersInRoom: result.data.usersInRoom
      // }, () => {
      //   this.changeView('chat');
      // });
      console.log('im in the sign in data', data);
    });
  }

  changeCurrentRoom(selectedRoom) {
    this.setState({
      currentRoom: selectedRoom
    })

  }

  /**
   * sendMessage:
   * Function sends a message via Socket.
   * All clients in the same room, will receive the message.
   *
   * @param {String} message - User entered message
   */
  sendMessage(message) {
    let newMsg = {
      username: this.state.username,
      message: message,
      createdAt: new Date(),
      roomname: this.state.currentRoom
    }
    //temporarily add to state until socket is working
    let currentRoomMsgs = this.state.roomMsgs;
    currentRoomMsgs[this.state.currentRoom].push(newMsg);
    this.setState({
      roomMsgs: currentRoomMsgs
    })
    /**
     * PLACEHOLDER FOR SOCKET FUNCTION
     */
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
    // this.setState({
    //   name: username
    //   //messages: array of message objects from socket
    //   //currentUsers: array of all connected users from socket
    // })
    // this.changeView('chat');

    console.log(username);
    //this.changeView('chat');

    // this.ajaxRequest('post', '/sendUserNameToServer', {username: username})
    // .then(result => {

    //   this.setState({
    //     username: result.data.username,
    //     userImgUrl: result.data.userImgUrl,
    //     myRooms: result.data.myRooms,
    //     currentRoom: 'Lobby',
    //     roomMsgs: result.data.roomMsgs,
    //     usersInRoom: usersInRoom
    //   }, () => {
    //     this.changeView('chat');
    //   });

    // });
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