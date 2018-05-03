import React, { Component } from 'react';
import { merge } from 'lodash';
import {AGORA_APP_ID} from '../agora.config';


class Video extends Component {

  constructor(props) {

    super(props);
    this.client = {};
    this.localStream = {};

    this.constant = {
        mode :'interop',
        appId: AGORA_APP_ID
      }

    this.state = {
      readyState   : false,
      attendeeMode : {
                      audioOnly : 'audio-only',
                      audience   : 'audience'
                     },
       videoProfile: '480p_4'
    }

    
      
  }

  componentWillMount() {
    if( window.AgoraRTC)
    { 
        this.client = window.AgoraRTC.createClient({ mode:this.constant.mode });
        this.client.init( this.constant.appId ,()=>{
        console.log("AgoraRTC client initialized   this.constant.appId"+this.constant.appId);
        console.log("this.props.listid"+this.props.listid);
        this.subscribeStreamEvents();
        this.client.join(null, this.props.listid, null, (uid) => {
            console.log("User " + uid + " join channel successfully");
            console.log('At ' + new Date().toLocaleTimeString());
            console.log(uid);
      
        this.localStream = window.AgoraRTC.createStream({streamID: uid,audio: true,video: false,screen: false});
        
        this.localStream.on("accessAllowed", function() {
          console.log("accessAllowed");
        });
        // The user has denied access to the camera and mic.
        this.localStream.on("accessDenied", function() {
          console.log("accessDenied");
        });


        this.localStream.init(() => {
             //this.localStream.play('agora_local');
            
            this.client.publish(this.localStream, err => {
              console.log("Publish local stream error: " + err);
            });

            this.client.on('stream-published', function (evt) {
                console.log("Publish local stream successfully");
             });

            this.setState({ readyState: true });
        },
          err => {
            console.log("getUserMedia failed", err);
            this.setState({ readyState: true });
          });
     
        })
      });
    }
    
  }



  componentWillUnmount () {
    this.client && this.client.unpublish(this.localStream)
    this.localStream && this.localStream.close()
    this.client && this.client.leave(() => {
      console.log('Client succeed to leave.')
    }, () => {
      console.log('Client failed to leave.')
    })
  }

    
  subscribeStreamEvents = () =>{
    let rt = this;
    rt.client.on('stream-added', function (evt) {
      let stream = evt.stream
      console.log("New stream added: " + stream.getId())
      console.log('At ' + new Date().toLocaleTimeString())
      console.log("Subscribe ", stream)
      rt.client.subscribe(stream, function (err) {
        console.log("Subscribe stream failed", err)
      })
    })

    rt.client.on('peer-leave', function (evt) {
      let stream = evt.stream;
      console.log("Peer has left: " + evt.uid)
      console.log(new Date().toLocaleTimeString())
      console.log(evt)
      stream.stop();
      
    })

    rt.client.on('stream-subscribed', function (evt) {
      let stream = evt.stream;
      console.log("Got stream-subscribed event")
      console.log(new Date().toLocaleTimeString())
      console.log("Subscribe remote stream successfully: " + stream.getId())
      console.log(evt)
      stream.play('agora_remote');
    })

    rt.client.on("stream-removed", function (evt) {
      let stream = evt.stream
      console.log("Stream removed: " + stream.getId())
      console.log(new Date().toLocaleTimeString())
      console.log(evt)
      stream.stop();
    })
  }


  render() {

    return (  
              <div id="agora_remote" className="video">
                   <ul>
                      <li>Hello, i would like to book a room from your hostel.<img src="../images/becomehost-triangle.png" /></li>
                   </ul>
                   <img className="becomehost_line" src="../images/becomehost-line.png" />
                   <div>
                      <img className="keyboard" src="../images/becomehost-keyboard.png" />
                      <input type="text" placeholder="Message Me"/>
                      <img className="microphone" src="../images/becomehost-microphone.png" onClick={this.handleMic}/>
                      <img className="becomehost_video" src="../images/becomehost-video.png" />
                   </div>
              </div>
            )
  }
}


export default Video
