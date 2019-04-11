import React from 'react';

export default (props) => (
  <div>
    <div>
      <form onSubmit={(e) => props.handleSubmit(e)}>

        <label forHtml="email">Email</label>
        <input name="email"
          id="email"
          type="email"
          onChange={(e) => props.handleChange(e)}
          value={props.email}
        />

        <label forHtml="username">Username</label>
        <input name="username"
          id="username"
          onChange={(e) => props.handleChange(e)}
          value={props.username}
        />

        <label forHtml="placeholder">Placeholder</label>
        <input name="picture"
          id="picture"
          type="text"
          onChange={(e) => props.handleChange(e)}
          value={props.picture}
        />


        <label>Password</label>
        <input name="password"
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
