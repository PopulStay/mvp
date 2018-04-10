import React from 'react';
import { Link } from 'react-router-dom';
import Overlay from './overlay';
import PropTypes from 'prop-types';
import GuestRegister from './guest-register';
import HostRegister from './host-register';
import Wallet from './wallet';

import '../css/main.css'
import '../css/search.css'



const NavBar = (props) => {
  return (

  <div>
  <header className="header header__white">
  
  <a href="../">
  <img className="header__logo" src="../images/logo.png" alt=""/>
  </a>
  
  <nav className="nav navbar-nav navbar-right">
  <ul>
     <Link to="/create">
          <a className="btn button__fill">Become a Host</a>
    </Link>
  <li><a href="">Help</a></li>
  <li><Wallet/></li>
  <li><GuestRegister/></li>
  </ul>
  </nav>
  </header>
{!props.hideTagHeader &&
  <div className="tag-header">
    <ul className="tag container">
    <li className="tag__item active"><span className="location-tag">New York</span></li>
    <li className="tag__item active"><span>4th - 8th March</span></li>
    <li className="tag__item active"><span>2 Adults</span></li>
    <li className="tag__item"><img src="./images/search-tag-icon.png" alt=""/> <span>Support PPS token</span></li>
    <li className="tag__item"><span>Home Type</span></li>
    <li className="tag__item"><span>Price</span></li>
    <li className="tag__item"><span>More Fiters</span></li>
    </ul>
  </div>
}
  </div>



  )
}

export default NavBar

