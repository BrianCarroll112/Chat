import React, { Component } from 'react'
import Room from './Room'

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
              <Room id={ id } name={ name } messages={ messages } owner={ user } />
            )
          }) }
        </div>)}
        <div className="chat-container">
        </div>
        <div className="users-container">
        </div>
      </div>
    )
  }
}

export default ChatView
