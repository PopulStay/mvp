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
                    <div><p>/</p></div>
                    <div><Link to={`/listing/${this.props.item.houseinfoid}`}>{language.Check}</Link></div>
                    <div><Timestamp time={this.props.item.from.substring(0,10)} format='date'/></div>
                    <div><Timestamp time={this.props.item.to.substring(0,10)} format='date'/></div>
                    <div>{Number(this.props.item.usdprice).toFixed(3)}{this.props.item.usdprice == 0 ? '' : '/USD'}</div>
                    <div>/</div>
              </div>
    
    )
  }
}

export default GuestUsdOrderRow