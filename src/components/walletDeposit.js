import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import ppsService from '../services/pps-service';
import EthereumQRPlugin from 'ethereum-qr-code';
import languageService from '../services/language-service';

const qr = new EthereumQRPlugin();

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
      modalcode:false,
      waitingModalIsOpen:false,
      pirvatekey:"",
      PPS:0,
      languagelist:{},
      qrurl:""
    };

    languageService.language();
  }

  componentDidMount() {
    this.setState({ languagelist:window.languagelist });
    this.loadQrCode();
  }

  loadQrCode =()=>{
        qr.toDataUrl({
            to    : window.address,
            gas   : window.gas
        }).then((qrCodeDataUri)=>{
        this.setState({qrurl:qrCodeDataUri.dataURL}); //'data:image/png;base64,iVBORw0KGgoA....'
        })
  }

  deposit =()=> {

    this.closeModal();
    this.openWaitModal();

    ppsService.deposit(this.state.PPS)
    .then((res)=>{

      ppsService.waitTransactionFinished(res.data[0].txhash)
      .then((data)=>{
         this.closeWaitModal();
      });
    });
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



  openWaitModal =()=>{
    this.setState({waitingModalIsOpen: true});
  }

  afterWaitOpenModal =()=> {
    this.subtitle.style.color = '#f00';
  }

  closeWaitModal =()=> {
    this.setState({waitingModalIsOpen: false});
    this.props.onGetDepositBalance();
  }



  substring0x = (str) => {
    str = str +"";
    return str.substring(2,str.length);
  }


  render() {
      const language = this.state.languagelist;
    return (

    <div>

        <button className="btn btn-primary" onClick={this.openModal}>{language.Deposit}</button>
        
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="deposit">
            <img className="photoClick" src={this.state.qrurl} onClick={(e)=>this.setState({modalcode:true,modalIsOpen:false})} />
            <h2 ref={subtitle => this.subtitle = subtitle}>{language.Deposit_PPS}</h2>

          <div className="form-group">
            <label>{language.Token_Size}</label>
            <input type="text"  className="form-control" placeholder={language.Input_Size_Of_PPS_you_want_to_deposit} onChange={(e) => this.setState({PPS: e.target.value})} />
          </div>

            <button className="btn btn-danger Left" onClick={this.deposit}>{language.Deposit}</button>
            <button className="btn btn-primary Right" onClick={(e)=>this.setState({modalcode:true})}>{language.Cancel}</button>
          </div>
        </Modal>

        <Modal isOpen={this.state.modalcode} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="deposit">
            <img className="photo" src={this.state.qrurl}  />
            <p className="text2">{window.address}</p>
            <button className="btn btn-primary center" onClick={(e)=>this.setState({modalcode:false})}>{language.Cancel}</button>
          </div>
        </Modal>

       <Modal isOpen={this.state.waitingModalIsOpen} onAfterOpen={this.afterWaitOpenModal} onRequestClose={this.closeWaitModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="deposit">
            <h2 ref={subtitle => this.subtitle = subtitle}>Depositing PPS, please wait</h2>
            <br/>
          <div className="form-group">
           <p className="text2"><span className="glyphicon glyphicon-refresh"></span></p>
          </div>
          </div>
        </Modal>

      </div>
    );
  }
}
export default WalletDeposit
