import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import languageService from '../services/language-service';



class WalletCreate extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      infoModalIsOpen:false,
      languagelist:{},
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.openInfoModal = this.openInfoModal.bind(this);
    this.afterOpenInfoModal = this.afterOpenInfoModal.bind(this);
    this.closeInfoModal = this.closeInfoModal.bind(this);

    this.create = this.create.bind(this);
    
    languageService.language();
  }

  componentWillMount(){
    this.setState({ languagelist:window.languagelist });
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
        const language = this.state.languagelist;
    return (

    <div>

        <a onClick={this.create}>{language.Create}</a>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}
        contentLabel="CreateModal">
        <div className="Create1">
          <h2 ref={subtitle => this.subtitle = subtitle}>{language.Please_Remember_Your_Pirvate_Key}</h2>
          <div>
            <h3>{language.Address}</h3>
            <p className="text1">{window.address}</p>
            <h3>{language.Private_Key}</h3>
            <p className="text1">{this.substring0x(window.privateKey)}</p>
          </div>
          <button className="btn btn-danger Right" onClick={this.closeModal}>{language.Close}</button>
        </div>  
        </Modal>


        <Modal isOpen={this.state.infoModalIsOpen} onAfterOpen={this.afterOpenInfoModal} onRequestClose={this.closeInfoModal}
        contentLabel="InfoModal">
        <div className="Create">
          <h2 ref={subtitle => this.subtitle = subtitle}>{language.Please_clear_your_account}</h2>
          <br/>
          <h3>{language.Please_clear_your_account_then_you_can_import_new_account}</h3>
          <br/>
          <button className="btn btn-danger Right" onClick={this.closeInfoModal}>{language.Close}</button>
        </div>  
        </Modal>
      

      </div>
    );
  }
}
export default WalletCreate
