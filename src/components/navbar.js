import React from 'react';
import { Link } from 'react-router-dom';
import Overlay from './overlay';
import PropTypes from 'prop-types';
import GuestRegister from './guest-register';
import HostRegister from './host-register';
import '../css/main.css'
import '../css/search.css'



const NavBar = (props) => {
  return (

  <div>
  <header className="header header__white">
  
  <nav className="nav navbar-nav navbar-right">
    <div className="navbar-header">
      <butoon  className="glyphicon glyphicon-align-justify navBtn" data-toggle="collapse" data-target="#example-navbar-collapse"></butoon>
      <a className="navbar-brand" href="../">
      <img className="header__logo" src="../images/logo.png" alt=""/>
      </a>
    </div>
    <div className="collapse navbar-collapse" id="example-navbar-collapse">  
      <a className="navbar-brand" href="../">
        <img className="header__logo" src="../images/logo.png" alt=""/>
      </a>
      <ul>
        <li>
          <Link to="/create">
                <a className="btn button__fill">Become a Host</a>
          </Link>
        </li>
        <li>
          <a href="" className="btn button__Help">Help</a>
        </li>
       
        <li>
          <GuestRegister/>
        </li>
      </ul>
    </div>
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

