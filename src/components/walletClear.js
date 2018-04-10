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


class WalletClear extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      pirvatekey:""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.clear = this.clear.bind(this);

  }
  clear(){
   
      
      window.address          = null;
      window.addressShow      = null;
      window.privateKey       = null;
      reactLocalStorage.setObject('wallet', null);
      this.closeModal();

  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (

    <div>

        <a onClick={this.openModal}>Clear</a>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
          <br/>
            <h3>Address:{window.address}</h3>
            <h3>Private Key:{window.privateKey}</h3>
          <br/>
          <button className="btn btn-danger" onClick={this.clear}>Clear</button>
          <button className="btn btn-primary" onClick={this.closeModal}>Cancel</button>
        </Modal>
      

      </div>
    );
  }
}
export default WalletClear
