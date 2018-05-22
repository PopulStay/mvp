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


class WalletCreate extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      infoModalIsOpen:false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.openInfoModal = this.openInfoModal.bind(this);
    this.afterOpenInfoModal = this.afterOpenInfoModal.bind(this);
    this.closeInfoModal = this.closeInfoModal.bind(this);

    this.create = this.create.bind(this);
    
  }

  create(){

      if(window.address)
    {
       this.openInfoModal();
       return;
    }
    else
    {

        var obj=window.web3.eth.accounts.wallet.create(1);
        window.address = obj[obj.length-1].address;
        window.privateKey = obj[obj.length-1].privateKey;
        window.addressshow = window.address.substring(0,10)+"...";
        this.props.onAccountChange(window.address);
        reactLocalStorage.setObject('wallet', 
          {
            'address': window.address,
          'privateKey': window.privateKey,
          'addressshow': window.addressshow});
        this.openModal();

    }


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

  openInfoModal() {
    this.setState({infoModalIsOpen: true});
  }

  afterOpenInfoModal() {
    this.subtitle.style.color = '#f00';
  }

  closeInfoModal() {
    this.setState({infoModalIsOpen: false});
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

        <a onClick={this.create}>Create</a>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="CreateModal">
        <div className="Create1">
          <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
          <div>
            <h3>Address:</h3>
            <p className="text1">{window.address}</p>
            <h3>Private Key:</h3>
            <p className="text1">{this.substring0x(window.privateKey)}</p>
          </div>
          <button className="btn btn-danger Left" onClick={this.closeModal}>Close</button>
        </div>  
        </Modal>


        <Modal isOpen={this.state.infoModalIsOpen} onAfterOpen={this.afterOpenInfoModal} onRequestClose={this.closeInfoModal} style={customStyles} 
        contentLabel="InfoModal">
        <div className="Create">
          <h2 ref={subtitle => this.subtitle = subtitle}>Please clear your account!</h2>
          <br/>
          <h3>Please clear your account , then you can create new account!</h3>
          <br/>
          <button className="btn btn-danger" onClick={this.closeInfoModal}>Close</button>
        </div>  
        </Modal>
      

      </div>
    );
  }
}
export default WalletCreate
