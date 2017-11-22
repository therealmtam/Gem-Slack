import React from 'react';
import Sockets from './Sockets.jsx';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            message: ''
        }
    }
    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }
    submitMessage(e) {
        if (e.charCode === 13 || e.charCode === undefined) {
            Sockets.sendMessage(this.state.message);
            // this.props.addMessage(this.state.message);
            this.setState({
                message: ''
            })

        }
    }
    render() {
        return(
            <div>
                <input placeholder='add message' value={this.state.message} onChange={this.handleChange.bind(this)} onKeyPress={this.submitMessage.bind(this)}/>
                <button onClick={this.submitMessage.bind(this)}>Add</button>
            </div>
        )

    }
}

export default Input;