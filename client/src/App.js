import React, { Component } from 'react';
import './App.css';
import ActionCable from 'action-cable-react-jwt';
import {
  getToken,
  createUser,
  getRooms,
  sendMessage,
  createRoom } from './services/axios';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Login from './components/Login';
import ChatView from './components/ChatView';
import Register from './components/Register';
import Foot from './components/Foot';
import Header from './components/Header';
import Denied from './components/Denied';
import moment from 'moment';

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
      userList: [],
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleMessageSend = this.handleMessageSend.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.openSockets = this.openSockets.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.handleCreateRoom = this.handleCreateRoom.bind(this)
    this.enterRoom = this.enterRoom.bind(this)
    this.exitRoom = this.exitRoom.bind(this)
    this.changeCurrentRoom = this.changeCurrentRoom.bind(this)
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
      this.props.history.push('/denied')
    } else {
      await localStorage.setItem('jwt', jwt )
      this.props.history.push('/chat')
    }
  }

  async handleRegister(e) {
    e.preventDefault()
    const { username, password, picture, email } = this.state.form
    const user = await createUser(username, password, picture, email)
    const jwt = await getToken(email, password)
    await localStorage.setItem('jwt', jwt)
    this.props.history.push('/chat')
  }

  async handleCreateRoom(e) {
    e.preventDefault()
    const { name, description, motd } = this.state.form
    const room = await createRoom(name, description, motd)
    this.setState(prevState => ({
      form: {
        ...prevState.form,
        name: '',
        description: '',
        motd: '',
      }
    }))
    this.enterRoom(room.id, [], [{id:0, text:'Welcome! Hope some people join soon...', user:{username:'NotMuchHelp'}, created_at:'00:00:00'}])
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

  handleLogout(e) {
    e.preventDefault()
    this.roomSubscription.unsubscribe()
    this.messageSubscription.unsubscribe()
    localStorage.removeItem('jwt')
    this.props.history.push('/')
    this.setState({
      currentRoom: null
    })
  }

  async getRooms() {
    const rooms = await getRooms()
    await rooms.map(room => room.messages.reverse())
    this.setState({
      rooms
    })
  }

  enterRoom(id, messages, input=null) {
    this.setState({
      currentRoom: id,
    })
    if (input !== null) {
      input.forEach(message => messages.unshift(message))
    } else if ( messages.length === 0 || messages[0].user.username !== '[MOTD]' ) {
            messages.unshift({created_at: moment.now(), id: ((Math.random() * 5000) + 3000), text: `${this.state.rooms[id-1].motd || 'No MOTD'}`, user:{username:'[MOTD]'}}, {created_at: moment.now() , id: ((Math.random() * 5000) + 3000), text: `${this.state.rooms[id-1].description || 'No Description'}` , user:{username:'[DESCRIPTION]'}})
          }
          this.setState({
            currentMessages: messages
          })
        }

  exitRoom() {
    this.setState({
      currentRoom: null
    })
  }

  changeCurrentRoom(num) {
    this.setState({
      currentRoom: num
    })
  }

  openSockets() {
    let jwt = localStorage.getItem('jwt')
    let socket = {};
    socket.cable = ActionCable.createConsumer("ws://localhost:3000/cable", jwt)

    this.roomSubscription = socket.cable.subscriptions.create({channel: "RoomsChannel"}, {
      connected: function() { console.log("rooms: connected") },             // onConnect
      disconnected: function() { console.log("rooms: disconnected") },       // onDisconnect
      received: (data) => {
        const room = data.room
        this.setState(prevState => ({
          rooms: [...prevState.rooms, room ]
        }))
    }})
    this.messageSubscription = socket.cable.subscriptions.create({channel: "MessagesChannel"}, {
      connected: function() { console.log("messages: connected") },             // onConnect
      disconnected: function() { console.log("messages: disconnected") },       // onDisconnect
      received: (data) => {
        const { created_at, id, text, user } = data.message
        this.setState(prevState => ({
          rooms: prevState.rooms.map(room => {
            if (room.id !== data.message.room.id) {
              return room
            } else {
              room.messages.unshift({created_at, id, text, user})
              return room
            }
        })}))
        const removeUser = () => {
          this.setState(prevState => ({
            userList: [
              ...prevState.userList.filter(ele => ele.userId !== user.id && ele.roomId !== data.message.room.id)
            ]
          }))
        }
        const existingUserMessage = this.state.userList.find(ele => Object.values(ele).includes(data.message.room.id) && Object.values(ele).includes(user.id))
        if (existingUserMessage) {
          clearTimeout(existingUserMessage.timeout)
          const timeout = setTimeout(removeUser, 100000)
          existingUserMessage.timeout = timeout

        } else {
          const timeout = setTimeout(removeUser, 100000)
          this.setState(prevState => ({
            userList: [...prevState.userList,
              {username: user.username,
               userId: user.id,
               roomId: data.message.room.id,
               roomName: data.message.room.name,
               timeout
               }
            ]
          }))
        }

      }
    })
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="App">
        <Route path="/" render={(props) => (
          <Header {...props} handleLogout={this.handleLogout}/>
          )} />
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
              handleCreateRoom={this.handleCreateRoom}
              userList={this.state.userList}
              changeCurrentRoom={this.changeCurrentRoom}
            />
        )} />
      <Route exact path="/denied" render={(props) => (
          <Denied {...props} />
      )} />
      <Foot />
      </div>
    );
  }
}

export default withRouter(App);
