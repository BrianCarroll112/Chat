import React, { Component } from 'react';

class Denied extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    setTimeout(() => this.props.history.push('/'), 4000)
  }

  render() {
    return (
    <div id="denied-div">
      <p id="access-denied">ACCESS DENIED</p>
    </div>
    )
  }
}

export default Denied
