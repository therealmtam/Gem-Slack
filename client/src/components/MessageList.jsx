import React from 'react';
import Message from './Message.jsx';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            message: []
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
                  this.props.messages.map(message => {
                      return (
                        <Message message={message}/>
                      )
                  })
                }
            </ul>
        )
    }
}
export default Messages;