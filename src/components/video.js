import React, { Component } from 'react';
import { merge } from 'lodash';
import {AGORA_APP_ID} from '../agora.config';
import houselistingService from '../services/houseinfolist-service';
import guestService from '../services/guest-service';
import web3Service from '../services/web3-service';
import Modal from 'react-modal';
const socketServer = process.env.Socket_Server;

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '30%'
  }
};


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
       user:"",
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
       connectionCode:"",
       agora_remotetype:0,
       guestAddress:"",
       Current_user:0,
       Time:"",
       modalIsOpen:false,
       videobox:0,
       socketid:""
    }

      web3Service.loadWallet();
  }

  componentWillMount() {
    
     guestService.getGuesterInfo(window.address).then((data)=>{
        this.setState({ user:data.user});
      });
  }

    componentDidMount() {
     
     houselistingService.getHouseInfoDetail(this.props.listingId)
     .then((result) => {
        this.setState({host:result._owner});
        this.handleEvent();

        if(window.address == this.state.host){
          this.setState({Current_user:1});
        }else{
          this.setState({Current_user:0});
        }
       
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

    console.log(window.address)
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
        window.io.sails.url = socketServer;
        window.io.socket=window.io.sails.connect();
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
            this.setState({connectionCode:data.connection,audioCalling:true,guestAddress:data.guestAddress}); 
          }
          else if(data.type == 'video')
          {
            this.setState({connectionCode:data.connection,videoCalling:true,guestAddress:data.guestAddress}); 
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

       window.io.socket.on('answerconnection'+window.address,  (data)=> {
          console.log("######################connection ",data);
          this.setState({socketid:data.socketid});
          if(data.type == 'audio')
          {
            this.audioJoin();
          }
          else if(data.type == 'video')
          {
            this.videoJoin();
          }
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
        this.client = window.AgoraRTC.createClient({ mode:this.constant.mode });
        this.client.init( this.constant.appId ,()=>{
          this.subscribeStreamEvents();
        });
      }
    );
  }


  answerVideo = () =>{
      this.videoCall();
      window.io.socket.get('/messages/answerconnection?type=video&account='+this.state.guestAddress+'&host='+window.address,
      (data, jwRes)=>{
        this.setState({socketid:data.socketid});

      });
  }



  videoCall = () =>{
    this.setState({videobox:1})
    if( window.AgoraRTC)
    { 
        this.client = window.AgoraRTC.createClient({ mode:this.constant.mode });
        this.client.init( this.constant.appId ,()=>{
        console.log("AgoraRTC client initialized   this.constant.appId"+this.constant.appId);
        console.log("this.state.host"+this.state.host);
        this.subscribeStreamEvents();
        this.videoJoin();
      });
    }
  }

  videoJoin = () =>{
        this.setState({videobox:1})
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
     
        });
  }

//audio message  

  handleMic =()=> {

    this.setState({ agora_remotetype: 0});

 
    if(window.address == this.state.host)
    {
      return ;
    }


    window.io.socket.get('/messages/connection?type=audio&account='+window.address+'&host='+this.state.host,
      (data, jwRes)=>
      {
        this.setState({connectionCode:data.connection});
        this.client = window.AgoraRTC.createClient({ mode:this.constant.mode });
        this.client.init( this.constant.appId ,()=>{
        console.log("AgoraRTC client initialized   this.constant.appId"+this.constant.appId);
        console.log("this.state.host"+this.state.host);
        this.subscribeStreamEvents();
      });
      }
    );
  }

  answerAudio = () =>{

      this.audioCall();
      window.io.socket.get('/messages/answerconnection?type=audio&account='+this.state.guestAddress+'&host='+window.address,
      (data, jwRes)=>{
        this.setState({socketid:data.socketid});
      });
  }

  audioCall = () =>{
        if( window.AgoraRTC)
    { 
        this.client = window.AgoraRTC.createClient({ mode:this.constant.mode });
        this.client.init( this.constant.appId ,()=>{
        console.log("AgoraRTC client initialized   this.constant.appId"+this.constant.appId);
        console.log("this.state.host"+this.state.host);
        this.subscribeStreamEvents();
        this.audioJoin();

      });
    }
  }

  leave =()=> {
   console.log( '/messages/leave?socketid='+this.state.socketid );
      window.io.socket.get('/messages/leave?socketid='+this.state.socketid,
      (data, jwRes)=>{
        this.setState({socketid:data.socketid});
      });


      this.client.leave(function () {
      console.log("Leavel channel successfully");
      }, function (err) {
      console.log("Leave channel failed");
      });
}

  audioJoin = () =>{

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
     
        });
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

   afterOpenModal=()=> {
    this.subtitle.style.color = '#f00';
  }

  closeModal=()=> {
    this.setState({modalIsOpen: false});
  }


  openInfoModal=()=>{
    this.setState({infoModalIsOpen: true});
  }

  afterOpenInfoModal=()=> {
    this.subtitle.style.color = '#f00';
  }


  render() {

    return (  

            <div>

              {this.state.Current_user === 1 && 
                <div className={this.state.modalIsOpen == true ? "video hide" : "video show"}>

                  <div className="videobox">  
                    <div id="agora_remote" className={this.state.agora_remotetype == 1 ? "agora_remote" : ""}></div>
                    <span className={this.state.videobox == 1 ? "glyphicon glyphicon-earphone show" : "glyphicon glyphicon-earphone hide" }></span>
                  </div>  

                    <h4><span className="spantype"></span>
                      <p>{this.state.user}<br/>
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
                     <h6 className={this.state.videoCalling || this.state.agora_remotetype == 1 ? "show" : "hide"}><p>Video call</p><a onClick={this.answerVideo}><span className="Answer">Answer</span></a> or <span className="Decline">Decline</span></h6>
                     <h6 className={this.state.audioCalling ? "show" : "hide"}><p>Audio call</p><a onClick={this.answerAudio}><span className="Answer">Answer</span></a> or <span className="Decline">Decline</span></h6>
                     <p className="text2"></p>
                     <div className="videobtn">
                        <input type="text"  onKeyPress={(e) =>this.handleKeyPress(e)} onChange={(e) => this.setState({text: e.target.value})} value={this.state.text}  placeholder="Message Me"/>
                        <img className="becomehost_video" src="../images/becomehost-video.png" onClick={this.handleVideo}/>
                        <img className="microphone" src="../images/becomehost-microphone.png" onClick={this.handleMic}/>
                     </div>
                </div>
              }
              {this.state.Current_user === 0 && 
                <div className={this.state.modalIsOpen == true ? "video hide" : "video show"}>
                <div className="videobox">
                  <div id="agora_remote" className={this.state.agora_remotetype == 1 ? "agora_remote" : ""}></div>
                  <span className={this.state.videobox == 1 ? "glyphicon glyphicon-earphone show" : "glyphicon glyphicon-earphone hide" }></span>
                </div>
                    <h4><span className="spantype"></span>
                      <p>{this.state.user}<br/>
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
                     <p className="text2"></p>
                     <div className="videobtn">
                        <input type="text"  onKeyPress={(e) =>this.handleKeyPress(e)} onChange={(e) => this.setState({text: e.target.value})} value={this.state.text}  placeholder="Message Me"/>
                        <img className="becomehost_video" src="../images/becomehost-video.png" onClick={this.handleVideo}/>
                        <img className="microphone" src="../images/becomehost-microphone.png" onClick={this.handleMic}/>
                     </div>
                </div>
              }

             </div> 
      )
  }
}

export default Video

