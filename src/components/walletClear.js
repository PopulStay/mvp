import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import {reactLocalStorage} from 'reactjs-localstorage';
import guestService from '../services/guest-service';
import web3Service from '../services/web3-service';

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '30%'
  }
};


class WalletClear extends React.Component {
  constructor() {
    super();

    this.state = {
      modaloutOpen: false,
      pirvatekey:"",
      registered:false,
      modalinOpen: false,
      Username:'',
      Password:'',
    };

    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.clear = this.clear.bind(this);

    web3Service.loadWallet();
  }
  componentWillMount() {
    guestService.getGuesterInfo(window.address).then((data)=>{
      this.setState({ registered:true });
    });

  }
  clear(){
   
      
      window.address          = null;
      window.addressShow      = null;
      window.privateKey       = null;
      reactLocalStorage.setObject('wallet', null);
      this.setState({modaloutOpen:false});
      this.props.onLogOut(true);

  }

  Signin(){

  }

  afterOpenModal() {
    this.subtitle.style.color = '#f00';
  }
  substring0x = (str) => {
    str = str +"";
    return str.substring(2,str.length);
  }

    


  render() {
    return (

    <div>

        {this.state.registered === true &&  this.props.clicklogout ===false  && 
          <a onClick={(e) => this.setState({modaloutOpen:true})}>LogOut</a>
        }

        {(this.state.registered === false || this.props.clicklogout ===true ) &&
          <a onClick={(e) => this.setState({modalinOpen:true})}>LogIn</a>
        }

        <Modal isOpen={this.state.modaloutOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Wallet Message">
          <div className="clear">
            <h2 ref={subtitle => this.subtitle = subtitle}>Please Remember Your Pirvate Key</h2>
            <div>
              <h3>Address:</h3>
              <p className="text1">{window.address}</p>
              <h3>Private Key:</h3>
              <p className="text1">{this.substring0x(window.privateKey)}</p>
            </div>  
            <button className="btn btn-danger Left" onClick={this.clear}>Clear</button>
            <button className="btn btn-primary Right"  onClick={(e) => this.setState({modaloutOpen:false})}>Cancel</button>
          </div>
        </Modal>

        <Modal isOpen={this.state.modalinOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Wallet Message">
          <div className="Sign">
            <h2 ref={subtitle => this.subtitle = subtitle}>Login</h2>

            <div className="form-group form1">
              <label>User name</label>
              <input type="text"  className="form-control" placeholder="Enter user name" onChange={(e) => this.setState({Username: e.target.value})} />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="Password"  className="form-control" placeholder="Enter pass word" onChange={(e) => this.setState({Password: e.target.value})} />
            </div>

            <button className="btn btn-danger Left" onClick={this.Signin}>Login</button>
            <button className="btn btn-primary Right" onClick={(e) => this.setState({modalinOpen:false})}>Cancel</button>

          </div>
        </Modal>
      

      </div>
    );
  }
}
export default WalletClear
