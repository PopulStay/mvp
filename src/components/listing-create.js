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
      <div className="becomehost-1 container">
        <br/><br/>
        { this.state.step === this.STEP.DETAILS &&

            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-6">
                  <label>STEP {Number(this.state.step)}</label>
                  <h2>Create your listing</h2>

                  <div className="form-group">
                      <label>Type*</label>
                      <select className="form-control">
                        <option>Entire Place</option>
                        <option>Private Room</option>
                        <option>Share Room</option>
                      </select>
                  </div>


                  <div className="form-group">
                      <label>Beds*</label>
                      <select className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                  </div>

                  <div className="form-group">
                    <label>Location*</label>
                    <input type="text" className="form-control"/>
                  </div>

                  <div className="form-group">
                    <label>Price in PPS*</label>
                    <input type="number" className="form-control"/>
                  </div>


              </div>


               <div className="col-md-6 col-lg-6 col-sm-6">
                  <img className="becomehost-1__bg" src="../images/becomehost-step1-bg.png" alt=""/>
                </div>
            
            
          </div>
        }
      </div>
    )
  }
}

export default ListingCreate
