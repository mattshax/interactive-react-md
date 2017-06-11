import React, {
  Component,
}
from 'react';
import {
  Link as RouterLink,
}
from 'react-router-dom';
import Button from 'react-md/lib/Buttons/Button';


import './home.css';
import logo from './logo.svg';

export default class Home extends Component {

  state = {

  };

  render() {
    return (
      <section className="home">
    <header className="banner">
      <h1 className="md-display-2">Welcome to Interactive</h1>
      <img src={logo} className="home-logo" alt="logo" style={{"marginTop":"20px"}}/>
      <Button component={RouterLink} to="/page-1" raised secondary label="Jump to Page 1" style={{"marginTop":"20px"}} />
      <h3 className="md-text-container about" style={{"marginTop":"30px"}}>This is a demo bootstrap project of react with a postgres pub/sub and node.js express server.</h3>
    </header>
  </section>
     
    );
  }
}

/*
      <div className="home">
        <div className="home-header">
          <img src={logo} className="home-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="home-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
*/

// <Button component={Link} to={`/${FIRST_ROUTE}`} raised secondary label="View Demo" type={null} />
