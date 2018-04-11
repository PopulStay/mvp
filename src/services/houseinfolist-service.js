import HouseInfoListing from '../../build/contracts/HouseInfoListing.json';
import ipfsService from '../services/ipfs-service';
import bs58 from 'bs58';
import axios from 'axios';
import Web3 from 'web3';



var web_provider = process.env.WEB3_PROVIDER;
var houselist_address = process.env.RentHouseListingAddress;


class HouseInfoListingService {
  static instance

  constructor() 
  {
    if (HouseInfoListingService.instance) {
      return HouseInfoListingService.instance
    }

    HouseInfoListingService.instance = this;
    if(!window.web3loaded)
    {
      window.web3 = new Web3( new Web3.providers.HttpProvider(web_provider));
      window.web3loaded = true;
    }
      

   
  }

  getBytes32FromIpfsHash(ipfsListing) {
    return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex')
  }

  getIpfsHashFromBytes32(bytes32Hex) {
   
    const hashHex = "1220" + bytes32Hex.slice(2)
    const hashBytes = Buffer.from(hashHex, 'hex');
    const hashStr = bs58.encode(hashBytes)
    return hashStr
  }

  submitListing(formListing) {
          
    var roominfo ={};
    roominfo.beds     = formListing.roombasics_guestbedrooms;
    roominfo.category = formListing.roomtype_category;
    roominfo.location = formListing.roomtype_location;

    return new Promise((resolve, reject) => {

    ipfsService.submitListing(formListing).then((ipfsHashStr)=>
    {

       var uuids= this.getBytes32FromIpfsHash(ipfsHashStr);
       var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address);
       return contract.methods.setHouseInfo(uuids,
        formListing.price_perday,
        JSON.stringify(roominfo),
        "0x3333322d30303332000000000000000000000000000000000000000000000000")
       .send({from: window.address,gasPrice: 4476768})
       .then((res)=>{
        resolve(res);
       });

      });

      })
 
  }

    getDistrictCodes() {
    
    return new Promise((resolve, reject) => {
    axios.get(process.env.Server_Address+'DistrictCode/')
    .then((response)=> {
      resolve(response);
    })
    .catch(function (error) {
      reject(error);
    });
    });

  }

  getHomeRoomList(account) {
    return new Promise((resolve, reject) => {
     
      this.houseInfoListingContract.getHostRoomLists.call(account)
      .then((uuids) => {
        resolve(uuids);
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
    })
  }


  getGuestPreorderList(account) {
       var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address);
       return contract.methods.getGuestOrders(account).call();
  }

  getHostOrderList(account) {

    var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address);
     return contract.methods.getHostOrders.call({from:account});
  }

  getHouseId(districtCode){
     var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address)
     return contract.methods.getUUIDS(districtCode).call();
  }


  getHouseInfoDetail(uuid){
     var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address)
     return contract.methods.getHouseInfo(uuid).call();
 }



    waitTransactionFinished(transactionReceipt, pollIntervalMilliseconds=1000) {
    return new Promise((resolve, reject) => {
      let txCheckTimer = setInterval(txCheckTimerCallback, pollIntervalMilliseconds);
      function txCheckTimerCallback() {
        window.web3.eth.getTransaction(transactionReceipt, (error, transaction) => {
          if (transaction.blockNumber != null) {
            console.log(`Transaction mined at block ${transaction.blockNumber}`)
            console.log(transaction)
            clearInterval(txCheckTimer)
            setTimeout(()=>resolve(transaction.blockNumber), 2000)
          }
        })
      }
    })
  }


  }



  const houseInfoListingService = new HouseInfoListingService()

export default houseInfoListingService
