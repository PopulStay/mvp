import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import ppsService from '../services/pps-service';

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '30%'
  }
};


class WalletWithdraw extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      pirvatekey:"",
      Address:"",
      Size:1,
      withdrawlist:[],
      ppsBalance:0,
      statetype:'To be audited'
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.delelist = this.delelist.bind(this);

  }

  componentDidMount() {
    this.setState({ Address: window.address });

    ppsService.getBalance(window.address).then((data)=>{
      this.setState({ ppsBalance:data});
    });
     ///////////////王艳这里是申请提币情报的API//////////////////////
    ppsService.getWithdrawInfo(window.address).then((data)=>{
      console.log(data);
      //state 0 申请提币
      //state 1 提币中
      //state 2 完成提币
      //state -1 提币失败

    });
     ///////////////王艳这里是申请提币情报的API//////////////////////
  }
  Submit(){
    if(this.state.Address != "" || this.state.Size >1){
      var withdrawlist = this.state.withdrawlist;
      withdrawlist.push({
          Address:this.state.Address,
          Size:this.state.Size
      })
      ///////////////王艳这里是申请提币的API//////////////////////
      ppsService.applyWithdraw(this.state.Address,this.state.Size);
      ////////////////////////////////////////////////////////

      this.setState({withdrawlist:withdrawlist,Address:window.address,Size:1})

    }
  }
  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  substring0x = (str) => {
    str = str +"";
    return str.substring(2,str.length);
  }

  delelist(index){
    this.setState({
          withdrawlist: this.state.withdrawlist.filter((elem, i) => index != i)
    });
  }

  Size(e){
    if (Number(e.target.value) >= Number(this.state.ppsBalance)){
      this.setState({Size:this.state.ppsBalance})
    }else{
      this.setState({Size:e.target.value})
    }
  }


  render() {
    return (

    <div>

        <button className="btn btn-primary" onClick={this.openModal}>Withdraw</button>
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Wallet Message">
          <div className="withdraw">
            <h2 ref={subtitle => this.subtitle = subtitle}>Withdraw PPS</h2>
            <div className="tablebox">
              <table className={this.state.withdrawlist.length == 0 ? "hide table" : "table" }>
                <tr>
                    <th>Address</th>
                    <th>Size</th>
                    <th>TX</th>
                    <th>Status</th>
                    <th>Operation</th>
                </tr>
                {this.state.withdrawlist.map((item,index) => (
                  <tr>
                    <td className="td1"><input type="text" value={item.Address} readonly /></td>
                    <td className="td2"><p>{item.Size}</p></td>
                    <td className="td3"><p></p></td>
                    <td className="td4"><p>{this.state.statetype}</p></td>
                    <td className="td5"><button className="Left">Withdraw</button><button className="Right" onClick={this.delelist.bind(this,index)}>Cancel</button></td>
                  </tr>  
                  ))
                }
              </table>
            </div>
            <div className="row submitbox">
                <div className="form-group col-lg-6">
                  <label>Address</label>
                  <input type="text"  className="form-control" placeholder="Wallet Account" value={this.state.Address} onChange={(e) => this.setState({Address: e.target.value})} />
                </div>
                <div className="form-group col-lg-6">
                  <label>Size</label>
                  <input type="number"  className="form-control" placeholder="Wallet Size" value={this.state.Size} onChange={(e) => this.Size(e)} />
                </div>
            </div>
            <button className="Left" onClick={(e)=>this.Submit(e)}>Submit</button>
            <button className="Right" onClick={this.closeModal}>Cancel</button>
          </div>
        </Modal>
      

      </div>
    );
  }
}
export default WalletWithdraw
