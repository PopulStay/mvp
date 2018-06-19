import React, { Component } from 'react';
import orderService from '../services/order-service';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import languageService from '../services/language-service';

class GuestOrderRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
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
    languageService.language();
  }


  getPreOrderInfo(){

        orderService.getPreOrderInfo( this.props.account)
        .then((result) => {
            this.setState({
              houseInformation:result._houseinfo,
              status:result._status,
              from:result._from.substring(0,10),
              to:result._to.substring(0,10),
              price:result._price,
              ethPrice:result._ethPrice,
              url:"https://kovan.etherscan.io/address/"+this.props.account
            });
            
        }).catch((error) => {
          console.error(error);
        });
 
  }


   checkIn(){
      var ethOrPPS;

    if( this.state.price != 0 || this.state.price != '0' )
    {
      ethOrPPS = 'PPS';
    }
    else
    {
      ethOrPPS = 'ETH';
    }

    orderService.confirm( this.props.account , ethOrPPS ).then((tx)=>{
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

     if(this.props.account)
     {
      this.getPreOrderInfo();
     }


  }

  render() {
      const language = this.state.languagelist;

    return (
       <div className="divtr">
        <div><p><a href={this.state.url}>{this.props.account}</a></p></div>
        <div><Link to={`/listing/${this.state.houseInformation}`}>{language.Check}</Link></div>
        <div><Timestamp time={this.state.from} format='date'/></div>
        <div><Timestamp time={this.state.to} format='date'/></div>
        <div>{this.state.ethPrice == 0 ? this.state.price+"/PPS" : this.state.ethPrice/1000000000+"/ETH"}</div>
        { this.state.status === '0' &&<div><button className="btn-sn btn-danger" onClick={this.checkIn}>{language.Check_In}</button></div>}
        { this.state.status === '1' &&<div>{language.ok_checkIn}</div>}
      </div>
    
    )
  }
}

export default GuestOrderRow