import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '30%'
  }
};


class WalletManage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      pirvatekey:""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.import = this.import.bind(this);

  }
  import(){
    // console.log("pirvatekey:",this.state.pirvatekey);
    //   var obj=window.web3.eth.accounts.wallet.add(this.state.pirvatekey);
    //   window.address          = obj.address;
    //   window.addressShow      = window.address.substring(0,10)+"...";
    //   window.privateKey       = this.state.pirvatekey;
    // this.closeModal();

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

        <button className="btn btn-danger" onClick={this.openModal}>Export</button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
          <br/>
            <h3>Address:{window.address}</h3>
            <h3>Private Key:{window.privateKey}</h3>
          <br/>
       
          <button className="btn btn-primary" onClick={this.closeModal}>Cancel</button>
        </Modal>
      

      </div>
    );
  }
}
export default WalletManage
