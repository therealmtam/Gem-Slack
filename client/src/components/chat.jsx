import React from 'react';
import MessageList from './MessageList.jsx';
import DirectMessageList from './DirectMessageList.jsx';
import Input from './Input.jsx';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <DirectMessageList/>
          </div>
          <div className="col-sm-9">
            <MessageList data={this.props.data}/>
            <Input />
          </div>
        </div>
      </div>
    )
    }
}

export default Chat;