import React from 'react';
import ReactDOM from 'react-dom';
import guestService from '../services/guest-service';
import ppsService from '../services/pps-service';
import GuestOrderRow from './guest-orderrow';
import web3Service from '../services/web3-service';
import WalletClear from './walletClear';
import WalletManage from './walletManage';
import WalletGas from './walletGas';
import WalletDeposit from './walletDeposit';
import WalletWithdraw from './walletWithdraw';

class GuestInfo extends React.Component {
  constructor() {
    super();
    this.CONST = {
      weiToEther: 1000000000000000000
    }

    this.state = {
      id:"",
      user:"",
      account:"",
      phone:"",
      email:"",
      ppsBalance:"",
      ethBalance:"",
      ppsDeposited:"",
      orderlist:[]
    };


  }
  
  componentDidMount() {
    console.log(window.address)

    this.setState( { account: window.address, id: window.address });

    guestService.getPreorderList(window.address).then((data)=>{
   
      this.setState({ orderlist:data});
     });

    ppsService.getBalance(window.address).then((data)=>{
      this.setState({ ppsBalance:data});
     });

    web3Service.getETHBalance(window.address).then((data)=>{
      this.setState({ ethBalance:data});
     });


    guestService.getGuesterInfo(window.address).then((data)=>{
      this.setState({ user:data.user,phone:data.phone,email:data.email});
     });

    this.onGetDepositBalance();
  
  }

  onGetDepositBalance = () =>{
     ppsService.getDepositBalance(window.address)
     .then((data)=>{
        this.setState({ ppsDeposited : data.data.balance});
     });
  }
   

  render() {
    return (

      <div className="info">

      <div className="userBox row">
          <h1 className="col-sm-12 col-md-12 col-lg-12">Hello!{this.state.user}</h1>
          <div className="col-sm-2 col-md-2 col-lg-2">
            <img src="../images/uesrimg.png" />
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 userlist">
            <div className="col-sm-6 col-md-6 col-lg-6">
              <span>username:</span>{this.state.user}
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
               <span>phone:</span>{this.state.phone}
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
               <span>email:</span>{this.state.email}
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
               <span>PPS balance:</span>{this.state.ppsBalance}
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
               <span>ETH balance:</span>{this.state.ethBalance/this.CONST.weiToEther}
            </div>
            <div className="col-sm-6 col-md-6 col-lg-6">
               <span>PPS deposited in Populstay:</span>{this.state.ppsDeposited}
            </div>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3 userbtn" >
              <WalletManage/>
              <WalletClear/>
              <WalletGas/>
              <WalletDeposit  onGetDepositBalance={this.onGetDepositBalance}/>
              <WalletWithdraw/>
          </div>
      </div>





      <h1>Guest Managment Panel</h1>
      
    <table className="table GuestManagment">
    <thead>
      <tr>
        <th>Contract Address</th>
        <th>Status</th>
        <th>House Information</th>
        <th>From</th>
        <th>To</th>
        <th>Price</th>
        <th>Check In</th>
      </tr>
    </thead>
    <tbody>
       {this.state.orderlist.map(account => (
            <GuestOrderRow account={account} key={account}/>
      ))}
    </tbody>
  </table>






      </div>
    );
  }
}
export default GuestInfo
