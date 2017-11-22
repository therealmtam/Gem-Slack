import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignIn from './Signin.jsx';
import Chat from './Chat.jsx';
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
      roomMsgs: this.props.sampleData.oomMsgs,
      currentRoom: 'Lobby',
      usersInRoom: this.props.sampleData.usersInRoom
    }, () => {console.log(this.state);});

    //PSEUDO CODE:
    //------------------
    // socket listens to messages from server and push and set state to RoomMsgs
    // Socket returns ==>
    //   {
    //     peopleInRoom: ['therealmtam', 'theericlau', 'theJohn', 'theJeff'],
    //     typing: ['therealmtam', 'theericlau'],
    //     msg: {
    //       username: 'therealmtam',
    //       msg: 'hello world',
    //       roomname: 'therealmtam, theJeff, therriclau, theJohn',
    //       createdAt: "2017-11-21T19:39:48.279Z"
    //     }
    //     userImgUrl: {
    //       'therealmtam': 'http://localhost:4000/img1',
    //       'theericLau': 'http://localhost:4000/img2',
    //       'theJohn': 'http://localhost:4000/img3',
    //       'theJeff': 'http://localhost:4000/img1'
    //     }
    //   }
    //   Callback from Socket(){
    //     this.setState({
    //       peopleInRoom: SocketReturnedData[peopleInRoom],
    //       typing: SocketReturnedData[typing],
    //       RoomMsgs: this.state.RoomMsgs.push(SocketReturnedData[msg])
    //     })
    //   }
    // socket.on('new message', (message) => {
    //   this.setState({ messages: this.state.messages.concat([message]) });
    // });

    // socket.on('old messages', (message) => {
    //   this.setState({ messages: message });
    // });

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
   * @param {String} view - View to render ('signin', 'chat', 'newdm')
   */
  renderView(view) {
    if (view === 'signin') {
      return (
        <SignIn sendUserNameToServer={this.sendUserNameToServer.bind(this)}/>
      )

    } else if (view === 'chat') {
      return (
        <Chat messages={this.state.messages} addMessage={this.addMessage.bind(this)} currentUsers={this.state.currentUsers}/>
      )
    } else if (view === 'newdm') {

    }
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
      msg: message,
      createdAt: new Data(),
      roomname: this.state.currentRoom
    }
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

    this.ajaxRequest('post', '/sendUserNameToServer', {username: username})
    .then(result => {

      this.setState({
        username: result.data.username,
        userImgUrl: result.data.userImgUrl,
        myRooms: result.data.myRooms,
        currentRoom: 'Lobby',
        roomMsgs: result.data.roomMsgs,
        usersInRoom: usersInRoom
      }, () => {
        this.changeView('chat');
      });
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
        <Chat messages={this.state.messages} addMessage={this.addMessage.bind(this)} currentUsers={this.state.currentUsers}/>
      )
    } else if (view === 'newDirectMessage') {

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