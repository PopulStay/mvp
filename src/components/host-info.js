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
     });

    ppsService.getBalance( window.address).then((data)=>{
      console.log(data);
      this.setState({ ppsBalance:data});
     });


    hostService.getHostInfo( window.address).then((data)=>{
      this.setState({ 
                      user  : data.user, 
                      phone : data.phone, 
                      email : data.email, 
                    address : data.address
                    });
     });
  }
   

  render() {
    return (
      
      <div>
        <div className="row">
        <div className = "col-lg-6">
        <h1>Host Managment Panel</h1>
        </div>
        <div className = "col-lg-1">
        <Link to="/hostorder">
          <button className="btn btn-danger">Order List</button>
        </Link>

        </div>
        </div>
        <hr/>
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