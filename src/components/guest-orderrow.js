import React, { Component } from 'react'
import orderService from '../services/order-service'
import { Link } from 'react-router-dom'

class GuestOrderRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: "Loading...",
      houseInformation: "Loading..."
    }
  }


  getPreOrderInfo(){
    console.log(this.props.account);
    orderService.getPreOrderInfo(this.props.account)
    .then((result) => {
        console.log(result);
        this.setState({houseInformation:result[3],status:result[7].toNumber()});
    }).catch((error) => {
      console.error(error);
    });

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
        <td></td>
        <td></td>
      </tr>
    
    )
  }
}

export default GuestOrderRow