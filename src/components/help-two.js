import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import web3service from '../services/web3-service'
import languageService from '../services/language-service';

class HelpTwo extends Component {

  constructor(props) {
    super(props)

    this.state={
  
    };

    web3service.loadWallet();

  }

  componentWillMount(){
    this.setState({ languagelist:window.languagelist });
        
  }


  render() {

        const language = this.state.languagelist;

    return (
      <div>
        {this.props.HelpDetailNUM == 2 &&
            <div className="HelpTwo">
              <h4>Can I book on behalf of a friend or family member?</h4>
              <p>Transparency and trust are vital to the PopulStay experience. People rely on information in Airbnb profiles, reviews, and other</p> 
            </div>
        }
      </div>
    )
  }
}

export default HelpTwo
