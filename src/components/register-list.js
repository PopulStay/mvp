import React, { Component } from 'react'
import { withRouter } from 'react-router'
import GuestRegister from './guest-register';

class registerlist extends Component {

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
        city:"Angola",
        work_experience:0,
        experience:"",
        hospitality:"",
        language:["中国(简体)","English"],
        languagetext:"Choose language",
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
    if(this.state.step == this.STEP.Step4) {
      this.setState({step:this.STEP.Step5});
    }
    if(this.state.step == this.STEP.Step5) {
      this.setState({step:this.STEP.Step6});
    }
    if(this.state.step == this.STEP.Step6) {
      this.setState({step:this.STEP.Step7});
    }
    if(this.state.step == this.STEP.Step7) {
      this.setState({step:this.STEP.Step8});
    }
    if(this.state.step == this.STEP.Step8) {
      this.setState({step:this.STEP.Step9});
    }
  }
  prestep(e){
    if(this.state.step == this.STEP.Step9) {
      this.setState({step:this.STEP.Step8});
    }
    if(this.state.step == this.STEP.Step8) {
      this.setState({step:this.STEP.Step7});
    }
    if(this.state.step == this.STEP.Step7) {
      this.setState({step:this.STEP.Step6});
    }
    if(this.state.step == this.STEP.Step6) {
      this.setState({step:this.STEP.Step5});
    }
    if(this.state.step == this.STEP.Step5) {
      this.setState({step:this.STEP.Step4});
    }
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
    const language = this.state.language;

    return (
      <div className="register">
        <div className="register_header">
            <header className="header header__white">
              <nav className="nav navbar-nav navbar-right">
                <div className="navbar-header">
                  <butoon  className="glyphicon glyphicon-align-justify navBtn" data-toggle="collapse" data-target="#example-navbar-collapse"></butoon>
                  <a className="navbar-brand" href="../">
                  <img className="header__logo" src="../images/logo.png" alt=""/>
                  </a>
                </div>
                <div className="collapse navbar-collapse" id="example-navbar-collapse">  
                  <a className="navbar-brand" href="../">
                    <img className="header__logo" src="../images/logo.png" alt=""/>
                  </a>
                  <ul>
                    <li className="Li4">
                      <a className="btn button__fill" href="/Register">Experiences</a>
                    </li>
                    <li className="Li4">
                      <a className="btn button__fill">Resources</a>
                    </li>
                    <li className="Li4">
                      <a className="btn button__fill"><span className="glyphicon glyphicon-heart"></span>Wishlist</a>
                    </li>
                    <li className="Li4">
                      <a className="btn button__fill">Trips</a>
                    </li>
                    <li className="Li4">
                      <a href="" className="btn button__Help">Help</a>
                    </li>
                    <li className="Li4">
                      <a href="" className="btn button__Help">Login</a>
                    </li>
                    <li className="Li4">
                      <GuestRegister/>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
        </div>
        <div className="register_content">
          { this.state.step === this.STEP.Step10 &&
            <div className="registerlist_1 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <ul>
                      <li className="textPink">Basics</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>About the experiences</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Settings</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>Location</h3>
                    <h5>Which city will you host your experience in?</h5>
                    <input type="text" value="" placeholder="Singapore, Singapore" />
                    <p>Great! Your city is supported. </p>
                    <button className="next">next</button>
                </div>
            </div>
          }

          { this.state.step === this.STEP.Step1 &&
            <div className="registerlist_2 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <ul>
                      <li className="textPink">Basics</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>About the experiences</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Settings</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-12 col-md-7 col-lg-7">
                    <h3>Which language will you write your descriptions in?</h3>
                    <h5>Keep in mind that most travellers on Airbnb speak English, Chinese, French, or Spanish. If you’re comfortable writing and speaking in one of those languages, we suggest starting there.</h5>
                    <p>I’ll write my descriptions and speak in : </p>
                    <div className="btn-group col-md-12">
                      <button type="button" data-toggle="dropdown">{this.state.languagetext}<span>▼</span></button>
                      <ul className="dropdown-menu" role="menu">
                        {language.map(item => (
                            <li><a onClick={(e) => this.setState({languagetext: item})}>{item}</a></li>
                          ))}
                      </ul>
                    </div>
                    <button className="next">next</button>
                </div>
                <div className="box1 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                        <h6>Languages spoken by Airbnb travellers to Singapore</h6>
                        <ul>
                            <li className="English">
                                <p className="text1"><span className="Left">English</span><span className="Right">72%</span></p>
                                <p className="text2"><span></span></p>
                            </li>
                            <li className="zhongwen">
                                <p className="text1"><span className="Left">中文 (简体)</span><span className="Right">13%</span></p>
                                <p className="text2"><span></span></p>
                            </li>
                            <li className="hanwen">
                                <p className="text1"><span className="Left">한국어</span><span className="Right">4%</span></p>
                                <p className="text2"><span></span></p>
                            </li>
                            <li className="Deutsch">
                                <p className="text1"><span className="Left">Deutsch</span><span className="Right">2%</span></p>
                                <p className="text2"><span></span></p>
                            </li>
                            <li className="Français">
                                <p className="text1"><span className="Left">Français</span><span className="Right">2%</span></p>
                                <p className="text2"><span></span></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
          }


        </div>


      </div>
    )
  }
}

export default withRouter(registerlist)
