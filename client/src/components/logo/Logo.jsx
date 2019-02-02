import React, { Component } from 'react';
import './Logo.css';
import {Link} from 'react-router-dom';
import logoAdd from '../../assets/img/logo/logo-2.png';

const LogoDiv = props => (
  <div className="mask pseudo">
    <Link to="/">
      <img src={logoAdd} alt="logo"/>
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