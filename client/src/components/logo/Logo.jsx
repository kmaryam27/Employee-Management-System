import React, { Component } from 'react';
import './Logo.css';
import {Link} from 'react-router-dom';
// import logo from 'https://s3.us-east-2.amazonaws.com/final-project-gt/photos/logo-2.png';


const LogoDiv = props => (
  <div className="mask pseudo">
    <Link to="/">
      <img src='https://s3.us-east-2.amazonaws.com/final-project-gt/photos/logo-2.png' alt="logo"/>
    </Link>
  </div>
)

class Logo extends Component {
    render() {
      return (
        <div id="logo-Loc">
            <LogoDiv/>       
        </div>
      );
    }
  }

export default Logo;