import React, { Component } from 'react';
import orderService from '../services/order-service';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';

class GuestOrderRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: "Loading...",
      houseInformation: "Loading...",
      from:"Loading",
      to:"Loading",
      price:"Loading",
      ethPrice:"Loading"

    }

    this.checkIn   = this.checkIn.bind(this);
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
          ethPrice:result._ethPrice
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
       return orderService.waitTransactionFinished(tx)
     }).then((blockNumber) => {
      this.setState({ status: '1' })
    }).catch((error) => {
      console.error(error);
    });


     ;
  }
  componentDidMount() {

     if(this.props.account)
     {
      this.getPreOrderInfo();
            }


   
  }

  render() {

    return (
       <tr>
        <td><p>{this.props.account}</p></td>
        <td>{this.state.status}</td>
        <td><Link to={`/listing/${this.state.houseInformation}`}>Check</Link></td>
        <td><Timestamp time={this.state.from} format='date'/></td>
        <td><Timestamp time={this.state.to} format='date'/></td>
        <td>{this.state.ethPrice == 0 ? this.state.price+"/PPS" : this.state.ethPrice/1000000000+"/ETH"}</td>
        { this.state.status === '0' &&<td><button className="btn-sn btn-danger" onClick={this.checkIn}>Check In</button></td>}
        { this.state.status === '1' &&<td>Checked In</td>}
      </tr>
    
    )
  }
}

export default GuestOrderRow