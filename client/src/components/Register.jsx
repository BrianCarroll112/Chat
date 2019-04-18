import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    localStorage.getItem('jwt') && this.props.history.push('/chat');
  }

  render() {
    return(
      <div className="log-in-container">
        <div className="log-in-inner-container">
          <form onSubmit={(e) => this.props.handleSubmit(e)}>

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
              autoComplete="off"
              name="username"
              placeholder="handle"
              id="username"
              onChange={(e) => this.props.handleChange(e)}
              value={this.props.username}
            />

            <input
              autoComplete="off"
              name="password"
              placeholder="password"
              id="password"
              type="password"
              onChange={this.props.handleChange}
              value={this.props.password}
            />

          <input id="register-submit" type="submit" value="Register" />
          </form>
        </div>
      </div>
    )
  }
}

export default Register
