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
  render() {
    return (
      <li onClick={this.changeRoom.bind(this)}>{this.props.room}</li>
    )
  }
}

export default DirectMessage;