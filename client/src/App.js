import React, { Component } from 'react';
import './App.css';
import ActionCable from 'action-cable-react-jwt';
import { getToken, createUser } from './services/axios'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Login from './components/Login'
import Chat from './components/Chat'
import Register from './components/Register'

class App extends Component {
  constructor() {
    super()

    this.state = {
      form: {
        message: '',
        email: '',
        password: '',
        picture: '',
        username: ''
      },
      rooms: [],
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.openSockets = this.openSockets.bind(this)
  }


  handleChange(e) {
    const { name, value } = e.target

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    })
    )
  }

  async handleLogin(e) {
    e.preventDefault()
    const jwt = await getToken(this.state.form.email, this.state.form.password)
    if (jwt === 404) {
      alert('Invalid Credentials');
    } else {
      localStorage.setItem('jwt', jwt )
      this.props.history.push('/chat')
    }
  }

  async handleRegister(e) {
    e.preventDefault()
    const { username, password, picture, email } = this.state.form
    const user = await createUser(username, password, picture, email)
    const jwt = await getToken(email, password)
    localStorage.setItem('jwt', jwt)
    this.props.history.push('/chat')
  }

  openSockets() {
    let jwt = localStorage.getItem('jwt')
    let socket = {};
    socket.cable = ActionCable.createConsumer("ws://localhost:3000/cable", jwt)

    this.roomSubscription = socket.cable.subscriptions.create({channel: "RoomsChannel"}, {
      connected: function() { console.log("rooms: connected") },             // onConnect
      disconnected: function() { console.log("rooms: disconnected") },       // onDisconnect
      received: (data) => { console.log("room transmit received: ", data); } // OnReceive
    })
    this.messageSubscription = socket.cable.subscriptions.create({channel: "MessagesChannel"}, {
      connected: function() { console.log("messages: connected") },             // onConnect
      disconnected: function() { console.log("messages: disconnected") },       // onDisconnect
      received: (data) => { console.log("message transmit received: ", data); } // OnReceive
    })
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <Route exact path="/" render={(props) => (
            <Login {...props}
              handleChange={this.handleChange}
              handleSubmit={this.handleLogin}
              email={this.state.form.email}
              password={this.state.form.password} />
          )} />
        <Route exact path="/register" render={(props) => (
            <Register {...props}
              handleChange={this.handleChange}
              handleSubmit={this.handleRegister}
              email={this.state.form.email}
              password={this.state.form.password}
              picture={this.state.form.picture}
              username={this.state.form.username}
               />
          )} />
        <Route exact path="/chat" render={(props) => (
            <Chat {...props}
              openSockets={this.openSockets}
            />
        )}/>
      </div>
    );
  }
}

export default withRouter(App);
