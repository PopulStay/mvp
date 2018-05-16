import React, { Component } from 'react'
import { withRouter } from 'react-router'
import GuestRegister from './guest-register';
import houselistingService from '../services/houseinfolist-service';

class VerifyID extends Component {

  constructor(props, context) {
    super(props);

    this.STEP = {
            Step1:1,
            Step2:2,
            Step3:3,
            Step4:4,
            Step5:5,
            PROCESSING: 6,
            SUCCESS: 7,
    }

    this.state = {
        step: 1,
        addPhoto_type:1,
        Countrysarr:["Angola","Afghanistan","Albania","Algeria","Anguilla","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda. ","Bolivia","Botswana","Brunei "," Bulgaria","Bulgaria","Burkina"," Burma"," Burundi ","Canada","the Central African Republic","Chad","Bolivia","Columbia","Congo","the Cook islands","Costa Rica","Cuba","Czech","Denmark","Denmark","Djibouti","Djibouti","Ecuador","Salvatore","Estonia ","Ethiopia","Fiji","Finland","French","French Guiana","Gabon"," Georgia "," German "," Garner "," Gibraltar "," Greece","Grenada","Guam "," Guatemala"," Guinea "," Guyana "," Haiti,"," Honduras,","Honduras","Hongkong","Hungary","Iceland","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kazakhstan","Kenya","South Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Italy","Liechtenstein","Lithuania","Macao","Madagascar","Mawlawi","Malaysia","Maldives","Mali","Malta","Mauritius","Mexico","Moldova","Monaco","Mongolia","Mont salad","Morocco","Mozambique","Malta","Neo","Nepal","New Zealand","New Zealand","Nicaragua "," Niger"," Nigeria "," Norway ","Oman","Pakistan "," Papua New Guinea","Paraguay","Peru","Philippines","Poland","French Polynesia","Portuguese"," Puerto Rico "," Qatar "," Russia "," Saint Lucia ","St. Lucia","Saint Mari"," St. Mari "," Sao Tome and Principe "," Sao Tome and Principe "," Senegal","Seychelles"," Sierra Leone"," Singapore ","Slovakia"," Slovenia "," Somalia","South Africa","Senegal","Sri Lanka","Sultan"," Swaziland "," Sweden "," Switzerland"," the Swiss "," the Taiwan Province","the Taiwan Province","Tajikistan","the Tajikistan","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Turkey"],
        Countrys:"Singapore",
        Certificates_type:1,
        Photo_front:"",
        Photo_back:"",
    };
  }

  uploadfront(e,index){
      var files_front = this.state.Photo_front;
      var files_back = this.state.Photo_back;
      let reader = new FileReader();
      let file = event.target.files[0];
      reader.onloadend = () => {
        if(index == 1){
            this.setState({Photo_front:reader.result});
        }else{
            this.setState({Photo_back:reader.result});
        }
      }
      reader.readAsDataURL(file)
  }

  nextstep(e){
    this.setState({step:this.state.step+1});
  }
  submit(e){
    
  }

  render() {
    const Countrysarr = this.state.Countrysarr;

    return (
      <div className="VerifyID">
          <div><img className="header__logo" src="../images/logo.png" alt=""/></div>
          { this.state.step === this.STEP.Step1 &&
              <div className="VerifyID_1 VerifyID_content col-lg-offset-1 col-lg-7">
                  <img src="/images/rightBoximg.png" />
                  <h3>Add a valid government ID</h3>
                  <h5>It looks like the photo you added isn’t a valid form of ID. To help us make sure it’s you, we’ll need another photo of a valid ID, like a driver’s license, passport, or visa.</h5>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>Add another photo</button>
              </div>
          }

          { this.state.step === this.STEP.Step2 &&
              <div className="VerifyID_2 VerifyID_content col-lg-offset-1 col-lg-7">
                  <h3>How would you like to add a photo of your ID?</h3>
                  <h5>You can either take a new photo of your government ID, or upload an existing one from your mobile device or computer.</h5>

                  <div className="radio" onClick={(e) => this.setState({addPhoto_type: 1})}>
                    <label className="text-muted"><p><span className={this.state.addPhoto_type == 1 ?"show":"hide"}></span></p>Take photo with the Airbnb mobile app<span className="Recommend">Recommend</span></label>
                  </div>
                  <div className="radio" onClick={(e) => this.setState({addPhoto_type: 2})}>
                    <label className="text-muted"><p><span className={this.state.addPhoto_type == 2 ?"show":"hide"}></span></p>Take photo from this browser</label>
                  </div>
                  <div className="radio" onClick={(e) => this.setState({addPhoto_type: 3})}>
                    <label className="text-muted"><p><span className={this.state.addPhoto_type == 3 ?"show":"hide"}></span></p>Upload photo from this device</label>
                  </div>

                  <h6><span className="glyphicon glyphicon-lock"></span>Your ID will never be shared with a guest.</h6>
                  <button className="next"  onClick={(e)=>this.nextstep(e)}>Add another photo</button>
              </div>
          }

          { this.state.step === this.STEP.Step3 &&
              <div className="VerifyID_2 VerifyID_3 VerifyID_content col-lg-offset-1 col-lg-7">
                  <h3>Which type of ID would you like to add?</h3>
                  <h5>It needs to be an official government ID.</h5>
                  <p className="text1">Issuing country</p>

                  <div className="btn-group">
                    <button type="button" data-toggle="dropdown">{this.state.Countrys}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      {Countrysarr.map(item => (
                          <li><a onClick={(e) => this.setState({Countrys: item})}>{item}</a></li>
                        ))}
                    </ul>
                  </div>
                  <p className="text2">Type of ID</p>

                  <div className="radio" onClick={(e) => this.setState({Certificates_type: 1})}>
                    <label className="text-muted"><p><span className={this.state.Certificates_type == 1 ?"show":"hide"}></span></p>Driver’s license</label>
                  </div>
                  <div className="radio" onClick={(e) => this.setState({Certificates_type: 2})}>
                    <label className="text-muted"><p><span className={this.state.Certificates_type == 2 ?"show":"hide"}></span></p>Passport</label>
                  </div>
                  <div className="radio" onClick={(e) => this.setState({Certificates_type: 3})}>
                    <label className="text-muted"><p><span className={this.state.Certificates_type == 3 ?"show":"hide"}></span></p>Identity card</label>
                  </div>

                  <h6><span className="glyphicon glyphicon-lock"></span>Your ID will never be shared with a guest.</h6>
                  <button className="next"  onClick={(e)=>this.nextstep(e)}>Next</button>
              </div>
          }

          { this.state.step === this.STEP.Step4 &&
              <div className="VerifyID_2 VerifyID_4 VerifyID_content col-lg-offset-1 col-lg-7">
                  <h3>Does this look OK?</h3>
                  <h5>Make sure your images aren’t blurry and the front clearly shows your</h5>
                  <div className="divbox">
                    <div className="Left col-lg-6">
                      <div className="photodiv">
                        <img className={this.state.Photo_front ? "show" : "hide"} src={this.state.Photo_front} />
                        <input type="file" onChange={(e)=>this.uploadfront(e,1)} />
                      </div>
                        <p>Add front</p>
                    </div> 
                    <div className="Right col-lg-6">
                      <div className="photodiv">
                        <img className={this.state.Photo_back ? "show" : "hide"} src={this.state.Photo_back} />
                        <input type="file"  onChange={(e)=>this.uploadfront(e,2)}/>
                      </div>
                        <p>Add back</p>
                    </div> 
                  </div> 
                  
                  <button className="next"  onClick={(e)=>this.nextstep(e)}>Next</button>
              </div>
          }

          { this.state.step === this.STEP.Step5 &&
              <div className="VerifyID_1 VerifyID_content col-lg-offset-1 col-lg-7">
                  <h3>We’re still reviewing your ID</h3>
                  <h5>This will get wrapped up as soon as possible—and we’ll be in touch if there’s anything else we need.</h5>
                  <h5>In the meantime, you can pick up where you left off.</h5>
                  <button className="next"  onClick={(e)=>this.submit(e)}>Continue</button>
              </div>
          }
      </div>
    )
  }
}

export default withRouter(VerifyID)
