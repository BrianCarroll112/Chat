import React from 'react'

export default (props) => (
  <div>
    <div className="messages-container">
      {props.messages.map(message => (
        <p key={message.id}>{message.user.username}{message.text}</p>
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
