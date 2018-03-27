import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';
import hostService from '../services/host-service';


class HostInfo extends React.Component {
  constructor() {
    super();

    this.state = {
      id:"",
      user:"",
      account:"",
      phone:"",
      email:"",
      address:"",
      orderlist:[]
    };
  }
  
  componentWillMount() {
    window.web3.eth.getAccounts((error, accounts) => {
    this.setState( { account: accounts[0], id: accounts[0] });

    // guestService.getPreorderList(accounts[0]).then((data)=>{
    //   console.log(data);
    //   this.setState({ orderlist:data});
    //  });


    hostService.getHostInfo(accounts[0]).then((data)=>{
      this.setState({ 
                      user  : data.user, 
                      phone : data.phone, 
                      email : data.email, 
                    address : data.address
                    });
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
          address:{this.state.address}
          </div>
      </div>
      

      </div>
    );
  }
}
export default HostInfo