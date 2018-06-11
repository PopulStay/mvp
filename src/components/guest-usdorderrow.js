import React, { Component } from 'react';
import orderService from '../services/order-service';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';
import languageService from '../services/language-service';

class GuestUsdOrderRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      languagelist:{}
    }
    languageService.language();
  }

  checkIn =()=> {
  }
  componentDidMount() {
    this.setState({ languagelist:window.languagelist });
  }

  render() {
      const language = this.state.languagelist;

    return (
              <div className="divtr">
                    <div><p><a href={"listing/"+this.props.item.houseinfoid}>{this.props.item.houseinfoid}</a></p></div>
                    <div>{this.props.item.state == 2 ? language.state4 : language.state5}</div>
                    <div><Link to={`/listing/${this.props.item.houseinfoid}`}>{language.Check}</Link></div>
                    <div><Timestamp time={this.props.item.from.substring(0,10)} format='date'/></div>
                    <div><Timestamp time={this.props.item.to.substring(0,10)} format='date'/></div>
                    <div>{Number(this.props.item.usdprice).toFixed(3)}{this.props.item.usdprice == 0 ? '' : '/USD'}</div>
                    { this.props.item.status === '0' &&<div><button className="btn-sn btn-danger" onClick={this.checkIn}>{language.Check_In}</button></div>}
                    { this.props.item.status === '1' &&<div>{language.Check_In}</div>}
                    { this.props.item.state === '2' &&<div>{language.Check_In}</div>}
              </div>
    
    )
  }
}

export default GuestUsdOrderRow