import React from 'react';
import logo from '../images/runner.jpg'
export default (props) => (
  <header>
    <img src={logo} />
    <p id="title">Cyberdelia</p>
    {props.history.location.pathname == '/chat' && (<p id="logout-button">&#x26D4;</p>)}
  </header>
)
