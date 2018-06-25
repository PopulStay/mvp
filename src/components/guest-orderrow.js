import React, { Component } from 'react';
import orderService from '../services/order-service';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import languageService from '../services/language-service';
import guestService from '../services/guest-service';
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
    console.log(this.props.item)
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
       return orderService.waitTransactionFinished(tx)
     }).then((blockNumber) => {
      this.setState({ status: '1' })
    }).catch((error) => {
      console.error(error);
    });


     ;
  }
  componentDidMount() {
    console.log(this.props)
    this.setState({ languagelist:window.languagelist });
    //orderService.confirmByUSD("5b30a218e13af37acb1e872a");
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  Reviews(){
    guestService.addComment(this.props.item.id,this.state.Comment).then((data)=>{
         console.log(data);
    });
  }

  render() {
      const language = this.state.languagelist;

    return (
      <div>
        <div className="divtr">
          <div><p><a href={`/listing/${this.props.item.houseinfoid}`}>{this.props.item.houseinfoid}</a></p></div>
          <div><Link to={`/listing/${this.props.item.houseinfoid}`}>{language.Check}</Link></div>
          <div><Timestamp time={this.props.item.from.substring(0,10)} format='date'/></div>
          <div><Timestamp time={this.props.item.to.substring(0,10)} format='date'/></div>
          {this.props.item.usdprice != '0' && this.props.item.usdprice && <div>{this.props.item.usdprice+"/USD"}</div> }
          {this.props.item.ethprice != '0' && this.props.item.ethprice && <div>{this.props.item.ethprice+"/ETH"}</div> }
          {this.props.item.price != '0' && this.props.item.price && <div>{this.props.item.price+"/PPS"}</div> }
          { this.props.item.state === '1' &&<div>{language.state1}</div>}
          { this.props.item.state === '2' &&<div><button className="btn-sn btn-danger" onClick={this.checkIn}>{language.Check_In}</button></div>}
          { this.props.item.state === '3' &&<div>{language.state1}</div>}
          { this.props.item.state === '4' &&<div><button className="btn-sn btn-danger" onClick={this.openModal}>{language.Reviews}</button></div>}
          { this.props.item.state === '5' &&<div>{language.ok_Reviews}</div>}
        </div>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}  
        contentLabel="Wallet Message">
          <div className="Wallet_Reviews">
            <textarea onChange={(e)=>this.setState({Comment:e.target.value})}></textarea>
            <button className="btn btn-primary Left" onClick={this.Reviews}>{language.Reviews}</button>
            <button className="btn btn-primary Right" onClick={this.closeModal}>{language.Cancel}</button>
          </div>
        </Modal>
      </div>
    
    )
  }
}

export default GuestOrderRow