import React from 'react';
import ReactDOM from 'react-dom';
import guestService from '../services/guest-service';
import ppsService from '../services/pps-service';
import GuestOrderRow from './guest-orderrow';
import web3Service from '../services/web3-service';
import WalletManage from './walletManage';
import WalletGas from './walletGas';
import WalletDeposit from './walletDeposit';
import WalletWithdraw from './walletWithdraw';
import { Link } from 'react-router-dom';
import Timestamp from 'react-timestamp';

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
      orderlist:[],
      usdOrderList:[]
    };


  }
  
  componentDidMount() {
    console.log(window.address)

    this.setState( { account: window.address, id: window.address });

    guestService.getPreorderList(window.address).then((data)=>{
   
      this.setState({ orderlist:data});
      console.log(this.state)
     });

    ppsService.getBalance(window.address).then((data)=>{
      this.setState({ ppsBalance:data});
      console.log(data)
     });

    web3Service.getETHBalance(window.address).then((data)=>{
      this.setState({ ethBalance:data});
     });


    guestService.getGuesterInfo(window.address).then((data)=>{
      this.setState({ user:data.user,phone:data.phone,email:data.email});
     });

    ppsService.getUsdOrderList(window.address).then((data)=>{
      //这个地方获取没有生成智能合约的订单数据！！
      //state等于2的是没有生成智能合约的
      //Guest Managment Panel 里面加一个没有生成智能合约的预定list。。。
      this.setState({ usdOrderList:data.data});
      console.log(this.state)
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
          <div className="col-sm-12 col-md-2 col-lg-2">
            <img src="../images/uesrimg.png" />
          </div>
          <div className="col-sm-12 col-md-8 col-lg-7 userlist row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <span>username:</span><p>{this.state.user}</p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
               <span>phone:</span><p>{this.state.phone}</p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
               <span>email:</span><p>{this.state.email}</p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
               <span>PPS balance:</span><p>{this.state.ppsBalance}</p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
               <span>ETH balance:</span><p>{this.state.ethBalance/this.CONST.weiToEther-0 == 0 ? '0' : (this.state.ethBalance/this.CONST.weiToEther-0).toFixed(5)}</p>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
               <span>PPS deposited in Populstay:</span><p>{this.state.ppsDeposited}</p>
            </div>
          </div>
          <div className="col-sm-12 col-md-2 col-lg-3 userbtn" >
              <WalletManage/>
              <WalletGas/>
              <WalletDeposit  onGetDepositBalance={this.onGetDepositBalance}/>
              <WalletWithdraw/>
          </div>
      </div>





      <h1>Guest Managment Panel</h1>
      
    <table className="table GuestManagment">
    <thead>
      <tr>
        <th>Address</th>
        <th>Status</th>
        <th>Information</th>
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

      {this.state.usdOrderList.map(item => (
        <tr>
            <td><p>{item.guestaddress}</p></td>
            <td>{item.state}</td>
            <td><Link to={`/listing/${item.houseinfoid}`}>Check</Link></td>
            <td><Timestamp time={item.from.substring(0,10)} format='date'/></td>
            <td><Timestamp time={item.to.substring(0,10)} format='date'/></td>
            <td>{item.usdprice}{item.usdprice == 0 ? '' : '/USD'}</td>
            { item.status === '0' &&<td><button className="btn-sn btn-danger" onClick={this.checkIn}>Check In</button></td>}
            { item.status === '1' &&<td>Checked In</td>}
            { item.state === '2' &&<td>Checked In</td>}
        </tr>
           
      ))}
  
    </tbody>
  </table>



      </div>
    );
  }
}
export default GuestInfo
