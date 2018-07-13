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
      price:"Loading"
    }

  //  this.checkIn   = this.checkIn.bind(this);
  }


  getPreOrderInfo(){
  
    orderService.getPreOrderInfo(this.props.address)
    .then((result) => {
      
        this.setState({houseInformation : result[3]});
        this.setState({status           : result[7]});
        this.setState({from             : result[4]});
        this.setState({to               : result[5]});
        this.setState({price            : result[8]});

    }).catch((error) => {
      console.error(error);
    });

  }


  componentDidMount() {

     if(this.props.address)
     {
      this.getPreOrderInfo();
     }
  }

  render() {

    return (
       <tr>
        <td>{this.props.address}</td>
        <td>{this.state.status}</td>
        <td><Link to={`/listing/${this.state.houseInformation}`}>Check</Link></td>
        <td><Timestamp time={this.state.from} format='date'/></td>
        <td><Timestamp time={this.state.to} format='date'/></td>
        <td>{this.state.price}/PPS</td>
 
      </tr>
    
    )
  }
}

export default GuestOrderRow