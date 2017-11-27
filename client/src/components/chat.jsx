
import React from 'react';
import MessageList from './MessageList.jsx';
import DirectMessageList from './DirectMessageList.jsx';
import Input from './Input.jsx';
/**
 * This view renders all the messages and input field to send messages.
 * It also renders the DirectMessageList component.
 */
const Chat = ({
  data, changeCurrentRoom, changeView, sendMessage,
}) => (
  <div className="chat">
    <div className="row">
      <div className="direct-message-list">
        <DirectMessageList
          data={data}
          changeCurrentRoom={changeCurrentRoom}
          changeView={changeView}
        />
      </div>
      <div className="center-column">
        <MessageList data={data} />
        <Input sendMessage={sendMessage} />
        <div className="line-break" />
      </div>
    </div>
  </div>
);


export default Chat;
