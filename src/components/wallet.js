import React, { Component } from 'react';
import Web3 from 'web3';
import Create from './walletCreate';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import web3service from '../services/web3-service'
import WalletClear from './walletClear';

const localeList = {
  "en_US": require('../locale/en_US.js'),
  "zh_CN": require('../locale/zh_CN.js'),
};

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
      clearModalIsOpen:false,
      languagelist:{},
    };

    web3service.loadWallet();

  }

  componentWillMount(){
            var languageActive = localStorage.getItem('language')
            for (var item in localeList) {
                if(item == languageActive){
                    var languagelist = localeList[item];
                }
            }
            this.setState({
                language:localStorage.getItem('language'),
                Country:localStorage.getItem('Country'),
                CountryImg:localStorage.getItem('Countryimg'),
                state:this.state.languagelist=languagelist
            });
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



  closeClearInfoModal=()=> {
    this.setState({clearModalIsOpen: false});
  }
  openClearInfoModal=()=>{
    this.setState({clearModalIsOpen: true});
  }
 

  afterOpenClearInfoModal=()=> {
    this.subtitle.style.color = '#f00';
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
            <div className="dropdown">
              <button className="button__outline" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          {language.Create_Or_Import_Wallet}<span>▼</span>
              </button>            
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  
                <a className="dropdown-item dropdown-item1"><Create onAccountChange={this.props.onAccountChange}/></a>
                <a className="dropdown-item" onClick={this.openModal}>{language.Import}</a>
                <a className="dropdown-item" onClick={this.openClearInfoModal}>{language.Clear}</a>
              </div>
            </div>


       <div>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Example Modal">
          <div className="Import">
          <h2 ref={subtitle => this.subtitle = subtitle}>{language.Please_Remember_Your_Pirvate_Key}</h2>
          <br/>
            <div className="form-group">
            <label>{language.Private_Key}</label>
            <input type="text"  className="form-control" placeholder={language.Wallet_Account} onChange={(e) => this.setState({pirvatekey: e.target.value})} />
          </div>
          <br/>
          <button className="btn btn-danger Left" onClick={this.import}>{language.Import}</button>
          <button className="btn btn-primary Right " onClick={this.closeModal}>{language.Cancel}</button>
          </div>
        </Modal>

        <Modal isOpen={this.state.infoModalIsOpen} onAfterOpen={this.afterOpenInfoModal} onRequestClose={this.closeInfoModal} style={customStyles} 
        contentLabel="InfoModal">
        <div className="Create">
          <h2 ref={subtitle => this.subtitle = subtitle}>{language.Please_clear_your_account}</h2>
          <br/>
          <h3>{language.Please_clear_your_account_then_you_can_import_new_account}</h3>
          <br/>
          <button className="btn btn-danger" onClick={this.closeInfoModal}>{language.Close}</button>
        </div>  
        </Modal>

        <Modal isOpen={this.state.clearModalIsOpen} onAfterOpen={this.afterOpenClearInfoModal} onRequestClose={this.closeClearInfoModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="clear">
            <h2 ref={subtitle => this.subtitle = subtitle}>{language.Please_Remember_Your_Pirvate_Key}</h2>
            <div>
              <h3>{language.Address}</h3>
              <p className="text1">{window.address}</p>
              <h3>{language.Private_Key}</h3>
              <p className="text1">{this.substring0x(window.privateKey)}</p>
            </div>  
            <button className="btn btn-danger Left" onClick={this.clear}>{language.Clear}</button>
            <button className="btn btn-primary Right" onClick={this.closeClearInfoModal}>{language.Cancel}</button>
          </div>
        </Modal>



      </div>
     </div> 

    )
  }
}

export default Wallet