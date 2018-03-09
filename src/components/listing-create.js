import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import originService from '../services/origin-service'
import contractService from '../services/contract-service'

import ListingDetail from './listing-detail'
import Form from 'react-jsonschema-form'
import Overlay from './overlay'
import schema from '../../public/schemas/housing.json'

const alertify = require('../../node_modules/alertify/src/alertify.js')

class ListingCreate extends Component {

  constructor(props) {
    super(props)

    // This is non-ideal fix until IPFS can correctly return 443 errors
    // Server limit is 2MB, withg 100K safety buffer
    this.MAX_UPLOAD_BYTES = (2e6 - 1e5)

    // Enum of our states
    this.STEP = {
      DETAILS: 1,
      PREVIEW: 2,
      METAMASK: 3,
      PROCESSING: 4,
      SUCCESS: 5
    }

    this.state = {
      step: this.STEP.DETAILS,
      selectedSchema: schema,
      schemaFetched: true,
      formListing: {formData: null}
    }

    this.onDetailsEntered = this.onDetailsEntered.bind(this)
  }

  onDetailsEntered(formListing) {
    // Helper function to approximate size of object in bytes
    function roughSizeOfObject( object ) {
      var objectList = []
      var stack = [object]
      var bytes = 0
      while (stack.length) {
        var value = stack.pop()
        if (typeof value === 'boolean') {
          bytes += 4
        } else if (typeof value === 'string') {
          bytes += value.length * 2
        } else if (typeof value === 'number') {
          bytes += 8
        }
        else if (typeof value === 'object'
          && objectList.indexOf(value) === -1)
        {
          objectList.push(value)
          for (var i in value) {
            if (value.hasOwnProperty(i)) {
              stack.push(value[i])
            }
          }
        }
      }
      return bytes
    }
    if (roughSizeOfObject(formListing.formData) > this.MAX_UPLOAD_BYTES) {
      alertify.log("Your listing is too large. Consider using fewer or smaller photos.")
    } else {
      this.setState({
        formListing: formListing,
        step: this.STEP.PREVIEW
      })
      window.scrollTo(0, 0)
    }
  }

  onSubmitListing(formListing) {
    console.log("form data",formListing.formData)
    this.setState({ step: this.STEP.METAMASK })
    originService.submitListing(formListing)
    .then((tx) => {
      this.setState({ step: this.STEP.PROCESSING })
      // Submitted to blockchain, now wait for confirmation
      return contractService.waitTransactionFinished(tx)
    })
    .then((blockNumber) => {
      this.setState({ step: this.STEP.SUCCESS })
      // TODO: Where do we take them after successful creation?
    })
    .catch((error) => {
      console.error(error)
      alertify.log(error.message)
      // TODO: Reset form? Do something.
    })
  }

  render() {
    return (
      <div className="container listing-form">
        { this.state.step === this.STEP.DETAILS &&
          <div className="step-container schema-details">
            <div className="row flex-sm-row-reverse">
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
              <div className="col-md-5">
                <label>STEP {Number(this.state.step)}</label>
                <h2>Create your listing</h2>
                <Form
                  schema={this.state.selectedSchema}
                  onSubmit={this.onDetailsEntered}
                  formData={this.state.formListing.formData}
                  onError={(errors) => console.log(`react-jsonschema-form errors: ${errors.length}`)}
                >
                  <div className="btn-container">
                    <button type="submit" className="float-right btn btn-primary">Continue</button>
                  </div>
                </Form>

              </div>
              <div className="col-md-6">
              </div>
            </div>
          </div>
        }
        { (this.state.step >= this.STEP.PREVIEW) &&
          <div className="step-container listing-preview">
            {this.state.step === this.STEP.METAMASK &&
              <Overlay imageUrl="/images/spinner-animation.svg">
                Confirm transaction<br />
                Press &ldquo;Submit&rdquo; in MetaMask window
              </Overlay>
            }
            {this.state.step === this.STEP.PROCESSING &&
              <Overlay imageUrl="/images/spinner-animation.svg">
                Uploading your listing<br />
                Please stand by...
              </Overlay>
            }
            {this.state.step === this.STEP.SUCCESS &&
              <Overlay imageUrl="/images/circular-check-button.svg">
                Success<br />
                <Link to="/">See All Listings</Link>
              </Overlay>
            }
            <div className="row">
              <div className="col-md-12">
                <label className="create-step">STEP {Number(this.state.step)}</label>
                <h2>Preview your listing</h2>
                <div className="info-box">
                  <div>Please review your listing before submitting. Your listing will appear to others just as it looks on the window below.</div>
                </div>
              </div>
            </div>
            <div className="row flex-sm-row-reverse">
              <div className="col-md-12">
                <div className="preview">
                  <ListingDetail listingJson={this.state.formListing.formData} />
                </div>
                <div className="btn-container">
                  <button className="btn btn-other float-left" onClick={() => this.setState({step: this.STEP.DETAILS})}>
                    Back
                  </button>
                  <button className="btn btn-primary float-right"
                    onClick={() => this.onSubmitListing(this.state.formListing)}>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default ListingCreate
