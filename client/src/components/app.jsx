import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignIn from './signin.jsx';
import Chat from './chat.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'signin'
    }
  }
  
  changeView(view) {
    this.setState({
      view: view
    });
  }

  renderView(view) {
    if (view === 'signin') {
      return (
        <SignIn />
      )

    } else if (view === 'chat') {
      return (
        <Chat />
      )
    }
  }

  //App component will have calls to the server.

  render() {
    return (
      <div>
      { this.renderView(this.state.view) }
      </div>
    );
  }
}

App.propTypes = {

};

export default App;