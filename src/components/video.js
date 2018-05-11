import React, { Component } from 'react';
import { merge } from 'lodash';
import {AGORA_APP_ID} from '../agora.config';
import houselistingService from '../services/houseinfolist-service';

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
       videoProfile: '480p_4',
       messagearr:[],
       text:"",
       host:"",
       connectguest:"",
       online:false,
       audioCalling:false,
       videoCalling:false,
       connectionCode:""
    }
      
  }

  componentWillMount() {
    console.log(this.props.listingId);
     houselistingService.getHouseInfoDetail(this.props.listingId)
     .then((result) => {
        this.setState({host:result._owner});
        this.handleEvent();
     });
    
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



//sending message and online control
  handleEnterMessage =()=>{
     if( window.address == this.state.host )
     {
        window.io.socket.get("/messages/tellguest?text="+this.state.text+"&host="+this.state.host+"&guest="+this.state.connectguest, 
        (data, jwRes)=> 
        {
          console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
          this.setState({state: this.state.messagearr.push({index: 0,message: this.state.text})});
          this.setState({text:''});
        });

     }

     if( window.address != this.state.host )
     {
        window.io.socket.get("/messages/tellhost?text="+this.state.text+"&host="+this.state.host+"&guest="+window.address, 
        (data, jwRes)=> 
        {
          console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
          this.setState({state: this.state.messagearr.push({index: 0,message: this.state.text})});
          this.setState({text:''});
        });
      }

  }

  handleEvent =()=>{
        window.io.socket.get('/messages/join?account='+window.address+'&host='+this.state.host,(data, jwRes) =>{
        console.log('Server responded with status code ' + jwRes.statusCode + ' and data: ', data);
        
    });

    if( window.address == this.state.host )
    {
        window.io.socket.on('hostlisten'+window.address,  (data)=> {
          console.log("host listen");
          var datamessage = data.message;
          

          this.setState({state: this.state.messagearr.push({
                  index: 1,
                  message: datamessage
            })});
          this.setState({text:''});
          this.setState({connectguest:data.guest});
        });

        window.io.socket.on('connection'+this.state.host,  (data)=> {
          console.log("######################connection ",data);
          if(data.type == 'audio')
          {
            this.setState({connectionCode:data.connection,audioCalling:true}); 
          }
          else if(data.type == 'video')
          {
            this.setState({connectionCode:data.connection,videoCalling:true}); 
          }
         

        });  
    }

    if( window.address != this.state.host )
    {
      window.io.socket.on('guestlisten'+window.address,  (data)=> {
        console.log("######################guestlisten"+window.address);
        var datamessage = data.message;
        this.setState({state: this.state.messagearr.push({
                index: 1,
                message: datamessage
          })});
          this.setState({text:''});
      }); 
    }


     window.io.socket.on('online'+this.state.host,  (data)=> {
        console.log("######################online ",data);
        this.setState({online:true});
       
      });  

      window.io.socket.on('offline'+this.state.host,  (data)=> {
        console.log("######################offline ",data);
         this.setState({online:false});
      });  
  }

  handleKeyPress =(e)=> {
    if (e.key === 'Enter' && e.target.value != "") {
      console.log('do validate');
      this.handleEnterMessage();
    }
  }

  //video message
  handleVideo =()=> {

 
    if(window.address == this.state.host)
    {
      return ;
    }


    window.io.socket.get('/messages/connection?type=video&account='+window.address+'&host='+this.state.host,
      (data, jwRes)=>
      {
        this.setState({connectionCode:data.connection});
        this.videoCall();
      }
    );
  }

  videoCall = () =>{

    if( window.AgoraRTC)
    { 
        this.client = window.AgoraRTC.createClient({ mode:this.constant.mode });
        this.client.init( this.constant.appId ,()=>{
        console.log("AgoraRTC client initialized   this.constant.appId"+this.constant.appId);
        console.log("this.state.host"+this.state.host);
        this.subscribeStreamEvents();
        this.client.join(null, this.state.connectionCode, null, (uid) => {
            console.log("User " + uid + " join channel successfully");
            console.log('At ' + new Date().toLocaleTimeString());
            console.log(uid);
        this.localStream = window.AgoraRTC.createStream({streamID: uid,audio: true,video: true,screen: false});
        this.localStream.setVideoProfile("480p_4");
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

            this.setState({ readyState: true , videoCalling: false });
        },
          err => {
            console.log("getUserMedia failed", err);
            this.setState({ readyState: true , videoCalling: false  });
          });
     
        })
      });
    }


  }

//audio message  

  handleMic =()=> {

 
    if(window.address == this.state.host)
    {
      return ;
    }


    window.io.socket.get('/messages/connection?type=audio&account='+window.address+'&host='+this.state.host,
      (data, jwRes)=>
      {
        this.setState({connectionCode:data.connection});
        this.audioCall();
      }
    );
  }

  audioCall = () =>{
        if( window.AgoraRTC)
    { 
        this.client = window.AgoraRTC.createClient({ mode:this.constant.mode });
        this.client.init( this.constant.appId ,()=>{
        console.log("AgoraRTC client initialized   this.constant.appId"+this.constant.appId);
        console.log("this.state.host"+this.state.host);
        this.subscribeStreamEvents();
        this.client.join(null, this.state.connectionCode, null, (uid) => {
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
            this.client.publish(this.localStream, err => {
              console.log("Publish local stream error: " + err);
            });

            this.client.on('stream-published', function (evt) {
                console.log("Publish local stream successfully");
             });

            this.setState({ readyState: true , audioCalling: false });
        },
          err => {
            console.log("getUserMedia failed", err);
            this.setState({ readyState: true , audioCalling: false  });
          });
     
        })
      });
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
      stream.play('agora_remote','/res');
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
              <div className="video">
                  <div id="agora_remote"></div>
                  <h4>
                    <span className="spantype"></span>
                    <p>host’s name<br/>
                        <span className={this.state.online ? "spanshow" : "hide"}>Host on line</span>
                        <span className={!this.state.online ? "spanshow" : "hide"}>Host off line</span>
                        <span className={this.state.readyState ? "spanshow" : "hide"}>&nbsp;&nbsp;in Talking</span>
                    </p>
                  </h4>
                   <ul>
                      {this.state.messagearr.map((item,index) => (
                          <li className={item.index == 0 ? "Right" : "Left"} data-index={item.index}>{item.message}
                            <img  className={item.index == 0 ? "show videorightimg" : "hide videorightimg"} src="../images/becomehost-triangle.png" />
                            <img  className={item.index == 1 ? "show videoleftimg" : "hide videoleftimg"} src="../images/becomehost-triangle1.png" />
                          </li>
                        ))
                      }
                   </ul>
                   <h6 className={this.state.videoCalling ? "show" : "hide"}><p>Video call</p><span className="Answer">Answer</span> or <span className="Decline">Decline</span></h6>
                   <h6 className={this.state.audioCalling ? "show" : "hide"}><p>Audio call</p><span className="Answer">Answer</span> or <span className="Decline">Decline</span></h6>
                   <p className="text2"></p>
                   <div className="videobtn">
                      <input type="text"  onKeyPress={(e) =>this.handleKeyPress(e)} onChange={(e) => this.setState({text: e.target.value})} value={this.state.text}  placeholder="Message Me"/>
                      <img className="becomehost_video" src="../images/becomehost-video.png" onClick={this.handleVideo}/>
                      <img className="microphone" src="../images/becomehost-microphone.png" onClick={this.handleMic}/>
                   </div>
                  
                  </div>
            )
  }
}

export default Video

