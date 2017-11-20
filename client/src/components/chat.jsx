import React from 'react';
import Messages from './messages.jsx';
import UserList from './userlist.jsx';
import Input from './input.jsx';

class Chat extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                <div className="col-sm-3">
                    <UserList />
                </div>
                <div className="col-sm-9">
                    <Messages />
                    <Input />
                </div>
                <div></div>
                </div>
            </div>
        )
    }
}

export default Chat;