import 'react-dates/initialize';
import '../css/react_dates.css';
import { DateRangePicker } from 'react-dates';
import React, { Component } from 'react';
import houselistingService from '../services/houseinfolist-service';
import ppsService from '../services/pps-service';
import ipfsService from '../services/ipfs-service';
import Carousel from 'nuka-carousel';
import Overlay from './overlay';

const alertify = require('../../node_modules/alertify/src/alertify.js')

class ListingsDetail extends Component {

  constructor(props) {
    super(props)

    this.STEP = {
      VIEW: 1,
      SUBMIT: 2,
      PROCESSING: 3,
      PURCHASED: 4,
    }

    this.state = {
      category: "Loading...",
      name: "Loading...",
      price: "Loading...",
      ipfsHash: null,
      lister: null,
      pictures: [],
      step: this.STEP.VIEW,
      totalPrice: 0,
      slides:[],
      currentActive:0,
      descriptioninfo:{},
      guests:['First Guests','Second Guests','Third Guests','Fourth Guests'],
      guest: "Add customers",
      priceActive:1,
    }

    this.handleBooking = this.handleBooking.bind(this);

  }

  loadListing() {
    var ipfsHash = houselistingService.getIpfsHashFromBytes32(this.props.listingId);
    houselistingService.getHouseInfoDetail(this.props.listingId)
    .then((result) => {
        var roominfo = JSON.parse(result[4]);
        this.setState({price:result[0],category:roominfo.category,location:roominfo.location,beds:roominfo.beds,lister:result[2]});
        return ipfsService.getListing(ipfsHash)
    }).then((result)=>{
          var descriptioninfo = JSON.parse(result);
         this.setState({descriptioninfo:descriptioninfo});
         if(descriptioninfo.selectedPictures && descriptioninfo.selectedPictures.length>0 && descriptioninfo.selectedPictures[0].imagePreviewUrl)
         {
          this.setState({previewurl:descriptioninfo.selectedPictures[0].imagePreviewUrl});
          var slideArray = this.state.slides;

          for(var i =0;i < descriptioninfo.selectedPictures.length;i++)
          {
            var slide ={};
            slide.imgageUrl = descriptioninfo.selectedPictures[i].imagePreviewUrl;
            slideArray.push(slide);
          }

          this.setState({slides:slideArray});
          console.log(this.state);
         }

    }).catch((error) => {
      console.error(error);
    });
  }
  

  componentWillMount() {
    if (this.props.listingId) {

      this.loadListing();

    }
  
  }

  handleBooking() {
    let unitsToBuy = 0;

    if (this.state.checkInDate && this.state.checkOutDate) {
      unitsToBuy = this.state.checkOutDate.diff(this.state.checkInDate, 'days');
    }
    this.setState({step: this.STEP.SUBMIT});
    ppsService.setPreOrder(          this.state.lister,
                                     this.state.price * unitsToBuy,
                                     this.props.listingId, 
                                     this.state.checkInDate.toDate().getTime(), 
                                     this.state.checkOutDate.toDate().getTime(),
                                     unitsToBuy,
                                     this.state.priceActive
                                   )
    .then((transactionReceipt) => {
      console.log("Purchase request sent.")
      this.setState({step: this.STEP.PROCESSING})
      return ppsService.waitTransactionFinished(transactionReceipt)
    })
    .then((blockNumber) => {
      this.setState({step: this.STEP.PURCHASED})
    })
    .catch((error) => {
      console.log(error)
      alertify.log("There was a problem booking this listing.\nSee the console for more details.")
      this.setState({step: this.STEP.VIEW})
    })
  }

  calcTotalPrice() {
    if (this.state.checkInDate && this.state.checkOutDate) {
      let days = this.state.checkOutDate.diff(this.state.checkInDate, 'days');
      this.state.days = days;
      return this.state.price * days;
    }
    return 0
  }

  Guests(guest){

    this.setState({guest: guest})
  }

  render() {
    const price = typeof this.state.price === 'string' ? 0 : this.state.price;
    const guestItems = [];
    this.state.guests.forEach((guest,index)=>{
      guestItems.push(<li><a onClick={this.Guests.bind(this,guest)} >{guest}</a></li>)
    })
    return (  

<div>
       {this.state.step===this.STEP.METAMASK &&
          <Overlay imageUrl="/images/spinner-animation.svg">
            Confirm transaction<br />
            Press &ldquo;Submit&rdquo; in MetaMask window
          </Overlay>
        }

        {this.state.step===this.STEP.PROCESSING &&
          <Overlay imageUrl="/images/spinner-animation.svg">
            Processing your booking<br />
            Please stand by...
          </Overlay>
        }

        {this.state.step===this.STEP.PURCHASED &&
          <Overlay imageUrl="/images/circular-check-button.svg">
            Booking was successful.<br />
            <a href="#" onClick={()=>window.location.reload()}>
              Reload page
            </a>
          </Overlay>
        }

      <div className="carousel-slider">
      <Carousel>
       {this.state.slides.map(slide => (
        <div className="carousel-inner item">
        <img src={slide.imgageUrl}  />
        </div>
         ))}
      </Carousel>
      </div>

      <div className="detail-content container">
      <div className="row">
      <div className="col-sm-12 col-lg-7">
        <div className="L_box1 col-sm-8 col-md-9">
          <p className="text1">ENTIRE VILA - VEDADO</p>
          <p className="text2">PlacetedelVedado</p>
          <div className="box1_list col-lg-9">
            <p><img src="../images/detail-img02.png" alt="" />{this.state.descriptioninfo.roombasics_totalguests} guests</p>
            <p><img src="../images/detail-img01.png" alt="" />{this.state.descriptioninfo.roombasics_guestbedrooms} bedroom</p>
            <p><img src="../images/detail-img05.png" alt="" />{this.state.beds} bed</p>
            <p><img src="../images/detail-img03.png" alt="" />{this.state.pictures.length} private bath</p>
          </div>
        </div>


        <div className="L_box2 col-sm-3 col-md-3">
          <div className="BOX__logo">
            <img src={this.state.previewurl} alt="" />
          </div>

          <h4>{this.state.name}</h4>
          <img className="BOX2img" src="../images/detail-list.png" alt="" />
        </div>

        <div className="L_box1 L_box1_1 col-sm-8 col-md-9">
          <p className="text1">ENTIRE VILA - VEDADO</p>
          <p className="text2">PlacetedelVedado</p>
          <div className="box1_list col-lg-9">
            <p><img src="../images/detail-img02.png" alt="" />{this.state.descriptioninfo.roombasics_totalguests} guests</p>
            <p><img src="../images/detail-img01.png" alt="" />{this.state.descriptioninfo.roombasics_guestbedrooms} bedroom</p>
            <p><img src="../images/detail-img05.png" alt="" />{this.state.beds} bed</p>
            <p><img src="../images/detail-img03.png" alt="" />{this.state.pictures.length} private bath</p>
          </div>
        </div>

        <div className="L_TEXT1">A quiet neighborhood in private estate, only 5 minutes walk away from MRT/train station. 10 mins from Airport Walking distance to Singapore Expo,Chang Business Park and new University.</div>
        <p className="More">Read more<span>▼</span></p>

        <div className="L_box3">
          <h5>Amenities</h5>
          <p className={ this.state.descriptioninfo.roomstuff_Shampoo==0 ?  'show' : 'hide' }><img src="../images/detail-img07.png" alt="" />Shampoo</p>
          <p className={ this.state.descriptioninfo.roomstuff_breakfastcoffetea==0 ?  'show' : 'hide' }><img src="../images/detail-img08.png" alt="" />Breakfast</p>
          <p className={ this.state.descriptioninfo.roomstuff_TV==0 ?  'show' : 'hide' }><img src="../images/detail-img09.png" alt="" />TV</p>
          <p className={ this.state.descriptioninfo.roomstuff_Closet_drwers==0 ?  'show' : 'hide' }><img src="../images/detail-img10.png" alt="" />Kitchen</p>
          <p className={ this.state.descriptioninfo.roomstuff_aircondition==0 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />Air conditioning</p>
          <p><img src="../images/detail-img12.png" alt="" />WIFI</p>
        </div>

        <p className="More">Show all amenities<span>▼</span></p>
        <div className="L_box4">
            <h5>Sleeping arr 7 amenities</h5>
            <img src="../images/detail-img06.png" alt="" />
        </div>

        <div className="L_box5">
            <h5>House Rules</h5>
            <p>Check-in is anytime after 2PM</p>
            <p>Check out by 12PM(noon)</p>
        </div>

        <p className="More">Dead all rules<span>▼</span></p>
        <div className="L_box6">
            <h5>Cancellations</h5>
            <p>Strict</p>
            <p>Cancel up to 7 days before check in and get a 50% refund (minus service fees).cancel within 7 days of your trip and the reservati...<span>Read more</span></p>
        </div>
        
        <p className="More box6_More">Get details</p>

        <div className="Reviews">
            <p>69 Reviews</p>
            <div className="divxx">
              <img src="../images/detail-xx01.png" alt="" />
              <img src="../images/detail-xx01.png" alt="" />
              <img src="../images/detail-xx01.png" alt="" />
              <img src="../images/detail-xx01.png" alt="" />
              <img src="../images/detail-xx02.png" alt="" />
            </div>
            <div className="input-group">
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <span className="glyphicon glyphicon-search"></span>
                </button>
              </span>
              <input type="text" className="form-control" placeholder="Search Reviews" />
            </div>
        </div>

        <div>
            <ul>

            </ul>
        </div>
      </div>
      <div className=" col-sm-12 col-lg-5">
      <div className="detail-summary">

          <ul>
              <li onClick={(e) => {this.setState({priceActive:1})}} className={this.state.priceActive == 1 ? 'active' : ''} >PPS</li>
              <li onClick={(e) => {this.setState({priceActive:0})}} className={this.state.priceActive == 0 ? 'active' : ''}>ETH</li>
          </ul>
          
          <div className="detail-price-div">
              
              <span className = "detail-price">
                $ {this.state.priceActive == 1 ? 'PPS' : 'ETH'}: {this.state.descriptioninfo.price_perday}
              </span>
              <span className = "detail-price-font">Daily Price</span>
              <p className="detail-price-xx">
                <img src="../images/detail-xx01.png" alt="" />
                <img src="../images/detail-xx01.png" alt="" />
                <img src="../images/detail-xx01.png" alt="" />
                <img src="../images/detail-xx01.png" alt="" />
                <img src="../images/detail-xx02.png" alt="" />
              </p>
              <div className="details-daterange-div">

              {
                  this.props.listingId &&
                  <DateRangePicker
                    startDate={this.state.checkInDate}
                    startDateId="start_date"
                    endDate={this.state.checkOutDate}
                    startDatePlaceholderText="Check In"
                    endDatePlaceholderText="Check Out"
                    endDateId="end_date"
                    onDatesChange={({ startDate, endDate }) => {this.setState({checkInDate: startDate, checkOutDate: endDate })}}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                  />
              }
              </div>

              <div className="detail-guest-div">
                <p>Guest</p>
                <div className="btn-group">
                  <button type="button" data-toggle="dropdown" >{this.state.guest}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                    { guestItems }
                  </ul>
                </div>
              </div>

              <div className ="details-totalprice-div">
                <ul>
                    <li className="blueColor">
                      <span className = "LeftSpan"><b>￥</b>{this.state.descriptioninfo.price_perday}×{this.state.days}nights
                          <img src="../images/detail-img13.png" />
                      </span>
                      <span className = "RightSpan"><b>￥</b>{Number(this.calcTotalPrice()).toLocaleString(undefined, {minimumFractionDigits: 3})}</span>
                    </li>
                    <li className="pinkColor">
                      <span className = "LeftSpan">Special Offer 20% off
                          <img src="../images/detail-img13.png" />
                      </span>
                      <span className = "RightSpan"><b>￥</b>0</span>
                    </li>
                    <li className="pinkColor">
                      <span className = "LeftSpan">Long stay discount
                          <img src="../images/detail-img13.png" />
                      </span>
                      <span className = "RightSpan"><b>￥</b>0</span>
                    </li>
                    <li className="blueColor">
                      <span className = "LeftSpan">Cleaning fee
                          <img src="../images/detail-img13.png" />
                      </span>
                      <span className = "RightSpan"><b>￥</b>26</span>
                    </li>
                    <li className="blueColor">
                      <span className = "LeftSpan">Total Price</span>
                      <span className = "RightSpan">
                        $ {this.state.priceActive == 1 ? 'PPS' : 'ETH'}: {Number(this.calcTotalPrice())-0+26}
                      </span>
                    </li>
                </ul>
               
             </div>

             <div className="detail-summary__action">
                 {
                    this.props.listingId &&
                    <button
                      className="bg-pink color-blue btn-lg btn-block text-bold text-center"
                      onClick={this.handleBooking}
                      disabled={!this.props.listingId || !this.state.checkInDate || !this.state.checkOutDate}
                      onMouseDown={e => e.preventDefault()}
                      >
                        Book
                    </button>
                }    

            
             <h4 className="text-center">You won’t be changed yet</h4>
             </div>

        </div>
      

      </div>
      </div>
      </div>
      </div>




 </div>     
    )
  }
}

export default ListingsDetail
