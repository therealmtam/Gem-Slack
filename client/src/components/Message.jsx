
import React from 'react';
/**
 * This component renders each message along with the username and time.
 * getTime() formats the time from the server. Ex: 12:10 PM
 */
const Message = (props) => {
  const getTime = () => {
    const date = props.msg.createdAt;
    const colonIndex = date.indexOf(':');
    const timeArray = date.slice(colonIndex - 2, colonIndex + 3).split(':');
    let amOrPm = 'AM';
    let hour = Number(timeArray[0]);
    if (hour > 12) {
      hour -= 12;
      amOrPm = 'PM';
      timeArray[0] = hour.toString();
    }
    return `${timeArray.join(':')} ${amOrPm}`;
  };
  return (
    <li className="message">
      <div className="message-container">
        <img alt="" className="avatar" src={props.msg.userImgUrl}/>
        <div>
          <span className="username">{props.msg.username}</span> 
          <span className="time">{getTime()}</span>
        </div>
        <div className="message-body">{props.msg.message}</div>
      </div>
    </li>
  );
};

export default Message;
