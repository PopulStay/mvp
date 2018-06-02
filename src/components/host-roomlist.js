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
    var roominfo = this.props.row.houseinfo;
    this.setState({
      state:this.props.row.state,
      price:this.props.row.price,
      category:roominfo.category,
      location:roominfo.location,
      beds:roominfo.beds});
  }

  componentWillMount() {

     if(this.props.row)
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