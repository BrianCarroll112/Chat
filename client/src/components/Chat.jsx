import React, { Component } from 'react'

class Chat extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.openSockets()
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Chat
