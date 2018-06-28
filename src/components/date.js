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
        {start:1530590400000,end:1530763200000},
        {start:1530849600000,end:1531022400000}
      ]
    }
    languageService.language();
  }

  
  

  componentWillMount() {
    this.setState({ languagelist:window.languagelist });


    if (this.props.listingId) {
      this.loadOrdered(this.props.listingId);
      this.loadListing();
     
    }
  
  }


  isDayBlocked(day){
    var dayS = new Date(day).getTime();
    var DateLists = this.state.DateLists;
    for(var i=0;i<DateLists.length;i++){
      if(dayS>DateLists[i].start && dayS<DateLists[i].end){
        return new Date(dayS);
      }
    }
  } 
      
  

  render() {
    const language = this.state.languagelist;
    console.log(this.state.focusedInput)
    const isDayBlocked = this.state.focusedInput === "startDate" ? this.isStartDayBlocked : this.isEndDayBlocked;
    return (  

        <div> 
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
