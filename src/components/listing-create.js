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
            METAMASK: 3,
            PROCESSING: 4,
            SUCCESS: 5
        }

        this.state = {
            step: 0,
            category:"",
            beds:0,
            location:"",
            user: {}
        }

        this.finishStep1 = this.finishStep1.bind(this)
    }

    finishStep1() {
      this.setState({step:this.STEP.STEP2});

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

        this.setState({
            step: this.STEP.METAMASK
        });

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
                      <select className="form-control" onChange={(e) => this.setState({category: e.target.value})}>
                        <option>Entire Place</option>
                        <option>Private Room</option>
                        <option>Share Room</option>
                      </select>
                  </div>


                  <div className="col-md-6 form-group">
                      <label>Beds*</label>
                      <select className="form-control" onChange={(e) => this.setState({beds: e.target.value})}>
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
                    <input type="text" className="form-control" onChange={(e) => this.setState({location: e.target.value})} />
                  </div>

                  <a className="btn btn-default btn-lg bg-pink color-white" onClick={this.finishStep1} href="">Continue</a>

                  <img src="../images/becomehost-step1-hint.jpg" alt=""/>



              </div>


               <div className="col-md-6 col-lg-6 col-sm-6">
                  <img className="becomehost-1__bg" src="../images/becomehost-step1-bg.png" alt=""/>
                </div>
            
            
          </div>
        }

        {
          this.state.step === this.STEP.STEP2 &&
          <h2>Hello world</h2>

        }
      </div>
    )
  }
}

export default ListingCreate
