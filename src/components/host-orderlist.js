import React from 'react';
import ReactDOM from 'react-dom';
import hostService from '../services/host-service';
import HostOrderRow from './host-orderrow';

class HostOrderList extends React.Component {
  constructor() {
    super();

    this.state = {
      id:"",
      account:"",
      orderlist:[]
    };
  }
  
  componentWillMount() {
    window.web3.eth.getAccounts((error, accounts) => {
     if(accounts[0])
     {
         
          var accountStr =accounts[0]+"";
          this.setState( { account: accountStr, id: accountStr });
          
          hostService.getHostOrderAddress(accounts[0]).then((data)=>{
            this.setState({ orderlist:data});
           });
     } 


    });
  }
   

  render() {
    return (
    <div>
      <br/><br/>  
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
       {this.state.orderlist.map(address => (
            <HostOrderRow address={address} key={address}/>
      ))}
      
    </tbody>
  </table>
   </div>
    );
  }
}
export default HostOrderList
