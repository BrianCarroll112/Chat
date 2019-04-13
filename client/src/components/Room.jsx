import React from 'react'

export default (props) => (
  <div className="room" onClick={() => props.enterRoom(props.id, props.messages)}>
    <p>Room: <span className="message-username">{props.name}</span></p>
    <p>Owner: <span className="message-username">{props.owner.username}</span></p>
  </div>
)
