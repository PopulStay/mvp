import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import web3service from '../services/web3-service'
import languageService from '../services/language-service';


class HelpContacting extends Component {

  constructor(props) {
    super(props)

    this.state={
      languagelist:{},
      HelpContacting:true,
    };

    web3service.loadWallet();

  }

  componentWillMount(){
    this.setState({ languagelist:window.languagelist });
  }

  HelpContacting(obj){
    this.props.onHelp(true,obj)
  }

  render() {

        const language = this.state.languagelist;

    return (
        <div className={this.props.HelpContacting&&this.state.HelpContacting ? "box2" : "box2 boxactive"}>
            <p onClick={(e)=>this.HelpContacting(2)}>Can I view a listing before I book?</p>
            <p onClick={(e)=>this.HelpContacting(10)}>How do I view and send messages?</p>
            <p onClick={(e)=>this.HelpContacting(11)}>Can hosts ask guests to sign a contract?</p>
            <p onClick={(e)=>this.HelpContacting(12)}>How do I book a place on PopulStay?</p>
            <p onClick={(e)=>this.HelpContacting(13)}>Should I book if I have not heard back from the host?</p>
            <p onClick={(e)=>this.HelpContacting(14)}>What is a Superhost?</p>
            <p onClick={(e)=>this.HelpContacting(15)}>How do I contact a host before booking a reservation?</p>
            <p onClick={(e)=>this.HelpContacting(16)}>What does each reservation status mean?</p>
        </div>
    )
  }
}

export default HelpContacting