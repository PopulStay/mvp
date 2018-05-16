import React, { Component } from 'react'
import { withRouter } from 'react-router'

class introlist extends Component {

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
            Step9:9
    }

    this.state = {
        step: 0,
        Countrys:["Angola","Afghanistan","Albania","Algeria","Anguilla","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda. ","Bolivia","Botswana","Brunei "," Bulgaria","Bulgaria","Burkina"," Burma"," Burundi ","Canada","the Central African Republic","Chad","Bolivia","Columbia","Congo","the Cook islands","Costa Rica","Cuba","Czech","Denmark","Denmark","Djibouti","Djibouti","Ecuador","Salvatore","Estonia ","Ethiopia","Fiji","Finland","French","French Guiana","Gabon"," Georgia "," German "," Garner "," Gibraltar "," Greece","Grenada","Guam "," Guatemala"," Guinea "," Guyana "," Haiti,"," Honduras,","Honduras","Hongkong","Hungary","Iceland","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kazakhstan","Kenya","South Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Italy","Liechtenstein","Lithuania","Macao","Madagascar","Mawlawi","Malaysia","Maldives","Mali","Malta","Mauritius","Mexico","Moldova","Monaco","Mongolia","Mont salad","Morocco","Mozambique","Malta","Neo","Nepal","New Zealand","New Zealand","Nicaragua "," Niger"," Nigeria "," Norway ","Oman","Pakistan "," Papua New Guinea","Paraguay","Peru","Philippines","Poland","French Polynesia","Portuguese"," Puerto Rico "," Qatar "," Russia "," Saint Lucia ","St. Lucia","Saint Mari"," St. Mari "," Sao Tome and Principe "," Sao Tome and Principe "," Senegal","Seychelles"," Sierra Leone"," Singapore ","Slovakia"," Slovenia "," Somalia","South Africa","Senegal","Sri Lanka","Sultan"," Swaziland "," Sweden "," Switzerland"," the Swiss "," the Taiwan Province","the Taiwan Province","Tajikistan","the Tajikistan","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Turkey"],
        city:"Angola",
        work_experience:0,
        experience:"",
        hospitality:"",
    };

  }
  componentWillMount() {
      this.setState({step:this.STEP.Step1});
  }
  nextstep(e){
    this.setState({step:this.state.step+1});
  }
  prestep(e){
    this.setState({step:this.state.step-1});
  }
  submit(e){
    
  }

  render() {
    const Countrys = this.state.Countrys;

    return (
      <div className="introlist">
        { this.state.step === this.STEP.Step1 &&
          <div className="introlist_1 row">
              <div className="boxleft">
                  <a href="../"><img className="logo" src="./images/introlist_logo.png" /></a>
                  <div className="box">
                      <h3>Hi there, Zhao !</h3>
                      <p>We’re excited to learn about the experience you’d like to host on Populstay.In just a few minutes, you’ll start to create your experience page, then you’ll submit it to be reviewed by Populstay</p>
                  </div>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_1.png" />
              </div>
          </div>
        }

        { this.state.step === this.STEP.Step2 &&
          <div className="introlist_2 row">
              <div className="boxleft">
                  <a href="../"><img className="logo" src="./images/introlist_logo.png" /></a>
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
                  <div className="box">
                      <h3>Here’s an overview  of the process: </h3>
                      <ul>
                          <li>
                              <p className="text1"><span>1</span>Learn about our expectations(2-3 minutes) </p>
                              <p className="text2">Find out what makes experiences different and what Populstay is looking for.</p>
                          </li>
                          <li>
                              <p className="text1"><span>2</span>Create your experience (as much time as you need)</p>
                              <p className="text2">Add photos, videos, descriptions, and other details to be reviewed by Populstay.</p>
                          </li>
                          <li>
                              <p className="text1"><span>3</span>Submit for review</p>
                              <p className="text2">Someone from Populstay  will review your experience page. If it meets our quality standards, you'll get to add availability and start hosting!</p>
                          </li>
                      </ul>
                  </div>
                    <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
                    <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>BACK</p>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_2.png" />
              </div>
          </div>
        }

        { this.state.step === this.STEP.Step3 &&
          <div className="introlist_3 row">
              <div className="boxleft">
                  <a href="../"><img className="logo" src="./images/introlist_logo.png" /></a>
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
                  <div className="box">
                      <h3>First things first, which city would you like to host in?</h3>
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">{this.state.city}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          {Countrys.map(item => (
                            <li><a onClick={(e) => this.setState({city: item})}>{item}</a></li>
                          ))}
                        </ul>
                      </div>
                  </div>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>BACK</p>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_3.png" />
              </div>
          </div>
        }

        { this.state.step === this.STEP.Step4 &&
          <div className="introlist_4 row">
              <div className="boxleft">
                  <a href="../"><img className="logo" src="./images/introlist_logo.png" /></a>
                  <div className="STEPhead">
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="box">
                      <h3>Have you hosted an experience on Populstay or somewhere else before?</h3>
                      <div className="radio" onClick={(e) => this.setState({work_experience: 0})}>
                        <label className="text-muted"><p><span className={this.state.work_experience == 0 ?"show":"hide"}></span></p>Yes, i've done this before</label>
                        <h4 className={this.state.work_experience == 0 ?"show":"hide"}>We welcome your participation and experience in Audemars Pigeut, which is different from organizing activities on other platforms.</h4>
                      </div>
                      <div className="radio" onClick={(e) => this.setState({work_experience: 1})}>
                        <label className="text-muted"><p><span className={this.state.work_experience == 1 ?"show":"hide"}></span></p>No, not yet!</label>
                        <h4 className={this.state.work_experience == 1 ?"show":"hide"}>No problem! Anyone with a lot of passion and a great idea can become a host. We'll show you tips and examples along the way to help you build a great experience and be successful.</h4>
                      </div>
                  </div>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>BACK</p>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_4.png" />
              </div>
          </div>
        }

        { this.state.step === this.STEP.Step5 &&
          <div className="introlist_5 row">
              <div className="boxleft">
                  <a href="../"><img className="logo" src="./images/introlist_logo.png" /></a>
                  <div className="STEPhead">
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="box">
                      <h3>What is Populstay looking for in an experience?</h3>
                      <p>The following things don't qualify as a Populstay experience.</p>
                      <ul>
                          <li>It's led by a knowledgeable and passionate host</li>
                          <li>Guests participate hands-on, or are immersed in an activity</li>
                          <li>It gives guests access to a special place or community</li>
                          <li>It's unique, niche, or not what you'd expect</li>
                      </ul>
                  </div>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
                  <p className="textPink">Learn more about our standards</p>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>BACK</p>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_5.png" />
              </div>
          </div>
        }

        { this.state.step === this.STEP.Step6 &&
          <div className="introlist_5 introlist_6 row">
              <div className="boxleft">
                  <a href="../"><img className="logo" src="./images/introlist_logo.png" /></a>
                  <div className="STEPhead">
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="box">
                      <h3>What we're not looking for:</h3>
                      <p>The following things don't qualify as a Populstay experience.</p>
                      <ul>
                          <li>Large and impersonal tours(e.g. tours with 15 or more people)</li>
                          <li>An event with no clear host(e.g. singles night at a bar)</li>
                          <li>A service (e.g. airport transportation)</li>
                          <li>Something guests could easily find on their own(e.g. a generic visit to the Eiffel Tower)</li>
                      </ul>
                  </div>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
                  <p className="textPink">Learn more about our standards</p>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>BACK</p>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_6.png" />
              </div>
          </div>
        }

        { this.state.step === this.STEP.Step7 &&
          <div className="introlist_7 row">
              <div className="boxleft">
                  <a href="../"><img className="logo" src="./images/introlist_logo.png" /></a>
                  <div className="STEPhead">
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="box">
                      <h3>Imagine your guests have all arrived. Hou would you kick off the first 10 minutes of your experience ?</h3>
                      <textarea onChange={(e) => this.setState({experience: e.target.value})}></textarea>
                  </div>
                  <button className={this.state.experience == "" ? "btnactive next" : "next"}  disabled={ this.state.experience == "" ? "disabled" : ""} onClick={(e)=>this.nextstep(e)}  >Next</button>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>BACK</p>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_7.png" />
              </div>
          </div>
        }

        { this.state.step === this.STEP.Step8 &&
          <div className="introlist_7 row">
              <div className="boxleft">
                  <a href="../"><img className="logo" src="./images/introlist_logo.png" /></a>
                  <div className="STEPhead">
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="box">
                      <h3>What dose hospitality mean to you ? </h3>
                      <textarea onChange={(e) => this.setState({hospitality: e.target.value})}></textarea>
                  </div>
                  <button className={this.state.hospitality == "" ? "btnactive next" : "next"}  disabled={ this.state.hospitality == "" ? "disabled" : ""} onClick={(e)=>this.nextstep(e)}  >Next</button>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>BACK</p>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_7.png" />
              </div>
          </div>
        }

        { this.state.step === this.STEP.Step9 &&
          <div className="introlist_2 introlist_9 row">
              <div className="boxleft">
                  <a href="../"><img className="logo" src="./images/introlist_logo.png" /></a>
                  <div className="STEPhead">
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                    <span className="bjpink"></span>
                  </div>
                  <div className="box">
                      <h3>Here’s an overview  of the process: </h3>
                      <ul>
                          <li>
                              <p className="text1"><span>✔</span>Learn about our expectations(2-3 minutes) </p>
                              <p className="text2">Find out what makes experiences different and what Populstay is looking for.</p>
                          </li>
                          <li>
                              <p className="text1"><span>2</span>Create your experience (as much time as you need)</p>
                              <p className="text2">Add photos, videos, descriptions, and other details to be reviewed by Populstay.</p>
                          </li>
                          <li>
                              <p className="text1"><span>3</span>Submit for review</p>
                              <p className="text2">Someone from Populstay  will review your experience page. If it meets our quality standards, you'll get to add availability and start hosting!</p>
                          </li>
                      </ul>
                  </div>
                    <button className="next" onClick={(e)=>this.submit(e)}>Create an experience</button>
                    <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>BACK</p>
              </div>
              <div className="boxright">
                  <img src="./images/introlist_9.png" />
              </div>
          </div>
        }

      </div>
    )
  }
}

export default withRouter(introlist)
