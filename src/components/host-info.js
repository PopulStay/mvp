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
       });

   
        ppsService.getBalance( window.address).then((data)=>{
          this.setState({ ppsBalance:data});
        });

  }
   

  render() {
      const language = this.state.languagelist;
    return (
      <div className="info">
        <h1>{language.Host_Managment_Panel}</h1>
        <Link to='/create'>
          <button className={this.state.roomInfoList.length == 0 ? 'show Add_a_house' : 'hide Add_a_house'}>{language.Add_a_house}</button>
        </Link>
        <div  className={this.state.roomInfoList.length == 0 ? 'hide HostManagment' : 'show HostManagment'}>
          <div className="auto">
            <div className="divtr">
              <div>{language.Category}</div>
              <div>{language.Bathrooms}</div>
              <div>{language.Location_type}</div>
              <div>{language.Price}</div>
              <div>{language.Status}</div>
            </div>
            <div className="overflowAuto">
               {this.state.roomInfoList.map(row => (
                      <HostRoomList row={row}/>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HostInfo