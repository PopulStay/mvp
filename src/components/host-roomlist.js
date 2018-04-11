import React, { Component } from 'react'
import houselistingService from '../services/houseinfolist-service'
import { Link } from 'react-router-dom'

class HostRoomListRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category:  "Loading...",
      beds: "Loading...",
      location:"Loading",     
      price:"Loading",
      status:1
    }

  }




  getHostRoomInfo(){
    console.log(this.props.uuid);
    houselistingService.getHouseInfoDetail(this.props.uuid)
    .then((result) => {
   
        var roominfo = JSON.parse(result[4]);
        console.log(roominfo);
        this.setState({state:result[3]});
        this.setState({price:result[0]});
        this.setState({category:roominfo.category});
        this.setState({location:roominfo.location});
        this.setState({beds:roominfo.beds});

    }).catch((error) => {
      console.error(error);
    });

  }

  componentWillMount() {

     if(this.props.uuid)
     {
      this.getHostRoomInfo();
     }

   
  }


  render() {

    return (
       <tr>
        <td>{this.state.category}</td>
        <td>{this.state.beds}</td>
        <td>{this.state.location}</td>
        <td>{this.state.price}/PPS</td>
        <td>{this.state.status}</td>
        
      </tr>
    
    )
  }
}

export default HostRoomListRow