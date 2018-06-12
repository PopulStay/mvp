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


const qr = new EthereumQRPlugin();

class ListingsDetail extends Component {

  constructor(props) {
    super(props)

    this.CONST = {
      weiToEther: 1000000000000000000,
      weiToGwei:1000000000,
      weiToUSD:1000000,
      
    }

    this.STEP = {
      VIEW: 1,
      SUBMIT: 2,
      PROCESSING: 3,
      PURCHASED: 4,
    }
    
    this.state = {
      category: "Loading...",
      user: "Loading...",
      ppsPrice: 0,
      ethPrice:0,
      usdPrice:0,
      Total_price:0,
      ipfsHash: null,
      lister: null,
      pictures: [],
      step: this.STEP.VIEW,
      totalPrice: 0,
      slides:[],
      currentActive:0,
      descriptioninfo:{},
      guests:[1,2,3,4,5,6],
      guest: 1,
      price:0,
      priceActive:1,
      priceCurrency:"PPS",
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
      usddatalist:[],
      modalIsOpen: false,
      qrurl:"",
      DateLists:[],
      Progress:0,
      Progresshide:0,
      languagelist:{},
    }
    this.handleBooking = this.handleBooking.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    languageService.language();
  }

  componentWillUnmount(){
    window.location.reload();
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
    console.log(this.props)
    var ipfsHash = houselistingService.getIpfsHashFromBytes32(this.props.listingId);
    var slideArray = this.state.slides;

    houselistingService.getHouseInfoDetailFromDB(this.props.listingId).then((data)=>{

      this.processLoadHouseInfo(ipfsHash,slideArray,data);
      
    })
  }

  processLoadHouseInfo = (ipfsHash,slideArray,data)=>{

    var houseInfoDetailPromise ;


    if(data.generateSmartContract ==0 || data.generateSmartContract=="0" )
    {
       //without smart contract
        var roominfo = data.roominfo;
        this.setState({ppsPrice:Number(data.price).toFixed(3),
          category:roominfo.category,
          location:roominfo.location,
          beds:roominfo.beds,
          lister:data.hostAddress,
          ethPrice:(data.ethprice/this.CONST.weiToGwei).toFixed(3),
          usdPrice: data.usdprice});
            //slideArray.push();

          this.setState({Progress:this.state.Progress+50})
          if (this.state.Progress>=100) {
                  this.timerID = setTimeout(
                    () => this.setState({Progresshide:1}),
                    1000
                  );
                }
        
         houseInfoDetailPromise = ipfsService.getListing(ipfsHash);
    }
    else if (data.generateSmartContract ==1 || data.generateSmartContract=="1" )
    {
      
         //with smart contract 
      houseInfoDetailPromise =  houselistingService.getHouseInfoDetail(this.props.listingId)
        .then((result) => {
            var roominfo = JSON.parse(result._roominfo);
            this.setState({ppsPrice:result._price,category:roominfo.category,location:roominfo.location,beds:roominfo.beds,lister:result._owner,ethPrice:(result._ethPrice/this.CONST.weiToGwei).toFixed(3),usdPrice:result._ethPrice/this.CONST.weiToUSD});
            //slideArray.push();

          this.setState({Progress:this.state.Progress+50})
          if (this.state.Progress>=100) {
                  this.timerID = setTimeout(
                    () => this.setState({Progresshide:1}),
                    1000
                  );
                }
        
              return ipfsService.getListing(ipfsHash)
        });
    }else
    {
      alert("error");
      return ;
    }

     


        houseInfoDetailPromise.then((result)=>{
              var descriptioninfo = result;
          console.log(descriptioninfo)
             this.setState({descriptioninfo:descriptioninfo});
             if(descriptioninfo.selectedPictures && descriptioninfo.selectedPictures.length>0 && descriptioninfo.selectedPictures[0].imagePreviewUrl)
             {
              this.setState({previewurl:descriptioninfo.selectedPictures[0].imagePreviewUrl});
              this.setState({Progress:this.state.Progress+50})
              if (this.state.Progress>=100) {
                  this.timerID = setTimeout(
                    () => this.setState({Progresshide:1}),
                    1000
                  );
                }

              for(var i =0 ;i < descriptioninfo.selectedPictures.length;i++)
              {
                var slide ={};
                slide.imgageUrl = descriptioninfo.selectedPictures[i].imagePreviewUrl;
                slideArray.push(slide);
                this.setState({Progress:this.state.Progress+50})

                if (this.state.Progress>=100) {
                  this.timerID = setTimeout(
                    () => this.setState({Progresshide:1}),
                    1000
                  );
                }
              }

              this.setState({slides:slideArray});
             }



        }).catch((error) => {
          console.error(error);
        });


  }
  

  componentWillMount() {
    this.setState({ languagelist:window.languagelist });


    if (this.props.listingId) {
      //this.loadOrdered(this.props.listingId);
      this.loadListing();
     
    }
  
    if(window.address)
    {
      web3Service.getETHBalance(window.address).then((data)=>{
        this.setState({ ethBalance:data/this.CONST.weiToGwei});
      });
    }

    if(window.data){
      this.setState({ user:window.data.user});
    }else{
      guestService.getGuesterInfo(window.address).then((data)=>{
        this.setState({ user:data.user});
        window.data = data;
      });
    }
  
  }


  isDayBlocked(day){
    var dayS = new Date(day).getTime();
    var DateLists = this.state.DateLists;
    for(var i=0;i<DateLists.length;i++){
      if(dayS>DateLists[i].start-86400000 && dayS<DateLists[i].end+43200000){
        console.log(new Date(dayS));
        return new Date(dayS);
      }
    }
  } 
      


  // loadOrdered = (id) =>{
  //     houselistingService.getHouseInfoById(id).then((data)=>{
  //       if(data)
  //       {
  //         var slide ={};
  //         slide.imgageUrl = data.profile.previewImage;
  //         this.state.slides.push(slide);
  //       }

  //       if(data.bookedDate != undefined ){
  //           this.setState({DateLists: data.bookedDate.data});
  //       }
  //     });
  // }

  handleBooking() {
    console.log(this.state.descriptioninfo)
    let unitsToBuy = 0;
    if(this.state.price == 0){
        var Total_price = this.state.ppsPrice * this.DateDays() + 26
    }else{
        var Total_price = this.state.price * this.DateDays() + 26
    }


    if (this.state.checkInDate && this.state.checkOutDate) {
      unitsToBuy = this.state.checkOutDate.diff(this.state.checkInDate, 'days');
    }
    this.setState({step: this.STEP.SUBMIT});
    var promise;

    if( this.state.priceActive == 1 )
    {
      promise = ppsService.setPreOrder(          
       this.state.lister,
       Total_price * unitsToBuy,
       this.props.listingId, 
       this.state.checkInDate.toDate().getTime(), 
       this.state.checkOutDate.toDate().getTime(),
       unitsToBuy
      );

    } 
    else if( this.state.priceActive == 2 )
    {

        promise = ppsService.setOrderByUSD(          
           this.state.lister,
           Total_price * unitsToBuy,
           this.props.listingId, 
           this.state.checkInDate.toDate().getTime(), 
           this.state.checkOutDate.toDate().getTime(),
           unitsToBuy
        );
        this.setState({step:this.STEP.PURCHASED})
         return ;

    }else
    {

      if( Total_price * unitsToBuy > this.state.ethBalance )
      {
        var to    = window.address;
        var value = Total_price * unitsToBuy*this.CONST.weiToGwei;
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
                                         Total_price * unitsToBuy,
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
                                         Total_price * unitsToBuy,
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

  DateDays() {
    if (this.state.checkInDate && this.state.checkOutDate) {
      let days = this.state.checkOutDate.diff(this.state.checkInDate, 'days');
      return days
    }
    return 0
  }

  calcTotalPrice() {
    if(this.state.price == 0){
      return this.state.ppsPrice * this.DateDays()
    }
    else{
      return this.state.price * this.DateDays()
    }
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
    const language = this.state.languagelist;
    const price = typeof this.state.ppsPrice === 'string' ? 0 : this.state.ppsPrice;
    const guestItems = [];
    this.state.guests.forEach((guest,index)=>{
      guestItems.push(<li><a onClick={this.Guests.bind(this,guest)} >{guest} {language.guests}</a></li>)
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
      <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} 
        contentLabel="Wallet Message">
        <div className="modalcode">
          <h3 ref={subtitle => this.subtitle = subtitle}>Your balance is not enough,SCAN QR to pay</h3>
          <br/>
            <div className="listing-card">
            <img className="photo" src={this.state.qrurl}  />
            </div>
          <br/>
          <button onClick={(e) => {this.closeModal(e)}} >Cancel</button>
        </div>  
      </Modal>

       {this.state.step===this.STEP.METAMASK &&
          <Overlay imageUrl="/images/spinner-animation.svg">
            <p>Confirm transaction</p>
            <p>Press &ldquo;Submit&rdquo; in MetaMask window</p>
          </Overlay>
        }

        {this.state.step===this.STEP.PROCESSING &&
          <Overlay imageUrl="/images/spinner-animation.svg">
            <p>Processing your booking</p>
            <p>Please stand by...</p>
          </Overlay>
        }

        {this.state.step===this.STEP.PURCHASED &&
          <Overlay imageUrl="/images/circular-check-button.svg">
            <p>Booking was successful.</p>
            <button><a href="#" onClick={()=>window.location.reload()}>Reload page</a></button>
          </Overlay>
        }

      <div className="carousel-slider">
      <Carousel>
       {this.state.slides.map(slide => (
        <div className="carousel-inner item" style={{backgroundImage:"url("+slide.imgageUrl+")"}}>
        </div>
         ))}
      </Carousel>
      </div>

      <div className="detail-content container">
        <div className={this.state.Progresshide == 1 ? "Progress hide" : "Progress"}><p style={{width:this.state.Progress+"%"}}></p></div>
      <div >
      <div className="col-sm-12 col-md-12 col-lg-7">
        <div className="L_box1 col-sm-8 col-md-9">
          <p className="text1">{this.state.descriptioninfo.roomtype_category}</p>
          <p className="text2">{this.state.descriptioninfo.roomdescription_title}</p>
          <div className="box1_list col-lg-9">
            <p><img src="../images/detail-img02.png" alt="" />{this.state.descriptioninfo.roombasics_totalguests} {language.guests}</p>
            <p><img src="../images/detail-img01.png" alt="" />{this.state.descriptioninfo.roombasics_guestbedrooms} {language.bedroom}</p>
            <p><img src="../images/detail-img05.png" alt="" />{this.state.beds} {language.bed}</p>
            <p><img src="../images/detail-img03.png" alt="" />{this.state.pictures.length} {language.private_bath}</p>
          </div>
        </div>


        <div className="L_box2 col-sm-3 col-md-3">
          <div className="BOX__logo">
            <img src={this.state.previewurl} alt="" />
          </div>
          <div className="BOX__user">
            <h4>{this.state.user}</h4>
            <img className="BOX2img" src="../images/detail-list.png" alt="" />
          </div>
        </div>


        <div className="L_TEXT1">{this.state.descriptioninfo.roomdescription_description}</div>
        <p className="More hide">{language.Read_more}<span>▼</span></p>

        <div className="L_box3">
          <h5>{language.Amenities}</h5>
          <p className={ this.state.descriptioninfo.roomstuff_Shampoo==1 ?  'show' : 'hide' }><img src="../images/detail-img07.png" alt="" />{language.Shampoo}</p>
          <p className={ this.state.descriptioninfo.roomstuff_breakfastcoffetea==1 ?  'show' : 'hide' }><img src="../images/detail-img08.png" alt="" />{language.Breakfast}</p>
          <p className={ this.state.descriptioninfo.roomstuff_TV==1 ?  'show' : 'hide' }><img src="../images/detail-img09.png" alt="" />{language.TV}</p>
          <p className={ this.state.descriptioninfo.roomstuff_Closet_drwers==1 ?  'show' : 'hide' }><img src="../images/detail-img10.png" alt="" />{language.Kitchen}</p>
          <p className={ this.state.descriptioninfo.roomstuff_aircondition==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Air_conditioning}</p>
          <p className={ this.state.descriptioninfo.roomstuff_Closet_drwers==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Closet_drawers}</p>
          <p className={ this.state.descriptioninfo.roomstuff_Heat==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Heat}</p>
          <p className={ this.state.descriptioninfo.roomstuff_breakfastcoffetea==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Breakfast_coffe_tea}</p>
          <p className={ this.state.descriptioninfo.roomstuff_desk_workspace==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Desk_workspace}</p>
          <p className={ this.state.descriptioninfo.roomstuff_fireplace==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Fireplace}</p>
          <p className={ this.state.descriptioninfo.roomstuff_iron==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Iron}</p>
          <p className={ this.state.descriptioninfo.roomstuff_hairdryer==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Hair_dryer}</p>
          <p className={ this.state.descriptioninfo.roomstuff_petsinhouse==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Pets_in_the_house}</p>
          <p className={ this.state.descriptioninfo.roomstuff_private_entrance==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Private_entrance}</p>
          <p className={ this.state.descriptioninfo.roomstuff_smoke_detector==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Smoke_detector}</p>
          <p className={ this.state.descriptioninfo.roomstuff_Pool==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Pool}</p>
          <p className={ this.state.descriptioninfo.roomstuff_kitchen==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.kitchen}</p>
          <p className={ this.state.descriptioninfo.roomstuff_washer==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Laundry_washer}</p>
          <p className={ this.state.descriptioninfo.roomstuff_dryer==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Laundry_dryer}</p>
          <p className={ this.state.descriptioninfo.roomstuff_Park==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Park}</p>
          <p className={ this.state.descriptioninfo.roomstuff_Lift==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Lift}</p>
          <p className={ this.state.descriptioninfo.roomstuff_HotTub==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Hot_tub}</p>
          <p className={ this.state.descriptioninfo.roomstuff_Gym==1 ?  'show' : 'hide' }><img src="../images/detail-img11.png" alt="" />{language.Gym}</p>
          <p><img src="../images/detail-img12.png" alt="" />{language.WIFI}</p>
        </div>

        <p className="More hide">{language.Show_all_amenities}<span>▼</span></p>
        <div className="L_box4">
            <h5>{language.Sleeping_arr_7_amenities}</h5>
            <img src="../images/detail-img06.png" alt="" />
        </div>

        <div className="L_box5">
            <h5>{language.House_Rules}</h5>
            <p>{language.Checkin_is_anytime_after_2PM}</p>
            <p>{language.Check_out_by_12PM}</p>
        </div>

        <p className="More hide">Dead all rules<span>▼</span></p>
        <div className="L_box6">
            <h5>{language.Cancellations}</h5>
            <p>{language.Strict}</p>
            <p>{language.Cancel_up_to_7_days_before_check}<span>{language.Read_more}</span></p>
        </div>
        
        <p className="More box6_More hide">{language.Get_details}</p>

        <div className="Reviews">
            <p>{this.state.neighbourhoodlist.length} {language.Reviews}</p>
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
              <input type="text" className="form-control" placeholder={language.Search_Reviews} />
            </div>
        </div>

        <div className="ReviewsDiv">
            <ul>
                <li>
                  <p>{language.Accuracy}</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
                <li>
                  <p>{language.Location}</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
                <li>
                  <p>{language.Communication}</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
                <li>
                  <p>{language.heck_In}</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
                <li>
                  <p>{language.Cleanliness}</p>
                  <div className="divxx">
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx01.png" alt="" />
                    <img src="../images/detail-xx02.png" alt="" />
                  </div>
                </li>
                <li>
                  <p>{language.Value}</p>
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
            <p>{language.See_the_neighbourhood}</p>
            <img src={this.state.neighbourhoodurl} alt="" />
            <ul>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='1'><img src="../images/transport.png" alt="" /> {language.Public_Transit}</li>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='2'><img src="../images/res.png" alt="" /> {language.Restaurant}</li>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='3'><img src="../images/pps.png" alt="" /> {language.PPS_Enabled}</li>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='4'><img src="../images/shop.png" alt="" /> {language.Shopping_Center}</li>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='5'><img src="../images/museum.png" alt="" /> {language.Souvenir_Shop}</li>
                <li onClick={(e)=>this.neighbourhood(e)} data-index='6'><img src="../images/guide.png" alt="" />{language.Guide}</li>
            </ul>
        </div>
      </div>
      <div className=" col-sm-12 col-md-12 col-lg-5">
      <div className="detail-summary">
          <ul>
              <li onClick={(e) => {this.setState({priceActive:1,priceCurrency:"PPS",price:this.state.ppsPrice})}} className={this.state.priceActive == 1 ? 'active' : ''} >PPS</li>
              <li onClick={(e) => {this.setState({priceActive:0,priceCurrency:"ETH",price:this.state.ethPrice})}} className={this.state.priceActive == 0 ? 'active' : ''}>ETH</li>
              <li onClick={(e) => {this.setState({priceActive:2,priceCurrency:"USD",price:this.state.usdPrice})}} className={this.state.priceActive == 2 ? 'active' : ''}>USD</li>
          </ul>

          
          <div className="detail-price-div">
              
              <span className = "detail-price">
                {this.state.priceCurrency}: {this.state.price == 0 ? this.state.ppsPrice : this.state.price}
              </span>
              <span className = "detail-price-font">{language.Daily_Price}</span>
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
                    startDatePlaceholderText={language.Check_In}
                    endDatePlaceholderText={language.Check_Out}
                    endDateId="end_date"
                    onDatesChange={({ startDate, endDate }) => {this.setState({checkInDate: startDate, checkOutDate: endDate })}}
                    focusedInput={this.state.focusedInput}
                    isDayBlocked={day=>this.isDayBlocked(day)}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                    readOnly
                    numberOfMonths
                  />
              }
              </div>

              <div className="detail-guest-div">
                <p>{language.Guest}</p>
                <div className="btn-group">
                  <button type="button" data-toggle="dropdown" >{this.state.guest} {language.guests}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                    { guestItems }
                  </ul>
                </div>
              </div>

              <div className ="details-totalprice-div">
                <ul>
                    <li className="blueColor">
                      <span className = "LeftSpan"><b className="pricesize">{this.state.priceCurrency} : </b>{this.state.price == 0 ? this.state.ppsPrice : this.state.price}×{this.DateDays()}{language.nights}
                          <img src="../images/detail-img13.png" />
                      </span>
                      <span className = "RightSpan">{(this.state.price) * this.DateDays() * this.state.guest}</span>
                    </li>
                    <li className="pinkColor">
                      <span className = "LeftSpan">{language.Special_Offer_20_off}
                          <img src="../images/detail-img13.png" />
                      </span>
                      <span className = "RightSpan">0</span>
                    </li>
                    <li className="pinkColor">
                      <span className = "LeftSpan">{language.Long_stay_discount}
                          <img src="../images/detail-img13.png" />
                      </span>
                      <span className = "RightSpan">0</span>
                    </li>
                    <li className="blueColor">
                      <span className = "LeftSpan">{language.Total_Price}</span>
                      <span className = "RightSpan">
                        {this.state.priceCurrency}: { this.calcTotalPrice()}
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
                        {language.Book}
                    </button>
                }    

            
             <h4 className="text-center">{language.You_wont_be_charged_yet}</h4>
             </div>

        </div>
      

      </div>
      </div>
      </div>
       <Video listingId={this.props.listingId}/>
      </div>
 </div>     
    )
  }
}

export default ListingsDetail
