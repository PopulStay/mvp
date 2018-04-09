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
            roomtype_category:"",
            roomtype_guests:0,
            roomtype_location:"",
            roomdescription_homeorhotel:"",
            roomdescription_type:"",
            roomdescription_guests_have:"",
            roomdescription_forguestorhost:0,
            roombasics_guestsnumber:1,
            roombasics_guestbedrooms:1,
            roombasics_totalguests:1,
            roombasics_commonspacebeds:1,
            roomstuff_Essentials:0,
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
            user: {}
        }

        this.nextStep = this.nextStep.bind(this);
        this.preStep  = this.preStep.bind(this)
        this.addCommonSpaceBeds = this.addCommonSpaceBeds.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.submit = this.submit.bind(this);
    }

    submit(){
      
       //console.log(this.state);

       houselistingService.submitListing(this.state);
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
        this.setState({step:this.STEP.STEP2});
        console.log(this.state);
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
        this.setState({step:this.STEP.STEP5});
        console.log(this.state);
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

    }

  

    componentWillMount() {
        this.setState({step:this.STEP.STEP1});
        window.web3.eth.getAccounts((error, accounts) => {
            this.setState({
                account: accounts[0],
                id: accounts[0]
            });

            hostService.getHostInfo(accounts[0]).then((data) => {
                this.setState({
                    user: data
                });
            });

        });
    }

    onSubmitListing(formListing) {


        houselistingService.submitListing(formListing)
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

  render() {

    return (
      <div className="becomehost-1 container">
        <br/><br/>
        { this.state.step === this.STEP.STEP1 &&

            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-6">
              <img className="becomehost__step-1" src="../images/becomehost-step.png" alt=""/>
                  <h1>Hi,{this.state.user.user}!,Let's get started listing your space</h1>

                  <h2>What's kind of place do you have?</h2>

                  <div className="row">
                  <div className="col-md-6 form-group">
                      <label>Category*</label>
                      <select className="form-control" onChange={(e) => this.setState({roomtype_category: e.target.value})}>
                        <option>Entire Place</option>
                        <option>Private Room</option>
                        <option>Share Room</option>
                      </select>
                  </div>


                  <div className="col-md-6 form-group">
                      <label>Guests*</label>
                      <select className="form-control" onChange={(e) => this.setState({roomtype_guests: e.target.value})}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                  </div>
                  </div>


                  <div className="form-group">
                    <label>Location*</label>
                    <input type="text" className="form-control" onChange={(e) => this.setState({roomtype_location: e.target.value})} />
                  </div>

                  <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.nextStep}>Continue</button>
                  <br/><br/>
                  <img src="../images/becomehost-step1-hint.jpg" alt=""/>



              </div>


               <div className="col-md-6 col-lg-6 col-sm-6">
                  <img className="becomehost-1__bg" src="../images/becomehost-step1-bg.png" alt=""/>
                </div>
            
            
          </div>
        }

        {
          this.state.step === this.STEP.STEP2 &&
          <div className="becomehost-2 container">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-8">
            <img className="becomehost__step-2" src="./images/becomehost-step2-step.png" alt=""/> 

              <h1>What kind of room do you listing?</h1>
              <h2>Is this listing a home,hotel, or something else? </h2>

              <div className="form-group">    
                <input type="text" className="form-control" onChange={(e) => this.setState({roomdescription_homeorhotel: e.target.value})} />
              </div>
               <br/>

               <h2>What type is it? </h2>

              <div className="form-group">    
                <input type="text" className="form-control" onChange={(e) => this.setState({roomdescription_type: e.target.value})} />
              </div>
               <br/>

               <h2>What guests will have? </h2>

              <div className="form-group">    
                <input type="text" className="form-control" onChange={(e) => this.setState({roomdescription_guests_have: e.target.value})} />
              </div>

               <h2>Is this setup dedicated a guest space?</h2>
               <br/>

               <div className="radio">
                  <h2 className="text-muted"><input className="bg-pink color-white" type="radio"  name="optradio" value="0" onChange={(e) => this.setState({roomdescription_forguestorhost: e.target.value})}/>Yes,it's primarily set up for guests</h2>
                </div>
                <div className="radio">
                  <h2 className="text-muted"><input className="bg-pink color-white" type="radio" name="optradio" value="1" onChange={(e) => this.setState({roomdescription_forguestorhost: e.target.value})}/>No,I keep my personal belongings here</h2>
                </div>

              <br/><br/>
              <hr/>

             
          
            <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.preStep}>Back</button>
          
            <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.nextStep}>Next</button>
             
             </div>
             
             <div className="col-md-4 col-lg-4 col-sm-4">
             <img className="becomehost__info" src="./images/becomehost-step2-info.jpg" alt=""/>
             </div>
             </div>
             </div>

        }

         {
          this.state.step === this.STEP.STEP3 &&
          <div className="becomehost-3 container">
          <div className="row">
          <div className="col-md-8 col-lg-8 col-sm-8">
          <img className="becomehost__step-2" src="../images/becomehost-step3-step.png" alt=""/> 

               <div className="col-md-6 form-group">
                      <label>Number of guests*</label>
                      <select className="form-control" onChange={(e) => this.setState({roombasics_guestsnumber: e.target.value})}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                  </div>

                   <div className="col-md-12 form-group">
                      <label>How many bedrooms can guests have*</label>
                      <select className="form-control" onChange={(e) => this.setState({roombasics_guestbedrooms: e.target.value})}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                  </div>

                  

                  <div className="col-md-12 form-group">
                  <h3>How many beds can guests have*</h3>
                  <div className="row">
                     <div className="col-md-6">
                      <label>Total of guests*</label>
                      <select className="form-control" onChange={(e) => this.setState({roombasics_totalguests: e.target.value})}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                      </div>
                  </div>
                  

                  <h3 className="text-muted">Sleeping arrangment</h3>
                  <hr/>
                      <div className="row">
                        <div className="col-md-6">
                         <h3 className="text-muted">Common space {this.state.roombasics_commonspacebeds} beds</h3>
                        </div>

                        <div className="col-md-6">
                         <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.addCommonSpaceBeds}>Add beds</button>
                        </div>
                      </div>
                  <hr/>    

                  <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.preStep}>Back</button>
                  <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.nextStep}>Next</button>
                  </div>
          </div>
          <div className="col-md-4 col-lg-4 col-sm-4">
          <img className="becomehost__info" src="../images/becomehost-step3-info.jpg" alt=""/>
          </div>
          </div>
          </div>
        }

        {
          this.state.step === this.STEP.STEP4 &&
  
          <div className="becomehost-4 container">
          <div className="row">
              <div className="col-md-7 col-lg-7 col-sm-7 col-md-offset-1 col-lg-offset-1 col-sm-offset-1">
              <img className="becomehost__step-2" src="../images/becomehost-step4-step.png" alt=""/> 

             <div>
              <label><input type="checkbox"  onChange={(e) => {if(this.state.roomstuff_Essentials ==0 )this.setState({roomstuff_Essentials:1});else this.setState({roomstuff_Essentials:0});  }}/>Essentials</label>
              <p>Towels,bed sheets,soap,toilet paper,and pillows</p>
            </div>

              <div>
              <label><input type="checkbox"  onChange={(e) => {if(this.state.roomstuff_Shampoo ==0 )this.setState({roomstuff_Shampoo:1});else this.setState({roomstuff_Shampoo:0});  }}/>Shampoo</label>  
             
            </div>

            <div>
              <label><input type="checkbox"  onChange={(e) => {if(this.state.roomstuff_Closet_drwers ==0 )this.setState({roomstuff_Closet_drwers:1});else this.setState({roomstuff_Closet_drwers:0});  }}/>Closet/drawers</label>
            </div>

              <div>
              <label><input type="checkbox"  onChange={(e) => {if(this.state.roomstuff_TV ==0 )this.setState({roomstuff_TV:1});else this.setState({roomstuff_TV:0});  }}/>TV</label>
            </div>


              <div>
              <label><input type="checkbox"  onChange={(e) => {if(this.state.roomstuff_Heat ==0 )this.setState({roomstuff_Heat:1});else this.setState({roomstuff_Heat:0});  }}/>Heat</label>
            </div>


              <div>
              <label><input type="checkbox"  onChange={(e) => {if(this.state.roomstuff_aircondition ==0 )this.setState({roomstuff_aircondition:1});else this.setState({roomstuff_aircondition:0});  }}/>Air conditioning</label>
            </div>

              <div>
              <label><input type="checkbox"  onChange={(e) => {if(this.state.roomstuff_breakfastcoffetea ==0 )this.setState({roomstuff_breakfastcoffetea:1});else this.setState({roomstuff_breakfastcoffetea:0});  }}/>Breakfast,coffe,tea</label>
              
            </div>

              <div>
              <label><input type="checkbox"  onChange={(e) => {if(this.state.roomstuff_desk_workspace ==0 )this.setState({roomstuff_desk_workspace:1});else this.setState({roomstuff_desk_workspace:0});  }}/>Desk/workspace</label>
            </div>

              <div>
              <label><input type="checkbox"  onChange={(e) => {if(this.state.roomstuff_fireplace ==0 )this.setState({roomstuff_fireplace:1});else this.setState({roomstuff_fireplace:0});  }}/>Fireplace</label>
              </div>

              <div>
              <label><input type="checkbox" onChange={(e) => {if(this.state.roomstuff_iron ==0 )this.setState({roomstuff_iron:1});else this.setState({roomstuff_iron:0});  }}/>Iron</label>
            </div>

              <div>
              <label><input type="checkbox" onChange={(e) => {if(this.state.roomstuff_hairdryer ==0 )this.setState({roomstuff_hairdryer:1});else this.setState({roomstuff_hairdryer:0});  }}/>Hair dryer</label>
            </div>

              <div>

              <label><input type="checkbox" onChange={(e) => {if(this.state.roomstuff_petsinhouse ==0 )this.setState({roomstuff_petsinhouse:1});else this.setState({roomstuff_petsinhouse:0});  }}/>Pets in the house</label>
             
            </div>
              <div>
              <label><input type="checkbox" onChange={(e) => {if(this.state.roomstuff_private_entrance ==0 )this.setState({roomstuff_private_entrance:1});else this.setState({roomstuff_private_entrance:0});  }}/>Private entrance</label>
            </div>

            <h1>Safety amenities</h1>
             <div>
              <label><input type="checkbox"  onChange={(e) => {if(this.state.roomstuff_smartpincode ==0 )this.setState({roomstuff_smartpincode:1});else this.setState({roomstuff_smartpincode:0});  }}/>Smart pin code</label>
              <hr/>
              <div className="control-group">
              <label className="control-label">Insert Your Password{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</label>
              <input type="password" className="controls" onChange={(e) => this.setState({roomstuff_smartpincode_password: e.target.value})} />
              </div>

              <div className="control-group">
               <label className="control-label">ConFirm Your Password{'\u00A0'}{'\u00A0'}</label>
               <input type="password" className="controls" onChange={(e) => this.setState({roomstuff_smartpincode_confirmpassword: e.target.value})} />
             </div>
              <hr/>
            </div>

            <div>
              <label><input type="checkbox" onChange={(e) => {if(this.state.roomstuff_smoke_detector ==0 )this.setState({roomstuff_smoke_detector:1});else this.setState({roomstuff_smoke_detector:0});  }}/>Smoke detector</label>
            </div>
            <hr/>


              <img src="../images/becomehost-step4-content.png" alt=""/>
              <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.preStep}>Back</button>
              <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.nextStep}>Next</button>
              </div>
             <div className="col-md-4 col-lg-4 col-sm-4">
             <img className="becomehost__info" src="../images/becomehost-step4-info.jpg" alt=""/>
             </div>
          </div>
          </div>
        }
         {
          this.state.step === this.STEP.STEP5 &&

          <div className="becomehost-5 container">
          <div className="row">
          <div className="col-md-6 col-lg-6 col-sm-6">
          <h1>Great process {this.state.user.user}!</h1>
           <br/><br/>
          <h3 className="text-muted">Now let's get some details about your place so you can publish your listings </h3>
          
          <hr/>


          <h2>Set the sence</h2>
          <h4 className="color-pink">photos,short description,title</h4>
          <input className="btn btn-default btn-lg bg-pink color-white" type="file" onChange={this.fileChangedHandler}/>
            <br/><br/> <br/><br/>
            <div className="row">
            {this.state.selectedPictures.map(file => (
              <div className="col-md-3 col-lg-3 col-sm-3">
              <img className="img-thumbnail" src={file.imagePreviewUrl} />
              </div>
              ))
             }
             </div>
             <div className="row">
             <hr/>
             <h2>PPS per day ? </h2>
             <div className="form-group">    
                <input type="number" className="form-control" onChange={(e) => this.setState({price_perday: e.target.value})}/>
            </div>

            <button className="btn btn-default btn-lg bg-pink color-white" onClick={this.submit}>Submit</button>
            </div>



          </div>
          <div className="col-md-6 col-lg-6 col-sm-6">
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





      </div>
    )
  }
}

export default ListingCreate
