import React, { Component } from 'react';
import './App.css';
import ActionCable from 'action-cable-react-jwt';
import { getToken, createUser, getRooms, sendMessage } from './services/axios'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Login from './components/Login'
import ChatView from './components/ChatView'
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
        username: '',
        name: '',
        description: '',
        motd: '',
      },
      rooms: [],
      currentRoom: null,
      currentMessages: [],
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleMessageSend = this.handleMessageSend.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.openSockets = this.openSockets.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.enterRoom = this.enterRoom.bind(this)
    this.exitRoom = this.exitRoom.bind(this)
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

  async handleCreateRoom(e) {
    e.preventDefault()
    // post rooms
    // set currentRoom to created room id , return from controller
  }

  async handleMessageSend(e) {
    e.preventDefault()
    await sendMessage(this.state.form.message, this.state.currentRoom)
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        message:''
      }
    }))
  }

  handleLogout() {
    /*
    on button click -
      disconnect sockets this.channel.unsubscribe
      erase local storage
      push to login
    */
  }

  async getRooms() {
    const rooms = await getRooms()
    this.setState({
      rooms
    })
  }

  enterRoom(id, messages) {
    this.setState({
      currentRoom: id,
      currentMessages: messages
    })
  }

  exitRoom() {
    this.setState({
      currentRoom: null
    })
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
            <ChatView {...props}
              openSockets={this.openSockets}
              getRooms={this.getRooms}
              rooms={this.state.rooms}
              enterRoom={this.enterRoom}
              exitRoom={this.exitRoom}
              currentRoom={this.state.currentRoom}
              messages={this.state.currentMessages}
              handleMessageSend={this.handleMessageSend}
              handleChange={this.handleChange}
              message={this.state.form.message}
              name={this.state.form.name}
              description={this.state.form.description}
              motd={this.state.form.motd}
            />
        )} />
      </div>
    );
  }
}

export default withRouter(App);
