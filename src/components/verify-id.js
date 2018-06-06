import React, { Component } from 'react'
import { withRouter } from 'react-router'
import GuestRegister from './guest-register';
import houselistingService from '../services/houseinfolist-service';
import {Link} from 'react-router-dom';
import languageService from '../services/language-service';

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
        languagelist:{}
    };
      languageService.language();
  }

  componentWillMount() {
      this.setState({
        state:this.state.languagelist=window.languagelist,
        Countrysarr:this.state.languagelist.Countrys,
        Countrys:this.state.languagelist.roomstuff_Country
      });
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
    const language = this.state.languagelist;

    return (
      <div className="VerifyID">
      <div>
          <Link to="/"><img className="header__logo" src="../images/logo.png" alt=""/></Link>
      </div>    
          { this.state.step === this.STEP.Step1 &&
              <div className="VerifyID_1 VerifyID_content col-lg-offset-1 col-lg-7">
                  <img src="/images/rightBoximg.png" />
                  <h3>{language.Add_a_valid_government_ID}</h3>
                  <h5>{language.It_looks_like_the_photo_you_added}</h5>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>{language.Add_another_photo}</button>
              </div>
          }

          { this.state.step === this.STEP.Step2 &&
              <div className="VerifyID_2 VerifyID_content col-lg-offset-1 col-lg-7">
                  <h3>{language.How_would_you_like_to_add}</h3>
                  <h5>{language.You_can_either_take_a_new_photo}</h5>

                  <div className="radio" onClick={(e) => this.setState({addPhoto_type: 1})}>
                    <label className="text-muted"><p><span className={this.state.addPhoto_type == 1 ?"show":"hide"}></span></p>{language.Take_photo_with_the}<span className="Recommend">{language.Recommend}</span></label>
                  </div>
                  <div className="radio" onClick={(e) => this.setState({addPhoto_type: 2})}>
                    <label className="text-muted"><p><span className={this.state.addPhoto_type == 2 ?"show":"hide"}></span></p>{language.Take_photo_from_this_browser}</label>
                  </div>
                  <div className="radio" onClick={(e) => this.setState({addPhoto_type: 3})}>
                    <label className="text-muted"><p><span className={this.state.addPhoto_type == 3 ?"show":"hide"}></span></p>{language.Upload_photo_from_this_device}</label>
                  </div>

                  <h6><span className="glyphicon glyphicon-lock"></span>{language.Your_ID_will_never}</h6>
                  <button className="next"  onClick={(e)=>this.nextstep(e)}>{language.Add_another_photo}</button>
              </div>
          }

          { this.state.step === this.STEP.Step3 &&
              <div className="VerifyID_2 VerifyID_3 VerifyID_content col-lg-offset-1 col-lg-7">
                  <h3>{language.Which_type_of_ID_would_you_like_to_add}</h3>
                  <h5>{language.It_needs_to_be_an_official_government_ID}</h5>
                  <p className="text1">{language.Issuing_country}</p>

                  <div className="btn-group">
                    <button type="button" data-toggle="dropdown">{this.state.Countrys}<span>▼</span></button>
                    <ul className="dropdown-menu" role="menu">
                      {Countrysarr.map(item => (
                          <li><a onClick={(e) => this.setState({Countrys: item})}>{item}</a></li>
                        ))}
                    </ul>
                  </div>
                  <p className="text2">{language.Type_of_ID}</p>

                  <div className="radio" onClick={(e) => this.setState({Certificates_type: 1})}>
                    <label className="text-muted"><p><span className={this.state.Certificates_type == 1 ?"show":"hide"}></span></p>{language.Drivers_license}</label>
                  </div>
                  <div className="radio" onClick={(e) => this.setState({Certificates_type: 2})}>
                    <label className="text-muted"><p><span className={this.state.Certificates_type == 2 ?"show":"hide"}></span></p>{language.Passport}</label>
                  </div>
                  <div className="radio" onClick={(e) => this.setState({Certificates_type: 3})}>
                    <label className="text-muted"><p><span className={this.state.Certificates_type == 3 ?"show":"hide"}></span></p>{language.Identity_card}</label>
                  </div>

                  <h6><span className="glyphicon glyphicon-lock"></span>{language.Your_ID_will_never_be_shared_with_a_guest}</h6>
                  <button className="next"  onClick={(e)=>this.nextstep(e)}>{language.Next}</button>
              </div>
          }

          { this.state.step === this.STEP.Step4 &&
              <div className="VerifyID_2 VerifyID_4 VerifyID_content col-lg-offset-1 col-lg-7">
                  <h3>{language.Does_this_look_OK}</h3>
                  <h5>{language.Make_sure_your_images}</h5>
                  <div className="divbox">
                    <div className="Left col-lg-6">
                      <div className="photodiv">
                        <img className={this.state.Photo_front ? "show" : "hide"} src={this.state.Photo_front} />
                        <input type="file" onChange={(e)=>this.uploadfront(e,1)} />
                      </div>
                        <p>{language.Add_front}<input type="file" onChange={(e)=>this.uploadfront(e,1)} /></p>
                    </div> 
                    <div className="Right col-lg-6">
                      <div className="photodiv">
                        <img className={this.state.Photo_back ? "show" : "hide"} src={this.state.Photo_back} />
                        <input type="file"  onChange={(e)=>this.uploadfront(e,2)}/>
                      </div>
                        <p>{language.Add_back}<input type="file"  onChange={(e)=>this.uploadfront(e,2)}/></p>
                    </div> 
                  </div> 
                  
                  <button className="next"  onClick={(e)=>this.nextstep(e)}>{language.Next}</button>
              </div>
          }

          { this.state.step === this.STEP.Step5 &&
              <div className="VerifyID_1 VerifyID_content col-lg-offset-1 col-lg-7">
                  <h3>{language.Were_still_reviewing_your_ID}</h3>
                  <h5>{language.This_will_get_wrapped}</h5>
                  <h5>{language.In_the_meantime}</h5>
                  <button className="next"  onClick={(e)=>this.submit(e)}>{language.Continue}</button>
              </div>
          }
      </div>
    )
  }
}

export default VerifyID
