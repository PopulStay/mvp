import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import ppsService from '../services/pps-service';

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
      pirvatekey:"",
      PPS:0
    };

  }
  deposit =()=> {

    console.log("#########PPS#######",this.state.PPS);
    ppsService.deposit(this.state.PPS);

   
  }
  openModal =()=>{
    this.setState({modalIsOpen: true});
  }

  afterOpenModal =()=> {
    this.subtitle.style.color = '#f00';
  }

  closeModal =()=> {
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
            <h2 ref={subtitle => this.subtitle = subtitle}>Deposit PPS</h2>
            <br/>

          <div className="form-group">
            <label>Token Size</label>
            <input type="text"  className="form-control" placeholder="Input Size Of PPS you want to deposit" onChange={(e) => this.setState({PPS: e.target.value})} />
          </div>

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
