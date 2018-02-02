import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectableUsersFeed from './SelectableUsersFeed.jsx';
import SelectedUsersFeed from './SelectedUsersFeed.jsx';

/**
 * Description:
 * NewDirectMsg component renders all components of the
 * new Direct Message view which is shown when the User
 * wants to create a new Room (aka. a new 'Direct Message' in Slack terms).
 * This component allows the User to select from all
 * selectable Users in the 'Lobby' (aka. a 'channel' in Slack terms)
 * to start a new Direct Message with.
 *
 * @prop {Function} createNewRoom - Function passed in by App component.
 * @prop {Function} changeView - Function passed in by App component.
 * @prop {Object} allUsersInLobby - Object passed in by App component.
 */
class NewDirectMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingSelectableUsers: [],
      narrowedSearchList: [],
      selectedUsers: [],
      userInput: '',
    };
  }

  componentWillMount() {
    const formattedAllSelectableUsers = Object.keys(this.props.allUsersInLobby).map(user => user);

    this.setState({
      remainingSelectableUsers: formattedAllSelectableUsers,
      selectedUsers: [],
    });
  }

  /**
   * createNewDirectMsg:
   * Function creates a new Room by adding new room name to the State
   * property in the App component that contains all
   * existing room data.
   *
   * @param - none
   */
  createNewDirectMsg() {
    const newRoomname = this.state.selectedUsers.join(', ');

    if (newRoomname.length !== 0) {
      this.props.createNewRoom(newRoomname);
    }
  }

  /**
   * goBackToCurrentRoom:
   * Function is called when User wants to escape the page
   * without creating a new Room.
   *
   * @param - none
   */
  goBackToCurrentRoom() {
    this.props.changeView('chat');
  }

  /**
   * recordSearchedUser:
   * Function keeps track, in State, of the User's input into the
   * seach-for-users input field.
   *
   * @param {Object} event - Event object
   */
  recordSearchedUser(event) {
    const newUserInput = event.target.value;
    this.narrowSearchList(newUserInput);
    this.setState({
      userInput: newUserInput,
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
      const formattedInput = userInput.toLowerCase().split(' ').join('');
      let narrowedSearchList = this.state.remainingSelectableUsers.filter((user) => {
        const lettersToMatch = user.slice(0, formattedInput.length).toLowerCase().split(' ').join('');
        return lettersToMatch.includes(formattedInput);
      });

      if (narrowedSearchList.length === 0) {
        narrowedSearchList = [`No one found matching ${userInput}`];
      }

      this.setState({
        narrowedSearchList,
      });
    } else {
      this.setState({
        narrowedSearchList: [],
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
    const selectedUser = event.target.getAttribute('value');
    const { selectedUsers } = this.state;
    selectedUsers.push(selectedUser);

    const remainingSelectableUsers = this.state.remainingSelectableUsers.filter(user =>
      (user !== selectedUser));

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

    this.setState({
      selectedUsers,
      remainingSelectableUsers,
    }, () => {
      this.narrowSearchList(this.state.userInput);
    });
  }

  /**
   * removeUser:
   * Function removes selected Users from the selected users list stored in State.
   *
   * @param {Object} event - Event object
   */
  removeUser(event) {
    const removedUser = event.target.getAttribute('value');
    const selectedUsers = this.state.selectedUsers.filter(user => (user !== removedUser));

    const { remainingSelectableUsers } = this.state;
    remainingSelectableUsers.push(removedUser);

    this.setState({
      selectedUsers,
      remainingSelectableUsers,
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
   * Function shows the User either the narrowed search list based on their input,
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
          />);
      }
      return (
        <SelectableUsersFeed
          listToDisplay={this.state.narrowedSearchList}
          selectUser={this.selectUser.bind(this)}
          allUsersInLobby={this.props.allUsersInLobby}
        />);
    }

    return (
      <SelectableUsersFeed
        listToDisplay={this.state.remainingSelectableUsers}
        selectUser={this.selectUser.bind(this)}
        allUsersInLobby={this.props.allUsersInLobby}
      />);
  }

  render() {
    return (
      <div>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <button
            type="button"
            className="btn btn-outline-dark"
            style={{ backgroundColor: '#D6D6D5', fontWeight: 'bold', color: 'white' }}
            onClick={this.goBackToCurrentRoom.bind(this)}>
            esc
          </button>
        </div>
        <div className="container" style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 >Direct Messages</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col" />
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
                    style={{ backgroundColor: '#D6D6D5', fontWeight: 'bold', color: 'white' }}
                    onClick={this.createNewDirectMsg.bind(this)}>
                    Go
                  </button>
                </span>
              </div>
            </div>
            <div className="col" />
          </div>
        </div>
        <div style={{ height: '20px' }} />

        <div className="container" >
          <div className="row">

            <div className="col-sm-6">
              {this.renderSelectableUsersFeed()}
            </div>
            <div className="col-sm-6">
              <SelectedUsersFeed
                listToDisplay={this.state.selectedUsers}
                removeUser={this.removeUser.bind(this)}
                allUsersInLobby={this.props.allUsersInLobby}
              />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

NewDirectMsg.propTypes = {
  createNewRoom: PropTypes.func.isRequired,
  changeView: PropTypes.func.isRequired,
  allUsersInLobby: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default NewDirectMsg;
