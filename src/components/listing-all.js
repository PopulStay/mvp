import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Overlay from './overlay';
import PropTypes from 'prop-types';
import GuestRegister from './guest-register';
import HostRegister from './host-register';
import { DateRangePicker } from 'react-dates';
import { withRouter } from 'react-router';
import WalletClear from './walletClear';
import '../css/main.css';
import '../css/search.css';
import InputRange from 'react-input-range';
import InputRangecss from 'react-input-range/lib/css/index.css';
import houselistingService from '../services/houseinfolist-service';
import Pagination from 'react-js-pagination';
import ListingCard from './listing-card';
import languageService from '../services/language-service';



class Listingall extends Component {

  constructor(props) {
    super(props);
      this.state = {
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
        Pricemin:0,
        Pricemax:1000000,
        Price:'Price',
        listingRows: [],
        listingsPerPage: 20,
        districtCodes:[],
        curDistrictCodeIndex:0,
        experienceList:1,
        listingtype:0,
        languagelist:{},
      };
      window.searchCondition = this.state;
      languageService.language();
  }

  componentDidMount() {

    this.setState({ languagelist:window.languagelist });
    this.setState({
      Citys_type:window.languagelist.City,
      Home_Type:window.languagelist.Home_Type,
      Price:window.languagelist.Price
    });

    this.handlePageChange = this.handlePageChange.bind(this);
    
      houselistingService.getDistrictCodes().then((codes)=>
      {
        this.setListingRows(codes);
      });

      this.timerID = setTimeout(
        () => this.setState({Progresshide:1}),
        1000
      );
  }

  setListingRows =(codes) =>{
    this.setState({districtCodes:codes.data});

    var uuids = houselistingService.getRecommand(codes.data[0].id).then((data)=>{
    var lists = [];
    for(var i=0;i<data.length;i++){
      var City = data[i].place.toUpperCase();
      var guests = Number(data[i].guests);
      var category = data[i].houseinfo.category;
      var price = data[i].price;
      var guestsnum =  Number(this.state.Adult) + Number(this.state.children) + Number(this.state.Baby);
      var ifCity,ifcategory;
      if(this.state.Citys_type == this.state.languagelist.City){
        ifCity = City;
      }else{
        ifCity = this.state.Citys_type;
      }

      if(this.state.Home_Type == this.state.languagelist.Home_Type){
        ifcategory = category;
      }else{
        ifcategory = this.state.Home_Type;
      }
      
      if(City == ifCity && guests >= guestsnum && category == ifcategory && price >= this.state.Pricemin && price <= this.state.Pricemax){
        lists.push(data[i]);
        console.log(lists)
      }

      this.setState({ listingRows: lists});
     
    }
    window.listingRows = data;
    });
  }


  handlePageChange(pageNumber) {
    this.props.history.push(`/page/${pageNumber}`)
  }

  nextlist(e){
    this.setState({state: this.state.lists.push(this.state.lists[0])});
    this.setState({
        lists: this.state.lists.filter((elem, i) => 0 != i)
    });
  }
  prelist(e){
    this.setState({state: this.state.lists.unshift(this.state.lists[this.state.lists.length-1])});
    this.setState({
        lists: this.state.lists.filter((elem, i) => this.state.lists.length-1 != i)
    });
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
    this.taghide();

    if(this.state.Pricemin == 0 && this.state.Pricemax == 1000000){
        this.setState({Pricemin:0,Pricemax:1000000,Price:'Price'})
    }else{
        this.setState({Price:'PPS'+this.state.Pricemin+"-"+'PPS'+this.state.Pricemax})
    }


  }

  TagRemove(e){
      var Strainer = e.currentTarget.getAttribute('data-Strainer');
      if(Strainer == "Strainer_City"){
        this.setState({Citys_type:'City'});
      }

      if(Strainer == "Strainer_Guests"){
        this.setState({Adult:1,children:0,Baby:0});
      }

      if(Strainer == "Strainer_Home_Type"){
        this.setState({Home_Type:'Home Type'});
      }

      if(Strainer == "Strainer_Price"){
        this.setState({Pricemin:0,Pricemax:1000000,Price:'Price'})
      }

     this.taghide();

  }

  taghide=()=>{
    houselistingService.getDistrictCodes().then((codes)=>
      {
        this.setListingRows(codes);
      });

    this.setState({
        Strainer_City:false,
        Strainer_Time:false,
        Strainer_Guests:false,
        Strainer_token:false,
        Strainer_Home_Type:false,
        Strainer_Price:false,
        Strainer_More:false
      })

  }


  render() {
    const showListingsRows = this.state.listingRows;
    const language = this.state.languagelist;
    
  return (

      <div className="headerbox">
          {!this.props.hideTagHeader &&
            <div className="tag-header Strainerbox">
              <ul className="tag container">
              <li className="tag__item"><a><img src="../../images/Experience.png" alt=""/><span>{language.Experience}</span></a></li>
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
                          <p className="cancel Left" onClick={(e)=>this.setState({Strainer_City:false,Citys_type:'City'})}>{language.Cancel}</p>
                          <p className="confirm Left" data-Strainer="Strainer_City" onClick={(e)=>this.TagSelect(e)}>{language.Confirm}</p>
                          <p className="Reset Right" data-Strainer="Strainer_City" onClick={(e)=>this.TagRemove(e)}>{language.Reset}</p>
                      </div>
                  </div>
              </li>
              <li className={this.state.Strainer_Time ? "tag__item active" : "tag__item"}><span className="Strainerspan" data-Strainer="Strainer_Time" onClick={(e)=>this.Strainer(e)}>4th - 8th March</span>
              </li>
              <li className={this.state.Strainer_Guests ? "tag__item active" : "tag__item"}><span className="Strainerspan" data-Strainer="Strainer_Guests" onClick={(e)=>this.Strainer(e)}>{Number(this.state.Adult) + Number(this.state.children) + Number(this.state.Baby)} {language.Adults}</span>
                  <div className={this.state.Strainer_Guests ? "Strainer_Guests show" : "Strainer_Guests hide"}>
                      <ul>
                          <li><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left">{language.Adult}</p><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({Adult:this.state.Adult > 1 ? this.state.Adult-1 : this.state.Adult})}>◀</span><span className="text">{this.state.Adult}</span><span className="Right" onClick={(e)=>this.setState({Adult:this.state.Adult >= 16 ? 16 : this.state.Adult+1})}>▶</span></p></li>
                          <li><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left text1">{language.children}<small>{language.years_old}</small></p><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({children:this.state.children > 0 ? this.state.children-1 : this.state.children})}>◀</span><span className="text">{this.state.children}</span><span className="Right" onClick={(e)=>this.setState({children:this.state.children >= 5 ? 5 : this.state.children+1})}>▶</span></p></li>
                          <li><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left text1">{language.Baby}<small>{language.Under_2_years_of_age}</small></p><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({Baby:this.state.Baby > 0 ? this.state.Baby-1 : this.state.Baby})}>◀</span><span className="text">{this.state.Baby}</span><span className="Right" onClick={(e)=>this.setState({Baby:this.state.Baby >= 5 ? 5 : this.state.Baby+1})}>▶</span></p></li>
                      </ul>
                      <div className="operation">
                          <p className="cancel Left" onClick={(e)=>this.setState({Strainer_Guests:false})}>{language.Cancel}</p>
                          <p className="confirm Left" data-Strainer="Strainer_Guests" onClick={(e)=>this.TagSelect(e)}>{language.Confirm}</p>
                          <p className="Reset Right" data-Strainer="Strainer_Guests" onClick={(e)=>this.TagRemove(e)}>{language.Reset}</p>
                      </div>
                  </div>
              </li>
              <li className={this.state.Strainer_token ? "tag__item active" : "tag__item"}><img src="../../images/pps.png" alt=""/> <span data-Strainer="Strainer_token" onClick={(e)=>this.Strainer(e)}>{language.Support_PPS_token}</span>
              </li>
              <li className={this.state.Strainer_Home_Type ? "tag__item active" : "tag__item"}><span className="Strainerspan" data-Strainer="Strainer_Home_Type" onClick={(e)=>this.Strainer(e)}>{this.state.Home_Type}</span>
                  <div className={this.state.Strainer_Home_Type ? "Strainer_Home_Type show" : "Strainer_Home_Type hide"}>
                      <div  className="checkbox" onClick={(e) => this.setState({Home_Type:'Whole house'})}>
                        <p className="Pinput" >
                          <img className={this.state.Home_Type == 'Whole house' ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                        </p>
                        <div className="divinput">
                          <p>{language.Whole_house}</p>
                          <p>{language.Enjoy_the_entire_listing}</p>
                        </div>
                      </div>
                      <div  className="checkbox" onClick={(e) => this.setState({Home_Type:'Private Room'})}>
                        <p className="Pinput" >
                          <img className={this.state.Home_Type == 'Private Room' ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                        </p>
                        <div className="divinput">
                          <p>{language.Private_Room}</p>
                          <p>{language.Have_your_own_separate_room_and_share_some_public_space}</p>
                        </div>
                      </div>
                      <div  className="checkbox" onClick={(e) => this.setState({Home_Type:'Share Room'})}>
                        <p className="Pinput" >
                          <img className={this.state.Home_Type == 'Share Room' ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                        </p>
                        <div className="divinput">
                          <p>{language.Share_Room}</p>
                          <p>{language.A_joint_space_such_as_a_public_Lounge}</p>
                        </div>
                      </div>
                      <div className="operation">
                          <p className="cancel Left" onClick={(e)=>this.setState({Strainer_token:false})}>{language.Cancel}</p>
                          <p className="confirm Left" data-Strainer="Strainer_Home_Type" onClick={(e)=>this.TagSelect(e)}>{language.Confirm}</p>
                          <p className="Reset Right" data-Strainer="Strainer_Home_Type" onClick={(e)=>this.TagRemove(e)}>{language.Reset}</p>
                      </div>
                  </div>
              </li>
              <li className={this.state.Strainer_Price ? "tag__item active" : "tag__item"}><span className="Strainerspan" data-Strainer="Strainer_Price" onClick={(e)=>this.Strainer(e)}>{this.state.Price}</span>
                  <div className={this.state.Strainer_Price ? "Strainer_Price show" : "Strainer_Price hide"}>
                      <p className="text1"><span>PPS</span>{this.state.Pricemin}-<span>PPS</span>{this.state.Pricemax}</p>
                      <p className="text1">{language.The_average_price_per_night_is_PPS10000}</p>
                      <div className="tokenbj"><p style={{height: 6+"px"}}></p><p style={{height: 9+"px"}}></p><p style={{height: 8+"px"}}></p><p style={{height: 13+"px"}}></p><p style={{height: 32+"px"}}></p><p style={{height: 38+"px"}}></p><p style={{height: 25+"px"}}></p><p style={{height: 34+"px"}}></p><p style={{height: 48+"px"}}></p><p style={{height: 51+"px"}}></p><p style={{height: 60+"px"}}></p><p style={{height: 64+"px"}}></p><p style={{height: 59+"px"}}></p><p style={{height: 45+"px"}}></p><p style={{height: 36+"px"}}></p><p style={{height: 38+"px"}}></p><p style={{height: 27+"px"}}></p><p style={{height: 25+"px"}}></p><p style={{height: 16+"px"}}></p><p style={{height: 16+"px"}}></p><p style={{height: 10+"px"}}></p><p style={{height: 5+"px"}}></p><p style={{height: 6+"px"}}></p><p style={{height: 3+"px"}}></p><p style={{height: 1+"px"}}></p><p style={{height: 3+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 3+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 1+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 3+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 1+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 3+"px"}}></p><p style={{height: 2+"px"}}></p><p style={{height: 1+"px"}}></p>
                      </div>
                      <InputRange maxValue={1000000} minValue={10000} value={{min: this.state.Pricemin, max: this.state.Pricemax}} onChange={value=>this.setState({ Pricemin : value.min,Pricemax : value.max })} />
                      <div className="operation">
                          <p className="cancel Left" onClick={(e)=>this.setState({Strainer_token:false})}>{language.Cancel}</p>
                          <p className="confirm Left" data-Strainer="Strainer_Price" onClick={(e)=>this.TagSelect(e)}>{language.Confirm}</p>
                          <p className="Reset Right" data-Strainer="Strainer_Price" onClick={(e)=>this.TagRemove(e)}>{language.Reset}</p>
                      </div>
                  </div>
              </li>
              <li className={this.state.Strainer_More ? "tag__item active" : "tag__item"}><span className="Strainerspan" data-Strainer="Strainer_More" onClick={(e)=>this.Strainer(e)}>{language.More_Fiters}</span>
                  <div className={this.state.Strainer_More ? "Strainer_More  show" : "Strainer_More hide"}>
                      <div className="Bedroom">
                          <h6>Bedroom and bed</h6>
                          <ul>
                              <li><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left">Number of beds</p><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({Adult:this.state.Adult > 1 ? this.state.Adult-1 : this.state.Adult})}>◀</span><span className="text">{this.state.Adult}</span><span className="Right" onClick={(e)=>this.setState({Adult:this.state.Adult >= 16 ? 16 : this.state.Adult+1})}>▶</span></p></li>
                              <li><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left text1">Bedroom</p><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({children:this.state.children > 0 ? this.state.children-1 : this.state.children})}>◀</span><span className="text">{this.state.children}</span><span className="Right" onClick={(e)=>this.setState({children:this.state.children >= 5 ? 5 : this.state.children+1})}>▶</span></p></li>
                              <li><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left text1">TOILET</p><p className="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-right"><span className="Left" onClick={(e)=>this.setState({Baby:this.state.Baby > 0 ? this.state.Baby-1 : this.state.Baby})}>◀</span><span className="text">{this.state.Baby}</span><span className="Right" onClick={(e)=>this.setState({Baby:this.state.Baby >= 5 ? 5 : this.state.Baby+1})}>▶</span></p></li>
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
          <div className="container experience ALL" onClick={(e)=>this.taghide()}>
            <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
                <h2>{language.All_home}</h2>
                <div className={this.state.experienceList == 1 ? "show All_experiences row" : "hide All_experiences row"}>
                    {showListingsRows.map(item => (
                      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 listing-card">
                          <Link to={`/listing/${item.id}`}>
                            <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
                            <div className="photo" style={!item.profile.previewImage ? {backgroundImage:"url(/images/registerlist_4.png)"}:{backgroundImage:"url("+item.profile.previewImage+")"}}>
                            </div>
                            <div className="category">{item.houseinfo.category} ({item.houseinfo.beds} beds)</div>
                            <div className="title">{item.houseinfo.location}</div>
                            <div className="price">
                                ￥{Number(item.price).toLocaleString(undefined, {minimumFractionDigits: 3})} pps per night
                            </div>
                            <div className="divxx">
                              <img src="../images/detail-xx01.png" alt="" />
                              <img src="../images/detail-xx01.png" alt="" />
                              <img src="../images/detail-xx01.png" alt="" />
                              <img src="../images/detail-xx01.png" alt="" />
                              <span>200</span> 
                            </div>
                          </Link>
                      </div>
                    ))}
                </div>
                <h1 className={this.state.listingRows.length == 0 ? "show": "hide"}>No result</h1>
                <div className="listspan">
                  <span className={this.state.experienceList == 1 ? "active hide" : ""}  onClick={(e)=>this.setState({experienceList:1})}></span>
                  <span className={this.state.experienceList == 1 ? "active hide" : ""}  onClick={(e)=>this.setState({experienceList:2})}></span>
                  <span className={this.state.experienceList == 1 ? "active hide" : ""}  onClick={(e)=>this.setState({experienceList:3})}></span>
                </div>
            </div>
      </div>


  )
  }
}

export default withRouter(Listingall)

