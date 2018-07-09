import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import languageService from '../services/language-service';
import {CopyToClipboard} from 'react-copy-to-clipboard';



class WalletManage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      pirvatekey:"",
      languagelist:{},
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.import = this.import.bind(this);

    languageService.language();
  }

  componentDidMount() {
    this.setState({ languagelist:window.languagelist });
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
    this.setState({modalIsOpen: false,copied: false});
  }

  substring0x = (str) => {
    str = str +"";
    return str.substring(2,str.length);
  }

  render() {
      const language = this.state.languagelist;
    return (

    <div>

        <button className="btn btn-danger" onClick={this.openModal}>{language.Export}</button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}  
        contentLabel="Wallet Message">
        <div className="PirvateKey">
            <h2 ref={subtitle => this.subtitle = subtitle}>{language.Please_Remember_Your_Pirvate_Key}</h2>
            <div>
              <h3>{language.Address}: &nbsp;&nbsp;</h3>
              <CopyToClipboard text={window.address}
                onCopy={() => this.setState({copied: true})}>
                <button className="copy">{this.state.copied ? language.Successful_copy : language.Copy_address}</button>
              </CopyToClipboard>
              <p className="text1">{window.address}</p>
              <h3>{language.Private_Key}:</h3>
              <p className="text1">{this.substring0x(window.privateKey)}</p>
            </div>  
            <button className="btn btn-primary Right" onClick={this.closeModal}>{language.Cancel}</button>
          </div>
        </Modal>
      

      </div>
    );
  }
}
export default WalletManage
