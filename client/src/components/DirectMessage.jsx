/*eslint-disable */
import React from 'react';

class DirectMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      roomName: ''
    }
  }
  componentDidMount(){
    this.setState({
      roomName: this.props.room
    })
  }
  changeRoom() {
    this.props.changeCurrentRoom(this.state.roomName)
  }
  formatRoomName() {
    let roomName = this.props.room;
    if (roomName.length > 21) {
      roomName = roomName.slice(0, 22) + '...';
    }
    return roomName;
  }
  render() {
    return (
      <li className="direct-message" onClick={this.changeRoom.bind(this)}>
        {this.formatRoomName()}
      </li>
    )
  }
}

export default DirectMessage;