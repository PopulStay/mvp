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


class WalletDeposit extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      pirvatekey:""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deposit = this.deposit.bind(this);

  }
  deposit(){
   
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

  substring0x = (str) => {
    str = str +"";
    return str.substring(2,str.length);
  }


  render() {
    return (

    <div>

        <button className="btn btn-primary" onClick={this.openModal}>Deposit</button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="deposit">
            <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
            <br/>
              <h3>Address:{window.address}</h3>
              <h3>Private Key:{this.substring0x(window.privateKey)}</h3>
            <br/>
            <button className="btn btn-danger" onClick={this.deposit}>deposit</button>
            <button className="btn btn-primary" onClick={this.closeModal}>Cancel</button>
          </div>
        </Modal>
      

      </div>
    );
  }
}
export default WalletDeposit
