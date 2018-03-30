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
      METAMASK: 2,
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
      currentActive:0
    }

    this.handleBooking = this.handleBooking.bind(this);
    this.SlideNext = this.SlideNext.bind(this);
    this.SlidePre = this.SlidePre.bind(this);
   

  }

  loadListing() {

    console.log(this.props.listingId);
    houselistingService.getHouseInfoDetail(this.props.listingId)
    .then((result) => {
        var roominfo = JSON.parse(result[5]);
        this.setState({price:result[0].toNumber()});
        this.setState({category:roominfo.category});
        this.setState({location:roominfo.location});
        this.setState({beds:roominfo.beds});
        this.setState({lister:result[2]});

    }).catch((error) => {
      console.error(error);
    });
  }

  SlideNext(){


    var slideArray = this.state.slides;
    if(this.state.currentActive < slideArray.length)
    {
      slideArray[this.state.currentActive].active ="";
      slideArray[this.state.currentActive].itemactive ="item";

      slideArray[this.state.currentActive+1].active ="active";
      slideArray[this.state.currentActive+1].itemactive ="item active";

      this.setState({slides:slideArray,currentActive:this.state.currentActive+1});
    }

  }

   SlidePre(){


    var slideArray = this.state.slides;
    if(this.state.currentActive > 1)
    {
      slideArray[this.state.currentActive].active ="";
      slideArray[this.state.currentActive].itemactive ="item";

      slideArray[this.state.currentActive-1].active ="active";
      slideArray[this.state.currentActive-1].itemactive ="item active";

      this.setState({slides:slideArray,currentActive:this.state.currentActive+1});
    }

  }

 


  componentWillMount() {
    if (this.props.listingId) {
      // Load from IPFS
      this.loadListing();
    }
  
    var slideArray = this.state.slides;
    var slide1 ={};
    slide1.active = "active";
    slide1.itemactive = "item active";
    slide1.imgageUrl ="../images/detail-carousel.jpg";
    slide1.index =0;

    var slide2 ={};
    slide2.active = "";
    slide2.itemactive = "item";
    slide2.imgageUrl ="../images/img_mountains_wide.jpg";
    slide2.index =1;

    slideArray.push(slide1);
    slideArray.push(slide2);

    this.setState({slides:slideArray});
  }

  handleBooking() {
    let unitsToBuy = 0;

    if (this.state.checkInDate && this.state.checkOutDate) {
      unitsToBuy = this.state.checkOutDate.diff(this.state.checkInDate, 'days');
    }
    this.setState({step: this.STEP.METAMASK});
    // hostaddress, totalTokens, uuid, from, to, days
    ppsService.setPreOrder( this.state.lister,
                                     this.state.price * unitsToBuy,
                                     this.props.listingId, 
                                     this.state.checkInDate.toDate().getDate(), 
                                     this.state.checkOutDate.toDate().getDate(),
                                     unitsToBuy
                                   )
    .then((transactionReceipt) => {
      console.log("Purchase request sent.")
      this.setState({step: this.STEP.PROCESSING})
      return ppsService.waitTransactionFinished(transactionReceipt.tx)
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
      return this.state.price * days;
    }
    return 0
  }

  render() {
    const price = typeof this.state.price === 'string' ? 0 : this.state.price
    return (























<div>


      <Carousel>
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5" />
        <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6" />
      </Carousel>






    

<div className="detail-carousel">
    <div id="carousel-detail" className="carousel slide" data-ride="carousel">

  <ol className="carousel-indicators">
   {this.state.slides.map(slide => (
         <li data-target="#myCarousel" data-slide-to="0" className={slide.active}></li>
              
    ))}
  </ol>

  <div className="carousel-inner">
    {this.state.slides.map(slide => (
      <div className={slide.itemactive}>
        <img src={slide.imgageUrl} alt="Los Angeles"/>
      </div>
     ))}
  </div>

  
  <a className="left carousel-control" href="#myCarousel" data-slide="prev" onClick={this.SlidePre} >
    <span className="glyphicon glyphicon-chevron-left"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="right carousel-control" href="#myCarousel" data-slide="next" onClick={this.SlideNext}>
    <span className="glyphicon glyphicon-chevron-right"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
</div>














































































      <div className="listing-detail">
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

        {this.state.pictures &&
          <div className="carousel">
            {this.state.pictures.map(pictureUrl => (
              <div className="photo" key={pictureUrl}>
                {(new URL(pictureUrl).protocol === "data:") &&
                  <img src={pictureUrl} role='presentation' />
                }
              </div>
            ))}
          </div>
        }

        <div className="container listing-container">
          <div className="row">
            <div className="col-12 col-md-8 detail-info-box">
              <div className="category">{this.state.category} ({this.state.beds} beds)</div>
              <div className="title">{this.state.location}</div>
              <div className="category">Creator</div>
              <div className="description">{this.state.lister}</div>
              <a href={ipfsService.gatewayUrlForHash(this.state.ipfsHash)} target="_blank">
                View on IPFS <big>&rsaquo;</big>
              </a>
              <div className="debug">
                <li>IPFS: {this.state.ipfsHash}</li>
                <li>Lister: {this.state.lister}</li>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="buy-box">
                <div>
                  <span>Daily Price</span>
                  <span className="price">
                    {Number(price).toLocaleString(undefined, {minimumFractionDigits: 3})} PPS
                  </span>
                </div>
                {this.props.listingId &&
                  <div>
                    <span>Total Price</span>
                    <span className="price">
                      {Number(this.calcTotalPrice()).toLocaleString(undefined, {minimumFractionDigits: 3})} PPS
                    </span>
                  </div>
                }
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

                <div>
                  
                  {
                    this.props.listingId &&
                    <button
                      className="button"
                      onClick={this.handleBooking}
                      disabled={!this.props.listingId || !this.state.checkInDate || !this.state.checkOutDate}
                      onMouseDown={e => e.preventDefault()}
                      >
                        Book Now
                    </button>
                  
                  }
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
