import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GuestInfo from './guest-info.js';
import HostInfo from './host-info.js';
import web3service from '../services/web3-service';
import WalletClear from './walletClear';
import Wallet from './wallet';
import WalletManage from './walletManage';
import WalletGas from './walletGas';

class ManagementPanel extends Component {

  constructor(props) {
    super(props);
    web3service.loadWallet();
  }

  render() {

    return (

      <div>

      

      <GuestInfo/>
      <HostInfo/>

      </div>


    )
  }
}

export default ManagementPanel
