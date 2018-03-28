import React from 'react';
import ReactDOM from 'react-dom';
import hostService from '../services/host-service';
import ppsService from '../services/pps-service';
import HostRoomList from './host-roomlist';
import { Link } from 'react-router-dom'


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
      ppsBalance:"",
      roomInfoList:[]
    };
  }
  
  componentWillMount() {
    window.web3.eth.getAccounts((error, accounts) => {
    this.setState( { account: accounts[0], id: accounts[0] });

    hostService.getHouseListing(accounts[0]).then((data)=>{

      this.setState({ roomInfoList:data});
     });

    ppsService.getBalance(accounts[0]).then((data)=>{
      console.log(data);
      this.setState({ ppsBalance:data.toNumber()});
     });


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
       <div className="col-lg-4">
          username:{this.state.user}
       </div>
       <div className="col-lg-4">
        account:{this.state.account}
       </div>
      </div>

      <br/>
       <div className="row">
       <div className="col-lg-4">
          phone:{this.state.phone}
       </div>
       <div className="col-lg-4">
        email:{this.state.email}
       </div>
      </div>
      <br/>
       <div className="row">
         <div className="col-lg-4">
          address:{this.state.address}
        </div>
         <div className="col-lg-4">
          PPS balance:{this.state.ppsBalance}
        </div>

      </div>

  <br/><br/>
  <Link to="/hostorder">
  <button className="btn btn-danger">Order List</button>
  </Link>

  <br/><br/>
  <table className="table">
    <thead>
      <tr>
        <th>Category</th>
        <th>Beds</th>
        <th>Location</th>
        <th>Price</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
     {this.state.roomInfoList.map(uuid => (
            <HostRoomList uuid={uuid} key={uuid}/>
      ))}
     
    </tbody>
  </table>
      

      </div>
    );
  }
}
export default HostInfo