import React from 'react';
import Message from './Message.jsx';

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        console.log('im in the message list', props.messages);
        this.state ={
            message: [],
        }
    }
    componentDidMount() {
        this.setState({
            message: this.props.messages
        })
    }
    render() {
        return (
            <ul>
                {
                  this.props.messages.map((message, index) => {
                      return (
                      <Message message= {message} key= {index}/>
                      )
                  })
                }
            </ul>
        )
    }
}
export default MessageList;
