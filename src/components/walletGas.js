import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import languageService from '../services/language-service';


class WalletGas extends React.Component {
  constructor() {
    super();

    this.state = {
      infoModalIsOpen:false,
      gas:null,
      languagelist:{},
    };

    this.openInfoModal = this.openInfoModal.bind(this);
    this.afterOpenInfoModal = this.afterOpenInfoModal.bind(this);
    this.closeInfoModal = this.closeInfoModal.bind(this);

    languageService.language();
  }

  componentDidMount() {
    this.setState({ languagelist:window.languagelist });
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

  render() {
      const language = this.state.languagelist;
    return (

    <div>

        <button className="btn btn-primary" onClick={this.openInfoModal}>{language.Gas}</button>
        <Modal isOpen={this.state.infoModalIsOpen} onAfterOpen={this.afterOpenInfoModal} onRequestClose={this.closeInfoModal} 
        contentLabel="InfoModal">
        <div className="Gas">
          <h2 ref={subtitle => this.subtitle = subtitle}>{language.Please_Remember_Your_Pirvate_Key}</h2>
          <div className="form-group">
            <label>{language.Gas_Price}</label>
            <input type="text"  className="form-control" placeholder={language.Wallet_Account} onChange={(e) => this.setState({gas: e.target.value})} />
          </div>
          <button className="btn btn-danger Left" onClick={this.closeInfoModal}>{language.OK}</button>
          <button className="btn btn-primary Right" onClick={this.closeInfoModal}>{language.Cancel}</button>
        </div> 
        </Modal>
      

      </div>
    );
  }
}
export default WalletGas