import React from 'react'

export default (props) => (
  <div>
    <h2> Create a Room! </h2>
    <h3>or choose an existing room from the list</h3>
    <div>
      <form onSubmit={(e) => props.handleSubmit(e)}>
        <label forHtml="name">Room Name</label>
        <input
          name="name"
          id="name"
          type="text"
          onChange={(e) => props.handleChange(e)}
          value={props.name}
        />

        <label forHtml="description">Description</label>
        <textarea
          name="description"
          id="description"
          onChange={(e) => props.handleChange(e)}
          value={props.description}
        />

        <label forHtml="motd">Message of The Day</label>
        <input
          name="motd"
          id="motd"
          type="text"
          onChange={(e) => props.handleChange(e)}
          value={props.motd}
        />

        <input type="submit" value="Create" />
      </form>
    </div>
  </div>
)
