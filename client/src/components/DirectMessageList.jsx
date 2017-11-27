/*eslint-disable */
import React from 'react';
import DirectMessage from './DirectMessage.jsx';

class DirectMessageList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.data.myRooms) {
      return (
        <div className="dm-div">
          <div className="gem-slack">GEM SLACK <span className="glyphicon glyphicon-bell bell-icon"></span></div>
          <div className="current-username">{this.props.data.username}</div>
          <div className="all-threads"><i className="material-icons chat-icon">chat</i>  AllThreads</div>
          <div className="channels"> Channels <span className="glyphicon glyphicon-plus-sign plus-icon"></span></div>
          <div onClick={() => this.props.changeView('newDirectMessage')} 
            className="direct-message-title">
            Direct Messages
            <span className="glyphicon glyphicon-plus-sign plus-icon"></span>
          </div>
         <ul className="list-unstyled">
           {
             this.props.data.myRooms.map((room, index) => {
               return (<DirectMessage room={room} key={index} 
                changeCurrentRoom={this.props.changeCurrentRoom}/>)
             })
           }
         </ul>
        </div>
      )
    } else {
        return <div className="dm-div"></div>
    }
  }
}

export default DirectMessageList;
