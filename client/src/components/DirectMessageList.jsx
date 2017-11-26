import React from 'react';
import DirectMessage from './DirectMessage.jsx';

class DirectMessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
       <div onClick={() => this.props.changeView('newDirectMessage')}>Direct Messages</div>
       <ul>
         {
           this.props.data.myRooms.map((room, index) => {
             return <DirectMessage room={room} key={index} changeCurrentRoom={this.props.changeCurrentRoom}/>
           })
         }
       </ul>
      </div>
    )
  }
}

export default DirectMessageList;