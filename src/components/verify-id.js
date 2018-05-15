import React, { Component } from 'react'
import { withRouter } from 'react-router'
import GuestRegister from './guest-register';

class VerifyID extends Component {

  constructor(props, context) {
    super(props);

    this.STEP = {
            Step1:1,
            Step2:2,
            Step3:3,
            Step4:4,
            Step5:5,
            Step6:6,
            Step7:7,
            Step8:8,
            Step9:9,
    }

    this.state = {
        step: 1,
    };
  }

  render() {

    return (
      <div className="VerifyID">
          { this.state.step === this.STEP.Step1 &&
              <div className="VerifyID_1">
                  <h3>Location</h3>
                  <h5>Which city will you host your experience in?</h5>
              </div>
          }
      </div>
    )
  }
}

export default withRouter(VerifyID)
