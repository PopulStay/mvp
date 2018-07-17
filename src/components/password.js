import React, { Component } from 'react';
import { Base64 } from 'js-base64';

class Password extends Component {

  constructor(props) {
    super(props);
      this.state = {
        text:""
      };
  }

  Decrypt(){
    //Base64 解密
    var str = this.state.text;
    this.setState({text:Base64.encode(str)})

    //Unicode编码 解密
    // var r = "";
    // for (var i = 0; i < this.state.text.length; i++)
    // {
    //   var code = str.charCodeAt(i);
    //   r += code;
    //   r += ",";
    // }
    // this.setState({text:r})
  }

  encryption(){
    //Base64 加密
    var str = this.state.text;
    this.setState({text:Base64.decode(str)})

    //Unicode编码  加密
    // var arr = str.split(",");
    // var r = "";
    // for (var i = 0; i < arr.length; i++)
    // {
    //   var code = parseInt(arr[i]);
    //   r += String.fromCharCode(code);
    // }
    // this.setState({text:r})
  }

  render() {
    return (
      <div style={{width:"500px",margin:"100px auto"}}>
        <input type="text" style={{width:"300px",height:"40px"}} value={this.state.text} onChange={(e)=>this.setState({text:e.target.value})} />
        <button className="btn btn-success" onClick={(e)=>this.encryption()} style={{height:"40px",margin:"0 10px",border:"none",float:"right"}}>解密</button>
        <button className="btn btn-danger" onClick={(e)=>this.Decrypt()} style={{height:"40px",margin:"0 10px",border:"none",float:"right"}}>加密</button>
      </div>
    )
  }
}

export default Password
