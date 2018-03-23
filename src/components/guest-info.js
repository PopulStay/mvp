import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import guestService from '../services/guest-service';
import GuestOrderRow from './guest-orderrow'

class GuestInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      id:"",
      user:"",
      account:"",
      phone:"",
      email:"",
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
      
      
     


    <table className="table">
    <thead>
      <tr>
        <th>Order Contract</th>
        <th>Status</th>
        <th>House Information</th>
    
        <th>Check In</th>
        <th>Check Out</th>
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
