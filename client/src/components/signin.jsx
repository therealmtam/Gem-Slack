import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sockets from './Sockets.jsx';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  recordUserName(e) {
    this.setState({
      username: e.target.value
    });
  }

  submit(e) {
    if (e.charCode === 13 || e.charCode === undefined) {
      console.log('enter was pressed or onClick was pressed');
      Sockets.signInUser(this.state.username);
      this.props.sendUserNameToServer(this.state.username);
      this.setState({
        username: ''
      })
      //Send the char code back up to the App component so it can do an Ajax call to the server and send over the username.
    }
  }



  render() {
    return (
      <div>
        <input
          type='text'
          onChange={this.recordUserName.bind(this)}
          placeholder="Username"
          onKeyPress={this.submit.bind(this)}/>
        <button type="submit" onClick={this.submit.bind(this)}>Submit</button>
      </div>
    );
  }
}

SignIn.propTypes = {

};

export default SignIn;
