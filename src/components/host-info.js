import React from 'react';
import ReactDOM from 'react-dom';
import hostService from '../services/host-service';
import ppsService from '../services/pps-service';
import HostRoomList from './host-roomlist';
import { Link } from 'react-router-dom'
import languageService from '../services/language-service';


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
      roomInfoList:[],
      languagelist:{},
    };
    languageService.language();
  }
  
  componentWillMount() {
    this.setState({ languagelist:window.languagelist });


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
      const language = this.state.languagelist;
    return (
      <div className="HostManagment">
      <h1>{language.Host_Managment_Panel}</h1>
        <div className="overflowAuto">
          <table className="table">
            <thead>
              <tr>
                <th>{language.Category}</th>
                <th>{language.Beds}</th>
                <th>{language.Location}</th>
                <th>{language.Price}</th>
                <th>{language.Status}</th>
              </tr>
            </thead>
            <tbody>
             {this.state.roomInfoList.map(row => (
                    <HostRoomList row={row}/>
              ))}
             
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default HostInfo