import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '30%'
  }
};


class WalletGas extends React.Component {
  constructor() {
    super();

    this.state = {
      infoModalIsOpen:false,
      gas:null
    };

    this.openInfoModal = this.openInfoModal.bind(this);
    this.afterOpenInfoModal = this.afterOpenInfoModal.bind(this);
    this.closeInfoModal = this.closeInfoModal.bind(this);

  }

  openInfoModal() {
    this.setState({infoModalIsOpen: true});
  }

  afterOpenInfoModal() {
    this.subtitle.style.color = '#f00';
  }

  closeInfoModal() {
    this.setState({infoModalIsOpen: false});
  }

  render() {
    return (

    <div>

        <button className="btn btn-primary" onClick={this.openInfoModal}>Gas</button>
        <Modal isOpen={this.state.infoModalIsOpen} onAfterOpen={this.afterOpenInfoModal} onRequestClose={this.closeInfoModal} style={customStyles} 
        contentLabel="InfoModal">
        <div className="Gas">
          <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
          <div className="form-group">
            <label>Gas Price</label>
            <input type="text"  className="form-control" placeholder="Wallet Account" onChange={(e) => this.setState({gas: e.target.value})} />
          </div>
          <button className="btn btn-danger Left" onClick={this.closeInfoModal}>OK</button>
          <button className="btn btn-primary Right" onClick={this.closeInfoModal}>Cancel</button>
        </div> 
        </Modal>
      

      </div>
    );
  }
}
export default WalletGas