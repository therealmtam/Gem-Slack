/*eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectableUsersFeed from './SelectableUsersFeed.jsx';

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
 * @param {Array} allSelectableUsers - Array passed in by App component.
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
    this.setState({
      allSelectableUsers: this.props.allSelectableUsers,
      remainingSelectableUsers: this.props.allSelectableUsers,
      selectedUsers: ['max', 'jeff']
    });
  }

  /**
   * createNewDirectMsg:
   * Function creates a new 'room', locally (not sent to server),
   * by adding new 'room' data to the State property that contains all
   * existing rooms data. It then takes the User back to the 'chat' view.
   *
   * @param {Array} allSelectableUsers - Array passed in by App component
   */
  createNewDirectMsg() {

    let newRoomData = {
      roomname: this.state.selectedUsers.join(','),
      usersInRoom: this.state.selectedUsers,
    };

    // this.props.createNewRoom(newRoomData);
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

    let selectedUser = event.target.value;

    let isAlreadySelected = this.state.selectedUsers.includes(selectedUser);

    if (!isAlreadySelected) {
      let selectedUsers = this.state.selectedUsers;
      selectedUsers.push(selectedUser);

      let remainingSelectableUsers = this.state.remainingSelectableUsers.filter((user) => {
        return (user !== selectedUser);
      });

      this.setState({
        selectedUsers: selectedUsers,
        remainingSelectableUsers: remainingSelectableUsers,
      }, ()=>{console.log(this.state.selectedUsers); console.log(this.state.remainingSelectableUsers);});
    }

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
          <SelectableUsersFeed listToDisplay={this.state.narrowedSearchList} selectUser={()=>{}} />
        )
      }
      return (
        <SelectableUsersFeed listToDisplay={this.state.narrowedSearchList} selectUser={this.selectUser.bind(this)} />
      )
     } else {
      return (
        <SelectableUsersFeed listToDisplay={this.state.remainingSelectableUsers} selectUser={this.selectUser.bind(this)} />
      )
    }
  }



  render() {
    return (
      <div>
        <h1>Direct Messages</h1>
        <div>
          <input
            type='text'
            onChange={this.recordSearchedUser.bind(this)}
            placeholder="Find or start a conversation"
          />
          <button type="submit" onClick={this.createNewDirectMsg.bind(this)}>Go</button>
        </div>
        {this.renderSelectableUsersFeed()}
      </div>
    );
  }
}

NewDirectMsg.propTypes = {

};

export default NewDirectMsg;