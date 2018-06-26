import React, { Component } from 'react';
import Web3 from 'web3';
import Modal from 'react-modal';
import web3service from '../services/web3-service'

const localeList = {
  "en_US": require('../locale/en_US.js'),
  "zh_CN": require('../locale/zh_CN.js'),
};

class Wallet extends Component {

  constructor(props) {
    super(props)

    this.state={
     
    };

    web3service.loadWallet();

  }

  componentWillMount(){
        
  }

  render() {

        const language = this.state.languagelist;

    return (
      <div>

      </div> 

    )
  }
}

export default Wallet