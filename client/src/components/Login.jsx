import React, { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    localStorage.getItem('jwt') && this.props.history.push('/chat');
  }

  render() {

    return (
      <div className="log-in-container">
        <div className="log-in-inner-container">
          <form>

            <input
              autoComplete="off"
              name="email"
              placeholder="email"
              id="email"
              type="email"
              onChange={(e) => this.props.handleChange(e)}
              value={this.props.email}
            />

            <input
              name="password"
              placeholder="password"
              id="password"
              type="password"
              onChange={this.props.handleChange}
              value={this.props.password}
            />
          <button id="login-submit" onClick={(e) => this.props.handleSubmit(e)}>Login</button>
            <button onClick={() => this.props.history.push('/register')}>Register</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
