/*eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectableUsersFeed from './SelectableUsersFeed.jsx';
import SelectedUsersFeed from './SelectedUsersFeed.jsx';

/**
 * Description:
 * NewDirectMsg component renders all components of the
 * new Direct Message view which is shown when the User
 * wants to create a new Direct Message (Room).
 * This component allows the User to select from all
 * selectable Users in the 'Lobby' of a Channel to start a new
 * Direct Message with.
 *
 * @param {Function} createNewRoom - Function passed in by App component.
 * @param {Object} allUsersInLobby - Object passed in by App component.
 */
class NewDirectMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allSelectableUsers: [],
      remainingSelectableUsers: [],
      narrowedSearchList: [],
      selectedUsers: [],
      userInput: '',
    }
  }

  /**
   * componentWillMount:
   * This React function fires BEFEORE render() is called
   * for the very first time the page is loaded.
   *
   * @param - None
   */
  componentWillMount() {

    let formattedAllSelectableUsers = [];
    for (var user in this.props.allUsersInLobby) {
      formattedAllSelectableUsers.push(user);
    }

    this.setState({
      allSelectableUsers: formattedAllSelectableUsers,
      remainingSelectableUsers: formattedAllSelectableUsers,
      selectedUsers: [],
    });
  }

  /**
   * createNewDirectMsg:
   * Function creates a new 'room' by adding new room name to the State
   * property in the App component that contains all
   * existing room data.
   *
   * @param {Function} this.props.createNewRoom - Function passed in by App component
   */
  createNewDirectMsg() {
    let newRoomname = this.state.selectedUsers.join(', ');
    console.log('newRoomname ', newRoomname);
    this.props.createNewRoom(newRoomname);
  }

  /**
   * recordSearchedUser:
   * Function keeps track, in State, of the User's input into the
   * seach-for-users input field.
   *
   * @param {Object} event - Event object
   */
  recordSearchedUser(event) {
    let newUserInput = event.target.value;
    this.narrowSearchList(newUserInput);
    this.setState({
      userInput: newUserInput
    });
  }

  /**
   * narrowSearchList:
   * Function dynamically narrows the the list of Users selectable
   * based on the User's input.
   *
   * @param {String} userInput - User's typed input into search field
   */
  narrowSearchList(userInput) {
    if (userInput.length !== 0) {
      let formattedInput = userInput.toLowerCase().split(' ').join('');
      let narrowedSearchList = this.state.remainingSelectableUsers.filter((user) => {
        let lettersToMatch = user.slice(0, formattedInput.length).toLowerCase().split(' ').join('');
        return lettersToMatch.includes(formattedInput);
      });

      if (narrowedSearchList.length === 0) {
        narrowedSearchList = [`No one found matching ${userInput}`]
      }

      this.setState({
        narrowedSearchList: narrowedSearchList
      });
    } else {
      this.setState({
        narrowedSearchList: []
      });
    }
  }

  /**
   * selectUser:
   * Function keeps track, in State, of which users in the entire list of
   * all selectable users has been selected. It then updates the list of
   * remaining selectable users accordingly.
   *
   * @param {Object} event - Event object
   */
  selectUser(event) {
    let selectedUser = event.target.getAttribute('value');
    let selectedUsers = this.state.selectedUsers;
    selectedUsers.push(selectedUser);

    let remainingSelectableUsers = this.state.remainingSelectableUsers.filter((user) => {
      return (user !== selectedUser);
    });

    this.setState({
      selectedUsers: selectedUsers,
      remainingSelectableUsers: remainingSelectableUsers,
    }, () => {
      this.narrowSearchList(this.state.userInput);
    });
  }

  /**
   * removeUser:
   * Function removes selected Users if the User decides to remove
   * a selected user.
   *
   * @param {Object} event - Event object
   */
  removeUser(event) {
    let removedUser = event.target.getAttribute('value');
    let selectedUsers = this.state.selectedUsers.filter((user) => {
      return (user !== removedUser)
    });

    let remainingSelectableUsers = this.state.remainingSelectableUsers;
    remainingSelectableUsers.push(removedUser);

<<<<<<< HEAD
    this.setState({
      selectedUsers: selectedUsers,
      remainingSelectableUsers: remainingSelectableUsers,
    }, () => {
      this.narrowSearchList(this.state.userInput);
    });
  }

  /**
   * removeUser:
   * Function removes selected Users if the User decides to remove
   * a selected user.
   *
   * @param {Object} event - Event object
   */
  removeUser(event) {

    let removedUser = event.target.getAttribute('value');

    let selectedUsers = this.state.selectedUsers.filter((user) => {
      return (user !== removedUser)
    });

    let remainingSelectableUsers = this.state.remainingSelectableUsers;
    remainingSelectableUsers.push(removedUser);

    this.setState({
      selectedUsers: selectedUsers,
      remainingSelectableUsers: remainingSelectableUsers,
    }, () => {
      this.narrowSearchList(this.state.userInput);
    });
=======
      this.setState({
        selectedUsers: selectedUsers,
        remainingSelectableUsers: remainingSelectableUsers,
      }, () => {
        this.narrowSearchList(this.state.userInput);
      });
    }
>>>>>>> rebase merge

  }

  /**
   * removeUser:
   * Function removes selected Users if the User decides to remove
   * a selected user.
   *
   * @param {Object} event - Event object
   */
  removeUser(event) {

    let removedUser = event.target.getAttribute('value');

    let selectedUsers = this.state.selectedUsers.filter((user) => {
      return (user !== removedUser)
    });

    let remainingSelectableUsers = this.state.remainingSelectableUsers;
    remainingSelectableUsers.push(removedUser);

    this.setState({
      selectedUsers: selectedUsers,
      remainingSelectableUsers: remainingSelectableUsers,
    }, () => {
      this.narrowSearchList(this.state.userInput);
    });

  }

  /**
   * renderSelectableUsersFeed:
   * Function shows the User either the narrowed search list based on their input
   * or the list of all remaining selectable users if the User has not provided
   * any input.
   *
   * @param - None
   */
  renderSelectableUsersFeed() {

    if (this.state.narrowedSearchList.length > 0) {
      if (this.state.narrowedSearchList.join('').includes('No one found matching')) {
        return (
          <SelectableUsersFeed
            listToDisplay={this.state.narrowedSearchList}
            selectUser={() => { }}
            allUsersInLobby={this.props.allUsersInLobby}
          />)
      }
      return (
        <SelectableUsersFeed
          listToDisplay={this.state.narrowedSearchList}
          selectUser={this.selectUser.bind(this)}
          allUsersInLobby={this.props.allUsersInLobby}
        />)
     } else {
      return (
        <SelectableUsersFeed
          listToDisplay={this.state.remainingSelectableUsers}
          selectUser={this.selectUser.bind(this)}
          allUsersInLobby={this.props.allUsersInLobby}
        />)
    }
  }

  render() {
    return (
      <div>
        <div className="container" style={{ "textAlign": "center", "marginBottom": "20px"}}>
          <h1 >Direct Messages</h1>
        </div>
        <div className="container">
          <div className="row">
              <div className="col"></div>
              <div className="col">
                <div className="input-group" >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Find or start a conversation"
                    aria-label="Find or start a conversation"
                    onChange={this.recordSearchedUser.bind(this)}
                  />
                  <span className="input-group-btn">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      style={{"backgroundColor": "#D6D6D5", "fontWeight": "bold", "color": "white" }}
                      onClick={this.createNewDirectMsg.bind(this)}>
                      Go
                    </button>
                  </span>
                </div>
              </div>
              <div className="col"></div>
          </div>
        </div>
        <div style={{"height":"20px"}}></div>

        <div className="container" >
          <div className="row">

            <div className="col-sm-6">
              {this.renderSelectableUsersFeed()}
            </div>
            <div className="col-sm-6">
              <SelectedUsersFeed listToDisplay={this.state.selectedUsers} removeUser={this.removeUser.bind(this)} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

NewDirectMsg.propTypes = {

};

export default NewDirectMsg;