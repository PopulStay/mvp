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
    this.setState( { account: window.address, id:  window.address });

      hostService.getHouseListing( window.address).then((data)=>{
        this.setState({ roomInfoList:data});
        window.data = data;
       });

    if(window.data){
        this.setState({ ppsBalance:window.data});
    }else{
        ppsService.getBalance( window.address).then((data)=>{
          this.setState({ ppsBalance:data});
            window.data = data;
        });
    }

  }
   

  render() {
    return (
      <div className="HostManagment">
      <h1>Host Managment Panel</h1>

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
           {this.state.roomInfoList.map(row => (
                  <HostRoomList row={row}/>
            ))}
           
          </tbody>
        </table>
      

      </div>
    );
  }
}
export default HostInfo