import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import web3service from '../services/web3-service'
import languageService from '../services/language-service';


class HelpReservation extends Component {

  constructor(props) {
    super(props)

    this.state={
      languagelist:{},
      HelpReservation:true,
    };

    web3service.loadWallet();

  }

  componentWillMount(){
    this.setState({ languagelist:window.languagelist });
  }

  HelpReservation(obj){
    this.props.onHelp(true,obj)
  }

  render() {

        const language = this.state.languagelist;

    return (
        <div className={this.props.HelpReservation&&this.state.HelpReservation ? "box2" : "box2 boxactive"}>
            <p onClick={(e)=>this.HelpReservation(1)}>Can I book on behalf of a friend or family member?</p>
            <p onClick={(e)=>this.HelpReservation(2)}>Can I view a listing before I book?</p>
            <p onClick={(e)=>this.HelpReservation(3)}>How much time does a host have to respond to my reservation request?</p>
            <p onClick={(e)=>this.HelpReservation(4)}>How do I submit a reservation request?</p>
            <p onClick={(e)=>this.HelpReservation(5)}>What happens if my reservation request is declined or expires?</p>
            <p onClick={(e)=>this.HelpReservation(6)}>When am I charged for a reservation?</p>
            <p onClick={(e)=>this.HelpReservation(7)}>Should I book if I have not heard back from the host?</p>
            <p onClick={(e)=>this.HelpReservation(8)}>I'm a guest. How do I check the status of my reservation?</p>
        </div>
    )
  }
}

export default HelpReservation