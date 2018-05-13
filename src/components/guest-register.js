import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import guestService from '../services/guest-service';
import Wallet from './wallet';
import Web3 from 'web3';
import web3service from '../services/web3-service'


const customStyles = {
  content : {
    top                   : '8%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '8%'
  }
};


class GuestRegister extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      id:"",
      user:"",
      account:"",
      phone:"",
      email:"",
      registered:false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.register   = this.register.bind(this);
    web3service.loadWallet();

  }

  componentWillMount() {
    this.loadUserData();
  
 
  }
   
  register(){
   console.log(this.state);
    var register={};
    register.id      = window.address;
    register.user    = this.state.user;
    register.account = window.address;
    register.phone   = this.state.phone;
    register.email   = this.state.email;
    guestService.guestRegister(register).then((data)=>{
      this.setState({ registered:true });
      this.closeModal();
     });
  }


  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  loadUserData = () =>{
    this.setState( { account: window.address, id: window.address});
    guestService.getGuesterInfo(window.address).then((data)=>{
      this.setState({ registered:true });
      this.setState({ user:data.user });
     });

  }
  onAccountChange = (address) =>{
    this.setState({account:address});
     guestService.getGuesterInfo(window.address).then((data)=>{
      if(data && data.user)
      {
          this.setState({ registered:true });
          this.setState({ user:data.user });
          this.closeModal();
      }
     });

  }


  render() {
    return (

    <div>

         {this.state.registered === true  && 
           <Link to="/managepanel">
          <button className="logoutButton float-right">Welcome！{this.state.user}<span></span></button>
            </Link>

        }

         {this.state.registered === false &&<button className="button__outline" onClick={this.openModal}>Sign up</button>}
         <div className="registermodal">
            <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
            contentLabel="Example Modal">
            <div className="Signup">
                <img className="close" onClick={this.closeModal} src="../images/closezi.png" />
                <h2 ref={subtitle => this.subtitle = subtitle}>Guest Register</h2>
                <br/>
                <div>

                <Wallet onAccountChange={this.onAccountChange}/>
                <br/>

                <div className="form-group">
                  <label>User</label>
                  <input type="text" className="form-control" placeholder="User name" onChange={(e) => this.setState({user: e.target.value})}/>
                </div>

                <div className="form-group">
                  <label>Wallet Account</label>
                  <input type="text"  className="form-control" placeholder="Wallet Account" value={this.state.account} disabled/>
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input type="number" className="form-control" placeholder="Phone" onChange={(e) => this.setState({phone: e.target.value})}/>
                </div>

                <div className="form-group">
                  <label >Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={(e) => this.setState({email: e.target.value})}/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                </div>

                <br/>
                <img className="closeok" src="../images/ok.png" onClick={this.register} />
                <button className="btn btn-primary closecancel" onClick={this.closeModal}>cancel</button>
              </div>
            </Modal>
        </div>
      </div>
    );
  }
}
export default GuestRegister
