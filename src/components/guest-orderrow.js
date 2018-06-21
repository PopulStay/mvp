import React, { Component } from 'react';
import orderService from '../services/order-service';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import languageService from '../services/language-service';
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
       return orderService.waitTransactionFinished(tx)
     }).then((blockNumber) => {
      this.setState({ status: '1' })
    }).catch((error) => {
      console.error(error);
    });


     ;
  }
  componentDidMount() {
    this.setState({ languagelist:window.languagelist });
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  Reviews(){
    console.log( this.props.item.id)
    // guestService.addComment("5b2b201223347629a9ebd73f","test").then((data)=>{
    //      console.log(data);
    // });
  }

  render() {
      const language = this.state.languagelist;

    return (
      <div>
        <div className="divtr">
          <div><p><a href={`/listing/${this.props.item.houseinfoid}`}>{this.props.item.houseinfoid}</a></p></div>
          <div><Link to={`/listing/${this.props.item.houseinfoid}`}>{language.Check}</Link></div>
          <div><Timestamp time={this.props.item.from} format='date'/></div>
          <div><Timestamp time={this.props.item.to} format='date'/></div>
          <div>{this.props.item.ethprice == '0' ? this.props.item.price+"/PPS" : this.props.item.ethprice/1000000000+"/ETH"}</div>
          { this.props.item.state === '0' &&<div><button className="btn-sn btn-danger" onClick={this.checkIn}>{language.Check_In}</button></div>}
          { this.props.item.state === '2' &&<div>{language.ok_checkIn}</div>}
          { this.props.item.state === '4' &&<div><button className="btn-sn btn-danger" onClick={this.openModal}>{language.Reviews}</button></div>}
        </div>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}  
        contentLabel="Wallet Message">
          <div className="Reviews">
            <textarea></textarea>
            <button className="btn btn-primary Left" onClick={this.closeModal}>{language.Reviews}</button>
            <button className="btn btn-primary Right" onClick={this.closeModal}>{language.Cancel}</button>
          </div>
        </Modal>
      </div>
    
    )
  }
}

export default GuestOrderRow