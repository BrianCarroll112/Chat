import React, { Component } from 'react'
import Room from './Room'
import Chat from './Chat'

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
      <div>
        {this.props.rooms &&(<div className="rooms-container">
          { this.props.rooms.map(room => {
            const { id, name, messages, user } = room
            return (
              <Room id={ id } name={ name } messages={ messages } owner={ user } enterRoom={this.props.enterRoom} />
            )
          }) }
        </div>)}
        <div className="chat-container">
        { this.props.currentRoom ? (
          <Chat messages={this.props.messages} />
        ) : (
          <h1>NO CURRENT ROOM</h1>
        )}
        </div>
        <div className="users-container">
        </div>
      </div>
    )
  }
}

export default ChatView
