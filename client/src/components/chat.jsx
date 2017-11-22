import React from 'react';
import MessageList from './MessageList.jsx';
import DirectMessageList from './DirectMessageList.jsx';
import Input from './Input.jsx';

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('im in the chat', this.props.messages);
        return (
            <div className="container-fluid">
                <div className="row">
                <div className="col-sm-3">
                    <DirectMessageList currentUsers={this.props.currentUsers}/>
                </div>
                <div className="col-sm-9">
                    <MessageList messages={this.props.messages}/>
                    <Input addMessage={this.props.addMessage}/>
                </div>
                <div></div>
                </div>
            </div>
        )
    }
}

export default Chat;