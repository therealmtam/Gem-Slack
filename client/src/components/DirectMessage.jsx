
import React from 'react';
/**
 * This component will render all the room names that are available dynamically.
 */
class DirectMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: '',
    };
  }
  componentDidMount() {
    this.setState({
      roomName: this.props.room
    });
  }
  // Changes App.jsx state for currentRoom when clicked.
  changeRoom() {
    this.props.changeCurrentRoom(this.state.roomName);
  }
  // Shortens the room name if it's too long.
  formatRoomName() {
    let roomName = this.props.room;
    if (roomName.length > 21) {
      roomName = `${roomName.slice(0, 22)}...`;
    }
    return roomName;
  }
  render() {
    return (
      <li className="direct-message" onClick={this.changeRoom.bind(this)}>
        <div className="circle" />
        <div className="room">{this.formatRoomName()}</div>
      </li>
    );
  }
}

export default DirectMessage;
