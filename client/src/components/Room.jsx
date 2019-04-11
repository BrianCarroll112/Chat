import React from 'react'

export default (props) => (
  <div onClick={() => props.enterRoom(props.id, props.messages)}>
    <h1>{props.name} - {props.owner && props.owner.username}</h1>
  </div>
)
