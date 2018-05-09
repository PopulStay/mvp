import React, { Component } from 'react'
import { withRouter } from 'react-router'

class introlist extends Component {

  constructor(props, context) {
    super(props);

    this.STEP = {
            Step1:1,
            Step2:2,
            Step3:3,
            Step4:4
    }

    this.state = {
        step: 0,
        Countrys:["Angola","Afghanistan","Albania","Algeria","Anguilla","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda. ","Bolivia","Botswana","Brunei "," Bulgaria","Bulgaria","Burkina"," Burma"," Burundi ","Canada","the Central African Republic","Chad","Bolivia","Columbia","Congo","the Cook islands","Costa Rica","Cuba","Czech","Denmark","Denmark","Djibouti","Djibouti","Ecuador","Salvatore","Estonia ","Ethiopia","Fiji","Finland","French","French Guiana","Gabon"," Georgia "," German "," Garner "," Gibraltar "," Greece","Grenada","Guam "," Guatemala"," Guinea "," Guyana "," Haiti,"," Honduras,","Honduras","Hongkong","Hungary","Iceland","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kazakhstan","Kenya","South Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Italy","Liechtenstein","Lithuania","Macao","Madagascar","Mawlawi","Malaysia","Maldives","Mali","Malta","Mauritius","Mexico","Moldova","Monaco","Mongolia","Mont salad","Morocco","Mozambique","Malta","Neo","Nepal","New Zealand","New Zealand","Nicaragua "," Niger"," Nigeria "," Norway ","Oman","Pakistan "," Papua New Guinea","Paraguay","Peru","Philippines","Poland","French Polynesia","Portuguese"," Puerto Rico "," Qatar "," Russia "," Saint Lucia ","St. Lucia","Saint Mari"," St. Mari "," Sao Tome and Principe "," Sao Tome and Principe "," Senegal","Seychelles"," Sierra Leone"," Singapore ","Slovakia"," Slovenia "," Somalia","South Africa","Senegal","Sri Lanka","Sultan"," Swaziland "," Sweden "," Switzerland"," the Swiss "," the Taiwan Province","the Taiwan Province","Tajikistan","the Tajikistan","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Turkey"],
        city:"Angola",
    };

  }
  componentWillMount() {
      this.setState({step:this.STEP.Step1});
  }
  nextstep(){
    if(this.state.step == this.STEP.Step1) {
      this.setState({step:this.STEP.Step2});
    }
    if(this.state.step == this.STEP.Step2) {
      this.setState({step:this.STEP.Step3});
    }
    if(this.state.step == this.STEP.Step3) {
      this.setState({step:this.STEP.Step4});
    }
  }
  prestep(e){
    if(this.state.step == this.STEP.Step4) {
      this.setState({step:this.STEP.Step3});
    }
    if(this.state.step == this.STEP.Step3) {
      this.setState({step:this.STEP.Step2});
    }
    if(this.state.step == this.STEP.Step2) {
      this.setState({step:this.STEP.Step1});
    }
  }

  render() {
    const Countrys = this.state.Countrys;

    return (
      <div className="introlist">
        { this.state.step === this.STEP.Step1 &&
          <div className="introlist_1 row">
              <div className="boxleft">
                  <img className="logo" src="./images/introlist_logo.png" />
                  <div className="box">
                      <h3>Hi there, Zhao !</h3>
                      <p>We’re excited to learn about the experience you’d like to host on Populstay.In just a few minutes, you’ll start to create your experience page, then you’ll submit it to be reviewed by Populstay</p>
                      <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
                  </div>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_1.png" />
              </div>
          </div>
        }
        { this.state.step === this.STEP.Step2 &&
          <div className="introlist_2 row">
              <div className="boxleft">
                  <img className="logo" src="./images/introlist_logo.png" />
                  <div className="box">
                    <div className="STEPhead">
                      <span className="bjpink"></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                      <h3>Here’s an overview  of the process: </h3>
                      <ul>
                          <li>
                              <p><span>1</span>Learn about our expectations(2-3 minutes) </p>
                              <p>Find out what makes experiences different and what Populstay is looking for.</p>
                          </li>
                          <li>
                              <p><span>2</span>Create your experience (as much time as you need)</p>
                              <p>Add photos, videos, descriptions, and other details to be reviewed by Populstay.</p>
                          </li>
                          <li>
                              <p><span>3</span>Submit for review</p>
                              <p>Someone from Populstay  will review your experience page. If it meets our quality standards, you'll get to add availability and start hosting!</p>
                          </li>
                      </ul>
                      <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
                      <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>BACK</p>
                  </div>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_2.png" />
              </div>
          </div>
        }

        { this.state.step === this.STEP.Step3 &&
          <div className="introlist_3 row">
              <div className="boxleft">
                  <img className="logo" src="./images/introlist_logo.png" />
                  <div className="box">
                    <div className="STEPhead">
                      <span className="bjpink"></span>
                      <span className="bjpink"></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                      <h3>First things first, which city would you like to host in?</h3>
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">{this.state.city}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          {Countrys.map(item => (
                            <li><a onClick={(e) => this.setState({city: item})}>{item}</a></li>
                          ))}
                        </ul>
                      </div>
                      <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
                      <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>BACK</p>
                  </div>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_3.png" />
              </div>
          </div>
        }

      </div>
    )
  }
}

export default withRouter(introlist)
