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
  componentDidMount() {
    console.log(this.props.item);
  }

  render() {

    return (
              <tr>
                    <td><p><a href={"listing/"+this.props.item.houseinfoid}>{this.props.item.houseinfoid}</a></p></td>
                    <td>{this.props.item.state}</td>
                    <td><Link to={`/listing/${this.props.item.houseinfoid}`}>Check</Link></td>
                    <td><Timestamp time={this.props.item.from.substring(0,10)} format='date'/></td>
                    <td><Timestamp time={this.props.item.to.substring(0,10)} format='date'/></td>
                    <td>{Number(this.props.item.usdprice).toFixed(3)}{this.props.item.usdprice == 0 ? '' : '/USD'}</td>
                    { this.props.item.status === '0' &&<td><button className="btn-sn btn-danger" onClick={this.checkIn}>Check In</button></td>}
                    { this.props.item.status === '1' &&<td>Checked In</td>}
                    { this.props.item.state === '2' &&<td>Checked In</td>}
              </tr>
    
    )
  }
}

export default GuestUsdOrderRow