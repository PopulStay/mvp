import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Helpbox extends Component {



  render() {

  
    return (

        <div className="Helpbox">
            <h1>New user handbook</h1>
            <div className="step1">
              <h3>Step1:Sign up</h3>
              <img src="./images/help1.png" />
            </div>
            <div className="step2">
              <h3>Step2:Get a private key</h3>
              <img src="./images/help2.png" />
            </div>
            <div className="step3">
              <h3>Step3:Fill in user information</h3>
              <img src="./images/help3.png" />
            </div>
            <div className="step4">
              <h3>Step4:User login</h3>
              <img src="./images/help4.png" />
            </div>
            <div className="step5">
              <h3>Step5:Become a Host</h3>
              <img src="./images/help5.png" />
            </div>
            <div className="step6">
              <h3>Step6:Submission of success Look at the house</h3>
              <img src="./images/help6.png" />
            </div>
            <div className="step7">
              <h3>Step7:Booking a house</h3>
              <img src="./images/help7.png" />
            </div>

            
        </div>

  
    )
  }
}

export default withRouter(Helpbox)
