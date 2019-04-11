import React from 'react'

export default (props) => (
  <div>
    <div>
      <form>
        
        <label forHtml="email">Email</label>
        <input name="email"
          id="email"
          type="email"
          onChange={(e) => props.handleChange(e)}
          value={props.email}
        />

        <label>Password</label>
        <input name="password"
          id="password"
          type="password"
          onChange={props.handleChange}
          value={props.password}
        />

        <button onClick={(e) => props.handleSubmit(e)}>Login</button>
        <button onClick={() => props.history.push('/register')}>Register</button>
      </form>
    </div>
  </div>
)
