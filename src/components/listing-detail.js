import 'react-dates/initialize';
import '../css/react_dates.css';
import { DateRangePicker } from 'react-dates';

import React, { Component } from 'react'
import contractService from '../services/contract-service'
import ipfsService from '../services/ipfs-service'

import Overlay from './overlay'

const alertify = require('../../node_modules/alertify/src/alertify.js')

class ListingsDetail extends Component {

  constructor(props) {
    super(props)

    this.STEP = {
      VIEW: 1,
      METAMASK: 2,
      PROCESSING: 3,
      PURCHASED: 4,
    }

    this.state = {
      category: "Loading...",
      name: "Loading...",
      price: "Loading...",
      ipfsHash: null,
      lister: null,
      pictures: [],
      step: this.STEP.VIEW,
      totalPrice: 0
    }

    this.handleBooking = this.handleBooking.bind(this)
  }

  loadListing() {
    contractService.getListing(this.props.listingId)
    .then((listingContractObject) => {
      this.setState(listingContractObject)
      return ipfsService.getListing(this.state.ipfsHash)
    })
    .then((listingJson) => {
      const jsonData = JSON.parse(listingJson).data
      this.setState(jsonData)
    })
    .catch((error) => {
      alertify.log('There was an error loading this listing.')
      console.error(`Error fetching contract or IPFS info for listingId: ${this.props.listingId}`)
    })
  }

  componentWillMount() {
    if (this.props.listingId) {
      // Load from IPFS
      this.loadListing()
    }
    else if (this.props.listingJson) {
      // Listing json passed in directly
      this.setState(this.props.listingJson)
    }
  }

  handleBooking() {
    let unitsToBuy = 0
    if (this.state.checkInDate && this.state.checkOutDate) {
      unitsToBuy = this.state.checkOutDate.diff(this.state.checkInDate, 'days')
    }
    this.setState({step: this.STEP.METAMASK})
    contractService.buyListing(this.props.listingId, unitsToBuy, this.state.price)
    .then((transactionReceipt) => {
      console.log("Purchase request sent.")
      this.setState({step: this.STEP.PROCESSING})
      return contractService.waitTransactionFinished(transactionReceipt.tx)
    })
    .then((blockNumber) => {
      this.setState({step: this.STEP.PURCHASED})
    })
    .catch((error) => {
      console.log(error)
      alertify.log("There was a problem booking this listing.\nSee the console for more details.")
      this.setState({step: this.STEP.VIEW})
    })
  }

  calcTotalPrice() {
    if (this.state.checkInDate && this.state.checkOutDate) {
      let days = this.state.checkOutDate.diff(this.state.checkInDate, 'days')
      return this.state.price * days
    }
    return 0
  }

  render() {
    const price = typeof this.state.price === 'string' ? 0 : this.state.price
    return (
      <div className="listing-detail">
        {this.state.step===this.STEP.METAMASK &&
          <Overlay imageUrl="/images/spinner-animation.svg">
            Confirm transaction<br />
            Press &ldquo;Submit&rdquo; in MetaMask window
          </Overlay>
        }
        {this.state.step===this.STEP.PROCESSING &&
          <Overlay imageUrl="/images/spinner-animation.svg">
            Processing your booking<br />
            Please stand by...
          </Overlay>
        }
        {this.state.step===this.STEP.PURCHASED &&
          <Overlay imageUrl="/images/circular-check-button.svg">
            Booking was successful.<br />
            <a href="#" onClick={()=>window.location.reload()}>
              Reload page
            </a>
          </Overlay>
        }
        {this.state.pictures &&
          <div className="carousel">
            {this.state.pictures.map(pictureUrl => (
              <div className="photo" key={pictureUrl}>
                {(new URL(pictureUrl).protocol === "data:") &&
                  <img src={pictureUrl} role='presentation' />
                }
              </div>
            ))}
          </div>
        }
        <div className="container listing-container">
          <div className="row">
            <div className="col-12 col-md-8 detail-info-box">
              <div className="category">{this.state.category} ({this.state.beds} beds)</div>
              <div className="title">{this.state.location}</div>
              <div className="category">Creator</div>
              <div className="description">{this.state.lister}</div>
              <a href={ipfsService.gatewayUrlForHash(this.state.ipfsHash)} target="_blank">
                View on IPFS <big>&rsaquo;</big>
              </a>
              <div className="debug">
                <li>IPFS: {this.state.ipfsHash}</li>
                <li>Lister: {this.state.lister}</li>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="buy-box">
                <div>
                  <span>Daily Price</span>
                  <span className="price">
                    {Number(price).toLocaleString(undefined, {minimumFractionDigits: 3})} PPS
                  </span>
                </div>
                {this.props.listingId &&
                  <div>
                    <span>Total Price</span>
                    <span className="price">
                      {Number(this.calcTotalPrice()).toLocaleString(undefined, {minimumFractionDigits: 3})} PPS
                    </span>
                  </div>
                }
                {this.props.listingId &&
                  <DateRangePicker
                    startDate={this.state.checkInDate}
                    startDateId="start_date"
                    endDate={this.state.checkOutDate}
                    startDatePlaceholderText="Check In"
                    endDatePlaceholderText="Check Out"
                    endDateId="end_date"
                    onDatesChange={({ startDate, endDate }) => {this.setState({checkInDate: startDate, checkOutDate: endDate })}}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({ focusedInput })}
                  />
                }
                <div>
                  {this.props.listingId &&
                    <button
                      className="button"
                      onClick={this.handleBooking}
                      disabled={!this.props.listingId || !this.state.startDate || !this.state.endDate}
                      onMouseDown={e => e.preventDefault()}
                      >
                        Book Now
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListingsDetail
