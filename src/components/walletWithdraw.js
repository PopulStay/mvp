import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import ppsService from '../services/pps-service';
import languageService from '../services/language-service';

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
      Size:1,
      withdrawlist:[],
      ppsDeposited:0,
      statetype:'To be audited',
      languagelist:{},
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.delelist = this.delelist.bind(this);
    this.Withdraw = this.Withdraw.bind(this);

    languageService.language();
  }

  componentDidMount() {
    this.setState({ languagelist:window.languagelist });
    this.setState({ Address: window.address });

    ppsService.getDepositBalance(window.address)
     .then((data)=>{
        this.setState({ ppsDeposited : data.data.balance});
     });
    
    this.withdrawlist();

  }

  withdrawlist(){
    ppsService.getWithdrawInfo(window.address).then((data)=>{
      console.log(data.data)
      //开始申请提币，state是0
      //完成了向populstay转账0.01个eth，state是1
      //然后完成审核，向以太链提交申请，以太链正在挖矿，state是2
      //结束取币是3
      this.setState({withdrawlist:data.data})
    });
    this.props.onGetDepositBalance();
  }

  Submit(){
    if(this.state.Address != "" || this.state.Size >1){
      var withdrawlist = this.state.withdrawlist;
      withdrawlist.push({
          account:this.state.Address,
          size:this.state.Size,
          state:0,
          id:'...',
      })
      this.setState({withdrawlist:withdrawlist,Address:window.address,Size:1})
      ppsService.applyWithdraw(this.state.Address,this.state.Size);
      this.props.onGetDepositBalance();
    }
    this.timerID = setTimeout(
      () => this.withdrawlist(),
      2000
    );
    
  }

  delelist(index){
    this.setState({
        withdrawlist: this.state.withdrawlist.filter((elem, i) => index != i)
    });

    var deleId = this.state.withdrawlist[index].id;
    ppsService.deleWithdraw(deleId).then((data)=>{
      console.log(data);
    });


  }

  Withdraw(index){

  }

  openModal() {
    this.setState({modalIsOpen: true});

    this.withdrawlist();
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


  Size(e){
    if (Number(e.target.value) >= Number(this.state.ppsDeposited)){
      this.setState({Size:this.state.ppsDeposited})
    }else{
      this.setState({Size:e.target.value})
    }
  }


  render() {
      const language = this.state.languagelist;
    return (

    <div>

        <button className="btn btn-primary" onClick={this.openModal}>{language.Withdraw}</button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="withdraw">
            <h2 ref={subtitle => this.subtitle = subtitle}>{language.Withdraw_PPS}</h2>
            <div className="tablebox">
              <table className={this.state.withdrawlist.length == 0 ? "hide table" : "table" }>
                <tr>
                    <th>{language.Address}</th>
                    <th>{language.Size}</th>
                    <th>{language.TX}</th>
                    <th>{language.Status}</th>
                    <th>{language.Operation}</th>
                </tr>
                {this.state.withdrawlist.map((item,index) => (
                  <tr>
                    <td className="td1"><input type="text" value={item.account} readonly /></td>
                    <td className="td2">{item.size}</td>
                    <td className="td3"><input type="text" value={item.id} readonly /></td>
                    <td className="td4">
                        {item.state == 0 ? language.state0 : ""}
                        {item.state == 1 ? language.state1 : ""}
                        {item.state == 2 ? language.state2 : ""}
                        {item.state == 3 ? language.state3 : ""}
                        {item.state == -1 ? language.state-1 : ""}
                    </td>
                    <td className="td5"><button className="Left"  onClick={this.Withdraw.bind(this,index)} >Withdraw</button><button className="Right" onClick={this.delelist.bind(this,index)}>Cancel</button></td>
                  </tr>  
                  ))
                }
              </table>
            </div>
            <div className="row submitbox">
                <div className="form-group col-lg-6">
                  <label>{language.Address}</label>
                  <input type="text"  className="form-control" placeholder={language.Wallet_Account} value={this.state.Address} onChange={(e) => this.setState({Address: e.target.value})} />
                </div>
                <div className="form-group col-lg-6">
                  <label>{language.Size}</label>
                  <input type="number"  className="form-control" placeholder={language.Wallet_Size} value={this.state.Size} onChange={(e) => this.Size(e)} />
                </div>
            </div>
            <button className="Left" onClick={(e)=>this.Submit(e)}>{language.Submit}</button>
            <button className="Right" onClick={this.closeModal}>{language.Cancel}</button>
          </div>
        </Modal>
      

      </div>
    );
  }
}
export default WalletWithdraw
