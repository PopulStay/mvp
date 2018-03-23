import React, { Component } from 'react'
import orderService from '../services/order-service'
import { Link } from 'react-router-dom'

class GuestOrderRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: "Loading...",
      houseInformation: "Loading...",
      from:"Loading",
      to:"Loading",
      price:"Loading"
    }

    this.checkIn   = this.checkIn.bind(this);
  }


  getPreOrderInfo(){
    console.log(this.props.account);
    orderService.getPreOrderInfo(this.props.account)
    .then((result) => {
        console.log(result);
        this.setState({houseInformation:result[3],status:result[7].toNumber(),from:result[4].toNumber(),to:result[5].toNumber(),price:result[8].toNumber()});
    }).catch((error) => {
      console.error(error);
    });

  }


   checkIn(){
     orderService.confirm(this.props.account).then((tx)=>{
       return orderService.waitTransactionFinished(tx)
     }).then((blockNumber) => {
      this.setState({ status: 1 })
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
        <td>{this.props.account}</td>
        <td>{this.state.status}</td>
        <td><Link to={`/listing/${this.state.houseInformation}`}>Check</Link></td>
        <td>{this.state.from}</td>
        <td>{this.state.to}</td>
        <td>{this.state.price}/PPS</td>
        {this.state.status === 0 &&<td><button className="btn-sn btn-danger" onClick={this.checkIn}>Check In</button></td>}
        {this.state.status === 1 &&<td>Checked In</td>}
      </tr>
    
    )
  }
}

export default GuestOrderRow