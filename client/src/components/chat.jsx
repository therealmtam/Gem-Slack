import React from 'react';
import Messages from './Messages.jsx';
import UserList from './UserList.jsx';
import Input from './Input.jsx';

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