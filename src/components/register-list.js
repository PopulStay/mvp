import React, { Component } from 'react'
import { withRouter } from 'react-router'
import GuestRegister from './guest-register';
import guestService from '../services/guest-service';
import web3Service from '../services/web3-service';
import AvatarEditor from 'react-avatar-editor';

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
            Step9:9,
            Step10:10,
            Step11:11,
            Step12:12,
            Step13:13,
            Step14:14,
            Step15:15,
            Step16:16,
            Step17:17,
            Step18:18,
            Step19:19,
            Step20:20,
            Step21:21,
            Step22:22,
            Step23:23,
            Step24:24,
            Step25:25,
            Step26:26,
    }

    this.state = {
        step: 0,
        user:"",
        city:"Angola",
        work_experience:0,
        experience:"",
        hospitality:"",
        language:["中文 (简体)","English","한국어","Deutsch","Français"],
        languagetext:"Choose language",
        experiencetype:["Art and design","fashion","entertainment","motion","Health care","Outdoors","Delicious food","Life","Culture","Music","Business affairs","Night life"],
        experiencetext1:"Select a category",
        experiencetext2:"Select a category",
        Countrysarr:["Angola","Afghanistan","Albania","Algeria","Anguilla","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda. ","Bolivia","Botswana","Brunei "," Bulgaria","Bulgaria","Burkina"," Burma"," Burundi ","Canada","the Central African Republic","Chad","Bolivia","Columbia","Congo","the Cook islands","Costa Rica","Cuba","Czech","Denmark","Denmark","Djibouti","Djibouti","Ecuador","Salvatore","Estonia ","Ethiopia","Fiji","Finland","French","French Guiana","Gabon"," Georgia "," German "," Garner "," Gibraltar "," Greece","Grenada","Guam "," Guatemala"," Guinea "," Guyana "," Haiti,"," Honduras,","Honduras","Hongkong","Hungary","Iceland","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kazakhstan","Kenya","South Korea","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Italy","Liechtenstein","Lithuania","Macao","Madagascar","Mawlawi","Malaysia","Maldives","Mali","Malta","Mauritius","Mexico","Moldova","Monaco","Mongolia","Mont salad","Morocco","Mozambique","Malta","Neo","Nepal","New Zealand","New Zealand","Nicaragua "," Niger"," Nigeria "," Norway ","Oman","Pakistan "," Papua New Guinea","Paraguay","Peru","Philippines","Poland","French Polynesia","Portuguese"," Puerto Rico "," Qatar "," Russia "," Saint Lucia ","St. Lucia","Saint Mari"," St. Mari "," Sao Tome and Principe "," Sao Tome and Principe "," Senegal","Seychelles"," Sierra Leone"," Singapore ","Slovakia"," Slovenia "," Somalia","South Africa","Senegal","Sri Lanka","Sultan"," Swaziland "," Sweden "," Switzerland"," the Swiss "," the Taiwan Province","the Taiwan Province","Tajikistan","the Tajikistan","Tanzania","Thailand","Togo","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Turkey"],
        experiencetYesNo:0,
        experiencetext2type:0,
        location:"",
        Organisation_name:"",
        Prove1:0,
        Prove2:0,
        Login_type:0,
        Experience_Pictures:"",
        select_Pictures:"",
        modalset:0,
        modalimg:"",
        Tips_examples:1,
        Experience_title:"",
        photolist:[],
        introduce:"",
        Slogan:"",
        Experience_content:"",
        organization:"",
        Location_name:"",
        Countrys:"Angola",
        Street_address:"",
        Apt_Suite_Bldg:"",
        City:"",
        ZIP_code:"",
        Direction:"",
        API_img:"",
        position_information:"",
        Content_providedarr:["food","Drink","Accommodation","Ticket","Traffic","Equipment","Snack"],
        Content_provided:"Selection project",
        Content_provided_1:"Selection project",
        Not_providing:1,
        placeholder_provided:"",
        Provide_content:"",
        Provide_content_1:"",
        add_another:0,
        Promptlist_8:1,
        Prompttype_8:false,
        Promptlist_9:1,
        Prompttype_9:false,
        Promptlist_11:1,
        Prompttype_11:false,
        Promptlist_13:1,
        Prompttype_13:false,
        Promptlist_14:1,
        Prompttype_14:false,
        inputlistarr:[],
        Book_understand:"",
        No_notes_additional:1,
        active_experience:0,
        Minimum_agearr:[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
        Minimum_age:"Please choose",
        Alcohol:0,
        bring_kids:0,
        verified_ID:0,
        Additional_requirements:"",
        Maximum_grouparr:[1,2,3,4,5,6,7,8,9,10],
        Maximum_group:"Please choose",
        price_guest:0,
        guest_num:1,
        Explain_benefits:"",
        Check_time:["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"],
        time_to:"Selection time",
        time_from:"Selection time",
        Book_timearr:["1 hours","2 hours","3 hours","4 hours","8 hours","12 hours","1 days","2 days","3 days","4 days","5 days","6 days","1 weeks"],
        Book_time:"1 weeks",
        Cancel_experience:0,
        Comply_law:0,
        Terms_service:0,
        canvasW:800,
        canvasH:500,
        canvasRotate:0,
        canvasScale:1,
        editor:0,
        photosindex:0,
        modalimg:'',
    };

    web3Service.loadWallet();
  }
  componentWillMount() {
      this.setState({step:this.STEP.Step1});
      guestService.getGuesterInfo(window.address).then((data)=>{
        this.setState({ user:data.user});
      });
  }
  nextstep(e){
    this.setState({step:this.state.step+1});
  }
  prestep(e){
    this.setState({step:this.state.step-1});
  }

  fileChangedHandler(event){
    event.preventDefault();
    var files = this.state.Experience_Pictures;
    let reader = new FileReader();
    let file = event.target.files[0];

      reader.onloadend = () => {
      console.log(reader.result)
        this.setState({Experience_Pictures:reader.result});
        this.setState({select_Pictures:reader.result});
      }
    reader.readAsDataURL(file)
    console.log(this.state.Experience_Pictures)
  }

  photolist(event){
    event.preventDefault();
    var plists = this.state.photolist;
    let reader = new FileReader();
    let file = event.target.files[0];

      reader.onloadend = () => {
        plists.push(reader.result);
        this.setState({photolist:plists});
      }
    reader.readAsDataURL(file)
    console.log(this.state.photolist.length)
  }

  modalPictures(index,e){
    var modalBody=document.getElementById("modalBody");
    console.log(modalBody.height)
    this.setState({
          state:this.state.modalimg = this.state.Experience_Pictures,
          canvasW:modalBody.width,
          canvasH:modalBody.height,
          photosindex:index
    });
  }

  onClickSave = () => {
    if (this.state.editor) {
      const canvas = this.state.editor.getImage()
      const canvasScaled = this.state.editor.getImageScaledToCanvas();
      this.setState({state:this.state.Experience_Pictures = canvasScaled.toDataURL("image/png")})
      console.log(this.state.Experience_Pictures)
    }
  }

  setEditorRef = (editor) => this.state.editor = editor

    delphoto(e,index){
      this.setState({
            photolist: this.state.photolist.filter((elem, i) => index != i)
      });
    }
    providedclick(e){
      this.setState({
            Content_provided: this.state.Content_providedarr[e]
      });
      if(e==0){
        this.setState({
              placeholder_provided: "What kind of food will you provide? For example, barbecue dinner and so on."
        });
      }else if(e==1){
        this.setState({
              placeholder_provided: "What drinks will you provide?"
        });
      }else if(e==2){
        this.setState({
              placeholder_provided: "Where are you going to live?"
        });
      }else if(e==3){
        this.setState({
              placeholder_provided: "What kind of tickets will you pay for it?"
        });
      }else if(e==4){
        this.setState({
              placeholder_provided: "What means of transportation will the experience use?"
        });
      }else if(e==5){
        this.setState({
              placeholder_provided: "What facilities will you provide?"
        });
      }else{
        this.setState({
              placeholder_provided: "Give the project an external name?"
        });
      }
    }
    providedclick1(e){
      this.setState({
            Content_provided_1: this.state.Content_providedarr[e]
      });
      if(e==0){
        this.setState({
              placeholder_provided: "What kind of food will you provide? For example, barbecue dinner and so on."
        });
      }else if(e==1){
        this.setState({
              placeholder_provided: "What drinks will you provide?"
        });
      }else if(e==2){
        this.setState({
              placeholder_provided: "Where are you going to live?"
        });
      }else if(e==3){
        this.setState({
              placeholder_provided: "What kind of tickets will you pay for it?"
        });
      }else if(e==4){
        this.setState({
              placeholder_provided: "What means of transportation will the experience use?"
        });
      }else if(e==5){
        this.setState({
              placeholder_provided: "What facilities will you provide?"
        });
      }else{
        this.setState({
              placeholder_provided: "Give the project an external name?"
        });
      }
    }
    Promptnext(obj){
      if(obj == 8){
        if(this.state.Promptlist_8 == 3){
          this.setState({
                Promptlist_8: 1
          });
        }else{
          this.setState({
                Promptlist_8: this.state.Promptlist_8+1
          });
        }
      }
      if(obj == 9){
        if(this.state.Promptlist_9 == 3){
          this.setState({
                Promptlist_9: 1
          });
        }else{
          this.setState({
                Promptlist_9: this.state.Promptlist_9+1
          });
        }
      }
      if(obj == 11){
        if(this.state.Promptlist_11 == 2){
          this.setState({
                Promptlist_11: 1
          });
        }else{
          this.setState({
                Promptlist_11: this.state.Promptlist_11+1
          });
        }
      }
      if(obj == 13){
        if(this.state.Promptlist_13 == 2){
          this.setState({
                Promptlist_13: 1
          });
        }else{
          this.setState({
                Promptlist_13: this.state.Promptlist_13+1
          });
        }
      }
      if(obj == 14){
        if(this.state.Promptlist_14 == 3){
          this.setState({
                Promptlist_14: 1
          });
        }else{
          this.setState({
                Promptlist_14: this.state.Promptlist_14+1
          });
        }
      }
    }
    Promptpre(obj){
      if(obj == 8){
        if(this.state.Promptlist_8 == 1){
          this.setState({
                Promptlist_8: 3
          });
        }else{
          this.setState({
                Promptlist_8: this.state.Promptlist_8-1
          });
        }
      }
      if(obj == 9){
        if(this.state.Promptlist_9 == 1){
          this.setState({
                Promptlist_9: 3
          });
        }else{
          this.setState({
                Promptlist_9: this.state.Promptlist_9-1
          });
        }
      }
      if(obj == 11){
        if(this.state.Promptlist_11 == 1){
          this.setState({
                Promptlist_11: 2
          });
        }else{
          this.setState({
                Promptlist_11: this.state.Promptlist_11-1
          });
        }
      }
      if(obj == 13){
        if(this.state.Promptlist_13 == 1){
          this.setState({
                Promptlist_13: 2
          });
        }else{
          this.setState({
                Promptlist_13: this.state.Promptlist_13-1
          });
        }
      }
      if(obj == 14){
        if(this.state.Promptlist_14 == 1){
          this.setState({
                Promptlist_14: 3
          });
        }else{
          this.setState({
                Promptlist_14: this.state.Promptlist_14-1
          });
        }
      }
    }

    addinputlist(e){
      var inputlist = this.state.inputlistarr;
      inputlist.push("");
      this.setState({inputlistarr:inputlist});
    }
    inputlistval(e,index){
      var inputlist = this.state.inputlistarr;
      inputlist[index] = e.target.value;
      this.setState({inputlistarr:inputlist});
    }
    inputlistdel(e,index){
      var inputlist = this.state.inputlistarr;
      inputlist.splice(index,1);
      this.setState({inputlistarr:inputlist});
    }

  render() {
    const language = this.state.language;
    const experiencetype = this.state.experiencetype;
    const Countrysarr = this.state.Countrysarr;
    const Content_providedarr = this.state.Content_providedarr;
    const inputlistarr = this.state.inputlistarr;
    const Minimum_agearr = this.state.Minimum_agearr;
    const Check_time = this.state.Check_time;
    const Book_timearr = this.state.Book_timearr;
    const Maximum_grouparr = this.state.Maximum_grouparr;

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
                    <li className="Li5">
                      <GuestRegister/>
                    </li>
                  </ul>
                </div>
              </nav>
            </header>
        </div>
        <div className="register_content">

          { this.state.step === this.STEP.Step1 &&
            <div className="registerlist_1 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <ul>
                      <li className="textPink" onClick={(e)=>this.setState({step:this.STEP.Step1})}>Basics</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>About the experiences</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Settings</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-12 col-md-7 col-lg-7">
                    <h3>Location</h3>
                    <h5>Which city will you host your experience in?</h5>
                    <input type="text" onChange={(e) => this.setState({location: e.target.value})} placeholder="Singapore, Singapore" />
                    <p>Great! Your city is supported. </p>
                    <button className={ this.state.location == "" ? "btnactive next" : " next"} disabled={ this.state.location == "" ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>Next</button>
                </div>
                <div className="box1 col-sm-12 col-md-5 col-lg-5">
                    
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
                      <li className="textPink" onClick={(e)=>this.setState({step:this.STEP.Step1})}>Basics</li>
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
                    <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
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
                      <li className="textPink" onClick={(e)=>this.setState({step:this.STEP.Step1})}>Basics</li>
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
                        <span>{this.state.user}</span>

                        <div className="check" onClick={(e) => {if(this.state.Login_type ==0 )this.setState({Login_type:1});else this.setState({Login_type:0}); if(this.state.next_type ==0 )this.setState({next_type:1});else this.setState({next_type:0});}} >
                          <p  className="Pinput">
                              <img className={this.state.Login_type ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                          </p>
                          <p className="divinput">I’m signed into the organization’s account and not my personal Airbnb account.</p>
                        </div>
                    </div>

                    <button  className={ this.state.experiencetYesNo == 0 ? "btnactive next" : "next"} disabled={  this.state.experiencetYesNo == 0 ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>Next</button>
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


                    <button className="next"  className={ this.state.Organisation_name == "" || this.state.Prove1 == 0 || this.state.Prove2 == 0 ? "btnactive next" : " next"} disabled={ this.state.Organisation_name == "" || this.state.Prove1 == 0 || this.state.Prove2 == 0 ? "disabled" : ""} onClick={(e)=>this.nextstep(e)}>Next</button>
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
                            <li className="li3">
                                <h5>About Warm house</h5>
                                <p>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
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
                    <button className="next" onClick={(e)=>this.nextstep(e)}>Next</button>
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
                            <li className="li3">
                                <h5>About Warm house</h5>
                                <p>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step6 &&
            <div className="registerlist_4 registerlist_6 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
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
                    <p className="textpink" onClick={(e) => {if(this.state.Tips_examples == 0 )this.setState({Tips_examples:1});else this.setState({Tips_examples:0});}}>Tips and examples<span className={this.state.Tips_examples == 1 ? "modalshow" : "hide"}>▲</span><span className={this.state.Tips_examples == 0 ? "modalshow" : "hide"}>▼</span></p>
                    <div className={this.state.Tips_examples == 1 ? "show examples" : "hide examples"}>
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
                    <div className={this.state.Tips_examples == 1 ? "show imgs" : "hide imgs"}>
                        <div><img onClick={(e)=>this.setState({select_Pictures:"../images/registerlist_6img1.jpg"})} src="../images/registerlist_6img1.jpg" /></div>
                        <div><img onClick={(e)=>this.setState({select_Pictures:"../images/registerlist_6img2.jpg"})} src="../images/registerlist_6img2.jpg" /></div>
                        <div><img onClick={(e)=>this.setState({select_Pictures:"../images/registerlist_6img3.jpg"})} src="../images/registerlist_6img3.jpg" /></div>
                    </div>

                    <h3>Experience title</h3>
                    <p>A great title is short, clear and descriptive. Try starting with a fun or unique verb.</p>
                    <input type="text" placeholder="E.g. Dance your way through Rio’s samba scene"  onChange={(e) => this.setState({Experience_title: e.target.value})}/>
                    <p className={this.state.Experience_title.length > 38 || this.state.Experience_title.length < 10 ? "textpink" : ""}>{this.state.Experience_title.length <= 10 ? 10-this.state.Experience_title.length+" characters needed" : "character does not exceed "+(38-this.state.Experience_title.length)}</p>
                    <div className={this.state.Experience_Pictures == "" ? "hide photoleft col-sm-12 col-md-12 col-lg-12" : "show photoleft col-sm-6 col-md-6 col-lg-6"} >
                      <h3>Cover photo</h3>
                      <p className={this.state.Experience_Pictures == "" ? "hide" : "show"}>Adjust your cover image for how you’d like it to appear in search results.</p>
                      <div className={this.state.Experience_Pictures == "" ? "hide photochage" : "show photochage"}>
                          <img src={this.state.Experience_Pictures == "" ? "../images/registerlist_4.png" : this.state.Experience_Pictures} />
                          <p  data-toggle="modal" data-target="#myModal" onClick={(e) => this.modalPictures(e)}><span>Edit</span></p>
                          <span className="glyphicon glyphicon-trash"  onClick={(e) => {if(this.state.select_Pictures == this.state.Experience_Pictures)this.setState({Experience_Pictures: "",select_Pictures: ""});else this.setState({Experience_Pictures: ""})}}></span>
                      </div>
                    </div>
                    <div  className={this.state.Experience_Pictures == "" ? "hide photoright col-sm-6 col-md-6 col-lg-6" : "show photoright col-sm-6 col-md-6 col-lg-6"} >
                      <h3>Thumbnail</h3>
                      <p>Adjust your cover image for how you’d like it to appear in search results.</p>
                      <div className={this.state.Experience_Pictures == "" ? "hide photochage" : "show photochage"}>
                          <img src={this.state.Experience_Pictures == "" ? "../images/registerlist_4.png" : this.state.Experience_Pictures} />
                          <p  data-toggle="modal" data-target="#myModal" onClick={(e) => this.modalPictures(e)}><span>Edit</span></p>
                      </div>
                    </div>
                    <div className={this.state.Experience_Pictures == "" ? "show Uploaddiv col-lg-12" : "hide Uploaddiv col-lg-12"}>
                        <button className="Upload"><img src="../images/registerlist_btnimg.png" />Upload cover photo<input type="file" onChange={(e)=>this.fileChangedHandler(e)}/></button>
                    </div>

                   <div className="modal fade hide" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <div className="modal-body" id="modalBody" ref='modalBody'>
                           <AvatarEditor
                              ref = {this.setEditorRef}
                              image={this.state.modalimg}
                              width={800}
                              height={500}
                              border={[50,0,50,0]}
                              color={[0, 0, 0, 0.6]}
                              scale={this.state.canvasScale}
                              rotate={this.state.canvasRotate}
                            />
                          </div>
                          <div className="modal-footer"vz>
                            <ul className={this.state.modalset == 0 ? "Set modalshow" : "Set hide"}>
                                <li onClick={(e) => this.setState({modalset:1})}><img src="../images/crop.png" />Crop</li>
                                <li onClick={(e) => this.setState({modalset:2})}><img src="../images/Brightness.png" />Adjust Brightness</li>
                                <li onClick={(e) => this.setState({canvasRotate:this.state.canvasRotate+90})}><img src="../images/Rotate.png" />Rotate</li>
                            </ul>
                            <ul className={this.state.modalset != 0 ? "Brightness show" : "Brightness hide"}>
                                <li  className={this.state.modalset == 1 ? "show" : "hide"}>
                                    <p>Zoom</p>
                                    <input type="range" onChange={(e)=>this.setState({canvasScale:e.target.value})} name="points"  step="0.01" min="0.5" max="2" />
                                </li>
                                <li  className={this.state.modalset == 2 ? "show" : "hide"}>
                                    <p>Brightness</p>
                                    <input type="range" onChange={(e)=>this.BrightnessPictures(e.target.value)} name="points" step="0.01" min="-1" max="1" />
                                </li>
                                <li  className={this.state.modalset == 2 ? "show" : "hide"}>
                                    <p>Contrast Ratio</p>
                                    <input type="range" name="points" step="0.02" min="1" max="3" />
                                </li>
                            </ul>
                            <button onClick={(e) => this.setState({modalset:0})} className={this.state.modalset != 0 ? "btn Cancel show" : "btn Cancel hide"} type="button">Cancel</button>
                            <button onClick={(e) => this.setState({modalset:0})} className={this.state.modalset != 0 ? "btn Complete show" : "btn Complete hide"} type="button" >Complete</button>
                            <button  className={this.state.modalset == 0 ? "btn Replace show" : "btn Replace hide"} data-dismiss="modal" aria-hidden="true" type="button" onClick={(e)=>this.onClickSave(e)}>Save and Replace</button>
                          </div>
                        </div>
                      </div>
                    <div className="modal-backdrop fade in"></div>
                    </div>
                      
                    <button className="next"  className={ this.state.Experience_Pictures == "" || this.state.Experience_title.length > 38 || this.state.Experience_title.length < 10 ? "btnactive next" : " next"} disabled={ this.state.Experience_Pictures == "" || this.state.Experience_title.length > 38 || this.state.Experience_title.length < 10 ? "disabled" : ""} onClick={(e)=>this.nextstep(e)}>Next</button>
                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
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
                            <li className="li3">
                                <h5>About Warm house</h5>
                                <p>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step7 &&
            <div className="registerlist_4 registerlist_6 registerlist_7 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
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
                    <p className="textpink" onClick={(e) => {if(this.state.Tips_examples == 0 )this.setState({Tips_examples:1});else this.setState({Tips_examples:0});}}>Tips and examples<span className={this.state.Tips_examples == 1 ? "modalshow" : "hide"}>▲</span><span className={this.state.Tips_examples == 0 ? "modalshow" : "hide"}>▼</span></p>
                    <div className={this.state.Tips_examples == 1 ? "show examples" : "hide examples"}>
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
                    <div className={this.state.Tips_examples == 1 ? "show imgs" : "hide imgs"}>
                        <div><img onClick={(e)=>this.setState({select_Pictures:"../images/registerlist_7img1.jpg"})} src="../images/registerlist_7img1.jpg" /></div>
                        <div><img onClick={(e)=>this.setState({select_Pictures:"../images/registerlist_7img4.jpg"})} src="../images/registerlist_7img4.jpg" /></div>
                        <div><img onClick={(e)=>this.setState({select_Pictures:"../images/registerlist_7img2.jpg"})} src="../images/registerlist_7img2.jpg" /></div>
                        <div><img onClick={(e)=>this.setState({select_Pictures:"../images/registerlist_7img3.jpg"})} src="../images/registerlist_7img3.jpg" /></div>
                        <div><img onClick={(e)=>this.setState({select_Pictures:"../images/registerlist_7img5.jpg"})} src="../images/registerlist_7img5.jpg" /></div>
                    </div>

                    <h3>Gallery</h3>
                    <div className="Gallery">
                        <div className="col-sm-12 col-md-4 col-lg-4">
                          <div className="imgdiv">
                            <img onClick={(e)=>this.setState({step:this.STEP.Step6})} src={this.state.Experience_Pictures == "" ? "../images/registerlist_4.png" : this.state.Experience_Pictures} /></div>
                        </div>

                        <div className="col-sm-12 col-md-4 col-lg-4">
                          <div className={this.state.photolist.length <= 0 ? "hide imgdiv" : "show imgdiv"}>
                            <img src={this.state.photolist[0]} />
                            <p><span>Edit</span></p>
                            <span className="glyphicon glyphicon-trash" onClick={(e) => this.delphoto(e,0)}></span>
                          </div>
                          <div className={this.state.photolist.length <= 0 ? "show photodiv" : "hide photodiv"}><img src="../images/registerlist_7img6.png" /><h4>Host</h4><p>Show yourself<br/>leading the activity</p><input type="file" onChange={(e)=>this.photolist(e)}/></div>
                        </div>

                        <div className="col-sm-12 col-md-4 col-lg-4">
                          <div className={this.state.photolist.length <= 1 ? "hide imgdiv" : "show imgdiv"}>
                            <img src={this.state.photolist[1]} />
                            <p><span>Edit</span></p>
                            <span className="glyphicon glyphicon-trash" onClick={(e) => this.delphoto(e,1)}></span>
                          </div>
                          <div className={this.state.photolist.length <= 1 ? "show photodiv" : "hide photodiv"}><img src="../images/registerlist_7img6.png" /><h4>Action</h4><p>Show guests engaging<br/>in your experience</p><input type="file" onChange={(e)=>this.photolist(e)}/></div>
                        </div>

                        <div className="col-sm-12 col-md-4 col-lg-4">
                          <div className={this.state.photolist.length <= 2 ? "hide imgdiv" : "show imgdiv"}>
                            <img src={this.state.photolist[2]} />
                            <p><span>Edit</span></p>
                            <span className="glyphicon glyphicon-trash" onClick={(e) => this.delphoto(e,2)}></span>
                          </div>
                          <div className={this.state.photolist.length <= 2 ? "show photodiv" : "hide photodiv"}><img src="../images/registerlist_7img6.png" /><h4>Details</h4><p>Capture a close-up of textures<br/>or interesting details</p><input type="file" onChange={(e)=>this.photolist(e)}/></div>
                        </div>

                        <div className="col-sm-12 col-md-4 col-lg-4">
                          <div className={this.state.photolist.length <= 3 ? "hide imgdiv" : "show imgdiv"}>
                            <img src={this.state.photolist[3]} />
                            <p><span>Edit</span></p>
                            <span className="glyphicon glyphicon-trash" onClick={(e) => this.delphoto(e,3)}></span>
                          </div>
                          <div className={this.state.photolist.length <= 3 ? "show photodiv" : "hide photodiv"}><img src="../images/registerlist_7img6.png" /><h4>Location</h4><p>Show the full scene and<br/>try to include people</p><input type="file" onChange={(e)=>this.photolist(e)}/></div>
                        </div>

                        <div className="col-sm-12 col-md-4 col-lg-4">
                          <div className={this.state.photolist.length <= 4 ? "hide imgdiv" : "show imgdiv"}>
                            <img src={this.state.photolist[4]} />
                            <p><span>Edit</span></p>
                            <span className="glyphicon glyphicon-trash" onClick={(e) => this.delphoto(e,4)}></span>
                          </div>
                          <div className={this.state.photolist.length <= 4 ? "show photodiv" : "hide photodiv"}><img src="../images/registerlist_7img6.png" /><h4>Miscellaneous</h4><p>Add up to 10 photos</p><input type="file" onChange={(e)=>this.photolist(e)}/></div>
                        </div>
                    </div>



                    <div className="modal fade hide" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h3>Adjust the cover photo</h3>
                          <div className="modal-body">
                          <canvas id="myCanvas" className="canvas"></canvas>
                          </div>
                          <div className="modal-footer">
                            <ul className={this.state.modalset == 0 ? "Set modalshow" : "Set hide"}>
                                <li onClick={(e) => this.setState({modalset:1})}><img src="../images/crop.png" />Crop</li>
                                <li onClick={(e) => this.setState({modalset:2})}><img src="../images/Brightness.png" />Adjust Brightness</li>
                                <li onClick={(e) => this.RotatePictures(e)}><img src="../images/Rotate.png" />Rotate</li>
                            </ul>
                            <ul className={this.state.modalset != 0 ? "Brightness show" : "Brightness hide"}>
                                <li  className={this.state.modalset == 1 ? "show" : "hide"}>
                                    <p>Zoom</p>
                                    <input type="range" onChange={(e)=>this.rangePictures(e.target.value)} name="points"  step="0.01" min="1" max="3" />
                                </li>
                                <li  className={this.state.modalset == 2 ? "show" : "hide"}>
                                    <p>Brightness</p>
                                    <input type="range" onChange={(e)=>this.BrightnessPictures(e.target.value)} name="points" step="0.01" min="-1" max="1" />
                                </li>
                                <li  className={this.state.modalset == 2 ? "show" : "hide"}>
                                    <p>Contrast Ratio</p>
                                    <input type="range" name="points" step="0.02" min="1" max="3" />
                                </li>
                            </ul>
                            <button onClick={(e) => this.setState({modalset:0})} className={this.state.modalset != 0 ? "btn Cancel show" : "btn Cancel hide"} type="button">Cancel</button>
                            <button onClick={(e) => this.setState({modalset:0})} className={this.state.modalset != 0 ? "btn Complete show" : "btn Complete hide"} type="button" >Complete</button>
                            <button  className={this.state.modalset == 0 ? "btn Replace show" : "btn Replace hide"} type="button" data-dismiss="modal" aria-hidden="true">Save and Replace</button>
                          </div>
                        </div>
                      </div>
                    <div className="modal-backdrop fade in"></div>
                    </div>
                      
                    <button className="next"  onClick={(e)=>this.nextstep(e)}>Next</button>
                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
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
                            <li className="li3">
                                <h5>About Warm house</h5>
                                <p>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step8 &&
            <div className="registerlist_4 registerlist_6 registerlist_8 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
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
                    <div className={this.state.Prompttype_8 ? "show Prompt" : "hide Prompt"}>
                        <div className="bj"></div>
                        <div className="Prompt_content">
                          <div className="boxleft">
                              <h3>Tips</h3>
                              <h6>Highlight your professional knowledge</h6>
                              <p>Tell you why you are qualified to be an experienced person. You can mention your unique skills, diploma and life experience to convince you that you are a trusted and experienced person.</p>
                              <h6>Show your personality</h6>
                              <p>Fully demonstrate your unique personality. Don't be too cautious. You can end with an anecdote or interesting personal message.</p>
                          </div>
                          <div className="boxright">
                              <span className="close" onClick={(e)=>this.setState({Prompttype_8:false})}>×</span>
                              <div className="listtop"><p className="Left"><img src="/images/uesrimg.png" /></p><p className="Right"><h5>TK (Taekyung)</h5><span>Craft Beer Crawl</span></p></div>
                              <div className={this.state.Promptlist_8 == 1 ? "show lists" : "hide lists"}>
                                <p>I am one of the founders of Amazing Brewing Company and also one of the 7 professional wine tasting masters in Korea. I have lived in Asia, Europe and the United States, and have sampled over 100 breweries from all over the world.</p>
                              </div>
                              <div className={this.state.Promptlist_8 == 2 ? "show lists" : "hide lists"}>
                                <p>I was born and raised in a village in Kenya, and moved to Nairobi when I was 18 years old. I am driving a 400cc motorcycle and I love the community of Kenya riding communities. I believe that there is a special bond between the riders, which is closely linked to all of us.</p>
                              </div>
                              <div className={this.state.Promptlist_8 == 3 ? "show lists" : "hide lists"}>
                                <p>After I left the private bank, I began to reflect on our way of life and began writing travel blogs. So I set up WaterThruSkin to travel around the world to promote green fashion ideas, vegetarian eating habits and eco-tourism.</p>
                              </div>
                              <div className="listbottom">
                                <p className="Left">Example {this.state.Promptlist_8} of 3</p>
                                <p className="Right"><span onClick={(e)=>this.Promptpre(8)}>◀</span><span onClick={(e)=>this.Promptnext(8)}>▶</span></p>
                              </div>
                          </div>
                        </div>
                    </div>


                    <h3>Tell guests what makes you qualified to host this experience</h3>
                    <h5>Mention all the things that make you the best person to host this experience. For example, tell us you’ve lived in your community for many years, or you’re well known for what you do.</h5>
                    <p className="textpink" onClick={(e)=>this.setState({Prompttype_8:true})}><img src="/images/photoi.png" />Tips and examples</p>
                    <textarea onChange={(e)=>this.setState({introduce:e.target.value})} placeholder="I’m co-founder of the Amazing Brewing Company and one of seven certified cicerones (beer sommeliers) in Korea. I’ve lived in Asia, Europe, and the US and tasted beer at over 100 breweries worldwide."></textarea>  
                    <p className={this.state.introduce.length<120 ? "textpink" : ""}>{this.state.introduce.length > 120 ? this.state.introduce.length : 120-this.state.introduce.length} characters needed</p>
                    <button className={ this.state.introduce.length<120 ? "btnactive next" : " next"} disabled={ this.state.introduce.length<120 ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>Next</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />Singapore</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
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
                            <li className="li3">
                                <h5>About Warm house</h5>
                                <p>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step9 &&
            <div className="registerlist_4 registerlist_6 registerlist_8 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
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
                    <div className={this.state.Prompttype_9 ? "show Prompt" : "hide Prompt"}>
                        <div className="bj"></div>
                        <div className="Prompt_content">
                          <div className="boxleft">
                              <h3>Tips</h3>
                              <h6>Start with a verb</h6>
                              <p>It is necessary for participants to understand the content of the activity immediately. Please start with the main verb, and then introduce who they will be or where they are going to do the activity.</p>
                              <h6>Brief and clear</h6>
                              <p>A slogan is enough, and the language is concise and clear, and there is no need to add too many fancy adjectives.</p>
                          </div>
                          <div className="boxright">
                              <span className="close" onClick={(e)=>this.setState({Prompttype_9:false})}>×</span>
                              <div className="listtop"><p className="Left"><img src="/images/uesrimg.png" /></p><p className="Right"><h5>TK (Taekyung)</h5><span>Craft Beer Crawl</span></p></div>
                              <div className={this.state.Promptlist_9 == 1 ? "show lists" : "hide lists"}>
                                <p>Tasting the Japanese national wine with the wine experts</p>
                              </div>
                              <div className={this.state.Promptlist_9 == 2 ? "show lists" : "hide lists"}>
                                <p>Witness the fashion rejuvenation of Detroit</p>
                              </div>
                              <div className={this.state.Promptlist_9 == 3 ? "show lists" : "hide lists"}>
                                <p>Record daily life with two Cuban filmmakers</p>
                              </div>
                              <div className="listbottom">
                                <p className="Left">Example {this.state.Promptlist_9} of 3</p>
                                <p className="Right"><span onClick={(e)=>this.Promptpre(9)}>◀</span><span onClick={(e)=>this.Promptnext(9)}>▶</span></p>
                              </div>
                          </div>
                        </div>
                    </div>


                    <h3>Write a tagline</h3>
                    <h5>Clearly describe your experience in one short, catchy sentence. Start with a verb that tells guests what they will do.</h5>
                    <p className="textpink" onClick={(e)=>this.setState({Prompttype_9:true})}><img src="/images/photoi.png" />Tips and examples</p>
                    <input type="text"  onChange={(e)=>this.setState({Slogan:e.target.value})} placeholder="Write your tagline here"/>
                    <p className={this.state.Slogan.length<60 ? "textpink" : ""}>{this.state.Slogan.length > 60 ? this.state.Slogan.length : 60-this.state.Slogan.length} characters remaining</p>
                    <button className={ this.state.Slogan.length<60 ? "btnactive next" : " next"} disabled={ this.state.Slogan.length<60 ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>Save & Continue</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />Singapore</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
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
                            <li className="li3">
                                <h5>About Warm house</h5>
                                <p>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step10 &&
            <div className="registerlist_4 registerlist_6 registerlist_8 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
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
                    <h3>Describe the nonprofit organisation</h3>
                    <h5>Tell people about the nonprofit organisation that you are partnering with. What cause does it support? What is its mission?</h5>
                    <textarea onChange={(e)=>this.setState({organization:e.target.value})} ></textarea>  
                    <p className={this.state.organization.length<200 ? "textpink" : ""}>{this.state.organization.length > 200 ? this.state.organization.length : 200-this.state.organization.length} characters needed</p>
                    <button className={ this.state.organization.length<200 ? "btnactive next" : " next"} disabled={ this.state.organization.length<200 ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>Next</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />Singapore</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
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
                            <li className="li3">
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step11 &&
            <div className="registerlist_4 registerlist_6 registerlist_8 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
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
                  <div className={this.state.Prompttype_11 ? "show Prompt" : "hide Prompt"}>
                        <div className="bj"></div>
                        <div className="Prompt_content">
                          <div className="boxleft">
                              <h3>Tips</h3>
                              <h6>Set expectations</h6>
                              <p>The important thing is to let participants know what they will encounter in their experience. If participants need to prepare for some adventure activities, please tell them ahead of time.</p>
                              <h6>Detailed and specific</h6>
                              <p>If your experience is technical, such as workshops or tutorials, you will not be afraid to introduce details. Participants want to be able to know exactly where their money is spent.</p>
                          </div>
                          <div className="boxright">
                              <span className="close" onClick={(e)=>this.setState({Prompttype_11:false})}>×</span>
                              <div className="listtop"><p className="Left"><img src="/images/uesrimg.png" /></p><p className="Right"><h5>TK (Taekyung)</h5><span>Craft Beer Crawl</span></p></div>
                              <div className={this.state.Promptlist_11 == 1 ? "show lists" : "hide lists"}>
                                <p>You can directly participate in our weekly basketball camp and spend two hours of practice and playing time with 60 children. Only three of us are responsible for all the children (boys and girls are between 10 and 17 years old), so I hope you can help us train and guide them to play basketball. Spend time together with your children, let your vitality unfold, sweat and passion, and of course you need plenty of energy.</p>
                              </div>
                              <div className={this.state.Promptlist_11 == 2 ? "show lists" : "hide lists"}>
                                <p>My hometown is Colle Val d 'Elsa, which is about 1 hours south of Florence, and I will recommend all the shops I like in a local market. I can take you around the cheeses, the local fish market and my own butcher's shop, and the stalls of the most fresh fruits and vegetables in Tuscany.</p>
                              </div>
                              <div className="listbottom">
                                <p className="Left">Example {this.state.Promptlist_11} of 2</p>
                                <p className="Right"><span onClick={(e)=>this.Promptpre(11)}>◀</span><span onClick={(e)=>this.Promptnext(11)}>▶</span></p>
                              </div>
                          </div>
                        </div>
                    </div>
  

                    <h3>Describe what you’ll do</h3>
                    <h5>Get guests excited with a fun, detailed description of the itinerary.</h5>
                    <p className="textpink" onClick={(e)=>this.setState({Prompttype_11:true})}><img src="/images/photoi.png" />Tips and examples</p>
                    <textarea onChange={(e)=>this.setState({Experience_content:e.target.value})} placeholder="Write about each activity in the order you’ll do them"></textarea>  
                    <p className={this.state.Experience_content.length<200 ? "textpink" : ""}>{this.state.Experience_content.length > 200 ? this.state.Experience_content.length : 200-this.state.Experience_content.length} characters needed</p>
                    <button className={ this.state.Experience_content.length<200 ? "btnactive next" : " next"} disabled={ this.state.Experience_content.length<200 ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>Save & Continue</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />Singapore</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
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
                            <li className="li3">
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step12 &&
            <div className="registerlist_4 registerlist_6 registerlist_12 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
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
                    <h3>Where should guests meet you?</h3>
                    <h5>Tell guests exactly where to meet you at the start of the experience. Make sure the location is easy to find. The exact address won’t be shared until the guest’s reservation is confirmed.</h5>
                    <h6>Step 1: Provide an address</h6>
                    <form>
                        <label>
                          <p>Location name</p>
                          <input type="text" onChange={(e) => this.setState({Location_name: e.target.value})}/>
                        </label>

                        <label>
                          <p>Country</p>
                          <div className="btn-group">
                            <button type="button" data-toggle="dropdown">{this.state.Countrys}<span>▼</span></button>
                            <ul className="dropdown-menu" role="menu">
                              {Countrysarr.map(item => (
                                  <li><a data-toggle="dropdown" onClick={(e) => this.setState({Countrys: item})}>{item}</a></li>
                                ))}
                            </ul>
                          </div>
                        </label>

                        <label>
                          <p>Street address</p>
                          <input type="text" placeholder="e.g. 35Blk Mandalay Road"  onChange={(e) => this.setState({Street_address: e.target.value})}/>
                        </label>

                        <label>
                          <p>Apt, Suite, Bldg. (optional)</p>
                          <input type="text" placeholder="e.g. #13-37 Mandalay Towers"  onChange={(e) => this.setState({Apt_Suite_Bldg: e.target.value})}/>
                        </label>

                        <label className="Left">
                          <p>City</p>
                          <input type="text" placeholder="Singapore" onChange={(e) => this.setState({City: e.target.value})} />
                        </label>

                        <label className="Right">
                          <p>ZIP code</p>
                          <input type="text" placeholder="e.g. 541189" onChange={(e) => this.setState({ZIP_code: e.target.value})} />
                        </label>

                        <label>
                          <p>Direction</p>
                          <p className="p1">Include specific instructions on how to get to the meeting point, and how guests can find you once they arrive.</p>
                          <textarea placeholder="Consider including driving, walking..." onChange={(e) => this.setState({Direction: e.target.value})}></textarea>
                        </label>
                    </form>
                    <div className="stepbox">
                      <h6>Step 2: Drop a pin on the map</h6>
                      <button onClick={(e)=> this.setState({API_img:"/images/registerlist_12img1.jpg"})}>Update map</button>
                      <h5>Map pin</h5>
                      <p>Drag the pin to the meeting point.</p>
                      <img src="/images/registerlist_12img1.jpg" />
                      <p>Only confirmed guests will see the exact address.</p>

                    </div>

                    <button className={ this.state.Location_name == "" || this.state.Street_address == "" || this.state.City == "" ? "btnactive next" : " next"} disabled={this.state.Location_name == "" || this.state.Street_address == "" || this.state.City == "" ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>Save & Continue</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
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
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step13 &&
            <div className="registerlist_4 registerlist_8 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
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
                    <div className={this.state.Prompttype_13 ? "show Prompt" : "hide Prompt"}>
                        <div className="bj"></div>
                        <div className="Prompt_content">
                          <div className="boxleft">
                              <h3>Tips</h3>
                              <h6>List all the places</h6>
                              <p>List the locations of all the experience activities, give participants some hints, so that they can understand why these places have their own advantages.</p>
                              <h6>Do not include the address</h6>
                              <p>Participants will see the exact address when booking, and remember to provide more information about this place so that participants can understand its uniqueness.</p>
                          </div>
                          <div className="boxright">
                              <span className="close" onClick={(e)=>this.setState({Prompttype_13:false})}>×</span>
                              <div className="listtop"><p className="Left"><img src="/images/uesrimg.png" /></p><p className="Right"><h5>TK (Taekyung)</h5><span>Craft Beer Crawl</span></p></div>
                              <div className={this.state.Promptlist_13 == 1 ? "show lists" : "hide lists"}>
                                <p>We are going to work in a mobile cabin that is rebuilt by the school bus, all of which are perpetual and a special experience for visitors.</p>
                              </div>
                              <div className={this.state.Promptlist_13 == 2 ? "show lists" : "hide lists"}>
                                <p>We should go to Kloof Corner Ridge first to see the magnificent ridges along the cable station. But depending on the weather and the ability of the participants, we can also change the route. After taking a bath down the mountain, we can go to my favorite restaurant for a sumptuous dinner.</p>
                              </div>
                              <div className="listbottom">
                                <p className="Left">Example {this.state.Promptlist_13} of 2</p>
                                <p className="Right"><span onClick={(e)=>this.Promptpre(13)}>◀</span><span onClick={(e)=>this.Promptnext(13)}>▶</span></p>
                              </div>
                          </div>
                        </div>
                    </div>

                    <h3>Add details about where you’ll be</h3>
                    <h5>Tell guests where you’ll go, why each location is special, or why you love it. It’s ok if it’s just one location.</h5>
                    <p className="textpink"  onClick={(e)=>this.setState({Prompttype_13:"true"})}><img src="/images/photoi.png" />Tips and examples</p>
                    <textarea onChange={(e)=>this.setState({position_information:e.target.value})} placeholder="Consider including special places guests can’t find or access on their own"></textarea>  
                    <p className={this.state.position_information.length<100 ? "textpink" : ""}>{this.state.position_information.length > 100 ? this.state.position_information.length : 100-this.state.position_information.length} characters needed</p>
                    <button className={ this.state.position_information.length<100 ? "btnactive next" : " next"} disabled={ this.state.position_information.length<100 ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>Next</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5>What I’ll provide</h5>
                                <p>Let your guests know if you’ll be including anything for this experience.</p>
                            </li>
                            <li>
                                <h5 className={this.state.position_information == "" ? "" : "textactive"}>Where we’ll be</h5>
                                <p className={this.state.position_information == "" ? "" : "textactive"}>{this.state.position_information.length > 0 ? this.state.position_information : "Tell your guests where you’ll be taking them for this experience."}</p>
                            </li>
                            <li className="li3">
                                <h5>Notes</h5>
                                <p>Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking</p>
                            </li>
                            <li className="li3">
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step14 &&
            <div className="registerlist_4 registerlist_8 registerlist_14 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
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
                    <div className={this.state.Prompttype_14 ? "show Prompt" : "hide Prompt"}>
                        <div className="bj"></div>
                        <div className="Prompt_content">
                          <div className="boxleft">
                              <h3>Tips</h3>
                              <h6>Highlight your expertise</h6>
                              <p>Show off why you’re qualified to host. Mention any unique skills, credentials, or even life experience that make you a credible host.</p>
                              <h6>Sound personable</h6>
                              <p>Let your personality shine through. Try ending with a fun fact or interesting personal detail to avoid sounding too formal.</p>
                          </div>
                          <div className="boxright">
                              <span className="close" onClick={(e)=>this.setState({Prompttype_14:false})}>×</span>
                              <div className="listtop"><p className="Left"><img src="/images/uesrimg.png" /></p><p className="Right"><h5>TK (Taekyung)</h5><span>Craft Beer Crawl</span></p></div>
                              <div className={this.state.Promptlist_14 == 1 ? "show lists" : "hide lists"}>
                                <h6>Refreshments</h6><p>Welcome to share your personal preferences. I will try to satisfy it!</p>
                                <h6>Appetizer</h6><p>Please tell me if you have any special dietary requirements, such as vegetarian or gluten free.</p>
                              </div>
                              <div className={this.state.Promptlist_14 == 2 ? "show lists" : "hide lists"}>
                                <h6>seafood dinner</h6><p>This seascape restaurant has been established for a long time to provide fresh seafood and refreshing beer on the picnic table.</p>
                                <h6>Sparkling Water</h6><p>Take wine and sit around the bonfire</p>
                              </div>
                              <div className={this.state.Promptlist_14 == 3 ? "show lists" : "hide lists"}>
                                <h6>Travel to Rick 's Estate</h6><p>We will pick you up at Neptune 's Net restaurant and then go up the hill to Rick' s Estate.</p>
                                <p>Digital cameras, telescopes, special interfaces and three legs.</p>
                              </div>
                              <div className="listbottom">
                                <p className="Left">Example {this.state.Promptlist_14} of 3</p>
                                <p className="Right"><span onClick={(e)=>this.Promptpre(14)}>◀</span><span onClick={(e)=>this.Promptnext(14)}>▶</span></p>
                              </div>
                          </div>
                        </div>
                    </div>

                    <h3>What will you provide for guests?</h3>
                    <h5>It’s important to let guests know what you’ll provide because it helps them understand what they’re paying for.</h5>
                    <p className="textpink"  onClick={(e)=>this.setState({Prompttype_14:true})}><img src="/images/photoi.png" />Tips and examples</p>
                    <h6 className="Item_ne">Item one<span className={this.state.Content_provided == "Selection project" ? "hide textpink Right" : "show textpink Right"} onClick={(e)=>this.setState({Content_provided:"Selection project"})}>Delete</span></h6>
                    <div className="btn-group">
                      <button type="button" data-toggle="dropdown" >{this.state.Content_provided}<span>▼</span></button>
                      <ul className="dropdown-menu" role="menu">
                        {Content_providedarr.map((item,index) => (
                            <li><a onClick={(e)=>this.providedclick(index)}>{item}</a></li>
                          ))}
                      </ul>
                    </div>
                    <input onChange={(e)=>this.setState({Provide_content:e.target.value})} className={this.state.Content_provided == "Selection project" ? "hide" : "show"} type="text" placeholder={this.state.placeholder_provided} />
                    <div className={this.state.Provide_content == "" ? "hide":"show"}>
                      <p className={this.state.Provide_content.length <= 30 ? "":"textpink"}>{this.state.Provide_content.length <30 ? 30-this.state.Provide_content.length+" characters needed" : this.state.Provide_content.length-30+"characters exceed"}</p>
                      <p className={this.state.add_another == 1 ? "hide textpink":"show textpink"} onClick={(e)=>this.setState({add_another:1})}>+ add another item</p>

                      <div className={this.state.add_another == 0 ? "hide":"show"}>
                        <h6 className="Item_ne">Item one<span className={this.state.Content_provided_1 == "Selection project" ? "hide textpink Right" : "show textpink Right"} onClick={(e)=>this.setState({Content_provided_1:"Selection project"})}>Delete</span></h6>
                        <div className="btn-group">
                          <button type="button" data-toggle="dropdown" >{this.state.Content_provided_1}<span>▼</span></button>
                          <ul className="dropdown-menu" role="menu">
                            {Content_providedarr.map((item,index) => (
                                <li><a onClick={(e)=>this.providedclick1(index)}>{item}</a></li>
                              ))}
                          </ul>
                        </div>
                        <input onChange={(e)=>this.setState({Provide_content_1:e.target.value})} className={this.state.Content_provided_1 == "Selection project" ? "hide" : "show"} type="text" placeholder={this.state.placeholder_provided} />
                      </div>

                      <h6>Not providing anything for your guests?  </h6>
                      <div className="check" onClick={(e) => {if(this.state.Not_providing ==0 )this.setState({Not_providing:1});else this.setState({Not_providing:0});}}>
                        <p  className="Pinput">
                            <img className={this.state.Not_providing ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                        </p>
                        <p className="divinput">I am not providing anything</p>
                      </div>
                    </div>
                    <button className="next"  onClick={(e)=>this.nextstep(e)}>Next</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Provide_content == "" ? "" : "textactive"}>What I’ll provide</h5>
                                <p className={this.state.Provide_content == "" ? "" : "textactive"}>{this.state.Provide_content.length > 0 ? this.state.Provide_content : "Let your guests know if you’ll be including anything for this experience."}</p>
                                <p className={this.state.Provide_content_1 == "" ? "" : "textactive"}>{this.state.Provide_content_1}</p>
                            </li>
                            <li>
                                <h5 className={this.state.position_information == "" ? "" : "textactive"}>Where we’ll be</h5>
                                <p className={this.state.position_information == "" ? "" : "textactive"}>{this.state.position_information.length > 0 ? this.state.position_information : "Tell your guests where you’ll be taking them for this experience."}</p>
                            </li>
                            <li className="li3">
                                <h5>Notes</h5>
                                <p>Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking</p>
                            </li>
                            <li className="li3">
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step15 &&
            <div className="registerlist_4 registerlist_8 registerlist_15 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
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
                    <h3>What should guests bring with them?</h3>
                    <h5>Think through everything a guest will need to have with them during the experience that you’re not already providing. This will be emailed to guests once they book.</h5>
                    
                    <h6>warm house</h6>
                    <p>What should your guests bring?</p>
                    {inputlistarr.map((item,index) => (
                      <div className="inputlist">
                        <input type="text" placeholder="Please Input project" value={item} onChange={(e)=>this.inputlistval(e,index)} />
                        <span className={item == "" ? "hide" : "show"} onClick={(e)=>this.inputlistdel(e,index)} >×</span>
                      </div>
                    ))}
                    <p className="textpink" onClick={(e)=>this.addinputlist(e)}>+ Add an item</p>

                    <h6>Not providing anything for your guests?  </h6>
                    <div className="check" onClick={(e) => {if(this.state.Not_providing ==0 )this.setState({Not_providing:1});else this.setState({Not_providing:0});}}>
                      <p  className="Pinput">
                          <img className={this.state.Not_providing ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                      </p>
                      <p className="divinput">I am not providing anything</p>
                    </div>      
                     
                    <button className="next"  onClick={(e)=>this.nextstep(e)}>Next</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Provide_content == "" ? "" : "textactive"}>What I’ll provide</h5>
                                <p className={this.state.Provide_content == "" ? "" : "textactive"}>{this.state.Provide_content.length > 0 ? this.state.Provide_content : "Let your guests know if you’ll be including anything for this experience."}</p>
                                <p className={this.state.Provide_content_1 == "" ? "" : "textactive"}>{this.state.Provide_content_1}</p>
                            </li>
                            <li>
                                <h5 className={this.state.position_information == "" ? "" : "textactive"}>Where we’ll be</h5>
                                <p className={this.state.position_information == "" ? "" : "textactive"}>{this.state.position_information.length > 0 ? this.state.position_information : "Tell your guests where you’ll be taking them for this experience."}</p>
                            </li>
                            <li className="li3">
                                <h5>Notes</h5>
                                <p>Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking</p>
                            </li>
                            <li className="li3">
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step16 &&
            <div className="registerlist_4 registerlist_8 registerlist_15 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
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
                    <h3>What else do guests need to know before they book?</h3>
                    <h5>Put yourself in a guest’s shoes. Some information may seem obvious, but be detailed so guests are over-prepared.</h5>
                    
                   <textarea onChange={(e)=>this.setState({Book_understand:e.target.value})} placeholder="Try  Addressing any concerns guests might have about booking your experience"></textarea>  
                    <p className={this.state.Book_understand.length<200 ? "textpink" : ""}>{this.state.Book_understand.length > 200 ? this.state.Book_understand.length : 200-this.state.Book_understand.length} characters needed</p>

                    <h6 className={this.state.Book_understand.length == 0 ? "show" : "hide"}>Is there nothing else guests should know? </h6>
                    <div className={this.state.Book_understand.length == 0 ? "show check" : "hide check"}>
                      <p  className="Pinput">
                          <img className={this.state.No_notes_additional ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                      </p>
                      <p className="divinput">I have no additional notes for my guests </p>
                    </div>      
                     
                    <button className={ this.state.Book_understand.length<200 ? "btnactive next" : " next"} disabled={ this.state.Book_understand.length<200 ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>Next</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Provide_content == "" ? "" : "textactive"}>What I’ll provide</h5>
                                <p className={this.state.Provide_content == "" ? "" : "textactive"}>{this.state.Provide_content.length > 0 ? this.state.Provide_content : "Let your guests know if you’ll be including anything for this experience."}</p>
                                <p className={this.state.Provide_content_1 == "" ? "" : "textactive"}>{this.state.Provide_content_1}</p>
                            </li>
                            <li>
                                <h5 className={this.state.position_information == "" ? "" : "textactive"}>Where we’ll be</h5>
                                <p className={this.state.position_information == "" ? "" : "textactive"}>{this.state.position_information.length > 0 ? this.state.position_information : "Tell your guests where you’ll be taking them for this experience."}</p>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.Book_understand == "" ? "" : "textactive"}>Notes</h5>
                                <p className={this.state.Book_understand == "" ? "" : "textactive"}>{this.state.Book_understand.length > 0 ? this.state.Book_understand : "Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking"}</p>
                            </li>
                            <li className="li3">
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step17 &&
            <div className="registerlist_4 registerlist_17 row">
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>Setting</h3>
                    <h5>Add details like group size, price, default time, and more.</h5>
                     
                    <button className="next"  onClick={(e)=>this.nextstep(e)}>Next</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Provide_content == "" ? "" : "textactive"}>What I’ll provide</h5>
                                <p className={this.state.Provide_content == "" ? "" : "textactive"}>{this.state.Provide_content.length > 0 ? this.state.Provide_content : "Let your guests know if you’ll be including anything for this experience."}</p>
                                <p className={this.state.Provide_content_1 == "" ? "" : "textactive"}>{this.state.Provide_content_1}</p>
                            </li>
                            <li>
                                <h5 className={this.state.position_information == "" ? "" : "textactive"}>Where we’ll be</h5>
                                <p className={this.state.position_information == "" ? "" : "textactive"}>{this.state.position_information.length > 0 ? this.state.position_information : "Tell your guests where you’ll be taking them for this experience."}</p>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.Book_understand == "" ? "" : "textactive"}>Notes</h5>
                                <p className={this.state.Book_understand == "" ? "" : "textactive"}>{this.state.Book_understand.length > 0 ? this.state.Book_understand : "Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking"}</p>
                            </li>
                            <li className="li3">
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step18 &&
            <div className="registerlist_4 registerlist_8  registerlist_18 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <ul>
                      <li className="textPink">Basics</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">About the experiences</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">Settings</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>Who can attend your experience?</h3>
                    <h5>Keep in mind that someone booking your experience might book spots for other guests. If there are strict requirements around age, skill level, or certifications, include them here.</h5>
                    
                    <h6>Alcohol</h6>
                    <div className="check" onClick={(e) => {if(this.state.Alcohol ==0 )this.setState({Alcohol:1});else this.setState({Alcohol:0});}}>
                      <p  className="Pinput">
                          <img className={this.state.Alcohol ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                      </p>
                      <p className="divinput">My experience includes alcohol. Only guests that meet the leaal drinking age will be served</p>
                    </div>  

                    <h6>Minimum age</h6>
                    <p>Set age limits for guests. Minors can only attend with their legal guardian.</p>

                    <div className="btn-group">
                      <button type="button" data-toggle="dropdown">{this.state.Minimum_age}<span>▼</span></button>
                      <ul className="dropdown-menu" role="menu">
                        {Minimum_agearr.map(item => (
                            <li><a onClick={(e) => this.setState({Minimum_age: item})}>{item}</a></li>
                          ))}
                      </ul>
                    </div>

                    <div className="check" onClick={(e) => {if(this.state.bring_kids ==0 )this.setState({bring_kids:1});else this.setState({bring_kids:0});}}>
                      <p  className="Pinput">
                          <img className={this.state.bring_kids ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                      </p>
                      <p className="divinput">Parents can bring kids under 2 years </p>
                    </div> 

                    <h6>How active is your experience?</h6>
                    <div className="radio" onClick={(e) => this.setState({active_experience: 1})}>
                      <label className="text-muted"><p><span className={this.state.active_experience == 1 ?"show":"hide"}></span></p>Mostly seated</label>
                    </div>
                    <div className="radio" onClick={(e) => this.setState({active_experience: 2})}>
                      <label className="text-muted"><p><span className={this.state.active_experience == 2 ?"show":"hide"}></span></p>Light (e.g. a little walking)</label>
                    </div>
                    <div className="radio" onClick={(e) => this.setState({active_experience: 3})}>
                      <label className="text-muted"><p><span className={this.state.active_experience == 3 ?"show":"hide"}></span></p>Moderate (e.g. a bike ride on mostly flat road)</label>
                    </div>
                    <div className="radio" onClick={(e) => this.setState({active_experience: 4})}>
                      <label className="text-muted"><p><span className={this.state.active_experience == 4 ?"show":"hide"}></span></p>High (e.g. physical movement lasting more than an hour)</label>
                    </div>
                    <div className="radio" onClick={(e) => this.setState({active_experience: 5})}>
                      <label className="text-muted"><p><span className={this.state.active_experience == 5 ?"show":"hide"}></span></p>Strenuous (e.g. an uphill hike over rough terrain)</label>
                    </div>

                    <h6>Additional requirements</h6>
                    <textarea onChange={(e)=>this.setState({Additional_requirements:e.target.value})} placeholder="E.g. Guests should have prior surfing experience, guest must have a scuba license, guests should be comfortable around dogs, etc."></textarea>  

                    <h6>Require verified ID</h6>
                    <p>The primary booker has to successfully complete verified ID in order for them and their guests to attend your experience.</p>
                    <div className="check" onClick={(e) => {if(this.state.verified_ID ==0 )this.setState({verified_ID:1});else this.setState({verified_ID:0});}}>
                      <p  className="Pinput">
                          <img className={this.state.verified_ID ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                      </p>
                      <p className="divinput">Require the booker to <span className="textpink">verify their ID</span></p>
                    </div> 

                    <button className={ this.state.active_experience == 0 ? "btnactive next" : " next"} disabled={ this.state.active_experience == 0 ? "disabled" : ""}  onClick={(e)=>this.nextstep(e)}>Next</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Provide_content == "" ? "" : "textactive"}>What I’ll provide</h5>
                                <p className={this.state.Provide_content == "" ? "" : "textactive"}>{this.state.Provide_content.length > 0 ? this.state.Provide_content : "Let your guests know if you’ll be including anything for this experience."}</p>
                                <p className={this.state.Provide_content_1 == "" ? "" : "textactive"}>{this.state.Provide_content_1}</p>
                            </li>
                            <li>
                                <h5 className={this.state.position_information == "" ? "" : "textactive"}>Where we’ll be</h5>
                                <p className={this.state.position_information == "" ? "" : "textactive"}>{this.state.position_information.length > 0 ? this.state.position_information : "Tell your guests where you’ll be taking them for this experience."}</p>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.Book_understand == "" ? "" : "textactive"}>Notes</h5>
                                <p className={this.state.Book_understand == "" ? "" : "textactive"}>{this.state.Book_understand.length > 0 ? this.state.Book_understand : "Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking"}</p>
                            </li>
                            <li className="li3">
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li>
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                            <li className={this.state.Additional_requirements == "" && this.state.bring_kids == 0 && this.state.Alcohol == 0 ? "hide li3" : "show li3"}>
                                <h5 className="textactive">Who can come</h5>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step19 &&
            <div className="registerlist_4 registerlist_8  registerlist_18 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <ul>
                      <li className="textPink">Basics</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">About the experiences</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">Settings</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>Maximum group size</h3>
                    <h5>Think about the group size that works best for your experience. Should it be small and intimate? Is it fun with a large group? Please note that Airbnb has a one-guest minimum, which means that if only one person books your experience, you’ll still be expected to host.</h5>

                    <div className="btn-group">
                      <button type="button" data-toggle="dropdown">{this.state.Maximum_group}<span>▼</span></button>
                      <ul className="dropdown-menu" role="menu">
                        {Maximum_grouparr.map(item => (
                            <li><a onClick={(e) => this.setState({Maximum_group: item})}>{item}</a></li>
                          ))}
                      </ul>
                    </div>

                    <button className="next" onClick={(e)=>this.nextstep(e)}>Save & Continue</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Provide_content == "" ? "" : "textactive"}>What I’ll provide</h5>
                                <p className={this.state.Provide_content == "" ? "" : "textactive"}>{this.state.Provide_content.length > 0 ? this.state.Provide_content : "Let your guests know if you’ll be including anything for this experience."}</p>
                                <p className={this.state.Provide_content_1 == "" ? "" : "textactive"}>{this.state.Provide_content_1}</p>
                            </li>
                            <li>
                                <h5 className={this.state.position_information == "" ? "" : "textactive"}>Where we’ll be</h5>
                                <p className={this.state.position_information == "" ? "" : "textactive"}>{this.state.position_information.length > 0 ? this.state.position_information : "Tell your guests where you’ll be taking them for this experience."}</p>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.Book_understand == "" ? "" : "textactive"}>Notes</h5>
                                <p className={this.state.Book_understand == "" ? "" : "textactive"}>{this.state.Book_understand.length > 0 ? this.state.Book_understand : "Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking"}</p>
                            </li>
                            <li className="li3">
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li>
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                            <li className={this.state.Maximum_group == "Please choose" ? "hide" : "show"}>
                                <h5 className="textactive">Group size up to {this.state.Maximum_group} guests </h5>
                            </li>
                            <li className={this.state.Additional_requirements == "" && this.state.bring_kids == 0 && this.state.Alcohol == 0 ? "hide li3" : "show li3"}>
                                <h5 className="textactive">Who can come</h5>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step20 &&
            <div className="registerlist_4 registerlist_20 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <ul>
                      <li className="textPink">Basics</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">About the experiences</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">Settings</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>Set a price per guest</h3>
                    <h5>The price of your experience is entirely up to you. Play with the calculator to see how much you’d earn depending on the number of guests. If you have questions, read up on tips for setting your price.</h5>

                    <div className="price_guest">
                      <span>SGD</span>
                      <input type="text" placeholder="$" onChange={(e)=>this.setState({price_guest:e.target.value})} />
                    </div>

                    <button className={ this.state.price_guest == 0 ? "btnactive next" : " next"} disabled={ this.state.price_guest == 0 ? "disabled" : ""} onClick={(e)=>this.nextstep(e)}>Save & Continue</button>
                </div>

                <div className="box1 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <h6>Pricing calculator</h6>
                        <ul>
                            <li>
                                <p className="Left">Price per guest</p>
                                <p className="Right">$ {this.state.price_guest == "" ? 0 : this.state.price_guest} SGD</p>
                            </li>
                            <li className="li2">
                                <p className="Left">Number of guests</p>
                                <p className="Right"><span className="add" onClick={(e)=>this.setState({guest_num:this.state.guest_num+1})}>▲</span>{this.state.guest_num}<span className="del" onClick={(e)=>{if(this.state.guest_num > 1 )this.setState({guest_num:this.state.guest_num - 1});else this.setState({guest_num:1});}}>▼</span></p>
                            </li>
                            <li>
                                <p className="Left">You’d make</p>
                                <p className="Right">$ {this.state.price_guest*0.8*this.state.guest_num} SGD</p>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step21 &&
            <div className="registerlist_4 registerlist_6 registerlist_8 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <span></span>
                  <ul>
                      <li className="textPink">Basics</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">About the experiences</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">Settings</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-7 col-md-7 col-lg-7">

                    <h3>Explain what the guests’ money benefits</h3>
                    <h5>Give guests insight into how the nonprofit organisation will use their money. What will they be funding or enabling the nonprofit organisation to do?</h5>
                    <textarea onChange={(e)=>this.setState({Explain_benefits:e.target.value})} placeholder="Type guest  contribution description here "></textarea>  

                    <button className="next"  onClick={(e)=>this.nextstep(e)}>Next</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step22 &&
            <div className="registerlist_4 registerlist_18 registerlist_22 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span></span>
                  <ul>
                      <li className="textPink">Basics</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">About the experiences</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">Settings</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>At what time will you typically host your experience?</h3>
                    <h5>Later on, you’ll pick the exact calendar dates you’d like to host. You’ll also be able to adjust times for each individual date.</h5>
      
                    <div className="timediv">
                      <div className="btn-group Left">
                        <button type="button" data-toggle="dropdown">{this.state.time_from}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          {Check_time.map(item => (
                              <li><a onClick={(e) => this.setState({time_from: item})}>{item}</a></li>
                            ))}
                        </ul>
                      </div>
                      <p>To</p>
                      <div className="btn-group Right">
                        <button type="button" data-toggle="dropdown">{this.state.time_to}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          {Check_time.map(item => (
                              <li><a onClick={(e) => this.setState({time_to: item})}>{item}</a></li>
                            ))}
                        </ul>
                      </div>
                    </div>

                    <button className="next" onClick={(e)=>this.nextstep(e)}>Save & Continue</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Provide_content == "" ? "" : "textactive"}>What I’ll provide</h5>
                                <p className={this.state.Provide_content == "" ? "" : "textactive"}>{this.state.Provide_content.length > 0 ? this.state.Provide_content : "Let your guests know if you’ll be including anything for this experience."}</p>
                                <p className={this.state.Provide_content_1 == "" ? "" : "textactive"}>{this.state.Provide_content_1}</p>
                            </li>
                            <li>
                                <h5 className={this.state.position_information == "" ? "" : "textactive"}>Where we’ll be</h5>
                                <p className={this.state.position_information == "" ? "" : "textactive"}>{this.state.position_information.length > 0 ? this.state.position_information : "Tell your guests where you’ll be taking them for this experience."}</p>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.Book_understand == "" ? "" : "textactive"}>Notes</h5>
                                <p className={this.state.Book_understand == "" ? "" : "textactive"}>{this.state.Book_understand.length > 0 ? this.state.Book_understand : "Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking"}</p>
                            </li>
                            <li className="li3">
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li>
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                            <li className={this.state.Maximum_group == "Please choose" ? "hide" : "show"}>
                                <h5 className="textactive">Group size up to {this.state.Maximum_group} guests </h5>
                            </li>
                            <li className={this.state.Additional_requirements == "" && this.state.bring_kids == 0 && this.state.Alcohol == 0 ? "hide li3" : "show li3"}>
                                <h5 className="textactive">Who can come</h5>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step23 &&
            <div className="registerlist_4 registerlist_18 registerlist_23  row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <span className="bjpink"></span>
                  <ul>
                      <li className="textPink">Basics</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">About the experiences</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">Settings</li>
                      <li className="glyphicon glyphicon-play"></li>
                      <li>Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>When’s the latest time guests can book?</h3>
                    <h5>We recommend setting this as close to the start time as possible so more guests can book.</h5>
          
                    <div className="daydiv">
                      <div className="btn-group Left">
                        <button type="button" data-toggle="dropdown">{this.state.Book_time}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          {Book_timearr.map(item => (
                              <li><a onClick={(e) => this.setState({Book_time: item})}>{item}</a></li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <p>Guests can book until {this.state.Book_time} before the experience starts.</p>
        
                    <div className={this.state.Book_time == "1 weeks" ? "hide" : "show"}>
                      <h6>Would you like to have your experience cancelled if no one books  by a certain time?</h6>
                      <div className="radio" onClick={(e) => this.setState({Cancel_experience: 1})}>
                        <label className="text-muted"><p><span className={this.state.Cancel_experience == 1 ?"show":"hide"}></span></p>No thanks</label>
                      </div>
                      <div className="radio" onClick={(e) => this.setState({Cancel_experience: 0})}>
                        <label className="text-muted"><p><span className={this.state.Cancel_experience == 0 ?"show":"hide"}></span></p>Yes, I need advance notice that I’m hosting</label>
                      </div>
                    </div>
                      

                    <button className="next" onClick={(e)=>this.nextstep(e)}>Save & Continue</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step24 &&
            <div className="registerlist_4 registerlist_24 row">
                <div className="STEPhead">
                  <span className="bjpink"></span>
                  <ul>
                      <li className="textPink">Basics</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">About the experiences</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">Settings</li>
                      <li className="glyphicon glyphicon-play textPink"></li>
                      <li className="textPink">Review & Submit</li>
                  </ul>
                </div>
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>Review our policies before you submit to Populstay</h3>

                    <h6>Airbnb will review the version you’re about to submit, so make sure </h6>
                    <h6>you’re happy with it. You can still go back and fine-tune your descriptions at any time.</h6>

                    <h6>Minimum guests</h6>
                    <p>Experiences on Airbnb have a 1 guest minimum. That means if one person books your experience, you’ll still be expected to host them.</p>

                    <h6>Cancellation policy</h6>
                    <p>Cancelling an experience can negatively affect a guest’s entire trip. We take our cancellation policy very seriously.</p>

                    <h6>Service fees</h6>
                    <p>Airbnb takes 20% of each booking. Read more about our service fee.</p>

                    <h6>Exclusivity</h6>
                    <p>Each date you schedule through Airbnb should only include Airbnb guests. Guests who book through other platforms must be hosted at separate times.</p>

                    <h6>By submitting, I confirm the following is true:</h6>

                    <div className="check" onClick={(e) => {if(this.state.Comply_law ==0 )this.setState({Comply_law:1});else this.setState({Comply_law:0});}}>
                      <p  className="Pinput">
                          <img className={this.state.Comply_law ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                      </p>
                      <p className="divinput">My experience complies with local laws. <span className="textpink">Learn more</span> about other laws (like business licensing) that may apply.</p>
                    </div>

                    <div className="check" onClick={(e) => {if(this.state.Terms_service ==0 )this.setState({Terms_service:1});else this.setState({Terms_service:0});}}>
                      <p  className="Pinput">
                          <img className={this.state.Terms_service ==1 ? 'show' : 'hide'} src="../images/checkdui.png" alt=""/>
                      </p>
                      <p className="divinput">I agree to the <span className="textpink"> Populstay Experiences Additional Terms of Service</span> and confirm that my descriptions and photos accurately reflect my experience.</p>
                    </div>
                    

                    <button className={ this.state.Terms_service == 0 || this.state.Comply_law == 0 ? "btnactive next Left" : " next Left"} disabled={ this.state.Terms_service == 0 || this.state.Comply_law == 0 ? "disabled" : ""}  onClick={(e)=>this.submit(e)}>Submit</button>
                    <button className="next Right" onClick={(e)=>this.setState({step:this.STEP.Step11})}>Edit description</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Provide_content == "" ? "" : "textactive"}>What I’ll provide</h5>
                                <p className={this.state.Provide_content == "" ? "" : "textactive"}>{this.state.Provide_content.length > 0 ? this.state.Provide_content : "Let your guests know if you’ll be including anything for this experience."}</p>
                                <p className={this.state.Provide_content_1 == "" ? "" : "textactive"}>{this.state.Provide_content_1}</p>
                            </li>
                            <li>
                                <h5 className={this.state.position_information == "" ? "" : "textactive"}>Where we’ll be</h5>
                                <p className={this.state.position_information == "" ? "" : "textactive"}>{this.state.position_information.length > 0 ? this.state.position_information : "Tell your guests where you’ll be taking them for this experience."}</p>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.Book_understand == "" ? "" : "textactive"}>Notes</h5>
                                <p className={this.state.Book_understand == "" ? "" : "textactive"}>{this.state.Book_understand.length > 0 ? this.state.Book_understand : "Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking"}</p>
                            </li>
                            <li className="li3">
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li>
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                            <li className={this.state.Maximum_group == "Please choose" ? "hide" : "show"}>
                                <h5 className="textactive">Group size up to {this.state.Maximum_group} guests </h5>
                            </li>
                            <li className={this.state.Additional_requirements == "" && this.state.bring_kids == 0 && this.state.Alcohol == 0 ? "hide li3" : "show li3"}>
                                <h5 className="textactive">Who can come</h5>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step25 &&
            <div className="registerlist_4 registerlist_25 row">
                <div className="box col-sm-7 col-md-7 col-lg-7">
                    <h3>Thanks! You’ve successfully submitted  your experience. </h3>
                    <h5>Now sit back and relax - we’ll need some time to review and make sure it’s a fit. When we’re done, we’ll notify you via email.</h5>
                    <h5>You can also keep editing your experience, or get ahead of the game by <span className="textpink">verifying your ID.</span></h5>

                    <button className="next Left"  onClick={(e)=>this.nextstep(e)}>Verify ID</button>
                    <button className="next Right" onClick={(e)=>this.setState({step:this.STEP.Step1})}>Edit Submissioin</button>
                    <button className="next Right Exit" >Exit</button>

                </div>

                <div className="box2 col-sm-12 col-md-5 col-lg-5">
                    <div>
                        <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                        <ul>
                            <li className="li1"><p>{this.state.Experience_title == "" ? "Experience" : this.state.Experience_title}</p></li>
                            <li className="li2">
                                <p><img src="./images/registerlist_4location.png" />{this.state.Location_name == "" ? "Singapore" : this.state.Location_name}</p>
                                <p><img src="./images/registerlist_4time.png" />0 hour total</p>
                            </li>
                            <li className={this.state.introduce == "" ? "hide" : "show"}>
                                <h5  className={this.state.introduce == "" ? "" : "textactive"}><span>Hello!</span><p><img src="/images/experienceimg5.png" /></p></h5>
                                <p className={this.state.introduce == "" ? "" : "textactive"}>{this.state.introduce.length > 0 ? this.state.introduce : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Experience_content == "" ? "" : "textactive"}>What we’ll do</h5>
                                <p className={this.state.Experience_content == "" ? "" : "textactive"}>{this.state.Experience_content.length > 0 ? this.state.Experience_content : "Give an overview description of what your guests will be doing on this experience."}</p>
                            </li>
                            <li>
                                <h5 className={this.state.Provide_content == "" ? "" : "textactive"}>What I’ll provide</h5>
                                <p className={this.state.Provide_content == "" ? "" : "textactive"}>{this.state.Provide_content.length > 0 ? this.state.Provide_content : "Let your guests know if you’ll be including anything for this experience."}</p>
                                <p className={this.state.Provide_content_1 == "" ? "" : "textactive"}>{this.state.Provide_content_1}</p>
                            </li>
                            <li>
                                <h5 className={this.state.position_information == "" ? "" : "textactive"}>Where we’ll be</h5>
                                <p className={this.state.position_information == "" ? "" : "textactive"}>{this.state.position_information.length > 0 ? this.state.position_information : "Tell your guests where you’ll be taking them for this experience."}</p>
                            </li>
                            <li className="li3">
                                <h5 className={this.state.Book_understand == "" ? "" : "textactive"}>Notes</h5>
                                <p className={this.state.Book_understand == "" ? "" : "textactive"}>{this.state.Book_understand.length > 0 ? this.state.Book_understand : "Food, drink, and transportation not included.Is there anything else you’d like guests to know before booking"}</p>
                            </li>
                            <li className="li3">
                                <div className="apidiv">
                                  <img src={this.state.API_img == "" ? "./images/registerlist_4api.jpg" : this.state.API_img} />
                                  <p></p>
                                  <div>
                                    <span>▼</span>
                                    <h6>Where we’ll meet</h6>
                                    <p>9 Raffles place. singapore</p>
                                  </div>
                                </div>
                            </li>
                            <li>
                                <h5 className={this.state.organization=="" ? "":"textactive"}>About Warm house</h5>
                                <p className={this.state.organization=="" ? "":"textactive"}>{this.state.organization}</p>
                                <p className={this.state.organization=="" ? "":"textactive"}>This is a social impact experience where 100% of what you pay for this experience goes to Warm house. <span className="textpink">Learn how your money helps.</span> </p>
                            </li>
                            <li className={this.state.Maximum_group == "Please choose" ? "hide" : "show"}>
                                <h5 className="textactive">Group size up to {this.state.Maximum_group} guests </h5>
                            </li>
                            <li className={this.state.Additional_requirements == "" && this.state.bring_kids == 0 && this.state.Alcohol == 0 ? "hide li3" : "show li3"}>
                                <h5 className="textactive">Who can come</h5>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
          }

          { this.state.step === this.STEP.Step26 &&
            <div className="registerlist_4 registerlist_26 row">
                <div className="box col-sm-12 col-md-12 col-lg-12">
                  <div className="register26_head">
                    <div className="Left">
                      <h3>Welcome backyour experience.</h3>
                      <h5>Keep track of and edit all your experiences. Happy hosting!</h5>
                    </div>
                    <button className="Right" ><a href="/register">New idea</a></button>
                  </div>  
                  <div className="col-lg-4 boxleft">
                    <img src={this.state.select_Pictures == "" ? "../images/registerlist_4.png" : this.state.select_Pictures} />
                    <p>Experience submitted</p>
                  </div>
                  <div className="col-lg-6 boxright">
                      <h3>Warm house</h3>
                      <h5>Your experience was submitted. Expect to hear back from us in about 2-4 weeks.</h5>
                      <button className="next" onClick={(e)=>this.setState({step:this.STEP.Step1})}>Edit Submissioin</button>
                      <button className="next"  onClick={(e)=>this.nextstep(e)}><a href="/VerifyID">Verify ID</a></button>
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
