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


class WalletWithdraw extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      pirvatekey:"",
      Address:"",
      Size:""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.withdraw = this.withdraw.bind(this);

  }
  withdraw(){
   
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

        <button className="btn btn-primary" onClick={this.openModal}>Withdraw</button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="deposit">
            <h2 ref={subtitle => this.subtitle = subtitle}>withdraw PPS</h2>
            <div className="form-group">
              <label>Size</label>
              <input type="number"  className="form-control" placeholder="Input Size" onChange={(e) => this.setState({Size: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text"  className="form-control" placeholder="Input Address" onChange={(e) => this.setState({Address: e.target.value})} />
            </div>
            <button className="btn btn-danger Left" onClick={this.withdraw}>withdraw</button>
            <button className="btn btn-primary Right" onClick={this.closeModal}>Cancel</button>
          </div>
        </Modal>
      

      </div>
    );
  }
}
export default WalletWithdraw
