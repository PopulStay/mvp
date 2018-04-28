import React from 'react';
import ReactDOM from 'react-dom';
import guestService from '../services/guest-service';
import ppsService from '../services/pps-service';
import GuestOrderRow from './guest-orderrow';
import web3Service from '../services/web3-service';
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
      orderlist:[]
    };
  }
  
  componentWillMount() {

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
  
  }
   

  render() {
    return (

      <div>


      <br/>
      <div className="row">
       <div className="col-lg-6">
          username:{this.state.user}
       </div>
       <div className="col-lg-6">
        account:{this.state.account}
       </div>
      </div>

      <br/>
       <div className="row">
       <div className="col-lg-6">
          phone:{this.state.phone}
       </div>
       <div className="col-lg-6">
        email:{this.state.email}
       </div>
      </div>
      <br/>

      <div className="row">
         <div className="col-lg-3">
          PPS balance:{this.state.ppsBalance}
        </div>
         <div className="col-lg-3">
          ETH balance:{this.state.ethBalance/this.CONST.weiToEther}
        </div>
      </div>
   
      <br/><br/><br/>


      <h1>Guest Managment Panel</h1>
      <hr/>
      
    <table className="table">
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
