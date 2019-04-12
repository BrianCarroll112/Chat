import React from 'react';

export default (props) => (
  <div className="log-in-container">
    <div className="log-in-inner-container">
      <form onSubmit={(e) => props.handleSubmit(e)}>

        <input
          autocomplete="off"
          name="email"
          placeholder="email"
          id="email"
          type="email"
          onChange={(e) => props.handleChange(e)}
          value={props.email}
        />

        <input
          autocomplete="off"
          name="username"
          placeholder="handle"
          id="username"
          onChange={(e) => props.handleChange(e)}
          value={props.username}
        />

        <input
          autocomplete="off"
          name="picture"
          placeholder="Coming Soon: Prof Pic"
          id="picture"
          type="text"
          onChange={(e) => props.handleChange(e)}
          value={props.picture}
        />


        <input
          autocomplete="off"
          name="password"
          placeholder="password"
          id="password"
          type="password"
          onChange={props.handleChange}
          value={props.password}
        />

      <input id="register-submit" type="submit" value="Register" />
      </form>
    </div>
  </div>
)
