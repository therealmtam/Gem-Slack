/*eslint-disable */
import React from 'react';
import MessageList from './MessageList.jsx';
import DirectMessageList from './DirectMessageList.jsx';
import Input from './Input.jsx';
import Button from 'react-bootstrap/lib/Button.js'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar.js'


class Chat extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="chat">
        <div className="row">
          <div className="direct-message-list">
            <DirectMessageList 
            data={this.props.data} 
            changeCurrentRoom={this.props.changeCurrentRoom} 
            changeView={this.props.changeView}
            />
          </div>
          <div className="center-column container-fluid" >
            <MessageList data={this.props.data}/>
            <Input sendMessage={this.props.sendMessage}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Chat;