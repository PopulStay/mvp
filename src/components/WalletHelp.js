import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import web3service from '../services/web3-service'
import languageService from '../services/language-service';
import HelpReservation from './Help-Reservation'


const localeList = {
  "en_US": require('../locale/en_US.js'),
  "zh_CN": require('../locale/zh_CN.js'),
};

const customStyles = {
  content : {
    background            : 'none'
  }
};

class WalletHelp extends Component {

  constructor(props) {
    super(props)

    this.state={
      modalIsOpen:true,
      languagelist:{},
    };

    web3service.loadWallet();

  }

  componentWillMount(){
    this.setState({ languagelist:window.languagelist });
        
  }

  render() {

        const language = this.state.languagelist;

    return (
      <div className="Help">
          <a data-toggle="modal" data-target="#HelpModal">{language.Help}</a>


          <div className="modal fade qrcod-modal" id="HelpModal" tabindex="-1" role="dialog" aria-labelledby="wechatModalLabel">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                        <span aria-hidden="true" data-dismiss="modal" aria-label="Close">×</span>
                        <h4>PopulStay Help</h4>
                      </div>
                      <div className="modal-body">
                        <div className="box1">
                            <span className="glyphicon glyphicon-search"></span>
                            <input placeholder="Ask question or search by key words " />
                        </div>

                        <h4>SUGGESTED TOPICS</h4>

                        <ul>
                            <li onClick={(e) => {if(this.state.HelpReservation)this.setState({HelpReservation:false});else this.setState({HelpReservation:true});}}>Reservation requests <span>▼</span></li>
                            {this.state.HelpReservation &&
                              <HelpReservation />
                            }
                            <li>Contacting hosts<span>▼</span></li>
                            <li>Prices & fees<span>▼</span></li>
                            <li>Preparing for your trip<span>▼</span></li>
                            <li>Changes & cancellations<span>▼</span></li>
                            <li>Resolve a problem<span>▼</span></li>
                        </ul>

                      </div>
                      <div className="modal-footer">
                        <button>Visit Help Center</button>
                        <p>Give Feedback</p>
                      </div>
                  </div>
              </div>
          </div>        
      </div> 

    )
  }
}

export default WalletHelp