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
  
  <a href="../">
  <img className="header__logo" src="../images/logo.png" alt=""/>
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
{!props.hideTagHeader &&
  <div className="tag-header">
    <ul className="tag container">
    <li className="tag__item active"><span className="location-tag">New York</span></li>
    <li className="tag__item active"><span>4th - 8th March</span></li>
    <li className="tag__item active"><span>2 Adults</span></li>
    <li className="tag__item"><img src="./images/search-tag-icon.png" alt=""/> <span>Support PPS token</span></li>
    <li className="tag__item"><span>Home Type</span></li>
    <li className="tag__item"><span>Price</span></li>
    <li className="tag__item"><span>More Fiters</span></li>
    </ul>
  </div>
}
  </div>



  )
}

export default NavBar
export { NetworkCheck }
