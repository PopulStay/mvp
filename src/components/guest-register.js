import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import guestService from '../services/guest-service';
import Wallet from './wallet';
import Web3 from 'web3';
import web3service from '../services/web3-service';
import languageService from '../services/language-service';




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
      Verification:'验证码',
      VerificationCode:0,
      registered:false,
      emailactive:0,
      Prompt:"",
      languagelist:{},
      password:"",
      repeatPassword:""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.register   = this.register.bind(this);
    web3service.loadWallet();
    languageService.language();

    // guestService.sendEmail(   "admin@populstay.com",
    //                           "13753068898@163.com",
    //                           "populstay demo test",
    //                           "populstay demo test"
    //                         );

  }

  componentWillMount() {
    this.setState({ languagelist:window.languagelist });
    this.setState({Verification:window.languagelist.Get_verification_code});
    this.loadUserData();
  }
   
  register(){
    var register={};
    register.id             = window.address;
    register.user           = this.state.user;
    register.account        = window.address;
    register.phone          = this.state.phone;
    register.email          = this.state.email;
    register.password       = this.state.password;
    register.repeatPassword = this.state.repeatPassword;
    register.encryptedPK    = window.privateKey;
    guestService.guestRegister(register).then((data)=>{ 
      guestService.setWebToken(data.data.token);
      console.log(window.webtoken);
      this.setState({ registered:true });
      this.closeModal();
      window.location.href='/';
     });
  }


  openModal() {
    this.setState({modalIsOpen: true});
    this.props.onLogOut(false);
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.props.onLogOut(false);
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
  email(e){
    this.setState({state:this.state.email=e});
    var rephone = /^[A-Za-z0-9\u4e00-\u9fa5-_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(e.length != "" && rephone.test(e)){
      this.setState({state: this.state.emailactive=1});
    }else{
      this.setState({state: this.state.emailactive=0});
    }
  }
  Prompt(){
      var rephone = /^[A-Za-z0-9\u4e00-\u9fa5-_]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if(this.state.user == "" || this.state.account == ""){
        return this.state.languagelist.Consummate_user_information
      }else if(this.state.email.length == 0){
          return this.state.languagelist.Please_enter_the_mailbox
      }else if(!rephone.test(this.state.email)){
          return this.state.languagelist.Incorrect_mailbox_format
      }else{
        return this.state.languagelist.Well_never_share_your_email_with_anyone_else
      }
  }

  VerificationCode(){
    var num = 60;
    this.timerID = setInterval(
      () => {
        if(this.state.Verification == 1){
          clearTimeout(this.timerID);
          this.setState({Verification:this.state.languagelist.Verification_code_error});
        }else{
          this.setState({Verification:num--});
        }
      },
      1000
    );
    guestService.getGuesterCode(this.state.email)
  }

  emailCode(e){
    if(e.length==4){
      guestService.VerificationCode(this.state.email,e).then((data)=>{
        clearTimeout(this.timerID);
        this.setState({Verification:this.state.languagelist.Successful_verification});
      })
      .catch(function (error) {
        clearTimeout(this.timerID);
        this.setState({Verification:this.state.languagelist.Verification_code_error});
      });
    }else{
      this.setState({Verification:this.state.languagelist.Get_verification_code});
    }
  }

  render() {
        const language = this.state.languagelist;
    return (

    <div>


        {
          this.state.registered === true && this.props.clicklogout ===false && this.props.type == '0'  && 
          <button onClick={(e) => window.location.href="/managepanel"} className="logoutButton float-right"><Link to="/managepanel">{this.state.user}<span></span></Link></button>
        }

        { 
          (this.state.registered === false && this.props.type == '0' || this.props.clicklogout ===true && this.props.type == '0' ) &&
          <button className="button__outline" onClick={this.openModal}>{language.Sign_up}</button>
        }

        {
          this.state.registered === true && this.props.clicklogout ===false && this.props.type == '1'  && 
          <Link to="/create">{language.Become_a_Host}</Link>
        }

        { 
          (this.state.registered === false && this.props.type == '1' || this.props.clicklogout ===true && this.props.type == '1' ) &&
          <a onClick={this.openModal}>{language.Become_a_Host}</a>
        }

        {
          (this.state.registered === false && this.props.type == '2' || this.props.clicklogout ===true && this.props.type == '2' ) &&
          <button className="bg-pink color-blue btn-lg btn-block text-bold text-center"  onClick={this.openModal}>{language.Sign_up}</button>
        }

        {
          (this.state.registered === false && this.props.type == '3' || this.props.clicklogout ===true && this.props.type == '3' ) &&
          <div className="Please_Log_in"  onClick={this.openModal}>{language.Please_Log_in}</div>
        }




         <div className="registermodal">
            <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} 
            contentLabel="Example Modal">
            <div className="Signup">
                <img className="close" onClick={this.closeModal} src="../images/closezi.png" />
                <h2 ref={subtitle => this.subtitle = subtitle}>{language.Guest_Register}</h2>
                <br/>
                <div>

                <Wallet onAccountChange={this.onAccountChange}/>
                <br/>

                <div className="form-group">
                  <label>{language.Wallet_Account}</label>
                  <input type="text"  className="form-control" placeholder={language.Wallet_Account} 
                  value={this.props.clicklogout == true ? this.setState({account:""}) : this.state.account} disabled/>
                </div>

                <div className="form-group">
                  <label>{language.User}</label>
                  <input type="text" className="form-control" placeholder={language.User_name} onChange={(e) => this.setState({user: e.target.value})}/>
                </div>

                                <div className="form-group">
                  <label>Password</label>
                  <input type="text" className="form-control" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
                </div>


                <div className="form-group">
                  <label>repeatPassword</label>
                  <input type="text" className="form-control" placeholder="repeatPassword" onChange={(e) => this.setState({repeatPassword: e.target.value})}/>
                </div>
                

                <div className="form-group">
                  <label>{language.Phone}</label>
                  <input type="number" className="form-control" placeholder={language.Phone} onChange={(e) => this.setState({phone:e.target.value})}/>
                </div>

                <div className="form-group">
                  <label >{language.Email}</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={language.Enter_email}  onChange={(e) => this.email(e.target.value)}/>
                  <small id="emailHelp" className="form-text text-muted">{this.Prompt()}</small>
                </div>

                <div className="VerificationCode">
                  <button className={this.Prompt() == this.state.languagelist.Well_never_share_your_email_with_anyone_else ? "" : "active"} disabled={this.Prompt() == this.state.languagelist.Well_never_share_your_email_with_anyone_else ? "" : "true"} onClick={(e)=>this.VerificationCode(e)}>{this.state.Verification}</button>
                  <input type="number" placeholder={language.Code} onChange={(e) => this.emailCode(e.target.value)} />
                </div>

                </div>
                <br/>
                <button className={this.state.account == "" || this.state.Verification != this.state.languagelist.Successful_verification ? 'closeok closeactive' : 'closeok'} onClick={this.register}>{language.OK}</button>
                <button className="btn btn-primary closecancel" onClick={this.closeModal}>{language.Cancel}</button>
              </div>
            </Modal>
        </div>
      </div>
    );
  }
}
export default GuestRegister
