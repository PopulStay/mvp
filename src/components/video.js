import React, { Component } from 'react';
import {AGORA_APP_ID} from '../agora.config';


class Video extends Component {

  constructor(props) {
    super(props);
      this.constant = {
        mode :'interop',
        appId: AGORA_APP_ID
      }
      this.state = {
      };
      
  }

  componentWillMount() {
    if( window.AgoraRTC)
    {
         var client = window.AgoraRTC.createClient({ mode:this.constant.mode });
         client.init( this.constant.appId , function(){
         console.log("AgoraRTC client initialized");
         });
    }
   
 
  }

  render() {

    return (
        <div>
        </div>
        )
  }
}

export default Video
