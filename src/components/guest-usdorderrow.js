import React, { Component } from 'react';
import orderService from '../services/order-service';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';

class GuestUsdOrderRow extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  checkIn =()=> {
  }
  componendividMount() {
    console.log(this.props.item);
  }

  render() {

    return (
              <div className="divtr">
                    <div><p><a href={"listing/"+this.props.item.houseinfoid}>{this.props.item.houseinfoid}</a></p></div>
                    <div>{this.props.item.state}</div>
                    <div><Link to={`/listing/${this.props.item.houseinfoid}`}>Check</Link></div>
                    <div><Timestamp time={this.props.item.from.substring(0,10)} format='date'/></div>
                    <div><Timestamp time={this.props.item.to.substring(0,10)} format='date'/></div>
                    <div>{Number(this.props.item.usdprice).toFixed(3)}{this.props.item.usdprice == 0 ? '' : '/USD'}</div>
                    { this.props.item.status === '0' &&<div><button className="btn-sn btn-danger" onClick={this.checkIn}>Check In</button></div>}
                    { this.props.item.status === '1' &&<div>Checked In</div>}
                    { this.props.item.state === '2' &&<div>Checked In</div>}
              </div>
    
    )
  }
}

export default GuestUsdOrderRow