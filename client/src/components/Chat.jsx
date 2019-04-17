import React from 'react'
const moment = require('../../node_modules/moment')

export default (props) => {
  const room = props.rooms.find(room => room.id == props.currentRoom)
  console.log(room)
  return (
    <div className="messages-outer-container">
        <span className="room-info">Room: <span>{room.name}</span></span>
        <span className="room-info2">Owner: <span>{room.user.username}</span></span>
      <div className="messages-container">
        {props.messages.map(message => (
          <p className="message" key={message.id}><span className="message-time-sent">[{moment(message.created_at).format("MM/DD/YYYY hh:mm:ss")}]</span> <span className="message-username">{message.user.username}: </span> {message.text}</p>
        ))}
      </div>
      <form className="messages-input-container">
        <input
          type="text"
          autoComplete="off"
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
}
