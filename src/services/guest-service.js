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
    
  guestRegister(registerData) {
    return new Promise((resolve, reject) => {
    axios.post(process.env.Server_Address+'GuestRegister', registerData)
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
    axios.get(process.env.Server_Address+'GuestRegister/'+id)
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