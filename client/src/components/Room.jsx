import React from 'react'

export default (props) => (
  <div className="room" onClick={() => props.enterRoom(props.id, props.messages)}>
    <p>Room: {props.name}</p>
    <p>Owner: {props.owner.username}</p>
  </div>
)
