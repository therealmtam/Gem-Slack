import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignIn from './Signin.jsx';
import Chat from './Chat.jsx';
import axios from 'axios';
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:4000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'signin',
      name: '',
      messages: [],
      currentUsers: [],
    }
  }

  componentDidMount() {
    socket.on('new message', (message) => {
      this.setState({ messages: this.state.messages.concat([message]) });
    });

    socket.on('old messages', (message) => {
      this.setState({ messages: message });
    });
  }

  changeView(view) {
    this.setState({
      view: view
    });
  }

  renderView(view) {
    if (view === 'signin') {
      return (
        <SignIn sendUserNameToServer={this.sendUserNameToServer.bind(this)}/>
      )

    } else if (view === 'chat') {
      return (
        <Chat messages={this.state.messages} addMessage={this.addMessage.bind(this)} currentUsers={this.state.currentUsers}/>
      )
    }
  }

  //  Don't need this addMessage
  addMessage(message) {
    let newMessages = this.state.messages;
    newMessages.push(message);
    this.setState({
      messages: newMessages
    });
    console.log('mss', this.state.messages);
  };

  sendUserNameToServer(username) {
    // socket to server with username
    // socket comes back with recent messages and current users;
    this.setState({
      name: username
      //messages: array of message objects from socket
      //currentUsers: array of all connected users from socket
    })
    this.changeView('chat');

  }


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