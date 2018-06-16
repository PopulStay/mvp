import React, { Component } from 'react'
import houselistingService from '../services/houseinfolist-service'
import { Link } from 'react-router-dom'
import languageService from '../services/language-service';

class HostRoomListRow extends Component {

  constructor(props) {
    super(props)
    this.state = {
      category:  "Loading...",
      beds: "Loading...",
      location:"Loading",     
      price:"Loading",
      status:1,
      languagelist:{},
    }

    languageService.language();
  }




  getHostRoomInfo(){
    var roominfo = this.props.row.houseinfo;
    console.log(this.props)
    this.setState({
      state:this.props.row.state,
      price:this.props.row.price,
      category:roominfo.category,
      location:roominfo.location,
      beds:roominfo.beds});
  }

  componentWillMount() {
    this.setState({ languagelist:window.languagelist });

     if(this.props.row)
     {
      this.getHostRoomInfo();
     }

   
  }


  render() {
      const language = this.state.languagelist;

    return (
       <div className="divtr">
        <div>{this.state.category}</div>
        <div>{this.state.beds}</div>
        <div>{this.state.location}</div>
        <div>{this.state.price}/PPS</div>
        <div>{this.state.status == 1 ? language.state6 : language.state7}</div>
      </div>
    
    )
  }
}

export default HostRoomListRow