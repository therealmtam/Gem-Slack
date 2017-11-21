import React from 'react';

class DirectMessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUsers: this.props.currentUsers
    }
  }

  render() {
    return (
        <div>
            <div>Direct Messages</div>
        </div>
    )
  }
}

export default DirectMessageList;