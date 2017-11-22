import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignIn from './Signin.jsx';
import Chat from './Chat.jsx';
import axios from 'axios';

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
      roomMsgs: [],
      currentRoom: '',
      usersInRoom: []
    }
  }

  componentDidMount(){

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
   * addMessage:
   *
   * @param {String} message - View to render ('signin', 'chat', 'newdm')
   */
  addMessage(message) {
    let newMessages = this.state.messages;
    newMessages.push(message);
    this.setState({
      messages: newMessages
    });
    console.log('mss', this.state.messages)
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

    this.ajaxRequest('post', '/sendUserNameToServer', {username: username})
    .then(result => {

      this.setState({
        username: result.data.username,
        userImgUrl: result.data.userImgUrl,
        myRooms: result.data.myRooms,
        currentRoom: 'Lobby',
        roomMsgs: result.data.roomMsgs,
        usersInRoom: result.data.usersInRoom
      }, () => {
        //this.changeView('chat');
      });

    });
  }

  /**
   * getRoomData:
   * Function sends the roomname it wants data for to the Server.
   * The Server will return all the data necessary
   * to render the room's Chat view.
   *
   * @param {String} roomname - Name of room requesting data for
   */
  getRoomData(roomname) {

    this.ajaxRequest('get', '/getroomdata', {roomname: roomname})
    .then(result => {

      this.setState({
        currentRoom: roomname,
        roomMsgs: result.data.roomMsgs,
        usersInRoom: result.data.usersInRoom
      }, () => {
        //this.changeView('chat');
      });

    });
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