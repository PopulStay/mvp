import HouseInfoListing from '../../build/contracts/HouseInfoListing.json';
import houselistingService from './houseinfolist-service';
import axios from 'axios';

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

  addComment(id,commment){
    var params = {};
    
    params.id       = id;
    params.commment = commment;

    return new Promise((resolve, reject) => {
    axios.post(process.env.Server_Address+'commment', params)
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      console.error(error)
      reject(error)
    });
    })

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
  
  getPreorderList(account){
    return houselistingService.getGuestPreorderList(account);
  }


 }



  const guestService = new GuestService()

export default guestService