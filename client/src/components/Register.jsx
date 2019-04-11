import React from 'react';

export default (props) => (
  <div className="log-in-container">
    <div className="log-in-inner-container">
      <form onSubmit={(e) => props.handleSubmit(e)}>

        <input
          name="email"
          placeholder="email"
          id="email"
          type="email"
          onChange={(e) => props.handleChange(e)}
          value={props.email}
        />

        <input
          name="username"
          placeholder="handle"
          id="username"
          onChange={(e) => props.handleChange(e)}
          value={props.username}
        />

        <input
          name="picture"
          placeholder="Coming Soon: Prof Pic"
          id="picture"
          type="text"
          onChange={(e) => props.handleChange(e)}
          value={props.picture}
        />


        <input
          name="password"
          placeholder="password"
          id="password"
          type="password"
          onChange={props.handleChange}
          value={props.password}
        />

        <input type="submit" value="Register" />
      </form>
    </div>
  </div>
)
