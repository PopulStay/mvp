import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import hostService from '../services/host-service';



class HostRegister extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      id:"",
      user:"",
      account:"",
      phone:"",
      email:"",
      address:"",
      registered:false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.register   = this.register.bind(this);
  }

  componentWillMount() {
    if(window.accounts){
        this.setState( { account: window.accounts[0], id: window.accounts[0] });
          hostService.getHostInfo(window.accounts[0]).then((data)=>{
            this.setState({ registered:true });
          });
    }else{
      window.web3.eth.getAccounts((error, accounts) => {
        this.setState( { account: accounts[0], id: accounts[0] });
        hostService.getHostInfo(accounts[0]).then((data)=>{
          this.setState({ registered:true });
        });
        window.accounts = accounts;
      });
    }
  }
   
  register(){
    var register={};
    register.id      = this.state.id;
    register.user    = this.state.user;
    register.account = this.state.account;
    register.phone   = this.state.phone;
    register.email   = this.state.email;
    register.address = this.state.address;

    hostService.hostRegister(register).then((data)=>{
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

  render() {
    return (

    <div>

         {this.state.registered === true  && 
           <Link to="/hostinfo">
          <button className="logoutButton float-right">HostAccount</button>
            </Link>

        }


         {this.state.registered === false &&<a onClick={this.openModal} className="btn button__fill">Become a Host</a>}
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} 
        contentLabel="Example Modal">
          <h2 ref={subtitle => this.subtitle = subtitle}>Host Register</h2>
          <br/>
          <div>

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
            <label>Host Address</label>
            <input type="text"  className="form-control" placeholder="Host Address" onChange={(e) => this.setState({address: e.target.value})}/>
          </div>

          <div className="form-group">
            <label >Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={(e) => this.setState({email: e.target.value})}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          </div>

          <br/>
          <button className="btn btn-danger" onClick={this.register}>ok</button>
          <button className="btn btn-primary" onClick={this.closeModal}>close</button>
        </Modal>
      

      </div>
    );
  }
}
export default HostRegister