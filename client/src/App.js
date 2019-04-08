import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      msg: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    // send message to websocket for chat channels based on current channel
    // get current channel id to state?
  }

  handleChange(e) {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="App">
        <div className="chat-box">
          <p>Messages:</p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input  onChange={this.handleChange} value={this.state.msg} name="msg" />
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default App;
