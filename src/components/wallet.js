import React, { Component } from 'react';
import Web3 from 'web3';
import Create from './walletCreate';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import web3service from '../services/web3-service'
import WalletClear from './walletClear';

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
      modalIsOpen:false,
      infoModalIsOpen:false,
      clearModalIsOpen:false
    };

    
    // this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    // this.closeModal = this.closeModal.bind(this);
    // this.import = this.import.bind(this);
    web3service.loadWallet();

  }

  import=()=>{
      var obj=window.web3.eth.accounts.wallet.add( "0x" + this.state.pirvatekey );
      window.address          = obj.address;
      window.addressShow      = obj.address.substring(0,10)+"...";
      window.privateKey       = "0x" + this.state.pirvatekey;
       reactLocalStorage.setObject('wallet', 
      {'address': window.address,
      'privateKey': window.privateKey,
      'addressshow': window.addressshow});

      this.closeModal();
      this.props.onAccountChange(obj.address);

  }

  clear =()=>{
      window.address          = null;
      window.addressShow      = null;
      window.privateKey       = null;
      reactLocalStorage.setObject('wallet', null);
      this.closeClearInfoModal();
      this.props.onAccountChange("");

  }

  openModal=()=>{
    if(window.address)
    {
       this.openInfoModal();
       return;
    }
    this.setState({modalIsOpen: true});
  }

  afterOpenModal=()=> {
    this.subtitle.style.color = '#f00';
  }

  closeModal=()=> {
    this.setState({modalIsOpen: false});
  }


  openInfoModal=()=>{
    this.setState({infoModalIsOpen: true});
  }

  afterOpenInfoModal=()=> {
    this.subtitle.style.color = '#f00';
  }

  closeInfoModal=()=> {
    this.setState({infoModalIsOpen: false});
  }




  openClearInfoModal=()=>{
    this.setState({clearModalIsOpen: true});
  }

  afterOpenClearInfoModal=()=> {
    this.subtitle.style.color = '#f00';
  }

  closeClearInfoModal=()=> {
    this.setState({clearModalIsOpen: false});
  }

  substring0x = (str) => {
    str = str +"";
    return str.substring(2,str.length);
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
  
                <a className="dropdown-item dropdown-item1"><Create onAccountChange={this.props.onAccountChange}/></a>
                <a className="dropdown-item" onClick={this.openModal}>Import</a>
                <a className="dropdown-item" onClick={this.openClearInfoModal}>Clear</a>
              </div>
            </div>


       <div>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Example Modal">
          <div className="Import">
          <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
          <br/>
            <div className="form-group">
            <label>Private Key</label>
            <input type="text"  className="form-control" placeholder="Wallet Account" onChange={(e) => this.setState({pirvatekey: e.target.value})} />
          </div>
          <br/>
          <button className="btn btn-danger Left" onClick={this.import}>Import</button>
          <button className="btn btn-primary Right " onClick={this.closeModal}>Cancel</button>
          </div>
        </Modal>

        <Modal isOpen={this.state.infoModalIsOpen} onAfterOpen={this.afterOpenInfoModal} onRequestClose={this.closeInfoModal} style={customStyles} 
        contentLabel="InfoModal">
        <div className="Create">
          <h2 ref={subtitle => this.subtitle = subtitle}>Please clear your account!</h2>
          <br/>
          <h3>Please clear your account , then you can import new account!</h3>
          <br/>
          <button className="btn btn-danger" onClick={this.closeInfoModal}>Close</button>
        </div>  
        </Modal>

        <Modal isOpen={this.state.clearModalIsOpen} onAfterOpen={this.afterOpenClearInfoModal} onRequestClose={this.closeClearInfoModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="clear">
            <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
            <br/>
              <h3>Address:{window.address}</h3>
              <h3>Private Key:{this.substring0x(window.privateKey)}</h3>
            <br/>
            <button className="btn btn-danger" onClick={this.clear}>Clear</button>
            <button className="btn btn-primary" onClick={this.closeClearInfoModal}>Cancel</button>
          </div>
        </Modal>





      </div>
     </div> 

    )
  }
}

export default Wallet