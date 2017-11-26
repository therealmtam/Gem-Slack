import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Description:
 * SignIn component renders all components of the
 * SignIn view which is shown when the User goes to
 * our URL. It sends the User input username back to
 * the App component.
 *
 * @param {Function} sendUserNameToServer - Function passed in by App component.
 */
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
  }

  /**
   * recordUserName:
   * Function stores the User entered username into State.
   * @param {Object} event - Event object
   */
  recordUserName(event) {
    this.setState({
      username: event.target.value
    });
  }

  /**
   * submitUserName:
   * Function calls the App component's passed in function
   * that sends the username to the server, only if the
   * User pressed enter while in the input field or clicked the Submit button.
   * @param {Object} event - Event object
   */
  submitUserName(event) {
    if (event.charCode === 13 || event.charCode === undefined) {
      this.props.sendUserNameToServer(this.state.username);
    }
  }

  render() {
    return (
      <div>
        <input
          type='text'
          onChange={this.recordUserName.bind(this)}
          placeholder="Username"
          onKeyPress={this.submitUserName.bind(this)}
        />
        <button type="submit" onClick={this.submitUserName.bind(this)}>Submit</button>
      </div>
    );
  }
}

SignIn.propTypes = {

};

export default SignIn;
