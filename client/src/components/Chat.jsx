import React from 'react'

export default (props) => (
  <div>
    <div>
      {props.messages.map(message => (
        <p key={message.id}>{message.user.username}{message.text}</p>
      ))}
    </div>
    <div>
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
