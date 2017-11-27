import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Description:
 * SignIn component renders all components of the
 * SignIn view which is shown when the User goes to
 * our URL. It sends User input back to
 * the App component.
 *
 * @prop {Function} sendUserNameToServer - Function passed in by App component.
 */
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userImgUrl: '',
    };
  }

  /**
   * recordUserName:
   * Function stores the User entered username into State.
   * @param {Object} event - Event object
   */
  recordUserName(event) {
    this.setState({
      username: event.target.value,
    });
  }

  /**
   * recordImageUrl:
   * Function stores the User's image URL (for profile pic) into State.
   * @param {Object} event - Event object
   */
  recordImageUrl(event) {
    this.setState({
      userImgUrl: event.target.value,
    });
  }

  /**
   * submitUserName:
   * Function calls the App component's passed in function
   * that sends the User input to the server, only if the
   * User pressed enter while in the input field or clicked the Submit button.
   * @param {Object} event - Event object
   */
  submitUserName(event) {
    if (event.charCode === 13 || event.charCode === undefined) {
      if (this.state.userImgUrl.length > 0) {
        this.props.sendUserNameToServer(this.state.username, this.state.userImgUrl);
      } else {
        this.props.sendUserNameToServer(this.state.username);
      }
    }
  }

  render() {
    return (
      <div className="signin-box">
        <h1>Gem Slack</h1>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input
              type='text'
              className="form-control"
              placeholder="Username"
              onChange={this.recordUserName.bind(this)}
              onKeyPress={this.submitUserName.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Image Url</label>
            <input
              type="text"
              className="form-control"
              placeholder="Image Url"
              onChange={this.recordImageUrl.bind(this)}
              onKeyPress={this.submitUserName.bind(this)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.submitUserName.bind(this)}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  sendUserNameToServer: PropTypes.func.isRequired,
};

export default SignIn;
