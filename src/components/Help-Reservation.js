import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import web3service from '../services/web3-service'
import languageService from '../services/language-service';

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
      onHelp:true,
      languagelist:{},
      HelpReservationone:false,
    };

    web3service.loadWallet();

  }

  componentWillMount(){
    this.setState({ languagelist:window.languagelist });
  }

  HelpReservation(){
    this.setState({HelpReservationone:true});
    this.setState({onHelp:false});
    this.props.onHelp(false);
  }

  render() {

        const language = this.state.languagelist;

    return (
      <div>
        <div className={this.props.HelpReservation || !this.state.onHelp ? "box2 boxactive" : "box2"}>
            <p onClick={(e)=>this.HelpReservation(e)}>Can I book on behalf of a friend or family member?</p>
            <p>Can I view a listing before I book?</p>
            <p>How much time does a host have to respond to my reservation request?</p>
            <p>How do I submit a reservation request?</p>
            <p>What happens if my reservation request is declined or expires?</p>
            <p>When am I charged for a reservation?</p>
            <p>Should I book if I have not heard back from the host?</p>
        </div>
        {this.state.HelpReservationone &&
          <div className="modal-body">123</div>
        }
      </div>                     
    )
  }
}

export default HelpReservation