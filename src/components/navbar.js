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
import InputRange from 'react-input-range';
import InputRangecss from 'react-input-range/lib/css/index.css';

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
        Citys:["TOKYO","NEW YORK","SHANGHAI","LONDON","PARIS","SINGAPORE"],
        language:['English','Français','Deutsch','日本語','Italiano','Русский','Español','中文','العربية','Hindi','Português','Türkçe','Bahasa Indonesia','Nederlands','한국어','Bengali','ภาษาไทย','Punjabi','Ελληνικά','Sign Language','עברית','Polski','Bahasa Malaysia','Tagalog','Dansk','Svenska','Norsk','Suomi','Čeština','Magyar','українська'],
        Facilities:['Kitchen','Shampoo','Heating','Air conditioner','Washing machine','Dryer','Wireless network','breakfast','Indoor fireplace','Doorbell / building interphone','Guard','Coat hanger','Iron','Hair drier','Desk / work area','Television','Baby bed','High foot chair for children','Check in','smoke detector','Carbon Monoxide Alarm'],
        Facilities1:['Free parking space','Gym','Massage bathtub','Swimming Pool'],
        Source_type:['A complete set of single house','Apartment type residence','Breakfast and Breakfast','The Inn Boutique','Loft','Village hut','Villa','Guest Room','Guest suite','Log cabin','Bungalow','Holiday wooden house','Resort','Hostel','Villas','Hotel'],
        Characteristic:['Agritainment','Primary residence acupoint','Cuban family hotel','Castle','Tent','Miniature house','Tree House','Train','Natural Hostel','Ship','A ship’s house','Thatched cottage','Camping area','Camping car / RV'],
        Rules:['Suitable for hosting activities','Allowed to carry a pet','Allow smoking'],
        Code_house:['Suitable for hosting activities','Allowed to carry a pet','Allow smoking'],
        Citys_type:'City',
        Home_Type:'Home Type',
        PriceAdd:0,
        PriceDele:0,
        Pricemin:10000,
        Pricemax:1000000,
        Price:'Price',
      };
      window.searchCondition = this.state;
  }

  componentDidMount(){
      var CityStorage =  sessionStorage.getItem('City');
      if(CityStorage){
        this.setState({Citys_type: CityStorage});
      }else{
        this.setState({Citys_type: 'City'});
      }

      var AdultStorage =  JSON.parse(sessionStorage.getItem('guests'));
      if(AdultStorage){
        this.setState({Adult: AdultStorage.Adult,children: AdultStorage.children,Baby: AdultStorage.Baby});
      }else{
        this.setState({Adult:1,children:0,Baby:0});
      }

      var Home_TypeStorage =  sessionStorage.getItem('Home_Type');
      if(Home_TypeStorage){
        this.setState({Home_Type: Home_TypeStorage});
      }else{
        this.setState({Home_Type: 'Home Type'});
      }

      var Pricemin = sessionStorage.getItem('Pricemin');
      var Pricemax = sessionStorage.getItem('Pricemax');
      if(Pricemin&&Pricemax){
        this.setState({
          Pricemin : Pricemin,
          Pricemax : Pricemax,
          Price : "PPS"+Pricemin+"-"+"PPS"+Pricemax
        });
      }else{
        this.setState({
          state:this.state.Pricemin = 10000,
          state:this.state.Pricemax = 1000000,
          Price:"Price"
        });
      }


      console.log("56135464">=56135465)

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

  TagSelect(e){
      var City = this.state.Citys_type;
      if(City == 'City'){
        sessionStorage.setItem('City','');
        this.setState({Citys_type:'City'});
      }else{
        sessionStorage.setItem('City',City);
      }

      var guests = Number(this.state.Adult) + Number(this.state.children) + Number(this.state.Baby);
      if(guests == 1){
        sessionStorage.setItem('guests',JSON.stringify({'Adult':this.state.Adult,'children':this.state.children,'Baby':this.state.Baby}));
        this.setState({Adult:1,children:0,Baby:0});
      }else{
        sessionStorage.setItem('guests',JSON.stringify({'Adult':this.state.Adult,'children':this.state.children,'Baby':this.state.Baby}));
      }

      var Home_Type = this.state.Home_Type;
      if(Home_Type == 'Home Type'){
        sessionStorage.setItem('Home_Type','');
        this.setState({Home_Type:'Home Type'});
      }else{
        sessionStorage.setItem('Home_Type',Home_Type);
      }

      var Pricemin = this.state.Pricemin;
      var Pricemax = this.state.Pricemax;
      if(Pricemin == 10000 || Pricemax == 1000000){
        sessionStorage.setItem('Pricemin',10000);
        sessionStorage.setItem('Pricemax',1000000);
      }else{
        sessionStorage.setItem('Pricemin',Pricemin);
        sessionStorage.setItem('Pricemax',Pricemax);
      }


      // window.location.reload();
  }

  TagRemove(e){
      var Strainer = e.currentTarget.getAttribute('data-Strainer');
      if(Strainer == "Strainer_City"){
        sessionStorage.setItem('City','City');
        this.setState({Citys_type:'City'});
        window.location.reload();
      }

      if(Strainer == "Strainer_Guests"){
        sessionStorage.setItem('guests','1');
        this.setState({Adult:1,children:0,Baby:0});
        window.location.reload();
      }

      if(Strainer == "Strainer_Home_Type"){
        sessionStorage.setItem('Home_Type','');
        this.setState({Home_Type:'Home Type'});
        window.location.reload();
      }

  }

  PriceAdd(e){
    
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
              <a href="/help" className="button__Help">Help</a>
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
        <li className="tag__item"><a href="/experience"><img src="../../images/Experience.png" alt=""/><span>Experience</span></a></li>
        <li className="tag__item"><span className="location-tag Strainerspan" data-Strainer="Strainer_City" onClick={(e)=>this.Strainer(e)}>{this.state.Citys_type}</span>
            <div className={this.state.Strainer_City ? "Strainer_City show" : "Strainer_City hide"}>
                <div className="Strainer_Home_Type">
                    <div>
                      {this.state.Citys.map((item,index) => (
                          <div  className="checkbox col-lg-6" data-item={item} onClick={(e) => this.setState({Citys_type:e.currentTarget.getAttribute('data-item')})}>
                            <p className="Pinput" >
                              <img className={this.state.Citys_type == item ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                            </p>
                            <div className="divinput">
                              <p>{item}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                </div>
                <div className="operation">
                    <p className="cancel Left" onClick={(e)=>this.setState({Strainer_City:false,Citys_type:'City'})}>cancel</p>
                    <p className="confirm Left" onClick={(e)=>this.TagSelect(e)}>confirm</p>
                    <p className="Reset Right" data-Strainer="Strainer_City" onClick={(e)=>this.TagRemove(e)}>Reset</p>
                </div>
            </div>
        </li>
        <li className={this.state.Strainer_Time ? "tag__item active" : "tag__item"}><span className="Strainerspan" data-Strainer="Strainer_Time" onClick={(e)=>this.Strainer(e)}>4th - 8th March</span>
            <div className={this.state.Strainer_Time ? "Strainer_Time show" : "Strainer_Time hide"}>
                <DateRangePicker startDate={this.state.checkInDate} startDateId="start_date" endDate={this.state.checkOutDate} endDateId="end_date" onDatesChange={({ startDate, endDate })=> {this.setState({checkInDate: startDate, checkOutDate: endDate });window.searchCondition.checkOutDate = endDate;window.searchCondition.checkInDate = startDate;}} focusedInput={this.state.focusedInput} onFocusChange={focusedInput => this.setState({ focusedInput })} readOnly />
            </div>
        </li>
        <li className={this.state.Strainer_Guests ? "tag__item active" : "tag__item"}><span className="Strainerspan" data-Strainer="Strainer_Guests" onClick={(e)=>this.Strainer(e)}>{Number(this.state.Adult) + Number(this.state.children) + Number(this.state.Baby)} Adults</span>
            <div className={this.state.Strainer_Guests ? "Strainer_Guests show" : "Strainer_Guests hide"}>
                <ul>
                    <li><p className="col-lg-6 text-left">Adult</p><p className="col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({Adult:this.state.Adult > 1 ? this.state.Adult-1 : this.state.Adult})}>◀</span><span className="text">{this.state.Adult}</span><span className="Right" onClick={(e)=>this.setState({Adult:this.state.Adult >= 16 ? 16 : this.state.Adult+1})}>▶</span></p></li>
                    <li><p className="col-lg-6 text-left text1">children<small>2-12 years old</small></p><p className="col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({children:this.state.children > 0 ? this.state.children-1 : this.state.children})}>◀</span><span className="text">{this.state.children}</span><span className="Right" onClick={(e)=>this.setState({children:this.state.children >= 5 ? 5 : this.state.children+1})}>▶</span></p></li>
                    <li><p className="col-lg-6 text-left text1">Baby<small>Under 2 years of age</small></p><p className="col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({Baby:this.state.Baby > 0 ? this.state.Baby-1 : this.state.Baby})}>◀</span><span className="text">{this.state.Baby}</span><span className="Right" onClick={(e)=>this.setState({Baby:this.state.Baby >= 5 ? 5 : this.state.Baby+1})}>▶</span></p></li>
                </ul>
                <div className="operation">
                    <p className="cancel Left" onClick={(e)=>this.setState({Strainer_Guests:false})}>cancel</p>
                    <p className="confirm Left" onClick={(e)=>this.TagSelect(e)}>confirm</p>
                    <p className="Reset Right" data-Strainer="Strainer_Guests" onClick={(e)=>this.TagRemove(e)}>Reset</p>
                </div>
            </div>
        </li>
        <li className={this.state.Strainer_token ? "tag__item active" : "tag__item"}><img src="../../images/pps.png" alt=""/> <span data-Strainer="Strainer_token" onClick={(e)=>this.Strainer(e)}>Support PPS token</span>
            <div className={this.state.Strainer_token ? "Strainer_token show" : "Strainer_token hide"}>
                
            </div>
        </li>
        <li className={this.state.Strainer_Home_Type ? "tag__item active" : "tag__item"}><span className="Strainerspan" data-Strainer="Strainer_Home_Type" onClick={(e)=>this.Strainer(e)}>{this.state.Home_Type}</span>
            <div className={this.state.Strainer_Home_Type ? "Strainer_Home_Type show" : "Strainer_Home_Type hide"}>
                <div  className="checkbox" onClick={(e) => this.setState({Home_Type:'Whole house'})}>
                  <p className="Pinput" >
                    <img className={this.state.Home_Type == 'Whole house' ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <div className="divinput">
                    <p>Whole house</p>
                    <p>Private Room</p>
                  </div>
                </div>
                <div  className="checkbox" onClick={(e) => this.setState({Home_Type:'Private Room'})}>
                  <p className="Pinput" >
                    <img className={this.state.Home_Type == 'Private Room' ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <div className="divinput">
                    <p>Private Room</p>
                    <p>Have your own separate room and share some public space.</p>
                  </div>
                </div>
                <div  className="checkbox" onClick={(e) => this.setState({Home_Type:'Share Room'})}>
                  <p className="Pinput" >
                    <img className={this.state.Home_Type == 'Share Room' ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                  </p>
                  <div className="divinput">
                    <p>Share Room</p>
                    <p>A joint space, such as a public Lounge.</p>
                  </div>
                </div>
                <div className="operation">
                    <p className="cancel Left" onClick={(e)=>this.setState({Strainer_token:false})}>cancel</p>
                    <p className="confirm Left" onClick={(e)=>this.TagSelect(e)}>confirm</p>
                    <p className="Reset Right" data-Strainer="Strainer_Home_Type" onClick={(e)=>this.TagRemove(e)}>Reset</p>
                </div>
            </div>
        </li>
        <li className={this.state.Strainer_Price ? "tag__item active" : "tag__item"}><span className="Strainerspan" data-Strainer="Strainer_Price" onClick={(e)=>this.Strainer(e)}>{this.state.Price}</span>
            <div className={this.state.Strainer_Price ? "Strainer_Price show" : "Strainer_Price hide"}>
                <p className="text1"><span>PPS</span>{this.state.Pricemin}-<span>PPS</span>{this.state.Pricemax}</p>
                <p className="text1">The average price per night is PPS385.</p>
                <div className="tokenbj"><p style={{height: 6+"px"}}></p><p style={{height: 9+"px"}}></p><p style={{height: 8+"px"}}></p><p style={{height: 13+"px"}}></p><p style={{height: 32+"px"}}></p><p style={{height: 38+"px"}}></p><p style={{height: 25+"px"}}></p><p style={{height: 34+"px"}}></p><p style={{height: 48+"px"}}></p><p style={{height: 51+"px"}}></p><p style={{height: 60+"px"}}></p><p style={{height: 64+"px"}}></p><p style={{height: 59+"px"}}></p><p style={{height: 45+"px"}}></p><p style={{height: 36+"px"}}></p><p style={{height: 38+"px"}}></p><p style={{height: 27+"px"}}></p><p style={{height: 25+"px"}}></p><p style={{height: 16+"px"}}></p><p style={{height: 16+"px"}}></p><p style={{height: 10+"px"}}></p><p style={{height: 5+"px"}}></p><p style={{height: 6+"px"}}></p><p style={{height: 3+"px"}}></p><p style={{height: 1+"px"}}></p><p style={{height: 3+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 3+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 1+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 3+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 1+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 3+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 1+"px"}}></p>
                </div>
                <InputRange maxValue={1000000} minValue={10000} value={{min: this.state.Pricemin, max: this.state.Pricemax}} onChange={value=>this.setState({ Pricemin : value.min,Pricemax : value.max })} />
                <div className="operation">
                    <p className="cancel Left" onClick={(e)=>this.setState({Strainer_token:false})}>cancel</p>
                    <p className="confirm Left" data-Strainer="Strainer_Price" onClick={(e)=>this.TagSelect(e)}>confirm</p>
                    <p className="Reset Right" onClick={(e)=>this.setState({Adult:1,children:0,Baby:0})}>Reset</p>
                </div>
            </div>
        </li>
        <li className={this.state.Strainer_More ? "tag__item active" : "tag__item"}><span className="Strainerspan" data-Strainer="Strainer_More" onClick={(e)=>this.Strainer(e)}>More Fiters</span>
            <div className={this.state.Strainer_More ? "Strainer_More  show" : "Strainer_More hide"}>
                <div className="Bedroom">
                    <h6>Bedroom and bed</h6>
                    <ul>
                        <li><p className="col-lg-6 text-left">Number of beds</p><p className="col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({Adult:this.state.Adult > 1 ? this.state.Adult-1 : this.state.Adult})}>◀</span><span className="text">{this.state.Adult}</span><span className="Right" onClick={(e)=>this.setState({Adult:this.state.Adult >= 16 ? 16 : this.state.Adult+1})}>▶</span></p></li>
                        <li><p className="col-lg-6 text-left text1">Bedroom</p><p className="col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({children:this.state.children > 0 ? this.state.children-1 : this.state.children})}>◀</span><span className="text">{this.state.children}</span><span className="Right" onClick={(e)=>this.setState({children:this.state.children >= 5 ? 5 : this.state.children+1})}>▶</span></p></li>
                        <li><p className="col-lg-6 text-left text1">TOILET</p><p className="col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({Baby:this.state.Baby > 0 ? this.state.Baby-1 : this.state.Baby})}>◀</span><span className="text">{this.state.Baby}</span><span className="Right" onClick={(e)=>this.setState({Baby:this.state.Baby >= 5 ? 5 : this.state.Baby+1})}>▶</span></p></li>
                    </ul>
                </div>
                <div className="Flashover options">
                    <div>
                      <h6>Flashover</h6>
                      <p>No need to wait for a reply from the landlord to make a reservation</p>
                    </div>
                    <p className="optionsclose optionsActive"><span className="optionsActivespan"><img src="../images/registerlist_dui.png" /></span></p>
                </div>
                <div className="options">
                    <h6>More options</h6>
                    <div>
                        <p>Great landlord</p>
                        <p>Renting a landlord to an approved landlord</p>
                        <p className="Understand textpink">Understand more</p>
                        <p>Wheelchair Accessible</p>
                        <p>Find the room that meets your flexible needs.</p>
                        <p className="Understand textpink">Choice of barrier free demand</p>
                        <p>Free cancellation of reservations</p>
                        <p>Show the free cancellation of the reservation within 48 hours after the reservation</p>
                        <p className="textpink">Understand more</p>
                    </div>
                    <p className="optionsclose optionsActive"><span className="optionsActivespan"><img src="../images/registerlist_dui.png" /></span></p>
                    <p className="optionsclose optionsclose1 optionsActive"><span className="optionsActivespan"><img src="../images/registerlist_dui.png" /></span></p>
                </div>

                <div className="Strainer_Home_Type language">
                    <h6>Facilities</h6>
                    <div>
                      {this.state.Facilities.map((item,index) => (
                          <div  className="checkbox col-lg-6" onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}>
                            <p className="Pinput" >
                              <img className={this.state.roomstuff_Essentials ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                            </p>
                            <div className="divinput">
                              <p>{item}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <p className="textpink">Display all the facilities</p>
                </div>
                
                <div className="Strainer_Home_Type language">
                    <h6>Facilities</h6>
                    <div>
                      {this.state.Facilities1.map((item,index) => (
                          <div  className="checkbox col-lg-6" onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}>
                            <p className="Pinput" >
                              <img className={this.state.roomstuff_Essentials ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                            </p>
                            <div className="divinput">
                              <p>{item}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <p className="textpink">Display all the facilities</p>
                </div>

                <div className="Strainer_Home_Type language">
                    <h6>Source type</h6>
                    <div>
                      {this.state.Source_type.map((item,index) => (
                          <div  className="checkbox col-lg-6" onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}>
                            <p className="Pinput" >
                              <img className={this.state.roomstuff_Essentials ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                            </p>
                            <div className="divinput">
                              <p>{item}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <p className="textpink">Display all the source types</p>
                </div>

                <div className="Strainer_Home_Type language">
                    <h6>Characteristic house</h6>
                    <div>
                      {this.state.Characteristic.map((item,index) => (
                          <div  className="checkbox col-lg-6" onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}>
                            <p className="Pinput" >
                              <img className={this.state.roomstuff_Essentials ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                            </p>
                            <div className="divinput">
                              <p>{item}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <p className="textpink">Display all the features of the house</p>
                </div>

                <div className="Strainer_Home_Type language">
                    <h6>Code of the house</h6>
                    <div>
                      {this.state.Code_house.map((item,index) => (
                          <div  className="checkbox col-lg-6" onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}>
                            <p className="Pinput" >
                              <img className={this.state.roomstuff_Essentials ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                            </p>
                            <div className="divinput">
                              <p>{item}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <p className="textpink">Show all the rules of the house</p>
                </div>


                <div className="Strainer_Home_Type language">
                    <h6>Landlord language</h6>
                    <div>
                      {this.state.language.map((item,index) => (
                          <div  className="checkbox col-lg-6" onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}>
                            <p className="Pinput" >
                              <img className={this.state.roomstuff_Essentials ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                            </p>
                            <div className="divinput">
                              <p>{item}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <p className="textpink">Show all the languages that the landlord can use</p>
                </div>

                <div className="foot">
                    <span onClick={(e)=>this.setState({Strainer_More:false})}>Cancel</span>
                    <button onClick={(e)=>this.setState({Strainer_More:false})}>House</button>
                </div>
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