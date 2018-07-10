import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import web3service from '../services/web3-service'
import languageService from '../services/language-service';
import HelpOne from './help-one';

const localeList = {
  "en_US": require('../locale/en_US.js'),
  "zh_CN": require('../locale/zh_CN.js'),
};

const customStyles = {
  content : {
    background            : 'none'
  }
};

class HelpReservation extends Component {

  constructor(props) {
    super(props)

    this.state={
      modalIsOpen:true,
      onHelp:false,
      languagelist:{},
      HelpOne:false,
    };

    web3service.loadWallet();

  }

  componentWillMount(){
    this.setState({ languagelist:window.languagelist });
  }

  HelpReservation(){
    this.setState({HelpOne:true});
    this.setState({onHelp:true});
  }

  render() {

        const language = this.state.languagelist;

    return (
      <div>
        <div className={this.props.HelpReservation ? "box2" : "box2 boxactive"}>
            <p onClick={(e)=>this.HelpReservation(e)}>Can I book on behalf of a friend or family member?</p>
            {language.aaaaaaa}
            <p>Can I view a listing before I book?</p>
            <p>How much time does a host have to respond to my reservation request?</p>
            <p>How do I submit a reservation request?</p>
            <p>What happens if my reservation request is declined or expires?</p>
            <p>When am I charged for a reservation?</p>
            <p>Should I book if I have not heard back from the host?</p>
        </div>
        {this.state.onHelp &&
          <div className="modal fade qrcod-modal show" id="HelpModal" tabindex="-1" role="dialog" aria-labelledby="wechatModalLabel">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                        <span aria-hidden="true" data-dismiss="modal" aria-label="Close">×</span>
                        <h4>PopulStay Help</h4>
                        <p className="return"></p>
                      </div>
                      <HelpOne HelpOne={this.state.HelpOne} />
                      <div className="modal-footer">
                        <button>Visit Help Center</button>
                        <p>Give Feedback</p>
                      </div>
                  </div>
              </div>
          </div>
        }
      </div>                     
    )
  }
}

export default HelpReservation