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

class HelpOne extends Component {

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
        {this.props.HelpOne &&
            <div className="modal-body">
              <h4>Can I book on behalf of a friend or family member?</h4>
            </div>
        }
      </div>
    )
  }
}

export default HelpOne