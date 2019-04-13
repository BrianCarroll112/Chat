import React from 'react'

export default (props) => (
  <div className="create-room-container">
    <div>
      <h2> Create a Hangout </h2>
      <h3>or choose an existing room from the list</h3>
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
