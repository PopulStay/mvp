import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '5%',
    left                  : '20%',
    right                 : '20%',
    bottom                : '5%',
    //marginRight           : '-30%',
    //transform             : 'translate(-50%, -50%)'
  }
};


class GuestRegister extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      account:""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }


  componentDidMount() {

     window.web3.eth.getAccounts((error, accounts) => {
      this.setState({account: accounts[0]});
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
        <button  className="logoutButton float-right" onClick={this.openModal}>Guest Register</button>
<Modal
  isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles} contentLabel="Example Modal"
>

          <h2 ref={subtitle => this.subtitle = subtitle}>Register</h2>
          <br/>
          <div>

  <div className="form-group">
    <label>User</label>
    <input type="text" className="form-control" placeholder="User name"/>
  </div>

  <div className="form-group">
    <label>Wallet Account</label>
    <input type="text" className="form-control" placeholder="Wallet Account" value={this.state.account}/>
  </div>

  <div className="form-group">
    <label>Phone</label>
    <input type="number" className="form-control" placeholder="Phone"/>
  </div>

 
  <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" placeholder="Password"/>
  </div>

  <div className="form-group">
    <label>Confirm Password</label>
    <input type="password" className="form-control" placeholder="Confirm Password"/>
  </div>


  <div className="form-group">
    <label >Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
</div>

          <br/>
          <button className="btn btn-danger" onClick={this.closeModal}>Confirm</button>
          <button className="btn btn-primary" onClick={this.closeModal}>close</button>
        </Modal>
      </div>
    );
  }
}
export default GuestRegister
