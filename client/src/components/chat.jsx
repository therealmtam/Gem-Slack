import React from 'react';
import Messages from './Messages.jsx';
import UserList from './UserList.jsx';
import Input from './Input.jsx';

class Chat extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <UserList className="col-md-3 position-fixed" />
                <div className="col-md-9"> 
                    <Messages />
                    <Input className="position-fixed" />
                </div>
            </div>
        )
    }
}

export default Chat;