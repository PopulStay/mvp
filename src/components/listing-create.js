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
            PROCESSING: 5,
            SUCCESS: 6
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

            user: {}
        }

        this.nextStep = this.nextStep.bind(this);
        this.preStep  = this.preStep.bind(this)
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

        // this.setState({
        //     step: this.STEP.METAMASK
        // });

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
                      <select className="form-control" onChange={(e) => this.setState({guestsnumber: e.target.value})}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                  </div>

                   <div className="col-md-12 form-group">
                      <label>How many bedrooms can guests have*</label>
                      <select className="form-control" onChange={(e) => this.setState({guestsnumber: e.target.value})}>
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
                      <select className="form-control" onChange={(e) => this.setState({guestsnumber: e.target.value})}>
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
                         <h3 className="text-muted">Common space 0 beds</h3>
                        </div>

                        <div className="col-md-6">
                         <button className="btn btn-default btn-lg bg-pink color-white">Add beds</button>
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
      </div>
    )
  }
}

export default ListingCreate
