import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import web3service from '../services/web3-service'
import languageService from '../services/language-service';
import HelpReservation from './Help-Reservation'
import ReservationRequests from './Reservation-requests';



class WalletHelp extends Component {

  constructor(props) {
    super(props)

    this.state={
      modalIsOpen:true,
      languagelist:{},
      HelpDetail:false,
    };

    web3service.loadWallet();

  }

  componentWillMount(){
    this.setState({ languagelist:window.languagelist });
        
  }

  onHelp = (objone,objtwo) =>{
    this.setState({ HelpDetail:objone,HelpDetailNUM: objtwo});
  }

  render() {

        const language = this.state.languagelist;

    return (
      <div className="Help">
          <a data-toggle="modal" data-target="#HelpModal1">{language.Help}</a>

          <div className="modal fade qrcod-modal" id="HelpModal" tabindex="-1" role="dialog" aria-labelledby="wechatModalLabel">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                        <span onClick={(e)=>this.setState({HelpReservation:false})} aria-hidden="true" data-dismiss="modal" aria-label="Close">×</span>
                        <h4>PopulStay Help</h4>
                        {this.state.HelpDetail &&
                          <p onClick={(e)=>this.setState({HelpDetail:false})} className="return"></p>
                        }
                      </div>

                      {!this.state.HelpDetail &&
                        <div className="modal-body">
                          <div className="box1">
                              <span className="glyphicon glyphicon-search"></span>
                              <input placeholder="Ask question or search by key words " />
                          </div>

                          <h4>SUGGESTED TOPICS</h4>

                          <ul className="helpList">
                              <li onClick={(e) => {if(this.state.HelpReservation)this.setState({HelpReservation:false});else this.setState({HelpReservation:true});}}>Reservation requests <span>▼</span></li>
                                <HelpReservation HelpReservation={this.state.HelpReservation} onHelp={this.onHelp} />
                              <li>Contacting hosts<span>▼</span></li>
                              <li>Prices & fees<span>▼</span></li>
                              <li>Preparing for your trip<span>▼</span></li>
                              <li>Changes & cancellations<span>▼</span></li>
                              <li>Resolve a problem<span>▼</span></li>
                          </ul>
                        </div>
                      }

                      {this.state.HelpDetail &&
                        <div className="modal-body">
                          <ReservationRequests HelpDetailNUM={this.state.HelpDetailNUM} />
                        </div>
                      }

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