import HouseInfoListing from '../../build/contracts/HouseInfoListing.json';
import houselistingService from './houseinfolist-service';
import orderService from '../services/order-service';
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwt');
class GuestService {
  static instance

  constructor() 
  {
    if (GuestService.instance) {
      return GuestService.instance
    }

    GuestService.instance = this;

    this.contract = require('truffle-contract');
    this.houseInfoListingContract = this.contract(HouseInfoListing);
  }

  getOrderState(){
    return new Promise((resolve, reject) => {
          axios.get(process.env.Server_Address+'book?guestaddress='+window.address )
                    .then((response)=> {
                      //state:0准备提交。2 已经提交 4 已经checkin
                      resolve(response.data);
                    })
                    .catch(function (error) {
                      reject(error);
                    });
         });           
  }

  setWebToken(token){
    window.webtoken = 'bear '+token;
    localStorage.setItem('jwt',window.webtoken);
  }

  login(email,password){
    var params = {};
    params.email    = email;
    params.password = password;

    return new Promise((resolve, reject) => {
    axios.post(process.env.Server_Address+'auth/index', params)
    .then(function (response) {
      resolve(response.data);
    })
    .catch(function (error) {
      console.error(error)
      reject(error)
    });
    });


  }

  addComment(id,comment,accuracyStar,locationStar,communicationStar,checkinStar,cleanlinessStar,valueStar){
    var params = {};
    
    params.id                 = id;
    params.comment            = comment;
    params.accuracyStar       = accuracyStar;
    params.locationStar       = locationStar;
    params.communicationStar  = communicationStar;
    params.checkinStar        = checkinStar;
    params.cleanlinessStar    = cleanlinessStar;
    params.valueStar          = valueStar;

    return new Promise((resolve, reject) => {
    axios.post(process.env.Server_Address+'comment', params)
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      console.error(error)
      reject(error)
    });
    });

  }
  checkemail(emailAddress){
    return new Promise((resolve, reject) => {
    axios.get(process.env.Server_Address+'register?email='+emailAddress)
    .then((response)=> {
      resolve(response);
    })
    .catch(function (error) {
      reject(error);
    });
    })
  }
    
  reasonForBadComment(id,reason){
    return new Promise((resolve, reject) => {
    var params = {};
    params.id     = id;
    params.reason = reason;
    axios.post(process.env.Server_Address+'comment/reasonforbadcomment', params)
    .then(function (response) {
      resolve(response);
    }).catch(function (error) {
      console.error(error)
      reject(error)
    });
    });
  }


  sendEmail(from,to,subject,text){
    return new Promise((resolve, reject) => {
    var params = {};
    params.from    = from;
    params.to      = to;
    params.subject = subject;
    params.text    = text;

    axios.post(process.env.Server_Address+'emailsender', params)
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      console.error(error)
      reject(error)
    });
     });


  }
    
  guestRegister(registerData) {
    return new Promise((resolve, reject) => {
    axios.post(process.env.Server_Address+'Register', registerData)
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      console.error(error)
      reject(error)
    });
    })
  }

  getGuesterInfo(id) {
    return new Promise((resolve, reject) => {
    axios.get(process.env.Server_Address+'Register/'+id)
    .then((response)=> {
      resolve(response.data);
    })
    .catch(function (error) {
      reject(error);
    });
    })
  }
  
  // getPreorderList(account){
  //   return houselistingService.getGuestPreorderList(account);
  // }

  getGuesterCode(email,subject) {
    return new Promise((resolve, reject) => {
    var emailArr = {};
    emailArr.to      = email;
    emailArr.subject = subject;
    emailArr.from    = "admin@populstay.com";
    axios.post(process.env.Server_Address+'emailverify/sendVerificationEmail', emailArr)
    .then(function (response) {
      //console.log(response)
      resolve(response);
    })
    .catch(function (error) {
      console.error(error)
      reject(error)
    });
    })
  }

  VerificationCode(email,Code) {
    return new Promise((resolve, reject) => {
    var Verification = {};
    Verification.to      = email;
    Verification.code = Code;
    axios.post(process.env.Server_Address+'emailverify/verifyEmail', Verification)
    .then(function (response) {
      //console.log(response)
      resolve(response);
    })
    .catch(function (error) {
      console.error(error)
      reject(error)
    });
    })
  }

 }



  const guestService = new GuestService()

export default guestService