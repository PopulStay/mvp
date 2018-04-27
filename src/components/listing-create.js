import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import houselistingService from '../services/houseinfolist-service';
import ListingDetail from './listing-detail';
import Overlay from './overlay';
import hostService from '../services/host-service';





const alertify = require('../../node_modules/alertify/src/alertify.js');

class ListingCreate extends Component {

    constructor(props) {
        super(props)

        this.STEP = {
            Step1_1: 1.1,
            Step1_2: 1.2,
            Step1_3: 1.3,
            Step1_4: 1.4,
            Step1_5: 1.5,
            Step1_6: 1.6,
            Step1_7: 1.7,
            Step1_8: 1.8,
            Step1_9: 1.9,
            PROCESSING: 6,
            SUCCESS: 7
        }

        this.ROOM_DESCRIPTION = {
            SETUP_FOR_GUESTS:0,
            SETUP_FOR_HOST_BELONGINGS:1

        }

        this.state = {
            step: 0,
            roomtype_category:"Entire place",
            roomtype_guests:'for 1 guests',
            roomtype_location:"",
            roomdescription_homeorhotel:"Home",
            roomdescription_type:"Single room",
            roomdescription_guests_have:"Entire place",
            roomdescription_forguestorhost:2,
            roomdescription_title:"",
            roomdescription_description:"",
            roombasics_guestsnumber:1,
            roombasics_guestbedrooms:0.5,
            roombasics_guestbeds:1,
            roombasics_totalguests:1,
            roombasics_commonspacebeds:1,
            roomstuff_Essentials:1,
            roomstuff_Shampoo:0,
            roomstuff_Closet_drwers:0,
            roomstuff_TV:0,
            roomstuff_Pool:0,
            roomstuff_kitchen:0,
            roomstuff_washer:0,
            roomstuff_dryer:0,
            roomstuff_Park:0,
            roomstuff_Lift:0,
            roomstuff_HotTub:0,
            roomstuff_Gym:0,
            roomstuff_Heat:0,
            roomstuff_aircondition:0,
            roomstuff_breakfastcoffetea:0,
            roomstuff_desk_workspace:0,
            roomstuff_fireplace:0,
            roomstuff_iron:0,
            roomstuff_withKids:0,
            roomstuff_BigGroups:0,
            roomstuff_pets:0,
            roomstuff_hairdryer:0,
            roomstuff_petsinhouse:0,
            roomstuff_private_entrance:0,
            roomstuff_smartpincode:0,
            roomstuff_smartpincode_password:"",
            roomstuff_smartpincode_confirmpassword:"",
            roomstuff_smoke_detector:"",
            roomstuff_Country:"",
            roomstuff_Street:"",
            roomstuff_Apt:"",
            roomstuff_City:"",
            roomstuff_ZIPCode :"",
            selectedPictures:[],
            price_perday:0,
            ETHprice_perday:0,
            user: {user:'Loading...'},
            Categorys:['Entire place','Private Room','Share Room'],
            step1guests:['for 1 guests','for 2 guests','for 3 guests','for 4 guests','for 5 guests'],
            homeorhotels:['Home','hotel','Other'],
            types:['Single room','double room','family suite','business suite'],
            guestshaves:['Entire place'],
            PasswordActibve:1
        }

        this.nextStep = this.nextStep.bind(this);
        this.preStep  = this.preStep.bind(this)
        this.addCommonSpaceBeds = this.addCommonSpaceBeds.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(){
        if(this.state.roomdescription_title == '' && this.state.roomdescription_description == ''){
        }else{
           houselistingService.submitListing(this.state)
              .then((tx) => {
                  this.setState({
                      step: this.STEP.PROCESSING
                  });
                  return houselistingService.waitTransactionFinished(tx);
              })
              .then((blockNumber) => {
                  this.setState({
                      step: this.STEP.SUCCESS
                  });
              })
              .catch((error) => {
                  alertify.log(error.message);
              })

        }

    }

    fileChangedHandler(event){
        event.preventDefault();

        var files = this.state.selectedPictures;
        let reader = new FileReader();
        let file = event.target.files[0];

          reader.onloadend = () => {
            files.push({
              file: file,
              imagePreviewUrl: reader.result
            });
            this.setState({selectedPictures:files});
          }

        reader.readAsDataURL(file)
    }

    addCommonSpaceBeds(){
      var number = this.state.roombasics_commonspacebeds+1;
      this.setState({roombasics_commonspacebeds:number});
    }

    nextStep() {
      console.log(this.state);
      if(this.state.step == this.STEP.Step1_1)
      {
        if(this.state.roomtype_location == ''){
          this.setState({step:this.STEP.Step1_1});
        }else{
          this.setState({step:this.STEP.Step1_2});
        }
      }
      
      if(this.state.step == this.STEP.Step1_2)
      {
        if(this.state.roomdescription_forguestorhost == 0 || this.state.roomdescription_forguestorhost == 1){
          this.setState({step:this.STEP.Step1_3});
        }
      }
      if(this.state.step == this.STEP.Step1_3)
      {
        this.setState({step:this.STEP.Step1_4});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_4)
      {
        this.setState({step:this.STEP.Step1_5});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_5)
      {
        this.setState({step:this.STEP.Step1_6});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_6)
      {
        this.setState({step:this.STEP.Step1_7});
        console.log(this.state);
      }

      if(this.state.step == this.STEP.Step1_7)
      {
        if(this.state.roomstuff_smartpincode == 1){
            if(this.state.roomstuff_smartpincode_password != '' && this.state.roomstuff_smartpincode_confirmpassword != '' && this.state.roomstuff_smartpincode_password == this.state.roomstuff_smartpincode_confirmpassword){
              this.setState({state:this.state.PasswordActibve=1}); 
              console.log(this.state.PasswordActibve);
              this.setState({step:this.STEP.Step1_8});
            }else{
              this.setState({step:this.STEP.Step1_7});
              this.setState({state:this.state.PasswordActibve=0}); 
              console.log(this.state.PasswordActibve);
            }
        }else{
            this.setState({step:this.STEP.Step1_8});
        }
      }

      
      

    }

    preStep(){
      console.log(this.state);
      if(this.state.step == this.STEP.Step1_2)
      {
        this.setState({step:this.STEP.Step1_1});
      }
      if(this.state.step == this.STEP.Step1_3)
      {
        this.setState({state:this.state.roomdescription_forguestorhost=2}); 
        this.setState({step:this.STEP.Step1_2});
        console.log(this.state);
      }
       if(this.state.step == this.STEP.Step1_4)
      {
        this.setState({step:this.STEP.Step1_3});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_5)
      {
        this.setState({step:this.STEP.Step1_4});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_6)
      {
        this.setState({step:this.STEP.Step1_5});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.Step1_7)
      {
        this.setState({step:this.STEP.Step1_6});
        console.log(this.state);
      }


       if(this.state.step == this.STEP.SUCCESS)
      {
        this.setState({step:this.STEP.Step1_1});
        console.log(this.state);
      }


    }

  

    componentWillMount() {
        this.setState({step:this.STEP.Step1_1});
            this.setState({
                account: window.address,
                id: window.address
            });
    }

   
    Categorys(Category){
      this.setState({roomtype_category: Category});
    }
    step1guests(step1guest){
      this.setState({roomtype_guests: step1guest});
    }
    homeorhotels(homeorhotel){
      this.setState({roomdescription_homeorhotel: homeorhotel});
    }
    types(type){
      this.setState({roomdescription_type: type});
    }
    guestshaves(guestshave){
      this.setState({roomdescription_guests_have: guestshave});
    }

    guestsnumber(e){
      var DataIndex = e.currentTarget.getAttribute('data-name');
      if(DataIndex == 'jian'){
        this.setState({state: this.state.roombasics_guestsnumber = ++this.state.roombasics_guestsnumber});
      }else{
        if(this.state.roombasics_guestsnumber == 1){
          this.setState({state: this.state.roombasics_guestsnumber = 1});
        }else{
          this.setState({state: this.state.roombasics_guestsnumber = --this.state.roombasics_guestsnumber});
        }
      }
    }
    guestbeds(e){
      var DataIndex = e.currentTarget.getAttribute('data-name');
      if(DataIndex == 'jian'){
        this.setState({state: this.state.roombasics_guestbeds = ++this.state.roombasics_guestbeds});
      }else{
        if(this.state.roombasics_guestbeds == 1){
          this.setState({state: this.state.roombasics_guestbeds = 1});
        }else{
          this.setState({state: this.state.roombasics_guestbeds = --this.state.roombasics_guestbeds});
        }
      }
    }
    totalguests(e){
      var DataIndex = e.currentTarget.getAttribute('data-name');
      if(DataIndex == 'jian'){
        this.setState({state: this.state.roombasics_totalguests = ++this.state.roombasics_totalguests});
      }else{
        if(this.state.roombasics_totalguests == 1){
          this.setState({state: this.state.roombasics_totalguests = 1});
        }else{
          this.setState({state: this.state.roombasics_totalguests = --this.state.roombasics_totalguests});
        }
      }
    }
    guestbedrooms(e){
      var DataIndex = e.currentTarget.getAttribute('data-name');
      if(DataIndex == 'jian'){
        this.setState({state: this.state.roombasics_guestbedrooms = this.state.roombasics_guestbedrooms+0.5});
      }else{
        if(this.state.roombasics_guestbedrooms == 1){
          this.setState({state: this.state.roombasics_guestbedrooms = 0.5});
        }else{
          this.setState({state: this.state.roombasics_guestbedrooms = this.state.roombasics_guestbedrooms-0.5});
        }
      }
    }



  render() {
    const Categoryarr = [];
    this.state.Categorys.forEach((Category,index)=>{
      Categoryarr.push(<li><a onClick={this.Categorys.bind(this,Category)} >{Category}</a></li>)
    })
    const step1guestsarr = [];
    this.state.step1guests.forEach((step1guest,index)=>{
      step1guestsarr.push(<li><a onClick={this.step1guests.bind(this,step1guest)} >{step1guest}</a></li>)
    })
    const homeorhotelarr = [];
    this.state.homeorhotels.forEach((homeorhotel,index)=>{
      homeorhotelarr.push(<li><a onClick={this.homeorhotels.bind(this,homeorhotel)} >{homeorhotel}</a></li>)
    })
    const typearr = [];
    this.state.types.forEach((type,index)=>{
      typearr.push(<li><a onClick={this.types.bind(this,type)} >{type}</a></li>)
    })
    const guestshavearr = [];
    this.state.guestshaves.forEach((guestshave,index)=>{
      guestshavearr.push(<li><a onClick={this.guestshaves.bind(this,guestshave)} >{guestshave}</a></li>)
    })
    

    return (
      <div className="becomehost-1 container">

       
        { this.state.step === this.STEP.Step1_100 &&

            <div className="row">
              <div className="col-md-12 col-lg-6 col-sm-12 Step1_1">
                  <div className="STEPhead">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <p>Step 1</p>
                  </div>
                  <h1>Hi,{this.state.user.user}!,Let's get started listing your space</h1>

                  <h2>What's kind of place do you have?</h2>

                  <div className="row">
                  <div className="col-md-6 form-group">
                      <label>Category<b>*</b></label>
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">{this.state.roomtype_category}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          { Categoryarr }
                        </ul>
                      </div>
                  </div>


                  <div className="col-md-6 form-group">
                      <label>Guests<b>*</b></label>
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">{this.state.roomtype_guests}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          { step1guestsarr } 
                        </ul>
                      </div>
                  </div>
                  </div>


                  <div className="form-group">
                    <label>Location<b>*</b></label>
                    <div className="locatedBox">
                      <img src="../images/located.png" alt=""/>
                      <input type="text"  className={this.state.roomtype_location == '' ? 'form-control pinkBorder' : 'form-control'} onChange={(e) => this.setState({roomtype_location: e.target.value})} value={this.state.roomtype_location}/>
                    </div>
                  </div>

                  <div className="STEPBTN">
                      <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.nextStep}>Continue</button>
                  </div>
                  <br/><br/>
                  <img src="../images/becomehost-step1-hint.jpg" alt=""/>



              </div>


               <div className="col-md-12 col-lg-6 col-sm-12">
                  <img className="becomehost-1__bg" src="../images/becomehost-step1_1.png" alt=""/>
                </div>
            
            
          </div>
        }

        {
          this.state.step === this.STEP.Step1_2 &&
          <div className="becomehost-2 container">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-8 Step1_2">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <p>Step 1: Start with the basics</p>
            </div>

              <h1>What kind of room do you listing?</h1>
              <h2>Is this listing a home,hotel, or something else? </h2>

              <div className="form-group">    
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown">{this.state.roomdescription_homeorhotel}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                    { homeorhotelarr } 
                  </ul>
                </div>
              </div>

               <h2>What type is it? </h2>

              <div className="form-group">    
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown">{this.state.roomdescription_type}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                    { typearr } 
                  </ul>
                </div>
              </div>

               <h2>What guests will have? </h2>

              <div className="form-group">    
                
                <div className="btn-group col-md-12">
                  <button type="button" data-toggle="dropdown">{this.state.roomdescription_guests_have}<span>▼</span></button>
                  <ul className="dropdown-menu" role="menu">
                    { guestshavearr } 
                  </ul>
                </div>
              </div>

               <h2>Is this setup dedicated a guest space?</h2>

               <div className="radio">
                  <h2 className={this.state.roomdescription_forguestorhost == 2 ? 'text-muted textpink' : 'text-muted'} ><input className="bg-pink color-white" type="radio"  name="optradio" value="0" onChange={(e) => this.setState({roomdescription_forguestorhost: e.target.value})}/>Yes,it's primarily set up for guests</h2>
                </div>
                <div className="radio">
                  <h2 className={this.state.roomdescription_forguestorhost == 2 ? 'text-muted textpink' : 'text-muted'}><input className="bg-pink color-white" type="radio" name="optradio" value="1" onChange={(e) => this.setState({roomdescription_forguestorhost: e.target.value})}/>No,I keep my personal belongings here</h2>
                </div>

             
          
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone">
             <img className="becomehost__info" src="./images/becomehost-step1_2.jpg" alt=""/>
             </div>
             </div>
             </div>

        }

         {
          this.state.step === this.STEP.Step1_3 &&
          <div className="becomehost-3 container">
          <div className="row">
          <div className="col-md-8 col-lg-8 col-sm-8 Step1_3">
          <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <span></span>
              <p>Step 1: Start with the basics</p>
            </div>
              <h1>How many guests can your place accommodate?</h1>
               <div className="col-md-6 form-group">
                      <label>Number of guests*</label>
                      <div className="btn-group col-md-12">
                        <button type="button" className="guestBtn">
                          <span className="btnjia" onClick={(e)=>this.guestsnumber(e)} data-name="jia">▲</span>
                          {this.state.roombasics_guestsnumber}
                          <span className="btnjian" onClick={(e)=>this.guestsnumber(e)} data-name="jian">▼</span>
                        </button>
                      </div>
                  </div>

                   <div className="col-md-12 form-group form-groupTWO">
                      <label>How many beds can guests use?*</label>
                      <div className="btn-group col-md-12">
                        <button type="button" className="guestBtn">
                          <span className="btnjia" onClick={(e)=>this.guestbeds(e)} data-name="jia">▲</span>
                          {this.state.roombasics_guestbeds}
                          <span className="btnjian" onClick={(e)=>this.guestbeds(e)} data-name="jian">▼</span>
                        </button>
                      </div>
                  </div>

                  

                  <div className="col-md-12 form-group">
                  <h3>How many beds can guests have*</h3>
                  <div className="row">
                     <div className="col-md-6">
                      <label className="bind">Total of guests*</label>
                        <div className="btn-group col-md-12">
                          <button type="button" className="guestBtn">
                          <span className="btnjia" onClick={(e)=>this.totalguests(e)} data-name="jia">▲</span>
                          {this.state.roombasics_totalguests}
                          <span className="btnjian" onClick={(e)=>this.totalguests(e)} data-name="jian">▼</span>
                        </button>
                        </div>
                      </div>
                  </div>
                  

                  <h3 className="text-muted">Sleeping arrangment</h3>
                  <hr/>
                      <div className="row">
                        <div className="col-md-6  divLeft">
                         <h3 className="text-muted">Common space <b>{this.state.roombasics_commonspacebeds}</b> beds</h3>
                        </div>

                        <div className="col-md-6 divRight">
                         <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.addCommonSpaceBeds}>Add beds</button>
                        </div>
                      </div>

                 <div className="STEPBTN">
                    <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                    <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
                  </div>
                  </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4 paddingNone">
          <img className="becomehost__info" src="../images/becomehost-step1_3.jpg" alt=""/>
          </div>
          </div>
          </div>
        }

        {
          this.state.step === this.STEP.Step1_4 &&
          <div className="becomehost-2 container">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-8 Step1_4">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <p>Step 1: Start with the basics</p>
            </div>

              <h1>Bathrooms</h1>
              <h2>Number of bathrooms</h2>
              <div className="btn-group col-md-6">
                <button type="button" className="guestBtn">
                  <span className="btnjia" onClick={(e)=>this.guestbedrooms(e)} data-name="jia">▲</span>
                  {this.state.roombasics_guestbedrooms}
                  <span className="btnjian" onClick={(e)=>this.guestbedrooms(e)} data-name="jian">▼</span>
                </button>
              </div>


             
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone">
             <img className="becomehost__info" src="./images/becomehost-step1_4.jpg" alt=""/>
             </div>
             </div>
             </div>

        }

        {
          this.state.step === this.STEP.Step1_5 &&
          <div className="becomehost-2 container">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-8 Step1_5">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span className="bjpink"></span>
              <span></span>
              <p>Step 1: Start with the basics</p>
            </div>

              <h1>Where’s your place located?</h1>
              
              <div className="Stepbox">
                <div className="col-md-12 col-lg-12 Step1_5box">
                  <h2>Country / Region</h2>
                  <input onChange={(e) => this.setState({roomstuff_Country: e.target.value})} value={this.state.roomstuff_Country}  type="text" />
                </div>

                <div className="col-md-12 col-lg-12 Step1_5box">
                  <h2>Street Address<span>e.g. Blk 35 Mandalay Road</span></h2>
                  <input onChange={(e) => this.setState({roomstuff_Street: e.target.value})} value={this.state.roomstuff_Street}  type="text" />
                </div>

                <div className="col-md-12 col-lg-12 Step1_5box">
                  <h2>Apt, Suite. (optional)<span>e.g. # 13–37 Mandalay Towers </span></h2>
                  <input onChange={(e) => this.setState({roomstuff_Apt: e.target.value})} value={this.state.roomstuff_Apt}   type="text" />
                </div>

                <div className="col-md-12 col-lg-12 Step1_5box">
                  <div className="col-md-5 col-lg-5 Step1_5box">
                    <h2>City<span>e.g. Singapore</span></h2>
                    <input  onChange={(e) => this.setState({roomstuff_City: e.target.value})} value={this.state.roomstuff_City}   type="text" />
                  </div>
                  <div className="col-md-push-2 col-md-5 col-lg-5 Step1_5box">
                    <h2>ZIP Code<span>e.g. 308215</span></h2>
                    <input  onChange={(e) => this.setState({roomstuff_ZIPCode: e.target.value})} value={this.state.roomstuff_ZIPCode}  type="text" />
                  </div>
                </div>
              </div>




            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone">
             <img className="becomehost__info" src="./images/becomehost-step1_5.jpg" alt=""/>
             </div>
             </div>
             </div>

        }

        {
          this.state.step === this.STEP.Step1_6 &&
  
          <div className="becomehost-4 container">
          <div className="row">
              <div className="col-md-7 col-lg-7 col-sm-7 col-md-offset-1 col-lg-offset-1 col-sm-offset-1 Step1_6">
               <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <p>Step 1: Start with the basics</p>
              </div>

              <h1>What amenities do you offer?</h1>

             <div className="Step1_6box">

                 <div>
                  <p className="Pinput"  onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}>
                    <img className={this.state.roomstuff_Essentials ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <div className="divinput">
                    <p>Essentials</p>
                    <p>Towels,bed sheets,soap,toilet paper,and pillows</p>
                  </div>
                </div>

                <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_Shampoo ==0 )this.setState({roomstuff_Shampoo:1});else this.setState({roomstuff_Shampoo:0});}}>
                      <img className={this.state.roomstuff_Shampoo ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Shampoo</p> 
                 
                </div>

                <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_Closet_drwers ==0 )this.setState({roomstuff_Closet_drwers:1});else this.setState({roomstuff_Closet_drwers:0});}}>
                      <img className={this.state.roomstuff_Closet_drwers ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Closet/drawers</p> 
                </div>

                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_TV ==0 )this.setState({roomstuff_TV:1});else this.setState({roomstuff_TV:0});}}>
                      <img className={this.state.roomstuff_TV ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">TV</p>
                </div>


                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_Heat ==0 )this.setState({roomstuff_Heat:1});else this.setState({roomstuff_Heat:0});}}>
                      <img className={this.state.roomstuff_Heat ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Heat</p>
                </div>


                  <div>
                  <p  className="Pinput" onClick={(e) => {if(this.state.roomstuff_aircondition ==0 )this.setState({roomstuff_aircondition:1});else this.setState({roomstuff_aircondition:0});}}>
                      <img className={this.state.roomstuff_aircondition ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Air conditioning</p>
                </div>

                  <div>
                  <p  className="Pinput" onClick={(e) => {if(this.state.roomstuff_breakfastcoffetea ==0 )this.setState({roomstuff_breakfastcoffetea:1});else this.setState({roomstuff_breakfastcoffetea:0});}}>
                      <img className={this.state.roomstuff_breakfastcoffetea ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Breakfast,coffe,tea</p>
                  
                </div>

                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_desk_workspace ==0 )this.setState({roomstuff_desk_workspace:1});else this.setState({roomstuff_desk_workspace:0});}}>
                      <img className={this.state.roomstuff_desk_workspace ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Desk/workspace</p>
                </div>

                  <div>
                  <p  className="Pinput" onClick={(e) => {if(this.state.roomstuff_fireplace ==0 )this.setState({roomstuff_fireplace:1});else this.setState({roomstuff_fireplace:0});}}>
                      <img className={this.state.roomstuff_fireplace ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Fireplace</p>
                  </div>

                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_Pool ==0 )this.setState({roomstuff_Pool:1});else this.setState({roomstuff_Pool:0});}}>
                      <img className={this.state.roomstuff_Pool ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Pool</p> 
                </div>

                <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_kitchen ==0 )this.setState({roomstuff_kitchen:1});else this.setState({roomstuff_kitchen:0});}}>
                      <img className={this.state.roomstuff_kitchen ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">kitchen</p> 
                </div>

                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_washer ==0 )this.setState({roomstuff_washer:1});else this.setState({roomstuff_washer:0});}}>
                      <img className={this.state.roomstuff_washer ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Laundry - washer</p>
                </div>


                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_dryer ==0 )this.setState({roomstuff_dryer:1});else this.setState({roomstuff_dryer:0});}}>
                      <img className={this.state.roomstuff_dryer ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Laundry - dryer</p>
                </div>


                  <div>
                  <p  className="Pinput" onClick={(e) => {if(this.state.roomstuff_Park ==0 )this.setState({roomstuff_Park:1});else this.setState({roomstuff_Park:0});}}>
                      <img className={this.state.roomstuff_Park ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Park</p>
                </div>

                  <div>
                  <p  className="Pinput" onClick={(e) => {if(this.state.roomstuff_Lift ==0 )this.setState({roomstuff_Lift:1});else this.setState({roomstuff_Lift:0});}}>
                      <img className={this.state.roomstuff_Lift ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Lift</p>
                  
                </div>

                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_HotTub ==0 )this.setState({roomstuff_HotTub:1});else this.setState({roomstuff_HotTub:0});}}>
                      <img className={this.state.roomstuff_HotTub ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Hot tub</p>
                </div>

                  <div>
                  <p  className="Pinput" onClick={(e) => {if(this.state.roomstuff_Gym ==0 )this.setState({roomstuff_Gym:1});else this.setState({roomstuff_Gym:0});}}>
                      <img className={this.state.roomstuff_Gym ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Gym</p>
                  </div>


                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_iron ==0 )this.setState({roomstuff_iron:1});else this.setState({roomstuff_iron:0});}}>
                      <img className={this.state.roomstuff_iron ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Iron</p>
                </div>

                  <div>
                  <p  className="Pinput" onClick={(e) => {if(this.state.roomstuff_hairdryer ==0 )this.setState({roomstuff_hairdryer:1});else this.setState({roomstuff_hairdryer:0});}}>
                      <img className={this.state.roomstuff_hairdryer ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Hair dryer</p>
                </div>

                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_petsinhouse ==0 )this.setState({roomstuff_petsinhouse:1});else this.setState({roomstuff_petsinhouse:0});}}>
                      <img className={this.state.roomstuff_petsinhouse ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Pets in the house</p>
                </div>
                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_private_entrance ==0 )this.setState({roomstuff_private_entrance:1});else this.setState({roomstuff_private_entrance:0});}}>
                      <img className={this.state.roomstuff_private_entrance ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Private entrance</p>
                </div>

                <h1>Safety amenities</h1>
                 <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_smartpincode ==0 )this.setState({roomstuff_smartpincode:1});else this.setState({roomstuff_smartpincode:0,roomstuff_smartpincode_password:'',roomstuff_smartpincode_confirmpassword :''});}}>
                      <img className={this.state.roomstuff_smartpincode ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Smart pin code</p>
                  <div className="control-group">
                  <label className="control-label">Insert Your Password</label>
                  <input type="password" className="controls" onChange={(e) => this.setState({roomstuff_smartpincode_password: e.target.value})} value={this.state.roomstuff_smartpincode == 1 ? this.state.roomstuff_smartpincode_password : ''} />
                  <span className={this.state.PasswordActibve == 0 ? 'glyphicon glyphicon-remove-sign' : ''}></span>   
                  </div>

                  <div className="control-group control-group1">
                   <label className="control-label">ConFirm Your Password</label>
                   <input type="password" className="controls" onChange={(e) => this.setState({roomstuff_smartpincode_confirmpassword: e.target.value})} value={this.state.roomstuff_smartpincode == 1 ? this.state.roomstuff_smartpincode_confirmpassword : ''} />
                    <span className={this.state.PasswordActibve == 0 ? 'glyphicon glyphicon-remove-sign' : ''}></span>  
                 </div>
                </div>

                <div className="detector">
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_smoke_detector ==0 )this.setState({roomstuff_smoke_detector:1});else this.setState({roomstuff_smoke_detector:0});}}>
                      <img className={this.state.roomstuff_smoke_detector ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Smoke detector</p>
                </div>
          </div>

              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
              </div>
             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone">
             <img className="becomehost__info" src="../images/becomehost-step1_6.jpg" alt=""/>
             </div>
          </div>
          </div>
        }
          
         {
          this.state.step === this.STEP.Step1_7 &&

          <div className="becomehost-5 container">
          <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6 Step1_7">
          <h1>Great process {this.state.user.user}!</h1>
          <h3>Now let's get some details about your place so you can publish your listings </h3>
          <div className="change">
              <div>
                <p>Bedrooms,beds,amenities,and more</p>
                <p>change</p>
              </div>
              <img  className="becomehost__step-1" src="../images/landloard_page-30.png" alt=""/>
          </div>

          <div className="Step2box">
            <p className="Step2">Step 2</p>
            <h2>Set the sence</h2>
            <p className="Set">photos, short description, title</p>
            <button className="btn btn-default btn-lg bg-pink color-white subbtn Left" onClick={this.nextStep}>Continue</button>
          </div>

          <div className="Step2box">
            <p className="Step3">Step 3</p>
            <h2>Get ready for guests </h2>
            <p className="Set1">Booking settings, calendar, price</p>
          </div>

          <div className="Stepbox1">
            <h2>The 3rd Party service provided by host </h2>

            <div className="service">
              <div>
                  <h5><p>Home Rapair<span>▲</span></p></h5>
                  <h5><p>Marketing & Brand<span>▼</span></p></h5>
                  <h5><p>Photoshooting<span>▲</span></p></h5>
                  <h5><p>Interior Design<span>▼</span></p></h5>
                  <h5><p>Cleaning & Washing<span>▲</span></p></h5>
              </div>
            </div>

          </div>



          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 paddingNone">
          <img className="becomehost-5__bg" src="../images/becomehost-step1_1.png" alt=""/>
          
          </div>
          </div>
          </div>



        }
        
        {
          this.state.step === this.STEP.Step2_1 &&
          <div className="becomehost-2 container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12 Step2_1">
            <div className="STEPhead">
              <span className="bjpink"></span>
              <span></span>
              <span></span>
              <p>Step 2: Set the scene</p>
            </div>

              <h2>Show travellers what your space looks like</h2>
              
              <div className="photos">
                  {this.state.selectedPictures.map(file => (
                    <div className="photosimg">
                    <img className="img-thumbnail" src={file.imagePreviewUrl} />
                    </div>
                    ))
                   }
                 <div className="photosipt">
                    <h4><p>+</p>Drag and Drop OR</h4>
                    <input className="btn btn-default btn-lg bg-pink color-white Fileipt" type="file" onChange={this.fileChangedHandler}/>
                 </div>
              </div>

             
            <div className="STEPBTN">
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
            </div>
             
             </div>
             
             </div>
             </div>

        }
         {
          this.state.step === this.STEP.Step1_1 &&
          <div className="becomehost-2 container">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-8 Step2_2">
              <div className="STEPhead">
                <span className="bjpink"></span>
                <span className="bjpink"></span>
                <span></span>
                <p>Step 2: Set the scene</p>
              </div>


              <h4>title</h4>
              <input onChange={(e) => this.setState({roomdescription_title: e.target.value})} value={this.state.roomdescription_title}  type="text" />

              <h4>PPS</h4>
              <input onChange={(e) => this.setState({PPSprice_perday: e.target.value})} value={this.state.PPSprice_perday}  type="text" />

              <h4>ETH</h4>
              <input onChange={(e) => this.setState({ETHprice_perday: e.target.value})} value={this.state.ETHprice_perday}  type="text" />

              <h4>Add your mobile number</h4>
              <div className="phonebox">
                  <p> <img className={this.state.roomstuff_pets ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/></p>
                  <input onChange={(e) => this.setState({roomdescription_title: e.target.value})} value={this.state.roomdescription_title}  type="text" />
              </div>

              <h4>Edit your description</h4>
              <textarea onChange={(e) => this.setState({roomdescription_description: e.target.value})} placeholder="Describe the decor, light, what’s nearby,etc..."></textarea>

              <h4>My place is great for</h4>

              <div className="box">  
                <div>
                  <p  className="Pinput" onClick={(e) => {if(this.state.roomstuff_withKids ==0 )this.setState({roomstuff_withKids:1});else this.setState({roomstuff_withKids:0});}}>
                      <img className={this.state.roomstuff_withKids ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Family (with kids)</p>
                </div>

                  <div>
                  <p  className="Pinput" onClick={(e) => {if(this.state.roomstuff_BigGroups ==0 )this.setState({roomstuff_BigGroups:1});else this.setState({roomstuff_BigGroups:0});}}>
                      <img className={this.state.roomstuff_BigGroups ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Big groups</p>
                  
                </div>

                  <div>
                  <p  className="Pinput"  onClick={(e) => {if(this.state.roomstuff_pets ==0 )this.setState({roomstuff_pets:1});else this.setState({roomstuff_pets:0});}}>
                      <img className={this.state.roomstuff_pets ==1 ? 'show' : 'hide'} src="../images/dashang.png" alt=""/>
                  </p>
                  <p className="divinput">Furry friends (pets)</p>
                </div>
            </div>
              
              <h4>About your place (optional)</h4>
              <textarea></textarea>


              <h4>What guests can access (optional)</h4>
              <textarea></textarea>


              <h4>Your interaction with guests (optional)</h4>
              <textarea></textarea>

              <h4>Other things to note (optional)</h4>
              <textarea></textarea>

              <h2>The neighbourhood</h2>
              

              <h4>About the neighbourhood (optional)</h4>
              <textarea></textarea>

              <h4>How to get around (optional)</h4>
              <textarea></textarea>

              <div className="STEPBTN">
                <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
               
             </div>

             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone">
             <img className="becomehost__info" src="./images/becomehost-step1_2.jpg" alt=""/>
             </div>
    

             
             </div>
             </div>

        }



        {
          this.state.step === this.STEP.SUCCESS &&

          <div className="becomehost-8 container">
          <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 Step-8">
            <h1>Submission of success</h1>
            <button className="btn btn-default btn-lg bg-pink color-white subbtn Left" onClick={this.preStep}>Back</button>
          </div>
          </div>
          </div>





        }





      </div>
    )
  }
}

export default ListingCreate
