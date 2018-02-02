
import React from 'react';
import DirectMessage from './DirectMessage.jsx';

/**
 * This component will render the title, icons, username on the left column.
 * It will also render all the rooms that are available dynamically.
 * Will change the view to NewDirectMsg when 'Direct Messages' is clicked.
 * Will filter all the messages to corresponding roomnames when roomname is clicked.
 */
const DirectMessageList = (props) => {
  if (props.data.myRooms) {
    return (
      <div className="dm-div">
        <div className="gem-slack">GEM SLACK <span className="glyphicon glyphicon-bell bell-icon" /></div>
        <div className="current-username"><div className="circle" />{props.data.username}</div>
        <div className="all-threads"><i className="material-icons chat-icon">chat</i>  AllThreads</div>
        <div className="channels"> Channels <span className="glyphicon glyphicon-plus-sign plus-icon" /></div>
        <div onClick={() => props.changeView('newDirectMessage')}
          className="direct-message-title">
          Direct Messages
          <span className="glyphicon glyphicon-plus-sign plus-icon" />
        </div>
        <ul className="list-unstyled">
          {
           props.data.myRooms.map((room, index) => {
             return (
               <DirectMessage room={room} key={index} changeCurrentRoom={props.changeCurrentRoom}/>)
           })
         }
        </ul>
      </div>
    );
  } return <div className="dm-div" />;
};

export default DirectMessageList;

