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

  //  this.checkIn   = this.checkIn.bind(this);
  }


  getPreOrderInfo(){
    console.log(this.props.address);
    orderService.getPreOrderInfo(this.props.address)
    .then((result) => {
        console.log(result);
        this.setState({houseInformation : result[3]});
        this.setState({status           : result[7].toNumber()});
        this.setState({from             : result[4].toNumber()});
        this.setState({to               : result[5].toNumber()});
        this.setState({price            : result[8].toNumber()});

    }).catch((error) => {
      console.error(error);
    });

  }


  //  checkIn(){
  //    orderService.confirm(this.props.account).then((tx)=>{
  //      return orderService.waitTransactionFinished(tx)
  //    }).then((blockNumber) => {
  //     this.setState({ status: 1 })
  //   }).catch((error) => {
  //     console.error(error);
  //   });


    
  // }
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
        <td>{this.state.from}</td>
        <td>{this.state.to}</td>
        <td>{this.state.price}/PPS</td>
 
      </tr>
    
    )
  }
}

export default GuestOrderRow