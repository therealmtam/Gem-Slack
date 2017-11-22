import React from 'react';
import DirectMessage from './DirectMessage.jsx';

class DirectMessageList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
       <div>Direct Messages</div>
       <ul>
         {
           this.props.data.myRooms.map(room => {
             return <DirectMessage room={room} changeCurrentRoom={this.props.changeCurrentRoom}/>
           })
         }
       </ul>
      </div>
    )
  }
}

export default DirectMessageList;