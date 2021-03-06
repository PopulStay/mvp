import HouseInfoListing from '../../build/contracts/HouseInfoListing.json';
import houselistingService from './houseinfolist-service';
import axios from 'axios';

class HostService {
  static instance

  constructor() 
  {
    if (HostService.instance) {
      return HostService.instance
    }

    HostService.instance = this;

    this.contract = require('truffle-contract');
    this.houseInfoListingContract = this.contract(HouseInfoListing);
  }
    
  hostRegister(registerData) {
    return new Promise((resolve, reject) => {
    axios.post(process.env.Server_Address+'HostRegister', registerData)
    .then(function (response) {
      resolve(response);
    })
    .catch(function (error) {
      console.error(error)
      reject(error)
    });
    })
  }

  
  getHouseListing(account){
    return houselistingService.getHomeRoomList(account);
  }

  getHostOrderAddress(account){
    return houselistingService.getHostOrderList(account);
  }


 }



  const hostService = new HostService()

export default hostService