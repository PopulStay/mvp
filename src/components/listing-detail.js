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
import Modal from 'react-modal';
import EthereumQRPlugin from 'ethereum-qr-code';
const qr = new EthereumQRPlugin();
const customStyles = {
  content : {
    top                   : '20%',
    left                  : '35%',
    right                 : '35%',
    bottom                : '20%'
  }
};

class ListingsDetail extends Component {

  constructor(props) {
    super(props)

    this.CONST = {
      weiToEther: 1000000000000000000,
      weiToGwei:1000000000
    }

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
      ethPrice:"Loading...",
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
      neighbourhood:0,
      neighbourhoodurl:'../images/detail-content-map.png',
      neighbourhoodlist:[
          {name:'Afian',time:'March 2018',imgurl:'../images/Guest1.png',Reviews:'Excellent location near Changi Business Park. Very accessible with the new downtown line MRT at upper changi road east'},
          {name:'Lenie',time:'December 2017',imgurl:'../images/Guest2.png',Reviews:'I was quite skeptical in booking AirBnB in the past as I always thought of  trouble in staying other peoples houses. I always book a hotel to stay for myself and my family everytime they travel to Singapore. A friend recomended AirBnB to get an affordable yet convenient locati…Read more'},
          {name:'Kay',time:'November 2017',imgurl:'../images/Guest3.png',Reviews:'It’s my partner’s first time in Singapore and I could not have asked for a wonderful place to stay than Eddie’s. The house is stylish and comfy plus the location is superb, very near to the new MRT line and close to the airport too. Our 7 days stay was even amazing with the hosp…Read more'},
          {name:'Lina',time:'August 2017',imgurl:'../images/Guest4.png',Reviews:'Eddie and Edwin are really the best host! Susan is so friendly and she is really a great helper. Thank you so much for this best experience with Airbnb! Will definitely book this place again.'},
          {name:'Afian',time:'March 2018',imgurl:'../images/Guest1.png',Reviews:'Excellent location near Changi Business Park. Very accessible with the new downtown line MRT at upper changi road east'},
          {name:'Lenie',time:'December 2017',imgurl:'../images/Guest2.png',Reviews:'I was quite skeptical in booking AirBnB in the past as I always thought of  trouble in staying other peoples houses. I always book a hotel to stay for myself and my family everytime they travel to Singapore. A friend recomended AirBnB to get an affordable yet convenient locati…Read more'},
          {name:'Kay',time:'November 2017',imgurl:'../images/Guest3.png',Reviews:'It’s my partner’s first time in Singapore and I could not have asked for a wonderful place to stay than Eddie’s. The house is stylish and comfy plus the location is superb, very near to the new MRT line and close to the airport too. Our 7 days stay was even amazing with the hosp…Read more'},
          {name:'Lina',time:'August 2017',imgurl:'../images/Guest4.png',Reviews:'Eddie and Edwin are really the best host! Susan is so friendly and she is really a great helper. Thank you so much for this best experience with Airbnb! Will definitely book this place again.'}
      ],
      ethBalance:0,
      modalIsOpen: false,
      qrurl:""
    }
    this.handleBooking = this.handleBooking.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }



  loadListing() {
    var ipfsHash = houselistingService.getIpfsHashFromBytes32(this.props.listingId);
    houselistingService.getHouseInfoDetail(this.props.listingId)
    .then((result) => {
        var roominfo = JSON.parse(result._roominfo);
        this.setState({price:result._price,category:roominfo.category,location:roominfo.location,beds:roominfo.beds,lister:result._owner,ethPrice:result._ethPrice});
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

    web3Service.getETHBalance(window.address).then((data)=>{
      this.setState({ ethBalance:data/this.CONST.weiToGwei});
    });
  
  }

  handleBooking() {
    let unitsToBuy = 0;

    if (this.state.checkInDate && this.state.checkOutDate) {
      unitsToBuy = this.state.checkOutDate.diff(this.state.checkInDate, 'days');
    }
    this.setState({step: this.STEP.SUBMIT});
    var promise;

    if( this.state.priceActive == 1 )
    {
      promise =    ppsService.setPreOrder(          
                                           this.state.lister,
                                           this.state.price * unitsToBuy,
                                           this.props.listingId, 
                                           this.state.checkInDate.toDate().getTime(), 
                                           this.state.checkOutDate.toDate().getTime(),
                                           unitsToBuy
                                          );

    }else
    {

      if( this.state.ethPrice * unitsToBuy > this.state.ethBalance )
      {
        var to    = window.address;
        var value = this.state.ethPrice * unitsToBuy*this.CONST.weiToGwei;
        qr.toDataUrl({
            to    : window.address,
            value : value,
            gas   : window.gas
        }).then((qrCodeDataUri)=>{
        this.setState({qrurl:qrCodeDataUri.dataURL}); //'data:image/png;base64,iVBORw0KGgoA....'
        })

        this.openModal();
        web3Service.getBalanceForCharge(to,value).then((balance) =>{
        this.closeModal();
        promise =    houselistingService.setPreOrderByETH(          
                                         this.state.lister,
                                         this.state.ethPrice * unitsToBuy,
                                         this.props.listingId, 
                                         this.state.checkInDate.toDate().getTime(), 
                                         this.state.checkOutDate.toDate().getTime(),
                                         unitsToBuy
                                        );
         });
         return ;
      }
      else
      {
        promise =    houselistingService.setPreOrderByETH(          
                                         this.state.lister,
                                         this.state.ethPrice * unitsToBuy,
                                         this.props.listingId, 
                                         this.state.checkInDate.toDate().getTime(), 
                                         this.state.checkOutDate.toDate().getTime(),
                                         unitsToBuy
                                        );
      }
    }

 
    promise.then((transactionReceipt) => {
      console.log("Purchase request sent.")
      this.setState({step: this.STEP.PROCESSING})
      return ppsService.waitTransactionFinished(transactionReceipt)
    })
    .then((blockNumber) => {
      this.setState({step: this.STEP.PURCHASED})
    })
    .catch((error) => {
      console.log(error)
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

  neighbourhood(e){
    var DataIndex = e.currentTarget.getAttribute('data-index');
    if(DataIndex == 1){
      this.setState({state: this.state.neighbourhoodurl = "../images/detail-transport.jpg"})
    }else if(DataIndex == 2){
      this.setState({state: this.state.neighbourhoodurl = "../images/detail-res.jpg"})
    }else if(DataIndex == 3){
      this.setState({state: this.state.neighbourhoodurl = "../images/detail-pps.jpg"})
    }else if(DataIndex == 4){
      this.setState({state: this.state.neighbourhoodurl = "../images/detail-shop.jpg"})
    }else if(DataIndex == 5){
      this.setState({state: this.state.neighbourhoodurl = "../images/detail-museum.jpg"})
    }else if(DataIndex == 6){
      this.setState({state: this.state.neighbourhoodurl = "../images/detail-guide.jpg"})
    }else{
      this.setState({state: this.state.neighbourhoodurl = "../images/detail-content-map.png"})
    }
  }

  render() {
    const price = typeof this.state.price === 'string' ? 0 : this.state.price;
    const guestItems = [];
    this.state.guests.forEach((guest,index)=>{
      guestItems.push(<li><a onClick={this.Guests.bind(this,guest)} >{guest}</a></li>)
    })

    const neighbourhoods = [];
    this.state.neighbourhoodlist.forEach((item,index)=>{
      neighbourhoods.push(
          <li>
              <div className="GuestName">
                  <img src={item.imgurl} alt="" />
                  <div>
                      <p>{item.name}</p>
                      <p>{item.time}</p>
                  </div>
              </div>
              <p className="GuestDiv">{item.Reviews}</p>
          </li>
      )
    })
    return (  

<div> 
      <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <h3 ref={subtitle => this.subtitle = subtitle}>Your balance is not enough,SCAN QR to pay</h3>
          <br/>
            <div className="listing-card">
            <img className="photo" src={this.state.qrurl}  />
            </div>
          <br/>
        </Modal>

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
            <p>{this.state.neighbourhoodlist.length} Reviews</p>
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

        <div className="ReviewsDiv">
            <ul>
                <li>
                  <p>Accuracy</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
                <li>
                  <p>Location</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
                <li>
                  <p>Communication</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
                <li>
                  <p>Check In</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
                <li>
                  <p>Cleanliness</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
                <li>
                  <p>Value</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
            </ul>
        </div>

        <div className="ReviewsGuest">
          <ul>
            {neighbourhoods}
          </ul>
        </div>

        <div className="neighbourhood">
            <p>See the neighbourhood</p>
            <img src={this.state.neighbourhoodurl} alt="" />
            <ul>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='1'><img src="../images/transport.png" alt="" /> Public Transit</li>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='2'><img src="../images/res.png" alt="" /> Restaurant</li>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='3'><img src="../images/pps.png" alt="" /> PPS Enabled</li>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='4'><img src="../images/shop.png" alt="" /> Shopping Center</li>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='5'><img src="../images/museum.png" alt="" /> Souvenir Shop</li>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='6'><img src="../images/guide.png" alt="" />Guide</li>
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
