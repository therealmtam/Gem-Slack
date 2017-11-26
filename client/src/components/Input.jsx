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
        this.props.sendMessage(this.state.message);
        this.setState({
          message: ''
        })
      }
    }
    render() {
      return(
        <div className="input-bar">
          <input className="input-message container-fluid"  placeholder="Message" value={this.state.message} onChange={this.handleChange.bind(this)} onKeyPress={this.submitMessage.bind(this)}/>
        </div>  
        ) 

    }
}

export default Input;