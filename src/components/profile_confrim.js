import React from 'react';
import ReactDOM from 'react-dom';
import Timestamp from 'react-timestamp';
import ppsService from '../services/pps-service';
import { Link } from 'react-router-dom';
import Overlay from './overlay';
import web3Service from '../services/web3-service';
import EthereumQRPlugin from 'ethereum-qr-code';
import Modal from 'react-modal';
import houselistingService from '../services/houseinfolist-service';
import languageService from '../services/language-service';

const qr = new EthereumQRPlugin();

class Confrim extends React.Component {
  constructor(props) {
    super(props);

    this.CONST = {
      weiToEther: 1000000000000000000,
      weiToGwei:1000000000,
      GweiToEther:1000000000,
      weiToUSD:1000000,
      
    }

    this.STEP = {
      VIEW: 1,
      SUBMIT: 2,
      PROCESSING: 3,
      PURCHASED: 4,
      Insufficient: 5,
    }

    this.state = {
      step: this.STEP.VIEW,
      ppsBalance:0,
      checkInDate:"",
      checkOutDate:"",
      guest:0,
      Total_price:0,
      DateDays:0,
      price:0,
      priceActive:0,
      ethBalance:0,
      modalIsOpen: false,
      qrurl:"",
      languagelist:{},
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    web3Service.loadWallet();
    languageService.language();
  }

  componentWillMount() {
    if(window.address)
    {
      web3Service.getETHBalance(window.address).then((data)=>{
        this.setState({ ethBalance:data/this.CONST.weiToEther});
      });

      ppsService.getBalance(window.address).then((data)=>{
        this.setState({state:this.state.ppsBalance=data});
      });
    }
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


  
  componentDidMount() {
    var windowUrl = window.location.href;
    var url = windowUrl.split("&");
    for(var i = 0;i<url.length;i++){
        url[i] = url[i].split("=");
        this.setState({
          checkInDate:String(url[0][1]),
          checkOutDate:String(url[1][1]),
          Total_price:Number(url[2][1]),
          guest:url[3][1],
          DateDays:url[4][1],
          price:url[5][1],
          priceActive:url[6][1],
          lister:url[7][1],
          listingId:url[8][1],
        })
    }

    this.setState({ languagelist:window.languagelist });
  }

  booking(){
    var promise;
    if( this.state.priceActive == 1 )
    {
      if(this.state.ppsBalance-0 < this.state.Total_price-0){
        this.setState({step:this.STEP.Insufficient});
      }else{
        promise = ppsService.setPreOrder(          
         this.state.lister,
         parseInt(this.state.Total_price),
         this.state.listingId, 
         this.state.checkInDate, 
         this.state.checkOutDate,
         this.state.DateDays
        );
      }

    }
    else if( this.state.priceActive == 2 )
    {

        promise = ppsService.setOrderByUSD(          
           this.state.lister,
           this.state.Total_price,
           this.state.listingId, 
           this.state.checkInDate, 
           this.state.checkOutDate,
           this.state.DateDays
        );
        this.setState({step:this.STEP.PURCHASED})
         return ;

    }else
    {
      if( this.state.Total_price > this.state.ethBalance )
      {
        var to    = window.address;
        var value = this.state.Total_price;
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
                                         this.state.Total_price,
                                         this.state.listingId, 
                                         this.state.checkInDate, 
                                         this.state.checkOutDate,
                                         this.state.DateDays
                                        );
         });
         return ;
      }
      else
      {
        promise =    houselistingService.setPreOrderByETH(          
                                         this.state.lister,
                                         this.state.Total_price,
                                         this.state.Total_price * this.CONST.GweiToEther,
                                         this.state.listingId, 
                                         this.state.checkInDate, 
                                         this.state.checkOutDate,
                                         this.state.DateDays
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

  render() {
      const language = this.state.languagelist;
    return (
      <div className="Confrim">
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
            <button><a href="" onClick={()=>window.location.reload()}>Reload page</a></button>
          </Overlay>
        }

        {this.state.step===this.STEP.Insufficient &&
          <Overlay imageUrl="/images/circular-check-button.svg">
            <p>{language.Insufficient_balance}</p>
            <Link to='/managepanel'>
              <button className="balance">{language.Deposit}</button>
            </Link>
          </Overlay>
        }

          <h3>{language.Youre_going_to} Melbourne!</h3>
          <div className="box1"><p className="Left">{language.Reservation_code}: HMFTDP9Q48. <span className="color-pink">{language.View_receipt}</span> or <span className="color-pink">{language.make_a_change_to_the_reservation}.</span></p><p className="Right">{language.Print}</p></div>

          <div className="box2">
            <div className="box3 col-sm-12 col-md-7 col-lg-7">
              <div className="box3_1">
                <p className="Left"><b>{language.Guests}</b> <p> {this.state.guest} {language.of} 3 {language.accepted}</p></p>
                <button className="Right">{language.Manage_Guests}</button>
              </div>
  
              <div className="box3_2">
                <div className="userlist">
                  <div><img src="/images/uesrimg.png" /></div>
                  <p className="text1">user</p>
                  <p className="text2">{language.Accepted}</p>
                </div>
              </div>
 
              <div className="box3_3">
                <div className="divleft col-sm-6 col-md-6 col-lg-6"><b>{language.Check_In}</b> <p className="Right"><Timestamp time={this.state.checkInDate.substring(0,10)} format='date'/><br/>{language.After1PM}</p></div>
                <div className="divright col-sm-6 col-md-6 col-lg-6"><b>{language.Check_Out}</b> <p className="Right"><Timestamp time={this.state.checkOutDate.substring(0,10)} format='date'/> <br/>{language.After1PM}</p></div>
              </div> 

              <div className="box3_4">
                <div className="col-sm-4 col-md-4 col-lg-4"><b>{language.Address}</b></div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                <p>339 Swanston Street Apartment 506 Melbourne, VIC 3000 Australia</p>
                <p><span className="color-pink">{language.Get_directions}</span>&nbsp;&nbsp;|&nbsp;&nbsp;<span className="color-pink">{language.View_listing}</span></p>
                </div>
              </div>

              <div className="box3_4">
                <div className="col-sm-4 col-md-4 col-lg-4"><b>{language.Guidebook}</b></div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                <p>Mo {language.recommended1place_to_visit_near_your_listing} </p>
                <p><span className="color-pink">{language.See} Mo’s {language.recommendations}</span></p>
                </div>
              </div>

              <div className="box3_4">
                <div className="col-sm-4 col-md-4 col-lg-4"><b>{language.House_Rules}</b></div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <p>{language.Not_suitable_for_pets}</p> 
                  <p>{language.No_parties_or_events}</p> 
                  <p>{language.Not_safe_or_suitable_for_infants}</p>
                  <p>{language.Checkin_is_anytime_after_1PM}</p>
                  <p className="fdx"></p>
                  <p>{language.House_Rules1}</p>
                  <span className="color-pink">+ {language.more}</span>
                  <p className="fontWeight">{language.You_also_acknowledge}:</p>
                  <p>{language.Amenity_limitations}</p>
                </div>
              </div>

              <div className="box3_4">
                <div className="col-sm-4 col-md-4 col-lg-4"><b>{language.Billing}</b></div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <div className="overflow"><p className="Left">{this.state.DateDays} {language.nights} {language.total}</p><p className="Right">{this.state.priceActive == 0 && "ETH"}{this.state.priceActive == 1 && "PPS"}{this.state.priceActive == 2 && "USD"} &nbsp;&nbsp; {this.state.priceActive == 0 || this.state.priceActive == 2 ? this.state.Total_price.toFixed(5) : this.state.Total_price}</p></div> 
                  <div className="overflow"><p className="Left">{language.Per_guest}</p><p className="Right">{this.state.priceActive == 0 && "ETH"}{this.state.priceActive == 1 && "PPS"}{this.state.priceActive == 2 && "USD"} &nbsp;&nbsp; {this.state.price}</p></div> 
                  <p><span className="color-pink">{language.Detailed_receipt}</span></p>
                </div>
              </div>

              <div className="box3_5">
                <div className="col-sm-4 col-md-4 col-lg-4"><b>{language.Need_help}</b></div>
                <div className="col-sm-8 col-md-8 col-lg-8">
                  <p>{language.Visit_the} <span className="color-pink">{language.Help_Center}</span></p>
                </div>
              </div>


            </div>
            <div className="box4 col-sm-12 col-md-5 col-lg-5">
              <div className="box5">
                  <div><div className="hostimg"><img src="/images/uesrimg.png" /></div></div>
                  <p><b>{language.Your_host} Mo</b></p> 
                  <p>{language.Request_a_landlord}</p>
                  <button onClick={(e)=>this.booking(e)}>{language.Send_or_request_money}</button>
              </div>

              <div className="box6">
                <img src="./images/detail-carousel.jpg" />
              </div>

              <div className="box7">
                  <p><b>{language.Directions}</b></p>
                  <p>{language.Directions_introduction1}</p>
                  <p>{language.Directions_introduction2}</p>
                  <span className="color-pink">+ {language.more}</span>
              </div>

              <div className="box8"></div>

              <div className="box7">
                  <p><b>{language.House_Manual}</b></p>
                  <p>{language.House_Manual1}</p>
                  <p>{language.House_Manual2}</p>
                  <p>{language.House_Manual3}</p>
                  <span className="color-pink">+ {language.more}</span>
              </div>


            </div>
          </div>
      </div>
    );
  }
}
export default Confrim
