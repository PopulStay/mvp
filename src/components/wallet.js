import React, { Component } from 'react';
import Web3 from 'web3';
import Create from './walletCreate';
import WalletManage from './walletManage';
import WalletClear from './walletClear';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
const alertify = require('../../node_modules/alertify/src/alertify.js');
var web_provider = process.env.WEB3_PROVIDER;

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
      address:"",
      infoModalIsOpen:false

    };
    if(!window.web3loaded)
    {
      window.web3 = new Web3( new Web3.providers.HttpProvider(web_provider));
      window.web3loaded = true;
    }
    
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openInfoModal = this.openInfoModal.bind(this);
    this.afterOpenInfoModal = this.afterOpenInfoModal.bind(this);
    this.closeInfoModal = this.closeInfoModal.bind(this);
    this.import = this.import.bind(this);


    var obj =reactLocalStorage.getObject('wallet');
    if(obj && obj.address && obj.privateKey)
    {
        window.address = obj.address;
        window.privateKey = obj.privateKey;
        window.addressshow = obj.address.substring(0,10)+"...";
    }

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




  openInfoModal() {
    this.setState({infoModalIsOpen: true});
  }

  afterOpenInfoModal() {
    this.subtitle.style.color = '#f00';
  }

  closeInfoModal() {
    this.setState({infoModalIsOpen: false});
  }



  componentDidMount() {
  }

  render() {

    return (
      <div>
            <div className="dropdown">
              <button className="button__outline" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          My Wallet
              </button>            
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  
                <a className="dropdown-item" href="#" onClick={this.create}><Create/></a>
                <a className="dropdown-item" href="#" onClick={this.openModal}>Import</a>
                {
                  window.address && 

                    <div>
                    <a className="dropdown-item" href="#" ><WalletManage/></a>
                    <a className="dropdown-item" href="#"><WalletClear/></a>
                    <a className="dropdown-item" href="#">Gas price</a>
                    </div>
                }
         
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


        <Modal isOpen={this.state.infoModalIsOpen} onAfterOpen={this.afterOpenInfoModal} onRequestClose={this.closeInfoModal} style={customStyles} 
        contentLabel="InfoModal">
          <h2 ref={subtitle => this.subtitle = subtitle}>Please clear your account!</h2>
          <br/>
          <h3>Please clear your account , then you can create new account!</h3>
          <br/>
          <button className="btn btn-danger" onClick={this.closeInfoModal}>Close</button>
        </Modal>


      </div>
     </div> 

    )
  }
}

export default Wallet