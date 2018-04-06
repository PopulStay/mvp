import HouseInfoListing from '../../build/contracts/HouseInfoListing.json';
import ipfsService from '../services/ipfs-service';
import bs58 from 'bs58'


var md5 = require('md5');//最后改IPFS


class HouseInfoListingService {
  static instance

  constructor() 
  {
    if (HouseInfoListingService.instance) {
      return HouseInfoListingService.instance
    }

    HouseInfoListingService.instance = this;

    this.contract = require('truffle-contract');
    this.houseInfoListingContract = this.contract(HouseInfoListing);
  }

  getBytes32FromIpfsHash(ipfsListing) {
    return "0x"+bs58.decode(ipfsListing).slice(2).toString('hex')
  }

  submitListing(formListing) {
          // var roominfo =
          // {
          //   roomtype_category:formListing.roomtype_category,
          //   roomtype_guests:formListing.roomtype_guests,
          //   roomtype_location:formListing.roomtype_location,
          //   roomdescription_homeorhotel:formListing.roomdescription_homeorhotel,
          //   roomdescription_type:formListing.roomdescription_type,
          //   roomdescription_guests_have:formListing.roomdescription_guests_have,
          //   roomdescription_forguestorhost:formListing.roomdescription_forguestorhost,
          //   roombasics_guestsnumber:formListing.roombasics_guestsnumber,
          //   roombasics_guestbedrooms:formListing.roombasics_guestbedrooms,
          //   roombasics_totalguests:formListing.roombasics_totalguests,
          //   roombasics_commonspacebeds:formListing.roombasics_commonspacebeds
          // };



    ipfsService.submitListing(formListing).then((ipfsHashStr)=>
    {

       var uuids= this.getBytes32FromIpfsHash(ipfsHashStr);
      return new Promise((resolve, reject) => {
       this.houseInfoListingContract.setProvider(window.web3.currentProvider);
       window.web3.eth.getAccounts((error, accounts) => {
       this.houseInfoListingContract.at(process.env.RentHouseListingAddress).then(function(instance){
         //最后改IPFS

         console.log("'"+uuids+"','"+formListing.price_perday+"','"+JSON.stringify(roominfo)+"','"+ipfsHashStr+"','332-0032'");
       return instance.setHouseInfo(

                                      uuids,
                                      formListing.price_perday,
                                      JSON.stringify(roominfo),//todo this should changed in production,too large
                                      ipfsHashStr,
                                      "332-0032",
                                      {from: accounts[0]});
      })
      .then((transactionReceipt) => {
          resolve(transactionReceipt.tx);
        })
        .catch((error) => {
          reject(error);
        })
    })
    })


    });
  	// var roominfo ={};
  	// roominfo.beds     = formListing.formData.beds;
  	// roominfo.category = formListing.formData.category;
  	// roominfo.location = formListing.formData.location;

 
  }

    getDistrictCodes() {
    return new Promise((resolve, reject) => {
      this.houseInfoListingContract.setProvider(window.web3.currentProvider)
      this.houseInfoListingContract.at(process.env.RentHouseListingAddress)
      .then((instance) => {
        return instance.getDistrictCode.call();
      })
      .then((districtCodes) => {
        resolve(districtCodes);
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
    })
  }

  getHomeRoomList(account) {
    return new Promise((resolve, reject) => {
      this.houseInfoListingContract.setProvider(window.web3.currentProvider)
      this.houseInfoListingContract.at(process.env.RentHouseListingAddress)
      .then((instance) => {
        return instance.getHostRoomLists.call(account);
      })
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
    return new Promise((resolve, reject) => {
      this.houseInfoListingContract.setProvider(window.web3.currentProvider)
      this.houseInfoListingContract.at(process.env.RentHouseListingAddress)
      .then((instance) => {
        return instance.getGuestOrders.call(account);
      })
      .then((preorderlists) => {
        resolve(preorderlists);
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
    })
  }

  getHostOrderList(account) {
    return new Promise((resolve, reject) => {
      this.houseInfoListingContract.setProvider(window.web3.currentProvider)
      this.houseInfoListingContract.at(process.env.RentHouseListingAddress)
      .then((instance) => {
        return instance.getHostOrders.call(account);
      })
      .then((orderLists) => {
        resolve(orderLists);
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
    })
  }

  getHouseId(districtCode){

  	 return new Promise((resolve, reject) => {
      this.houseInfoListingContract.setProvider(window.web3.currentProvider)
      this.houseInfoListingContract.at(process.env.RentHouseListingAddress)
      .then((instance) => {
        return instance.getUUIDS.call(districtCode);
      })
      .then((uuids) => {
        resolve(uuids);
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
    })
  }


  getHouseInfoDetail(uuid){
    return new Promise((resolve, reject) => {
      this.houseInfoListingContract.setProvider(window.web3.currentProvider);
      this.houseInfoListingContract.at(process.env.RentHouseListingAddress)
      .then((instance) => {
        return instance.getHouseInfo.call(uuid);
      })
      .then((houseInfo)  => {
         resolve(houseInfo)
      })
      .catch((error) => {
        reject(error)
      })
    })
 
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
