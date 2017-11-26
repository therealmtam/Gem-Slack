import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      return (
        <ul className="message-list"> 
          { 
            this.props.data.roomMsgs[this.props.data.currentRoom].map((msg, index) => {
              return <Message msg={msg} key={index}/>
            })
          }
        </ul>
      )
    }
}
export default MessageList;
