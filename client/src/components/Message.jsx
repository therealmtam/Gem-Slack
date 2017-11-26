import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  getTime() {
    let date = this.props.msg.createdAt
    let colonIndex = date.indexOf(':');
    let timeArray = date.slice(colonIndex - 2, colonIndex + 3).split(':')
    let amOrPm= 'AM'
    let hour = Number(timeArray[0]);
    if (hour > 12) {
      hour = hour - 12;
      amOrPm = 'PM';
      timeArray[0] = hour.toString();
    }
    let time = timeArray.join(':') + ' ' + amOrPm;
    return time;
  }

  render() {
    return (
        <li className="message">
          <img className="avatar" src={this.props.msg.userImgUrl}/>
          <div className="message-container">
            <div>
              <span className="username">{this.props.msg.username}</span> 
              <span className="time">{this.getTime()}</span>
            </div>
            <div>{this.props.msg.message}</div>
          </div>
        </li>
    )
  }
}

export default Message;