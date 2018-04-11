import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GuestInfo from './guest-info.js';
import HostInfo from './host-info.js';

class ManagementPanel extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div>
      <GuestInfo/>
      <br/><br/><br/><br/><br/><br/>
      <HostInfo/>
      </div>


    )
  }
}

export default ManagementPanel
