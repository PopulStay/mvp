import React from 'react';
import ReactDOM from 'react-dom';
import hostService from '../services/host-service';
import HostOrderRow from './host-orderrow';
import languageService from '../services/language-service';

class HostOrderList extends React.Component {
  constructor() {
    super();

    this.state = {
      id:"",
      account:"",
      orderlist:[]
    };
    languageService.language();
  }
  
  componentWillMount() {
    this.setState({ languagelist:window.languagelist });
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
