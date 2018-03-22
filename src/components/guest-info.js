import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import guestService from '../services/guest-service';

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
      <h5>username:{this.state.user}</h5>
      <h5>account:{this.state.account}</h5>
      <h5>phone:{this.state.phone}</h5>
      <h5>email:{this.state.email}</h5>
      </div>
    );
  }
}
export default GuestInfo
