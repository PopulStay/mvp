import React from 'react';
import { Link } from 'react-router-dom';
import Overlay from './overlay';
import PropTypes from 'prop-types';
import GuestRegister from './guest-register';
import HostRegister from './host-register';

import '../css/main.css'
import '../css/search.css'

function NetworkCheck(props, context) {
  const web3Context = context.web3
  const networkNames = {
    1: "Main",
    2: "Morden",
    3: "Ropsten",
    4: "Rinkeby",
    42: "Kovan"
  }
  const supportedNetworkIds = [3, 4]
  const currentNetworkId = parseInt(web3Context.networkId, 10)
  const currentNetworkName = (networkNames[currentNetworkId] ?
    networkNames[currentNetworkId] : currentNetworkId)
  if (currentNetworkId &&
    (window.location.hostname === "demo.originprotocol.com") &&
    (supportedNetworkIds.indexOf(currentNetworkId) < 0)) {
    return (
      <Overlay imageUrl="/images/flat_cross_icon.svg">
        MetaMask should be on <strong>Rinkeby</strong> Network<br />
        Currently on {currentNetworkName}.
      </Overlay>
    )
  }
  else return null
}

NetworkCheck.contextTypes = {
  web3: PropTypes.object
}

const NavBar = (props) => {
  return (

  <div>
  <header className="header header__white">
  
  <a href="./">
  <img className="header__logo" src="./images/logo.png" alt=""/>
  </a>
  
  <nav className="nav navbar-nav navbar-right">
  <ul>
  <li><HostRegister/></li>
  <li><a href="">Help</a></li>
  <li><a href="">Login</a></li>
  <li><GuestRegister/></li>
  
  </ul>
  </nav>
  </header>
  </div>



  )
}

export default NavBar
export { NetworkCheck }
