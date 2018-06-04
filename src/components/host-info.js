import React from 'react';
import ReactDOM from 'react-dom';
import hostService from '../services/host-service';
import ppsService from '../services/pps-service';
import HostRoomList from './host-roomlist';
import { Link } from 'react-router-dom'

const localeList = {
  "en_US": require('../locale/en_US.js'),
  "zh_CN": require('../locale/zh_CN.js'),
};

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
  }
  
  componentWillMount() {
    var languageActive = localStorage.getItem('language')
    for (var item in localeList) {
        if(item == languageActive){
            var languagelist = localeList[item];
        }
    }
    this.setState({
        state:this.state.languagelist=languagelist
    });


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