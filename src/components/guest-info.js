import React from 'react';
import ReactDOM from 'react-dom';
import guestService from '../services/guest-service';
import ppsService from '../services/pps-service';
import GuestOrderRow from './guest-orderrow';

class GuestInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      id:"",
      user:"",
      account:"",
      phone:"",
      email:"",
      ppsBalance:"",
      orderlist:[]
    };
  }
  
  componentWillMount() {
    window.web3.eth.getAccounts((error, accounts) => {
    this.setState( { account: accounts[0], id: accounts[0] });

    guestService.getPreorderList(accounts[0]).then((data)=>{
      console.log(data);
      this.setState({ orderlist:data});
     });

    ppsService.getBalance(accounts[0]).then((data)=>{
      console.log(data);
      this.setState({ ppsBalance:data.toNumber()});
     });


    guestService.getGuesterInfo(accounts[0]).then((data)=>{
      this.setState({ user:data.user,phone:data.phone,email:data.email});
     });
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
         <div className="col-lg-6">
          PPS balance:{this.state.ppsBalance}
        </div>
      </div>
      
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
