import React, { Component } from 'react';
import { merge } from 'lodash';
import {AGORA_APP_ID} from '../agora.config';


class Video extends Component {

  constructor(props) {

    super(props);
    this.client = {};
    this.localStream = {};
    this.shareClient = {};
    this.shareStream = {};

    this.constant = {
        mode :'interop',
        appId: AGORA_APP_ID
      }

    this.state = {
      displayMode  : 'pip',
      streamList   : [],
      readyState   : false,
      attendeeMode : {
                      audioOnly : 'audio-only',
                      audience   : 'audience'
                     },
       videoProfile: '480p_4'
    }

    
      
  }

  componentWillMount() {
    
  }



  handleMic = (e) => {
  
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
        // create local stream
        // It is not recommended to setState in function addStream
        this.localStream = this.streamInit(uid, this.state.attendeeMode.audioOnly, this.state.videoProfile);
        this.localStream.init(() => {
            this.addStream(this.localStream, true);
            this.client.publish(this.localStream, err => {
              console.log("Publish local stream error: " + err);
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

    addStream = (stream, push = false) => {
      console.log("#########*  add  Stream   ###############");
    let repeatition = this.state.streamList.some(item => {
      return item.getId() === stream.getId()
    })
    if (repeatition) {
      return
    }
    if (push) {
      this.setState({
        streamList: this.state.streamList.concat([stream])
      })
    }
    else {
      this.setState({
        streamList: [stream].concat(this.state.streamList)
      })
    }

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
      console.log("Peer has left: " + evt.uid)
      console.log(new Date().toLocaleTimeString())
      console.log(evt)
      rt.removeStream(evt.uid)
    })

    rt.client.on('stream-subscribed', function (evt) {
      let stream = evt.stream
      console.log("Got stream-subscribed event")
      console.log(new Date().toLocaleTimeString())
      console.log("Subscribe remote stream successfully: " + stream.getId())
      console.log(evt)
      rt.addStream(stream)
    })

    rt.client.on("stream-removed", function (evt) {
      let stream = evt.stream
      console.log("Stream removed: " + stream.getId())
      console.log(new Date().toLocaleTimeString())
      console.log(evt)
      rt.removeStream(stream.getId())
    })
  }

  removeStream = (uid) => {
    this.state.streamList.map((item, index) => {
      if (item.getId() === uid) {
        item.close()
        let element = document.querySelector('#ag-item-' + uid)
        if (element) {
          element.parentNode.removeChild(element)
        }
        let tempList = [...this.state.streamList]
        tempList.splice(index, 1)
        this.setState({
          streamList: tempList
        })
      }

    })
  }

  streamInit = (uid, attendeeMode, videoProfile, config) => {
    let defaultConfig = {
      streamID: uid,
      audio: true,
      video: true,
      screen: false
    }

    switch (attendeeMode) {
      case 'audio-only':
        defaultConfig.video = false
        break;
      case 'audience':
        defaultConfig.video = false
        defaultConfig.audio = false
        break;
      default:
      case 'video':
        break;
    }

    let stream = window.AgoraRTC.createStream(merge(defaultConfig, config))
    stream.setVideoProfile(videoProfile)
    return stream
  }

  render() {

    return (  
              <div>
                   <div className="col-lg-offset-9 col-lg-4 form-group">   
                      <label >Message:</label>
                      <textarea className="form-control" rows="5" id="comment"></textarea>
                      <hr/>
                      <div className ="row" >
                        <div className ="col-lg-8">
                          <input className="form-control" type="text"/>
                        </div>
                        <div className ="col-lg-4">
                          <button className="btn btn-danger" onClick={this.handleMic}>Audio</button>
                          <button className="btn btn-warning">Video</button>
                        </div>
                      </div>
                  </div>
              </div>
            )
  }
}


export default Video
