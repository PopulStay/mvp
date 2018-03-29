import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import houselistingService from '../services/houseinfolist-service';
import ListingDetail from './listing-detail';
import Overlay from './overlay';
const alertify = require('../../node_modules/alertify/src/alertify.js');

class ListingCreate extends Component {

  constructor(props) {
    super(props)

    this.STEP = {
      DETAILS: 1,
      PREVIEW: 2,
      METAMASK: 3,
      PROCESSING: 4,
      SUCCESS: 5
    }

    this.state = {
      step     : this.STEP.DETAILS,
      category : "",
      beds     : 0 , 
      location : "",
      price    : 0 , 
      pictures : []
    }

    this.onDetailsEntered = this.onDetailsEntered.bind(this)
  }

  onDetailsEntered(formListing) {

  }

  onSubmitListing(formListing) {

    this.setState({ step: this.STEP.METAMASK });
    
    houselistingService.submitListing(formListing)
    .then((tx) => {
      this.setState({ step: this.STEP.PROCESSING });
      return houselistingService.waitTransactionFinished(tx);
    })
    .then((blockNumber) => {
      this.setState({ step: this.STEP.SUCCESS });
    })
    .catch((error) => {
      alertify.log(error.message);
    })
  }

  render() {
    return (
      <div className="container listing-form">
        <br/><br/>
        { this.state.step === this.STEP.DETAILS &&

            <div className="row">
              <div className="col-md-5">
                <label>STEP {Number(this.state.step)}</label>
                <h2>Create your listing</h2>
            </div>


               <div className="col-md-5 offset-md-2">
                  <div className="info-box">
                    <div>
                      <h2>Hot tips to win good tenants</h2>
                      <ul>
                        <li>Be generous and provide extra photos. A lack of photos can be a key deterrent against tenant enquiry</li>
                        <li>Before you take a photo, get as much light into the room as possible. People looking for a home respond better to sunny and bright rooms, and are deterred by blurry and dark images</li>
                        <li>Try not to mimic other listings – being different will make yours stand out from the rest.</li>
                      </ul>
                    </div>
                    <div className="info-box-image"><img className="d-none d-md-block" src="/images/features-graphic.svg" role="presentation" /></div>
                  </div>
                </div>
            
            
          </div>
        }
      </div>
    )
  }
}

export default ListingCreate
