import 'react-dates/initialize';
import '../css/react_dates.css';
import { DateRangePicker } from 'react-dates';
import React, { Component } from 'react';
import houselistingService from '../services/houseinfolist-service';
import ppsService from '../services/pps-service';
import ipfsService from '../services/ipfs-service';
import Carousel from 'nuka-carousel';
import Overlay from './overlay';
import web3Service from '../services/web3-service';
import guestService from '../services/guest-service';
import Modal from 'react-modal';
import EthereumQRPlugin from 'ethereum-qr-code';
import Video from './video';
import languageService from '../services/language-service';
import GuestRegister from './guest-register';
import { Link } from 'react-router-dom';
import Reviews from './Reviews';


const qr = new EthereumQRPlugin();

class Data extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      DateLists:[
        {start:1530590400000,end:1530763200000},   //2018/7/3 12:0:0   2018/7/5 12:0:0
        {start:1530849600000,end:1531022400000},   //2018/7/6 12:0:0   2018/7/8 12:0:0
        {start:1531627200000,end:1532059200000}    //2018/7/15 12:0:0   2018/7/20 12:0:0
      ]
    }
    languageService.language();
    this.isStartDayBlocked = this.isStartDayBlocked.bind(this);
    this.isEndDayBlocked = this.isEndDayBlocked.bind(this);
  }

  
  

  componentWillMount() {
    this.setState({ languagelist:window.languagelist });


    if (this.props.listingId) {
      this.loadOrdered(this.props.listingId);
      this.loadListing();
     
    }
  
  }


  isStartDayBlocked(day){
    var DateLists = this.state.DateLists;
    var currentDate = new Date(this.state.checkInDate).getTime(); 
    var dayS = new Date(day).getTime();
    for(var i=0;i<DateLists.length;i++){
      if(dayS>DateLists[i].start-86400000 && dayS<DateLists[i].end){
        return new Date(dayS);
      }
    }
  } 

  isEndDayBlocked(day){
    var DateLists = this.state.DateLists;      
    var currentDate = new Date(this.state.checkInDate).getTime(); 
    var dayS = new Date(day).getTime();
    var startdateArr = [];
    var enddateArr = [];
    for(var i=0;i<DateLists.length;i++){
      if(dayS>DateLists[i].start && dayS<DateLists[i].end-86400000){
        return new Date(dayS);
      }
      if(currentDate<DateLists[i].start){
        startdateArr.push(DateLists[i].start)
      }
      if(currentDate>DateLists[i].end){
        enddateArr.push(DateLists[i].end)
      }
    }
    if(dayS>Math.min(...startdateArr)+43200000) {
        return true;
    } 
    if(dayS<Math.max(...enddateArr)-86400000) {
        return true;
    }  
  }
      
  

  render() {
    const language = this.state.languagelist;
    console.log(this.state.focusedInput)
    const isDayBlocked = this.state.focusedInput === "startDate" ? this.isStartDayBlocked : this.isEndDayBlocked;
    return (  

        <div style={{background:"#000"}}> 
              <DateRangePicker
                startDate={this.state.checkInDate}
                startDateId="start_date"
                endDate={this.state.checkOutDate}
                startDatePlaceholderText={language.Check_In}
                endDatePlaceholderText={language.Check_Out}
                endDateId="end_date"
                onDatesChange={({ startDate, endDate }) => {this.setState({checkInDate: startDate, checkOutDate: endDate })}}
                focusedInput={this.state.focusedInput}
                isDayBlocked={isDayBlocked}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
                readOnly
                numberOfMonths
              />
         </div>     
    )
  }
}

export default Data
