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
            STEP1: 1,
            STEP2: 2,
            STEP3: 3,
            STEP4: 4,
            STEP5: 5,
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
            roomtype_guests:1,
            roomtype_location:"",
            roomdescription_homeorhotel:"Home",
            roomdescription_type:"Single room",
            roomdescription_guests_have:"Entire place",
            roomdescription_forguestorhost:0,
            roomdescription_title:"",
            roomdescription_description:"",
            roombasics_guestsnumber:1,
            roombasics_guestbedrooms:1,
            roombasics_totalguests:1,
            roombasics_commonspacebeds:1,
            roomstuff_Essentials:1,
            roomstuff_Shampoo:0,
            roomstuff_Closet_drwers:0,
            roomstuff_TV:0,
            roomstuff_Heat:0,
            roomstuff_aircondition:0,
            roomstuff_breakfastcoffetea:0,
            roomstuff_desk_workspace:0,
            roomstuff_fireplace:0,
            roomstuff_iron:0,
            roomstuff_hairdryer:0,
            roomstuff_petsinhouse:0,
            roomstuff_private_entrance:0,
            roomstuff_smartpincode:0,
            roomstuff_smartpincode_password:"",
            roomstuff_smartpincode_confirmpassword:"",
            roomstuff_smoke_detector:"",
            selectedPictures:[],
            price_perday:0,
            user: {user:'Loading...'},
            Categorys:['Entire place','Private Room','Share Room'],
            step1guests:[1,2,3,4,5],
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
      if(this.state.step == this.STEP.STEP1)
      {
        if(this.state.roomtype_location == ''){
          this.setState({step:this.STEP.STEP1});
        }else{
          this.setState({step:this.STEP.STEP2});
        }
      }
      
      if(this.state.step == this.STEP.STEP2)
      {
        this.setState({step:this.STEP.STEP3});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.STEP3)
      {
        this.setState({step:this.STEP.STEP4});
        console.log(this.state);
      }

      if(this.state.step == this.STEP.STEP4)
      {
        if(this.state.roomstuff_smartpincode == 1){
            if(this.state.roomstuff_smartpincode_password != '' && this.state.roomstuff_smartpincode_confirmpassword != '' && this.state.roomstuff_smartpincode_password == this.state.roomstuff_smartpincode_confirmpassword){
              this.setState({state:this.state.PasswordActibve=1}); 
              console.log(this.state.PasswordActibve);
              this.setState({step:this.STEP.STEP5});
            }else{
              this.setState({step:this.STEP.STEP4});
              this.setState({state:this.state.PasswordActibve=0}); 
              console.log(this.state.PasswordActibve);
            }
        }else{
            this.setState({step:this.STEP.STEP5});
        }
      }

      
      

    }

    preStep(){
      console.log(this.state);
      if(this.state.step == this.STEP.STEP2)
      {
        this.setState({step:this.STEP.STEP1});
      }

      if(this.state.step == this.STEP.STEP3)
      {
        this.setState({step:this.STEP.STEP2});
        console.log(this.state);
      }

       if(this.state.step == this.STEP.STEP4)
      {
        this.setState({step:this.STEP.STEP3});
        console.log(this.state);
      }
      if(this.state.step == this.STEP.STEP5)
      {
        this.setState({step:this.STEP.STEP4});
        console.log(this.state);
      }
       if(this.state.step == this.STEP.SUCCESS)
      {
        this.setState({step:this.STEP.STEP1});
        console.log(this.state);
      }


    }

  

    componentWillMount() {
        this.setState({step:this.STEP.STEP1});
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
    guestsnumbers(guestsnumber){
      this.setState({roombasics_guestsnumber: guestsnumber});
    }
    guestbedrooms(guestbedroom){
      this.setState({roombasics_guestbedrooms: guestbedroom});
    }
    totalguests(totalguest){
      this.setState({roombasics_totalguests: totalguest});
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
    const guestsnumberarr = [];
    this.state.step1guests.forEach((guestsnumber,index)=>{
      guestsnumberarr.push(<li><a onClick={this.guestsnumbers.bind(this,guestsnumber)} >{guestsnumber}</a></li>)
    })
    const guestbedroomsrarr = [];
    this.state.step1guests.forEach((guestbedroom,index)=>{
      guestbedroomsrarr.push(<li><a onClick={this.guestbedrooms.bind(this,guestbedroom)} >{guestbedroom}</a></li>)
    })
    const totalguestsrarr = [];
    this.state.step1guests.forEach((totalguest,index)=>{
      totalguestsrarr.push(<li><a onClick={this.totalguests.bind(this,totalguest)} >{totalguest}</a></li>)
    })
    

    return (
      <div className="becomehost-1 container">
        <br/><br/>
        { this.state.step === this.STEP.STEP1 &&

            <div className="row">
              <div className="col-md-12 col-lg-6 col-sm-12 Step-1">
              <img className="becomehost__step-1" src="../images/becomehost-step.png" alt=""/>
                  <h1>Hi,{this.state.user.user}!,Let's get started listing your space</h1>

                  <h2>What's kind of place do you have?</h2>

                  <div className="row">
                  <div className="col-md-6 form-group">
                      <label>Category*</label>
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">{this.state.roomtype_category}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          { Categoryarr }
                        </ul>
                      </div>
                  </div>


                  <div className="col-md-6 form-group">
                      <label>Guests*</label>
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">{this.state.roomtype_guests}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          { step1guestsarr } 
                        </ul>
                      </div>
                  </div>
                  </div>


                  <div className="form-group">
                    <label>Location*</label>
                    <input type="text"  className={this.state.roomtype_location == '' ? 'form-control pinkBorder' : 'form-control'} onChange={(e) => this.setState({roomtype_location: e.target.value})} value={this.state.roomtype_location}/>
                    <p className={this.state.roomtype_location == '' ? 'show' : 'hide' }>Please Fill In The Location</p>
                  </div>

                  <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.nextStep}>Continue</button>
                  <br/><br/>
                  <img src="../images/becomehost-step1-hint.jpg" alt=""/>



              </div>


               <div className="col-md-12 col-lg-6 col-sm-12">
                  <img className="becomehost-1__bg" src="../images/becomehost-step1-bg.png" alt=""/>
                </div>
            
            
          </div>
        }

        {
          this.state.step === this.STEP.STEP2 &&
          <div className="becomehost-2 container">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-8 Step-2">
            <img className="becomehost__step-2" src="./images/becomehost-step2-step.png" alt=""/> 

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
                  <h2 className="text-muted"><input className="bg-pink color-white" type="radio" checked name="optradio" value="0" onChange={(e) => this.setState({roomdescription_forguestorhost: e.target.value})}/>Yes,it's primarily set up for guests</h2>
                </div>
                <div className="radio">
                  <h2 className="text-muted"><input className="bg-pink color-white" type="radio" name="optradio" value="1" onChange={(e) => this.setState({roomdescription_forguestorhost: e.target.value})}/>No,I keep my personal belongings here</h2>
                </div>

              <hr/>

             
          
            <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
          
            <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
             
             </div>
             
             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone">
             <img className="becomehost__info" src="./images/becomehost-step2-info.jpg" alt=""/>
             </div>
             </div>
             </div>

        }

         {
          this.state.step === this.STEP.STEP3 &&
          <div className="becomehost-3 container">
          <div className="row">
          <div className="col-md-8 col-lg-8 col-sm-8 Step-3">
          <img className="becomehost__step-2" src="../images/becomehost-step3-step.png" alt=""/> 
              <h1>How many guests can your place accommodate?</h1>
               <div className="col-md-6 form-group">
                      <label>Number of guests*</label>
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">{this.state.roombasics_guestsnumber}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          { guestsnumberarr } 
                        </ul>
                      </div>
                  </div>

                   <div className="col-md-12 form-group form-groupTWO">
                      <label>How many bedrooms can guests have*</label>
                      <div className="btn-group col-md-12">
                        <button type="button" data-toggle="dropdown">{this.state.roombasics_guestbedrooms}<span>▼</span></button>
                        <ul className="dropdown-menu" role="menu">
                          { guestbedroomsrarr } 
                        </ul>
                      </div>
                  </div>

                  

                  <div className="col-md-12 form-group">
                  <h3>How many beds can guests have*</h3>
                  <div className="row">
                     <div className="col-md-6">
                      <label className="bind">Total of guests*</label>
                        <div className="btn-group col-md-12">
                          <button type="button" data-toggle="dropdown">{this.state.roombasics_totalguests}<span>▼</span></button>
                          <ul className="dropdown-menu" role="menu">
                            { totalguestsrarr } 
                          </ul>
                        </div>
                      </div>
                  </div>
                  

                  <h3 className="text-muted">Sleeping arrangment</h3>
                  <hr/>
                      <div className="row">
                        <div className="col-md-6  divLeft">
                         <h3 className="text-muted">Common space <span>{this.state.roombasics_commonspacebeds}</span> beds</h3>
                        </div>

                        <div className="col-md-6 divRight">
                         <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.addCommonSpaceBeds}>Add beds</button>
                        </div>
                      </div>
                  <hr/>    

                  <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
                  <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
                  </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4 paddingNone">
          <img className="becomehost__info" src="../images/becomehost-step3-info.jpg" alt=""/>
          </div>
          </div>
          </div>
        }

        {
          this.state.step === this.STEP.STEP4 &&
  
          <div className="becomehost-4 container">
          <div className="row">
              <div className="col-md-7 col-lg-7 col-sm-7 col-md-offset-1 col-lg-offset-1 col-sm-offset-1 Step-4">
              <img className="becomehost__step-2" src="../images/becomehost-step4-step.png" alt=""/> 

             <div>
              <p className={this.state.roomstuff_Essentials ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});}}></p>
              <div className="divinput">
                <p>Essentials</p>
                <p>Towels,bed sheets,soap,toilet paper,and pillows</p>
              </div>
            </div>

            <div>
              <p className={this.state.roomstuff_Shampoo ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_Shampoo ==0 )this.setState({roomstuff_Shampoo:1});else this.setState({roomstuff_Shampoo:0});}}></p>
              <p className="divinput">Shampoo</p> 
             
            </div>

            <div>
              <p className={this.state.roomstuff_Closet_drwers ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_Closet_drwers ==0 )this.setState({roomstuff_Closet_drwers:1});else this.setState({roomstuff_Closet_drwers:0});}}></p>
              <p className="divinput">Closet/drawers</p> 
            </div>

              <div>
              <p className={this.state.roomstuff_TV ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_TV ==0 )this.setState({roomstuff_TV:1});else this.setState({roomstuff_TV:0});}}></p>
              <p className="divinput">TV</p>
            </div>


              <div>
              <p className={this.state.roomstuff_Heat ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_Heat ==0 )this.setState({roomstuff_Heat:1});else this.setState({roomstuff_Heat:0});}}></p>
              <p className="divinput">Heat</p>
            </div>


              <div>
              <p className={this.state.roomstuff_aircondition ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_aircondition ==0 )this.setState({roomstuff_aircondition:1});else this.setState({roomstuff_aircondition:0});}}></p>
              <p className="divinput">Air conditioning</p>
            </div>

              <div>
              <p className={this.state.roomstuff_breakfastcoffetea ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_breakfastcoffetea ==0 )this.setState({roomstuff_breakfastcoffetea:1});else this.setState({roomstuff_breakfastcoffetea:0});}}></p>
              <p className="divinput">Breakfast,coffe,tea</p>
              
            </div>

              <div>
              <p className={this.state.roomstuff_desk_workspace ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_desk_workspace ==0 )this.setState({roomstuff_desk_workspace:1});else this.setState({roomstuff_desk_workspace:0});}}></p>
              <p className="divinput">Desk/workspace</p>
            </div>

              <div>
              <p className={this.state.roomstuff_fireplace ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_fireplace ==0 )this.setState({roomstuff_fireplace:1});else this.setState({roomstuff_fireplace:0});}}></p>
              <p className="divinput">Fireplace</p>
              </div>

              <div>
              <p className={this.state.roomstuff_iron ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_iron ==0 )this.setState({roomstuff_iron:1});else this.setState({roomstuff_iron:0});}}></p>
              <p className="divinput">Iron</p>
            </div>

              <div>
              <p className={this.state.roomstuff_hairdryer ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_hairdryer ==0 )this.setState({roomstuff_hairdryer:1});else this.setState({roomstuff_hairdryer:0});}}></p>
              <p className="divinput">Hair dryer</p>
            </div>

              <div>
              <p className={this.state.roomstuff_petsinhouse ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_petsinhouse ==0 )this.setState({roomstuff_petsinhouse:1});else this.setState({roomstuff_petsinhouse:0});}}></p>
              <p className="divinput">Pets in the house</p>
            </div>
              <div>
              <p className={this.state.roomstuff_private_entrance ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_private_entrance ==0 )this.setState({roomstuff_private_entrance:1});else this.setState({roomstuff_private_entrance:0});}}></p>
              <p className="divinput">Private entrance</p>
            </div>

            <h1>Safety amenities</h1>
             <div>
              <p className={this.state.roomstuff_smartpincode ==1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_smartpincode ==0 )this.setState({roomstuff_smartpincode:1});else this.setState({roomstuff_smartpincode:0,roomstuff_smartpincode_password:'',roomstuff_smartpincode_confirmpassword :''});}}></p>
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
              <p className={this.state.roomstuff_smoke_detector == 1 ? 'Pinput glyphicon glyphicon-ok' : 'Pinput'}  onClick={(e) => {if(this.state.roomstuff_smoke_detector ==0 )this.setState({roomstuff_smoke_detector:1});else this.setState({roomstuff_smoke_detector:0});}}></p>
              <p className="divinput">Smoke detector</p>
            </div>


              <img src="../images/becomehost-step4-content.png" alt=""/>
              <button className="btn btn-default btn-lg bg-pink color-white Left" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white Right" onClick={this.nextStep}>Next</button>
              </div>
             <div className="col-md-4 col-lg-4 col-sm-4 paddingNone">
             <img className="becomehost__info" src="../images/becomehost-step4-info.jpg" alt=""/>
             </div>
          </div>
          </div>
        }
         {
          this.state.step === this.STEP.STEP5 &&

          <div className="becomehost-5 container">
          <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6 Step-5">
          <h1>Great process {this.state.user.user}!</h1>
          <h3 className="text-muted">Now let's get some details about your place so you can publish your listings </h3>
          <div className="change">
              <div>
                <p>Bedrooms,beds,amenities,and more</p>
                <p>change</p>
              </div>
              <span className="glyphicon glyphicon-ok"></span>
          </div>
          <img  className="becomehost__step-1" src="../images/step2.png" alt=""/>
          <h2>Set the sence</h2>
          <h4 className="color-pink">title</h4>
          <input className={this.state.roomdescription_title == '' ? 'btn btn-default btn-lg color-white formText pinkBorder' : 'btn btn-default btn-lg color-white formText'}   onChange={(e) => this.setState({roomdescription_title: e.target.value})} type="text" value={this.state.roomdescription_title}/>
          <h4 className="color-pink">PPS per day ?</h4>
          <input type="number" className="formText" onChange={(e) => this.setState({price_perday: e.target.value})}  value={this.state.price_perday}/>
          <h4 className="color-pink">description</h4>
          <textarea  className={this.state.roomdescription_description == '' ? 'color-white formText formText1 pinkBorder' : 'color-white formText formText1'} onChange={(e) => this.setState({roomdescription_description: e.target.value})}>{this.state.roomdescription_description}</textarea>
          <h4 className="color-pink">photos</h4>
          <input className="btn btn-default btn-lg bg-pink color-white Fileipt" type="file" onChange={this.fileChangedHandler}/>
            <div className="row">
                  {this.state.selectedPictures.map(file => (
                    <div className="col-md-3 col-lg-3 col-sm-3">
                    <img className="img-thumbnail" src={file.imagePreviewUrl} />
                    </div>
                    ))
                   }
             </div> 
            <button className="btn btn-default btn-lg bg-pink color-white subbtn Left" onClick={this.preStep}>Back</button>
            <button className="btn btn-default btn-lg bg-pink color-white subbtn Right" onClick={this.submit}>Submit</button>



          </div>
          <div className="col-md-6 col-lg-6 col-sm-6 paddingNone">
          <img className="becomehost-5__bg" src="../images/becomehost-step5-bg.png" alt=""/>
          <div className ="becomehost-5__preview">
          <img src="./images/becomehost-step5-preview.jpg" alt=""/>
          <div className="becomehost-5__preview-link">
          <span>Common room</span>
          <br/>
          <a href="./becomehost-preview.html" className="color-pink text-bold">
          Preview</a>
          </div>
          </div>
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
