import React from 'react'
const moment = require('../../node_modules/moment')

export default (props) => (
  <div className="messages-outer-container">
    <div className="room-title">
      <p></p>
    </div>
    <div className="messages-container">
      {props.messages.map(message => (
        <p className="message" key={message.id}>[{moment(message.created_at).format("MM/DD/YYYY hh:mm:ss")}] {message.user.username}: {message.text}</p>
      ))}
    </div>
    <form className="messages-input-container">
      <input type="text"
        name="message"
        value={props.message}
        onChange={(e) => props.handleChange(e)}
        placeholder="Type Here..."
        />
      <input id="submit-button" type="submit" value="send" onClick={(e) => props.handleSubmit(e)} />
      <button onClick={props.exitRoom}>leave</button>
    </form>
  </div>
)
