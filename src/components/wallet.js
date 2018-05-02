import React, { Component } from 'react';
import Web3 from 'web3';
import Create from './walletCreate';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import web3service from '../services/web3-service'

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '30%'
  }
};
class Wallet extends Component {

  constructor(props) {
    super(props)

    this.state={
      address:""
    };

    
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.import = this.import.bind(this);
    web3service.loadWallet();

  }

  import(){

   
   
      var obj=window.web3.eth.accounts.wallet.add(this.state.pirvatekey);
      window.address          = obj.address;
      window.addressShow      = obj.address.substring(0,10)+"...";
      window.privateKey       = this.state.pirvatekey;
       reactLocalStorage.setObject('wallet', 
      {'address': window.address,
      'privateKey': window.privateKey,
      'addressshow': window.addressshow});
       this.closeModal();

  }
  openModal() {
    if(window.address)
    {
       this.openInfoModal();
       return;
    }
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  



  componentDidMount() {
  }

  render() {

    return (
      <div>
            <div className="dropdown">
              <button className="button__outline" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Create Or Import Wallet<span>▼</span>
              </button>            
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  
                <a className="dropdown-item dropdown-item1" href="#" onClick={this.create}><Create/></a>
                <a className="dropdown-item" href="#" onClick={this.openModal}>Import</a>
         
              </div>
            </div>


       <div>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Example Modal">
          <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
          <br/>
            <div className="form-group">
            <label>Private Key</label>
            <input type="text"  className="form-control" placeholder="Wallet Account" onChange={(e) => this.setState({pirvatekey: e.target.value})} />
          </div>
          <br/>
          <button className="btn btn-danger" onClick={this.import}>Import</button>
          <button className="btn btn-primary" onClick={this.closeModal}>Cancel</button>
        </Modal>





      </div>
     </div> 

    )
  }
}

export default Wallet