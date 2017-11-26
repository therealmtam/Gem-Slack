import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
    }
    scrollToBottom ()  {
      const node = ReactDOM.findDOMNode(this.messagesEnd);
      if (Object.keys(this.props.data.roomMsgs).length)  {
        node.scrollIntoView({ behavior: "smooth" });
      }
    }
    
    componentDidMount() {
      this.scrollToBottom();
    }
    
    componentDidUpdate() {
      this.scrollToBottom();
    }
    render() {
      console.log(this.props.data.roomMsgs)
      if (Object.keys(this.props.data.roomMsgs).length) {
        return (
          <ul className="message-list"> 
            { 
              this.props.data.roomMsgs[this.props.data.currentRoom].map((msg, index) => {
                return <Message msg={msg} key={index}/>
              })
            }
            <div style={{ float:"left", clear: "both" }}
               ref={(el) => { this.messagesEnd = el; }}>
          </div>
          </ul>
        )
      } else {
        return <ul className="message-list"></ul>
      }

    }
}
export default MessageList;
