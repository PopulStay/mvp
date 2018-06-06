import React, { Component } from 'react';
import guestService from '../services/guest-service';
import { withRouter } from 'react-router';
import web3service from '../services/web3-service';
import languageService from '../services/language-service';

class introlist extends Component {

  constructor(props) {
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
        user:"",
        Countrys:[],
        city:"Angola",
        work_experience:0,
        experience:"",
        hospitality:"",
        languagelist:{},
    };

      web3service.loadWallet();
      languageService.language();
  }
  componentWillMount() {
      guestService.getGuesterInfo(window.address).then((data)=>{
            this.setState({ user:data.user });
      });
      this.setState({
        step:this.state.languagelist=window.languagelist,
        step:this.STEP.Step1,
        Countrys:this.state.languagelist.Countrys,
        city:this.state.languagelist.roomstuff_Country
      });
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
    const language = this.state.languagelist;
    const Countrys = this.state.Countrys;

    return (
      <div className="introlist">
        { this.state.step === this.STEP.Step1 &&
          <div className="introlist_1 row">
              <div className="boxleft">
                  <a href="../"><img className="logo" src="./images/introlist_logo.png" /></a>
                  <div className="box">
                      <h3>{language.Hi_there}, {this.state.user} !</h3>
                      <p>{language.Were_excited_to_learn_about}</p>
                  </div>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>{language.Next}</button>
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
                      <h3>{language.Heres_an_overview_of_the_process}: </h3>
                      <ul>
                          <li>
                              <p className="text1"><span>1</span>{language.Learn_about_our_expectations}</p>
                              <p className="text2">{language.Find_out_what_makes_experiences}</p>
                          </li>
                          <li>
                              <p className="text1"><span>2</span>{language.Create_your_experience}</p>
                              <p className="text2">{language.Add_photos_videos_descriptions}</p>
                          </li>
                          <li>
                              <p className="text1"><span>3</span>{language.Submit_for_review}</p>
                              <p className="text2">{language.Someone_from_Populstay}</p>
                          </li>
                      </ul>
                  </div>
                    <button className="next" onClick={(e)=>this.nextstep(e)}>{language.Next}</button>
                    <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>{language.Back}</p>
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
                      <h3>{language.First_things_first}</h3>
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">{this.state.city}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          {Countrys.map(item => (
                            <li><a onClick={(e) => this.setState({city: item})}>{item}</a></li>
                          ))}
                        </ul>
                      </div>
                  </div>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>{language.Next}</button>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>{language.Back}</p>
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
                      <h3>{language.Have_you_hosted_an_experience}</h3>
                      <div className="radio" onClick={(e) => this.setState({work_experience: 0})}>
                        <label className="text-muted"><p><span className={this.state.work_experience == 0 ?"show":"hide"}></span></p>{language.Yes_ive_done_this_before}</label>
                        <h4 className={this.state.work_experience == 0 ?"show":"hide"}>{language.We_welcome_your_participation}</h4>
                      </div>
                      <div className="radio" onClick={(e) => this.setState({work_experience: 1})}>
                        <label className="text-muted"><p><span className={this.state.work_experience == 1 ?"show":"hide"}></span></p>{language.No_not_yet}</label>
                        <h4 className={this.state.work_experience == 1 ?"show":"hide"}>{language.No_problem_Anyone_with_a_lot_of_passion}</h4>
                      </div>
                  </div>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>{language.Next}</button>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>{language.Back}</p>
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
                      <h3>{language.What_is_Populstay_looking}</h3>
                      <p>{language.The_following_things}</p>
                      <ul>
                          <li>{language.Its_led_by_a_knowledgeable}</li>
                          <li>{language.Guests_participate}</li>
                          <li>{language.It_gives_guests_access}</li>
                          <li>{language.Its_unique_niche}</li>
                      </ul>
                  </div>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>{language.Next}</button>
                  <p className="textPink">{language.Learn_more_about_our_standards}</p>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>{language.Back}</p>
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
                      <h3>{language.What_were_not_looking_for}:</h3>
                      <p>{language.The_following_things_dont_qualify}</p>
                      <ul>
                          <li>{language.Large_and_impersonal_tours}</li>
                          <li>{language.An_event_with_no_clear_host}</li>
                          <li>{language.A_service}</li>
                          <li>{language.Something_guests_could_easily}</li>
                      </ul>
                  </div>
                  <button className="next" onClick={(e)=>this.nextstep(e)}>{language.Next}</button>
                  <p className="textPink">{language.Learn_more_about_our_standards}</p>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>{language.Back}</p>
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
                      <h3>{language.Imagine_your_guests_have_all_arrived}</h3>
                      <textarea onChange={(e) => this.setState({experience: e.target.value})}></textarea>
                  </div>
                  <button className={this.state.experience == "" ? "btnactive next" : "next"}  disabled={ this.state.experience == "" ? "disabled" : ""} onClick={(e)=>this.nextstep(e)}  >{language.Next}</button>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>{language.Back}</p>
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
                      <h3>{language.What_dose_hospitality_mean_to_you}</h3>
                      <textarea onChange={(e) => this.setState({hospitality: e.target.value})}></textarea>
                  </div>
                  <button className={this.state.hospitality == "" ? "btnactive next" : "next"}  disabled={ this.state.hospitality == "" ? "disabled" : ""} onClick={(e)=>this.nextstep(e)}  >{language.Next}</button>
                  <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>{language.Back}</p>
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
                      <h3>{language.Heres_an_overview_of_the_process}: </h3>
                      <ul>
                          <li>
                              <p className="text1"><span>✔</span>{language.Learn_about_our_expectations}</p>
                              <p className="text2">{language.Find_out_what_makes_experiences}</p>
                          </li>
                          <li>
                              <p className="text1"><span>2</span>{language.Create_your_experience}</p>
                              <p className="text2">{language.Add_photos_videos_descriptions}</p>
                          </li>
                          <li>
                              <p className="text1"><span>3</span>{language.Submit_for_review}</p>
                              <p className="text2">{language.Someone_from_Populstay}</p>
                          </li>
                      </ul>
                  </div>
                    <button className="next" onClick={(e)=>this.submit(e)}>{language.Create_an_experience}</button>
                    <p className="pre" onClick={(e)=>this.prestep(e)}><span>◀</span>{language.Back}</p>
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

export default introlist
