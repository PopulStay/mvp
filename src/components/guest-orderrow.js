import React, { Component } from 'react';
import orderService from '../services/order-service';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import languageService from '../services/language-service';
import guestService from '../services/guest-service';
import Overlay from './overlay';
import Modal from 'react-modal';

class GuestOrderRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      status: "Loading...",
      houseInformation: "Loading...",
      from:"Loading",
      to:"Loading",
      price:"Loading",
      ethPrice:"Loading",
      url:"",
      languagelist:{},
      Comment:'',
    }

    this.checkIn   = this.checkIn.bind(this);
    this.Reviews   = this.Reviews.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    languageService.language();
  }



   checkIn(){
      var ethOrPPS;

    if( this.props.item.price != 0 || this.props.item.price != '0' )
    {
      ethOrPPS = 'PPS';
    }
    else
    {
      ethOrPPS = 'ETH';
    }

    orderService.confirm( 
                           this.props.item.guestaddress ,
                           ethOrPPS ,
                           this.props.item.from,
                           this.props.item.to,
                           this.props.item.houseinfoid

      ).then((tx)=>{
      console.log(tx)
      this.setState({state:4});
       return orderService.waitTransactionFinished(tx)
     }).then((blockNumber) => {
      this.setState({ status: '1' })
    }).catch((error) => {
      console.error(error);
    });
    this.setState({checkInOpen: false});

     ;
  }
  componentDidMount() {
    console.log(this.props)
    this.setState({
      houseinfoid:this.props.item.houseinfoid,
      from:this.props.item.from,
      to:this.props.item.to,
      price:this.props.item.price,
      ethprice:this.props.item.ethprice,
      usdprice:this.props.item.usdprice,
      usdprice:this.props.item.usdprice,
      usdprice:this.props.item.usdprice,
      state:this.props.item.state,
    });
    this.setState({ languagelist:window.languagelist });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  Reviews(){
    guestService.addComment(this.props.item.id,this.state.Comment).then((data)=>{
        this.setState({checkInOpen: false});
    });
  }

  render() {
      const language = this.state.languagelist;

    return (
      <div>
        <div className="divtr">
          <div><p><a href={`/listing/${this.state.houseinfoid}`}>{this.state.houseinfoid}</a></p></div>
          <div><Link to="/Receipt">{language.Check}</Link></div>
          <div><Timestamp time={this.state.from.substring(0,10)} format='date'/></div>
          <div><Timestamp time={this.state.to.substring(0,10)} format='date'/></div>
          {this.state.usdprice != '0' && this.state.usdprice && <div>{this.state.usdprice+"/USD"}</div> }
          {this.state.ethprice != '0' && this.state.ethprice && <div>{this.state.ethprice+"/ETH"}</div> }
          {this.state.price != '0' && this.state.price && <div>{this.state.price+"/PPS"}</div> }
          { this.state.state === '1' &&<div>{language.state1}</div>}
          { this.state.state === '2' &&<div><button className="btn-sn btn-danger" onClick={(e)=>this.setState({checkInOpen:true})}>{language.Check_In}</button></div>}
          { this.state.state === '3' &&<div>{language.state1}</div>}
          { this.state.state === '4' &&<div><button className="btn-sn btn-danger" onClick={this.openModal}>{language.Reviews}</button></div>}
          { this.state.state === '5' &&<div>{language.ok_Reviews}</div>}
        </div>

        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}  
        contentLabel="Wallet Message">
          <div className="Wallet_Reviews">
            <textarea onChange={(e)=>this.setState({Comment:e.target.value})}></textarea>
            <button className="btn btn-primary Left" onClick={this.Reviews}>{language.Reviews}</button>
            <button className="btn btn-primary Right" onClick={this.closeModal}>{language.Cancel}</button>
          </div>
        </Modal>

        {this.state.checkInOpen &&
          <Overlay imageUrl="/images/spinner-animation.svg">
            <div className="checkIn">
              <h3>{language.checkIn_ok_no}</h3>
              <button className="btn btn-primary Left" onClick={this.checkIn}>{language.Check_in}</button>
              <button className="btn btn-primary Right" onClick={(e)=>this.setState({checkInOpen:false})}>{language.Cancel}</button>
            </div> 
          </Overlay>
        }
      </div>
    
    )
  }
}

export default GuestOrderRow