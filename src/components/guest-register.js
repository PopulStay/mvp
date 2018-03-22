import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content : {
    top                   : '8%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '8%',
    //marginRight           : '-30%',
    //transform             : 'translate(-50%, -50%)'
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
  }




  componentDidMount() {
    window.web3.eth.getAccounts((error, accounts) => {
    this.setState( { account: accounts[0], id: accounts[0] });

    axios.get('http://localhost:1337/GuestRegister/'+accounts[0])
    .then((response)=> {
      this.setState({ registered:true });
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

     });
  }

  setRegisted(){

  }
   
  register(){
   console.log(this.state);
    var register={};
    register.id      = this.state.id;
    register.user    = this.state.user;
    register.account = this.state.account;
    register.phone   = this.state.phone;
    register.email   = this.state.email;
    axios.post('http://localhost:1337/GuestRegister', register)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
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

         {this.state.registered === true  && <button className="logoutButton float-right">My Account</button>}
         {this.state.registered === false &&<button className="logoutButton float-right" onClick={this.openModal}>Register</button>}
        <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} 
        contentLabel="Example Modal">
          <h2 ref={subtitle => this.subtitle = subtitle}>Register</h2>
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
    <label >Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={(e) => this.setState({email: e.target.value})}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
</div>

          <br/>
          <button className="btn btn-danger" onClick={this.register}>Confirm</button>
          <button className="btn btn-primary" onClick={this.closeModal}>close</button>
        </Modal>
      

      </div>
    );
  }
}
export default GuestRegister
