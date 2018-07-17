import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Overlay from './overlay';
import PropTypes from 'prop-types';
import GuestRegister from './guest-register';
import HostRegister from './host-register';
import { DateRangePicker } from 'react-dates';
import WalletClear from './walletClear';
import '../css/main.css';
import '../css/search.css';
import tagService from '../services/tag-service';
import languageService from '../services/language-service';

class NavBar extends Component {

  constructor(props) {
    super(props);
      this.state = {
        checkInDate: null,
        checkOutDate: null,
        guests:null,
        place:null,
        locationName:"Tokyo",
        clicklogout:false,
        languagelist:{},
        userlogin:"hide"
      };
      window.searchCondition = this.state;
      languageService.language();
  }

  componentDidMount(){
    this.setState({ languagelist:window.languagelist });
  }


  locationName(e){
    var DataName = e.currentTarget.getAttribute('data-name');
    this.setState({state: this.state.locationName = DataName});
  }

  onLogOut = (value) =>{
    this.setState({ clicklogout:value });
  }

  Onuserlogin = (value) =>{
    this.setState({ userlogin:value });
  }


  render() {
        const language = this.state.languagelist;
    
  return (

      <div className="headerbox">
    {this.props.hideTagHeader !="NO" && !this.props.renderChild &&
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
              <GuestRegister clicklogout={this.state.clicklogout} type='1' onLogOut={this.onLogOut} />
            </li>
            <li className="Li2">
              <Link to="/Intro">
                    {language.Become_an_organiser}
              </Link>
            </li>
            <li className="Li4">
              <Link to="/Intro">
                    {language.Help} 
              </Link>
            </li>
            <li className="Li4">
              <WalletClear clicklogout={this.state.clicklogout} userlogin={this.state.userlogin} Onuserlogin={this.Onuserlogin} onLogOut={this.onLogOut} />
            </li>
            <li className="Li5">
              <GuestRegister clicklogout={this.state.clicklogout} type='0' userlogin={this.state.userlogin} Onuserlogin={this.Onuserlogin} onLogOut={this.onLogOut} />
            </li>
          </ul>
        </div>
      </nav>
      </header>
    }
   

      </div>



  )
  }
}

export default NavBar