import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';
import PropTypes from 'prop-types';



class MessageList extends React.Component {
  constructor(props) {
      super(props);
  }
  /**
 * scrollToBottom will automatically scroll to bottom of page.
 * Will scroll to bottom of page on the initial render and after each new message is added.
 */
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    if (Object.keys(this.props.data.roomMsgs).length) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }
  render() {
    if (Object.keys(this.props.data.roomMsgs).length) {
      return (
        <ul className="message-list"> { this.props.data.roomMsgs[this.props.data.currentRoom].map((msg, index) => {
              return <Message msg={msg} key={index} />;
            })
          }
          <div style={{ float: 'left', clear: 'both' }} ref={(el) => { this.messagesEnd = el; }} />
        </ul>
      );
    } return <ul className="message-list" />;
  }
}

MessageList.propTypes = {
  currentRoom: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default MessageList;
