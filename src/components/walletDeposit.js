import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import ppsService from '../services/pps-service';
import languageService from '../services/language-service';
import web3Service from '../services/web3-service';



class WalletDeposit extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      modalcode:false,
      waitingModalIsOpen:false,
      pirvatekey:"",
      PPS:1,
      languagelist:{},
      ppsBalance:0,
      ethBalance:0,
    };

    languageService.language();
  }

  componentDidMount() {
    this.setState({ languagelist:window.languagelist });
    ppsService.getBalance(window.address).then((data)=>{
      this.setState({ ppsBalance:data});
    });
    web3Service.getETHBalance(window.address).then((data)=>{
      this.setState({ ethBalance:data});
    });
  }

  

  deposit =()=> {

      this.closeModal();
      this.openWaitModal();

      ppsService.deposit(this.state.PPS)
      .then((res)=>{

       var hash;
       if(res.data[0])
       {
        hash = res.data[0].txhash;
       }else
       {
        hash= res.data.txhash;
       }
        ppsService.waitTransactionFinished(txhash)
        .then((data)=>{
            this.setState({PPS:0});
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
    this.setState({
      PPS:0,
      modalIsOpen: false
    });
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

  PPSDeposit = (e) =>{
    if(Number(e)>Number(this.state.ppsBalance)){
      this.setState({PPS:this.state.ppsBalance})
    }else{
      this.setState({PPS:e})
    }
  }


  render() {
      const language = this.state.languagelist;
    return (

    <div>

        <button className="btn btn-primary" onClick={this.openModal}>{language.Deposit}</button>
        
          <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal}  
          contentLabel="Wallet Message">
            <div className="deposit">
              <h2 className={this.state.ethBalance<=0 ? 'hide' : 'show'} ref={subtitle => this.subtitle = subtitle}>{language.Deposit_PPS}</h2>

              <div className={this.state.ethBalance<=0 ? 'hide form-group' : 'show form-group'} >
                <label>{language.Token_Size}</label>
                <input type="number"  className="form-control" placeholder={language.Input_Size_Of_PPS_you_want_to_deposit} onChange={(e) => this.PPSDeposit(e.target.value)} value={this.state.PPS} />
              </div>

              <h2 className={this.state.ethBalance>0 ? 'hide' : 'show'}>{language.Insufficient_balance}</h2>

              <button className={this.state.ethBalance<=0 ? 'hide Left' : 'show Left'}  onClick={this.deposit}>{language.Deposit}</button>
              <button className="Right" onClick={this.closeModal}>{language.Cancel}</button>
            </div>
          </Modal>

       <Modal isOpen={this.state.waitingModalIsOpen} onAfterOpen={this.afterWaitOpenModal} onRequestClose={this.closeWaitModal} 
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
