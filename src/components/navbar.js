import React from 'react';
import { Link } from 'react-router-dom';
import Overlay from './overlay';
import PropTypes from 'prop-types';
import GuestRegister from './guest-register';


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
    <nav className="navbar">
      <div className="container">
        <Link to="/">
          <div className="logo-container">
            <img src="/images/logo_white.svg" height="130" alt="PopulStay" />
          </div>
        </Link>
        <NetworkCheck />
        <div className="float-right">
          <div className="userInfo">
            <GuestRegister/>
          </div>
          {!props.hideCreateButton &&
            <div className="navbar-create">
              <Link to="/create">
                <button>
                  Create Listing
                </button>
              </Link>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}

export default NavBar
export { NetworkCheck }
