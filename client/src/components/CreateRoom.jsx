import React from 'react'

export default (props) => (
  <div className="create-room-container">
    <div>
      <h2> Create a Hangout </h2>
      <h3> OR </h3>
      <h4>choose an existing room from the room list</h4>
      <h4>join a friend from the user list </h4>
    </div>
    <form onSubmit={(e) => props.handleSubmit(e)}>
      <input
        autocomplete="off"
        name="name"
        placeholder="room name"
        id="name"
        type="text"
        onChange={(e) => props.handleChange(e)}
        value={props.name}
      />

      <textarea
        autocomplete="off"
        name="description"
        placeholder="description"
        id="description"
        onChange={(e) => props.handleChange(e)}
        value={props.description}
      />

      <input
        autocomplete="off"
        name="motd"
        placeholder="message of the day"
        id="motd"
        type="text"
        onChange={(e) => props.handleChange(e)}
        value={props.motd}
      />

    <input id="submit-room" type="submit" value="Create" />
    </form>
  </div>
)
