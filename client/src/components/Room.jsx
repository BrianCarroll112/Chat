import React from 'react'

export default (props) => (
  <div>
    <h1>{props.name} - {props.owner && props.owner.username}</h1>
  </div>
)
