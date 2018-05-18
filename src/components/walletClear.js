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
      this.props.onLogOut();

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

  copyclick(e){
     var DataIndex = e.currentTarget.getAttribute('data-name');
     document.execCommand("Copy");
     console.log("已复制好，可贴粘。"); 
  }
  substring0x = (str) => {
    str = str +"";
    return str.substring(2,str.length);
  }


  render() {
    return (

    <div>

        <button className="btn btn-primary" onClick={this.openModal}>LogOut</button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="clear">
            <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
            <div>
              <h3>Address:</h3>
              <p className="text1">{window.address}</p>
              <h3>Private Key:</h3>
              <p className="text1">{this.substring0x(window.privateKey)}</p>
            </div>  
            <button className="btn btn-danger Left" onClick={this.clear}>Clear</button>
            <button className="btn btn-primary Right" onClick={this.closeModal}>Cancel</button>
          </div>
        </Modal>
      

      </div>
    );
  }
}
export default WalletClear
