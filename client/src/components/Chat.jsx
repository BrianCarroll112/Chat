import React from 'react'
const moment = require('moment')

export default (props) => (
  <div className="messages-outer-container">
    <div className="messages-container">
      {props.messages.map(message => (
        <p className="message" key={message.id}>[{moment(message.created_at).format("MM/DD/YYYY hh:mm:ss")}] {message.user.username}: {message.text}</p>
      ))}
    </div>
    <div className="messages-input-container">
      <input type="text"
        name="message"
        value={props.message}
        onChange={(e) => props.handleChange(e)}
        placeholder="Type Here..."
        />
      <button onClick={(e) => props.handleSubmit(e)}>Send</button>
      <button onClick={props.exitRoom}>Leave</button>
    </div>
  </div>
)
