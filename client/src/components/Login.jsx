import React from 'react'

export default (props) => (
  <div className="log-in-container">
    <div className="log-in-inner-container">
      <form>

        <input
          autoComplete="off"
          name="email"
          placeholder="email"
          id="email"
          type="email"
          onChange={(e) => props.handleChange(e)}
          value={props.email}
        />

        <input
          name="password"
          placeholder="password"
          id="password"
          type="password"
          onChange={props.handleChange}
          value={props.password}
        />
        <button id="login-submit" onClick={(e) => props.handleSubmit(e)}>Login</button>
        <button onClick={() => props.history.push('/register')}>Register</button>
      </form>
    </div>
  </div>
)
