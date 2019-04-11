import React, { Component } from 'react'
import Room from './Room'
import Chat from './Chat'
import CreateRoom from './CreateRoom'

class ChatView extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.getRooms()
    this.props.openSockets()
  }

  render() {
    return (
      <div className="chatview-container">

        <div className="rooms-container">
          {this.props.rooms.map(room => {
            const { id, name, messages, user } = room
              return (
                <Room id={ id }
                  name={ name }
                  messages={ messages }
                  owner={ user }
                  enterRoom={this.props.enterRoom}
                />
              )
            })}
          </div>

        <div className="chat-container">
          { this.props.currentRoom ? (
            <Chat
              messages={this.props.messages}
              exitRoom={this.props.exitRoom}
              handleSubmit={this.props.handleMessageSend}
              handleChange={this.props.handleChange}
              message={this.props.message} />
          ) : (
            <CreateRoom
              name={this.props.name}
              description={this.props.description}
              motd={this.props.motd}
              handleChange={this.props.handleChange}
              handleSubmit={this.props.handleCreateRoom}
               />
          )}
        </div>

        <div className="users-container">
        </div>

      </div>
    )
  }
}

export default ChatView
