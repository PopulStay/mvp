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
        experiencetype:["Art and design","fashion","entertainment","motion","Health care","Outdoors","Delicious food","Life","Culture","Music","Business affairs","Night life"],
        experiencetext1:"Select a category",
        experiencetext2:"Select a category",
        experiencetYesNo:0,
        experiencetext2type:0,
        location:"",
        Organisation_name:"",
        Prove1:0,
        Prove2:0,
        Login_type:0,
        next_type:0,
        selectedPictures:"",
    };

  }
  componentWillMount() {
      this.setState({step:this.STEP.Step1});
  }
  nextstep(e){
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

  fileChangedHandler(event){
    event.preventDefault();
    var files = this.state.selectedPictures;
    let reader = new FileReader();
    let file = event.target.files[0];

      reader.onloadend = () => {
      console.log(reader.result)
        this.setState({selectedPictures:reader.result});
      }
    reader.readAsDataURL(file)
    console.log(this.state.selectedPictures)
  }

  render() {
    const language = this.state.language;
    const experiencetype = this.state.experiencetype;

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
                    <input type="text" onChange={(e) => this.setState({location: e.target.value})} placeholder="Singapore, Singapore" />
                    <p>Great! Your city is supported. </p>
                    <button className={ this.state.location == "" ? "btnactive next" : " next"} disabled={ this.state.location == "" ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>next</button>
                </div>
            </div>
          }

          { this.state.step === this.STEP.Step2 &&
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
                    <h5>Keep in mind that most travellers on PopulStay speak English, Chinese, French, or Spanish. If you’re comfortable writing and speaking in one of those languages, we suggest starting there.</h5>
                    <p>I’ll write my descriptions and speak in : </p>
                    <div className="btn-group">
                      <button type="button" data-toggle="dropdown">{this.state.languagetext}<span>▼</span></button>
                      <ul className="dropdown-menu" role="menu">
                        {language.map(item => (
                            <li><a onClick={(e) => this.setState({languagetext: item})}>{item}</a></li>
                          ))}
                      </ul>
                    </div>
                    <button className="next" onClick={(e)=>this.nextstep(e)}>next</button>
                </div>
                <div className="box1 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img className="becomehost__info" src="./images/rightBoximg.png" alt=""/>
                        <h6>Languages spoken by PopulStay travellers to Singapore</h6>
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

          { this.state.step === this.STEP.Step3 &&
            <div className="registerlist_3 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
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
                    <h3>What type of experience will you host?</h3>
                    <h5>Choose the category that best describes your experience. Add a second, if you think it fits into another category.</h5>
                    <div className="btn-group">
                      <button type="button" data-toggle="dropdown">{this.state.experiencetext1}<span>▼</span></button>
                      <ul className="dropdown-menu" role="menu">
                        {experiencetype.map(item => (
                            <li><a onClick={(e) => this.setState({experiencetext1: item})}>{item}</a></li>
                          ))}
                      </ul>
                    </div>
                    <p className={this.state.experiencetext2type == 0 ? "show textPink" : "hide textPink"} onClick={(e) => this.setState({experiencetext2type: 1})}> + Add secondary category (optional)</p>
                    <p className={this.state.experiencetext2type == 1 ? "show textp" : "hide textp"}>Second categories (selection) <span className="textPink" onClick={(e) => this.setState({experiencetext2type: 0})}>deleting</span></p>
                    <div  className={this.state.experiencetext2type == 1 ? "show btn-group" : "hide btn-group"} >
                      <button type="button" data-toggle="dropdown">{this.state.experiencetext2}<span>▼</span></button>
                      <ul className="dropdown-menu" role="menu">
                        {experiencetype.map(item => (
                            <li><a onClick={(e) => this.setState({experiencetext2: item})}>{item}</a></li>
                          ))}
                      </ul>
                    </div>
                    <h3 className="h31"><img src="./images/registerlist_3.png" />Are you hosting on behalf of a nonprofit organisation?</h3>
                    <h5>If you’re hosting on behalf of a nonprofit or charitable organisation, you may qualify to host a Social Impact experience. PopulStay will waive service fees, and 100% of the proceeds will go to the organisation. Learn more</h5>

                    <div className="check" onClick={(e) => {if(this.state.experiencetYesNo ==0 )this.setState({experiencetYesNo:1});else this.setState({experiencetYesNo:0});}}>
                      <p  className="Pinput">
                          <img className={this.state.experiencetYesNo ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                      </p>
                      <p className="divinput">Yes, I’m hosting on behalf of a nonprofit organisation </p>
                    </div>
                    <p className={this.state.experiencetYesNo == 1 ? "show" : "hide"}>Great! To participate, you’ll have to register with our partner, TechSoup. We’ll send you instructions after you submit your experience page.</p>

                    <div className={this.state.experiencetYesNo == 1 ? "show box3" : "hide box3"} >
                        <h3>Make sure you’re signed into the organization’s Airbnb  account</h3>
                        <p>To host a Social Impact experience, you’ll need to add the nonprofit’s bank account as a payout method. You may need to create a new Airbnb account if the organisation doesn’t already have one.</p>
                        <div className="userimg"><img src="../images/uesrimg.png" /></div>
                        <span>Eric</span>

                        <div className="check" onClick={(e) => {if(this.state.Login_type ==0 )this.setState({Login_type:1});else this.setState({Login_type:0}); if(this.state.next_type ==0 )this.setState({next_type:1});else this.setState({next_type:0});}} >
                          <p  className="Pinput">
                              <img className={this.state.Login_type ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                          </p>
                          <p className="divinput">I’m signed into the organization’s account and not my personal Airbnb account.</p>
                        </div>
                    </div>
                    <button className={this.state.next_type == 1 ? 'show Undo' : 'hide Undo'}  onClick={(e) => this.setState({next_type: 0})}>Undo</button>

                    <button  className={ this.state.experiencetYesNo == 0 ? "btnactive next" : " next"} disabled={  this.state.experiencetYesNo == 0 ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>next</button>
                    <button className={this.state.next_type == 1 ? 'show next' : 'hide next'} onClick={(e) => this.setState({next_type: 0})}>Save</button>
                </div>
            </div>
          }

          { this.state.step === this.STEP.Step4 &&
            <div className="registerlist_3 registerlist_4 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
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
                    <h3>Tell us about the organisation you represent </h3>
                    <h5>Organisation name</h5>

                    <input type="text"  onChange={(e) => this.setState({Organisation_name: e.target.value})} placeholder="Enter the name"/>
                   
                    <h3 className="h31">I certify that: </h3>

                    <div className="check" onClick={(e) => {if(this.state.Prove1 ==0 )this.setState({Prove1:1});else this.setState({Prove1:0});}}>
                      <p  className="Pinput">
                          <img className={this.state.Prove1 ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                      </p>
                      <p className="divinput">I have the consent of the charitable organisation to run this experience on their behalf</p>
                    </div>

                    <div className="check" onClick={(e) => {if(this.state.Prove2 ==0 )this.setState({Prove2:1});else this.setState({Prove2:0});}}>
                      <p  className="Pinput">
                          <img className={this.state.Prove2 ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                      </p>
                      <p className="divinput">The charitable organisation meets <span className="textpink">PopulStay criteria for a Social Impact experience</span></p>
                    </div>


                    <button className="next"  className={ this.state.Organisation_name == "" || this.state.Prove1 == 0 || this.state.Prove2 == 0 ? "btnactive next" : " next"} disabled={ this.state.Organisation_name == "" || this.state.Prove1 == 0 || this.state.Prove2 == 0 ? "disabled" : ""} onClick={(e)=>this.nextstep(e)}>next</button>
                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src="../images/registerlist_4.png" />
                        <ul>
                            <li className="li1">Experience</li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />Singapore</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li>
                                <h5>What we’ll do</h5>
                                <p>Give an overview description of what your guests will be doing on this experience.</p>
                            </li>
                            <li>
                                <h5>What I’ll provide</h5>
                                <p>Let your guests know if you’ll be including anything for this experience.</p>
                            </li>
                            <li>
                                <h5>Where we’ll be</h5>
                                <p>Tell your guests where you’ll be taking them for this experience.</p>
                            </li>
                            <li className="li3">
                                <h5>Notes</h5>
                                <p>Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking</p>
                            </li>
                            <li className="li3">
                                <img src="./images/registerlist_4api.jpg" />
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step5 &&
            <div className="registerlist_3 registerlist_4 registerlist_5 row">
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>Create the page guests will see </h3>
                    <h5>Use the preview on the the right to see how your experience will look publicly. As you create the description for your experience, it will appear in the preview. Write in a clear, straightforward, and friendly way. We’ll give you tips on when to show off your personality and be more descriptive.</h5>
                    <button className="next" onClick={(e)=>this.nextstep(e)}>next</button>
                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src="../images/registerlist_4.png" />
                        <ul>
                            <li className="li1">Experience</li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />Singapore</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li>
                                <h5>What we’ll do</h5>
                                <p>Give an overview description of what your guests will be doing on this experience.</p>
                            </li>
                            <li>
                                <h5>What I’ll provide</h5>
                                <p>Let your guests know if you’ll be including anything for this experience.</p>
                            </li>
                            <li>
                                <h5>Where we’ll be</h5>
                                <p>Tell your guests where you’ll be taking them for this experience.</p>
                            </li>
                            <li className="li3">
                                <h5>Notes</h5>
                                <p>Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking</p>
                            </li>
                            <li className="li3">
                                <img src="./images/registerlist_4api.jpg" />
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step1 &&
            <div className="registerlist_4 registerlist_6 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <ul>
                      <li className="textPink">Basics</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">About the experiences</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Settings</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>Create your cover</h3>
                    <h5>If you don’t have the perfect photo right now, don’t worry. Use the best one you have on hand.</h5>
                    <p className="textpink">Tips and examples▲</p>
                    <div className="examples">
                      <ul className="ulleft col-sm-12 col-md-6 col-lg-6">
                          <li><img src="../images/registerlist_dui.png" /><p>Think of your first photo and title as a book cover—it’s the first thing people will see</p></li>
                          <li><img src="../images/registerlist_dui.png" /><p>Go with active, candid images</p></li>
                          <li><img src="../images/registerlist_dui.png" /><p>Try to take the photo in a well-lit space</p></li>
                          <li><img src="../images/registerlist_dui.png" /><p>Photos with a vertical orientation work best</p></li>
                      </ul>
                      <ul className="ulright col-sm-6 col-md-6 col-lg-6">
                          <li><img src="../images/registerlist_cuo.png" /><p>Don’t use a flash or heavy filters</p></li>
                          <li><img src="../images/registerlist_cuo.png" /><p>Don’t upload blurry or distorted images</p></li>
                          <li><img src="../images/registerlist_cuo.png" /><p>Photos cannot feature children, logos, or alcohol</p></li>
                          <li><img src="../images/registerlist_cuo.png" /><p>Don’t upload images with text overlaid</p></li>
                          <li><img src="../images/registerlist_cuo.png" /><p>No posed portraits</p></li>
                      </ul>
                    </div>
                    <div className="imgs">
                        <img src="../images/registerlist_4.png" />
                        <img src="../images/registerlist_4.png" />
                        <img src="../images/registerlist_4.png" />
                    </div>

                    <h3>Experience title</h3>
                    <p>A great title is short, clear and descriptive. Try starting with a fun or unique verb.</p>
                    <input type="text" placeholder="E.g. Dance your way through Rio’s samba scene" />
                    <p>10 characters needed</p>
                    <div className={this.state.selectedPictures == "" ? "show photoleft col-sm-12 col-md-12 col-lg-12" : "hide photoleft col-sm-6 col-md-6 col-lg-6"} >
                      <h3>Cover photo</h3>
                      <p className={this.state.selectedPictures == "" ? "hide" : "show"}>Adjust your cover image for how you’d like it to appear in search results.</p>
                      <div className={this.state.selectedPictures == "" ? "hide" : "show"}>
                          <img src={this.state.selectedPictures == "" ? "../images/registerlist_4.png" : this.state.selectedPictures} />
                      </div>
                    </div>
                    <div  className={this.state.selectedPictures == "" ? "hide photoright col-sm-6 col-md-6 col-lg-6" : "show photoright col-sm-6 col-md-6 col-lg-6"} >
                      <h3>Thumbnail</h3>
                      <p>Adjust your cover image for how you’d like it to appear in search results.</p>
                      <div>
                          <img src={this.state.selectedPictures == "" ? "../images/registerlist_4.png" : this.state.selectedPictures} />
                      </div>
                    </div>
                    <button className="Upload"><img src="../images/registerlist_btnimg.png" />Upload cover photo<input type="file" onChange={(e)=>this.fileChangedHandler(e)}/></button>
                      
                    <div></div> 
                    <button className="next"  className={ this.state.Organisation_name == "" || this.state.Prove1 == 0 || this.state.Prove2 == 0 ? "btnactive next" : " next"} disabled={ this.state.Organisation_name == "" || this.state.Prove1 == 0 || this.state.Prove2 == 0 ? "disabled" : ""} onClick={(e)=>this.nextstep(e)}>next</button>
                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.selectedPictures == "" ? "../images/registerlist_4.png" : this.state.selectedPictures} />
                        <ul>
                            <li className="li1">Experience</li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />Singapore</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li>
                                <h5>What we’ll do</h5>
                                <p>Give an overview description of what your guests will be doing on this experience.</p>
                            </li>
                            <li>
                                <h5>What I’ll provide</h5>
                                <p>Let your guests know if you’ll be including anything for this experience.</p>
                            </li>
                            <li>
                                <h5>Where we’ll be</h5>
                                <p>Tell your guests where you’ll be taking them for this experience.</p>
                            </li>
                            <li className="li3">
                                <h5>Notes</h5>
                                <p>Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking</p>
                            </li>
                            <li className="li3">
                                <img src="./images/registerlist_4api.jpg" />
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
