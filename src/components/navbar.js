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
        clicklogout:false,
        Adult:1,
        children:0,
        Baby:0,
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

  Strainer(e){
    console.log(1)
    var Strainer = e.currentTarget.getAttribute('data-Strainer');
    if(Strainer == "Strainer_City"){
      if(this.state.Strainer_City){
          this.setState({
            Strainer_City:false
          })
      }else{
          this.setState({
            Strainer_City:true,
            Strainer_Time:false,
            Strainer_Guests:false,
            Strainer_token:false,
            Strainer_Home_Type:false,
            Strainer_Price:false,
            Strainer_More:false
          })
      }
    }
    if(Strainer == "Strainer_Time"){
      if(this.state.Strainer_Time){
          this.setState({
            Strainer_Time:false
          })
      }else{
          this.setState({
            Strainer_City:false,
            Strainer_Time:true,
            Strainer_Guests:false,
            Strainer_token:false,
            Strainer_Home_Type:false,
            Strainer_Price:false,
            Strainer_More:false
          })
      }
    }
    if(Strainer == "Strainer_Guests"){
      if(this.state.Strainer_Guests){
          this.setState({
            Strainer_Guests:false
          })
      }else{
          this.setState({
            Strainer_City:false,
            Strainer_Time:false,
            Strainer_Guests:true,
            Strainer_token:false,
            Strainer_Home_Type:false,
            Strainer_Price:false,
            Strainer_More:false
          })
      }
    }
    if(Strainer == "Strainer_token"){
      if(this.state.Strainer_token){
          this.setState({
            Strainer_token:false
          })
      }else{
          this.setState({
            Strainer_City:false,
            Strainer_Time:false,
            Strainer_Guests:false,
            Strainer_token:true,
            Strainer_Home_Type:false,
            Strainer_Price:false,
            Strainer_More:false
          })
      }
    }
    if(Strainer == "Strainer_Home_Type"){
      if(this.state.Strainer_Home_Type){
          this.setState({
            Strainer_Home_Type:false
          })
      }else{
          this.setState({
            Strainer_City:false,
            Strainer_Time:false,
            Strainer_Guests:false,
            Strainer_token:false,
            Strainer_Home_Type:true,
            Strainer_Price:false,
            Strainer_More:false
          })
      }
    }
    if(Strainer == "Strainer_Price"){
      if(this.state.Strainer_Price){
          this.setState({
            Strainer_Price:false
          })
      }else{
          this.setState({
            Strainer_City:false,
            Strainer_Time:false,
            Strainer_Guests:false,
            Strainer_token:false,
            Strainer_Home_Type:false,
            Strainer_Price:true,
            Strainer_More:false
          })
      }
    }
    if(Strainer == "Strainer_More"){
      if(this.state.Strainer_More){
          this.setState({
            Strainer_More:false
          })
      }else{
          this.setState({
            Strainer_City:false,
            Strainer_Time:false,
            Strainer_Guests:false,
            Strainer_token:false,
            Strainer_Home_Type:false,
            Strainer_Price:false,
            Strainer_More:true
          })
      }
    }
  }


  render() {
    
  return (

      <div className="headerbox">
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
              <WalletClear clicklogout={this.state.clicklogout} onLogOut={this.onLogOut} />
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
      <div className="tag-header Strainerbox">
        <ul className="tag container">
        <li className="tag__item"><a href="/experience"><img src="./images/Experience.png" alt=""/><span>Experience</span></a></li>
        <li className="tag__item"><span className="location-tag Strainerspan" data-Strainer="Strainer_City" onClick={(e)=>this.Strainer(e)}>New York</span>
            <div className={this.state.Strainer_City ? "Strainer_City show" : "Strainer_City hide"}>
                <h1>City Strainer</h1>
            </div>
        </li>
        <li className="tag__item"><span className="Strainerspan" data-Strainer="Strainer_Time" onClick={(e)=>this.Strainer(e)}>4th - 8th March</span>
            <div className={this.state.Strainer_Time ? "Strainer_Time show" : "Strainer_Time hide"}>
                <DateRangePicker
                    startDate={this.state.checkInDate}
                    startDateId="start_date"
                    endDate={this.state.checkOutDate}
                />
            </div>
        </li>
        <li className={this.state.Adult + this.state.children + this.state.Baby == 1 ? "tag__item" : "tag__item active"}><span className="Strainerspan" data-Strainer="Strainer_Guests" onClick={(e)=>this.Strainer(e)}>{this.state.Adult + this.state.children + this.state.Baby} Adults</span>
            <div className={this.state.Strainer_Guests ? "Strainer_Guests show" : "Strainer_Guests hide"}>
                <ul>
                    <li><p className="col-lg-6 text-left">Adult</p><p className="col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({Adult:this.state.Adult > 1 ? this.state.Adult-1 : this.state.Adult})}>◀</span><span className="text">{this.state.Adult}</span><span className="Right" onClick={(e)=>this.setState({Adult:this.state.Adult >= 16 ? 16 : this.state.Adult+1})}>▶</span></p></li>
                    <li><p className="col-lg-6 text-left text1">children<small>2-12岁</small></p><p className="col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({children:this.state.children > 0 ? this.state.children-1 : this.state.children})}>◀</span><span className="text">{this.state.children}</span><span className="Right" onClick={(e)=>this.setState({children:this.state.children >= 5 ? 5 : this.state.children+1})}>▶</span></p></li>
                    <li><p className="col-lg-6 text-left text1">Baby<small>2岁以下</small></p><p className="col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({Baby:this.state.Baby > 0 ? this.state.Baby-1 : this.state.Baby})}>◀</span><span className="text">{this.state.Baby}</span><span className="Right" onClick={(e)=>this.setState({Baby:this.state.Baby >= 5 ? 5 : this.state.Baby+1})}>▶</span></p></li>
                </ul>
                <div className="operation">
                    <p className="cancel Left" onClick={(e)=>this.setState({Strainer_Guests:false})}>cancel</p>
                    <p className="confirm Left" onClick={(e)=>this.confirm(e)}>confirm</p>
                    <p className="Reset Right" onClick={(e)=>this.setState({Adult:1,children:0,Baby:0})}>Reset</p>
                </div>
            </div>
        </li>
        <li className="tag__item"><img src="./images/pps.png" alt=""/> <span data-Strainer="Strainer_token" onClick={(e)=>this.Strainer(e)}>Support PPS token</span>
            <div className={this.state.Strainer_token ? "Strainer_token show" : "Strainer_token hide"}>
                <p className="text1"><span>PPS</span>60-<span>PPS</span>5000</p>
                <p className="text1">The average price per night is PPS385.</p>
                <div className="tokenbj">
                    <p style={{height: 6+"px"}}></p>
                    <p style={{height: 9+"px"}}></p>
                    <p style={{height: 8+"px"}}></p>
                    <p style={{height: 13+"px"}}></p>
                    <p style={{height: 32+"px"}}></p>
                    <p style={{height: 38+"px"}}></p>
                    <p style={{height: 25+"px"}}></p>
                    <p style={{height: 34+"px"}}></p>
                    <p style={{height: 48+"px"}}></p>
                    <p style={{height: 51+"px"}}></p>
                    <p style={{height: 60+"px"}}></p>
                    <p style={{height: 64+"px"}}></p>
                    <p style={{height: 59+"px"}}></p>
                    <p style={{height: 45+"px"}}></p>
                    <p style={{height: 36+"px"}}></p>
                    <p style={{height: 38+"px"}}></p>
                    <p style={{height: 27+"px"}}></p>
                    <p style={{height: 25+"px"}}></p>
                    <p style={{height: 16+"px"}}></p>
                    <p style={{height: 16+"px"}}></p>
                    <p style={{height: 10+"px"}}></p>
                    <p style={{height: 5+"px"}}></p>
                    <p style={{height: 6+"px"}}></p>
                    <p style={{height: 3+"px"}}></p>
                    <p style={{height: 1+"px"}}></p>
                    <p style={{height: 3+"px"}}></p>
                    <p style={{height: 2+"px"}}></p>
                    <p style={{height: 3+"px"}}></p>
                    <p style={{height: 2+"px"}}></p>
                    <p style={{height: 1+"px"}}></p>
                    <p style={{height: 2+"px"}}></p>
                    <p style={{height: 3+"px"}}></p>
                    <p style={{height: 2+"px"}}></p>
                    <p style={{height: 1+"px"}}></p>
                    <p style={{height: 2+"px"}}></p>
                    <p style={{height: 3+"px"}}></p>
                    <p style={{height: 2+"px"}}></p>
                    <p style={{height: 1+"px"}}></p>
                </div>
                <div className="range">
                    <p className="Left"></p>
                    <p className="content"></p>
                    <p className="Right"></p>
                </div>
                <div className="operation">
                    <p className="cancel Left" onClick={(e)=>this.setState({Strainer_Guests:false})}>cancel</p>
                    <p className="confirm Left" onClick={(e)=>this.confirm(e)}>confirm</p>
                    <p className="Reset Right" onClick={(e)=>this.setState({Adult:1,children:0,Baby:0})}>Reset</p>
                </div>
            </div>
        </li>
        <li className="tag__item"><span className="Strainerspan" data-Strainer="Strainer_Home_Type" onClick={(e)=>this.Strainer(e)}>Home Type</span>
            <div className={this.state.Strainer_Home_Type ? "Strainer_Home_Type show" : "Strainer_Home_Type hide"}>
                <h1>Home Type Strainer</h1>
            </div>
        </li>
        <li className="tag__item"><span className="Strainerspan" data-Strainer="Strainer_Price" onClick={(e)=>this.Strainer(e)}>Price</span>
            <div className={this.state.Strainer_Price ? "Strainer_Price show" : "Strainer_Price hide"}>
                <h1>Price Strainer</h1>
            </div>
        </li>
        <li className="tag__item"><span className="Strainerspan" data-Strainer="Strainer_More" onClick={(e)=>this.Strainer(e)}>More Fiters</span>
            <div className={this.state.Strainer_More ? "Strainer_More  show" : "Strainer_More hide"}>
                <h1>More Strainer</h1>
            </div>
        </li>
        </ul>
        
      </div>
    }

      </div>



  )
  }
}

export default NavBar