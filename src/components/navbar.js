import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Overlay from './overlay';
import PropTypes from 'prop-types';
import GuestRegister from './guest-register';
import HostRegister from './host-register';
import { DateRangePicker } from 'react-dates';
import WalletClear from './walletClear';
import '../css/main.css'
import '../css/search.css'


class NavBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        checkInDate: null,
        checkOutDate: null,
        guests:null,
        place:null,
        locationName:"Tokyo",
        clicklogout:false
      };
      window.searchCondition = this.state;
  }
  locationName(e){
    var DataName = e.currentTarget.getAttribute('data-name');
    this.setState({state: this.state.locationName = DataName});
  }

  onLogOut = (value) =>{
    this.setState({ clicklogout:value });
  }

  render() {
    
  return (

      <div>
    {this.props.hideTagHeader !="NO" &&
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
            <li className="Li1">
              <Link to="/create">
                    <a className="button__fill">Become a Host</a>
              </Link>
            </li>
            <li className="Li2">
              <Link to="/Intro">
                    <a className="button__fill">Become an organiser</a>
              </Link>
            </li>
            <li className="Li4">
              <a href="" className="button__Help">Help</a>
            </li>
            <li className="Li4">
              <WalletClear onLogOut={this.onLogOut} />
            </li>
            <li className="Li5">

              <GuestRegister clicklogout={this.state.clicklogout}  onLogOut={this.onLogOut} />

          
            
    

            </li>
          </ul>
        </div>
      </nav>
      </header>
    }
    {!this.props.hideTagHeader &&
      <div className="tag-header">
        <ul className="tag container">
        <li className="tag__item"><a href="/experience"><img src="./images/Experience.png" alt=""/><span>Experience</span></a></li>
        <li className="tag__item active"><a href="/experience"><span className="location-tag">New York</span></a></li>
        <li className="tag__item active"><span>4th - 8th March</span></li>
        <li className="tag__item active"><span>2 Adults</span></li>
        <li className="tag__item"><img src="./images/pps.png" alt=""/> <span>Support PPS token</span></li>
        <li className="tag__item"><span>Home Type</span></li>
        <li className="tag__item"><span>Price</span></li>
        <li className="tag__item"><span>More Fiters</span></li>
        </ul>
      </div>
    }
      </div>



  )
  }
}

export default NavBar