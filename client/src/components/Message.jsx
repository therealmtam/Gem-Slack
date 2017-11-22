import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li> {
        this.props.message.message
        }
      </li>
    )
  }
}

export default Message;