import HouseInfoListing from '../../build/contracts/HouseInfoListing.json';
import ipfsService from '../services/ipfs-service';
import bs58 from 'bs58';
import axios from 'axios';
import Web3 from 'web3';
const Buf = require('buffer/').Buffer ;
const EthereumTx = require('ethereumjs-tx');
const web_provider = process.env.WEB3_PROVIDER;
const houselist_address = process.env.RentHouseListingAddress;


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

  setPreOrderByETH( hostaddress,ether, ethpriceGwei, uuid, from, to, days )
  {

    return new Promise((resolve, reject) => {
      var contract = new window.web3.eth.Contract( HouseInfoListing.abi,houselist_address );
      var dataobj  = contract.methods.preOrderByEth(
            window.address,
            hostaddress,
            uuid,
            from,
            to,
            days).encodeABI();

       var params  = {};
       params.from = from;
       params.to   = to;
       params.days = days;  
       params.hostaddress  = hostaddress;
       params.price        = 0;
       params.ethprice     = ether;
       params.guestaddress = window.address;
       params.houseinfoid  = uuid;

       window.web3.eth.getTransactionCount(window.address).then(function(txCount) {
              var txData = {
                  nonce: window.web3.utils.toHex(txCount),
                  gasLimit: window.web3.utils.toHex(4476768),
                  gasPrice: window.web3.utils.toHex(4476768), // 10 Gwei
                  to: houselist_address,
                  from: window.address,
                  data: dataobj,
                  value:ethpriceGwei * 1000000000
              };

              var pk = new Buf(window.privateKey.substr(2, window.privateKey.length), 'hex');
              var transaction =new EthereumTx(txData);
              transaction.sign(pk);
              var serializedTx = transaction.serialize().toString('hex');

              params.transactionData = '0x' + serializedTx;

              axios.post(process.env.Server_Address+'book', params)
              .then(function (response) {
              resolve(response.data.txhash);
              })
              .catch(function (error) {
              console.error(error)
              reject(error)
              });

    });  
  });
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
       var dataobj= contract.methods.setHouseInfo(
        uuids,
        formListing.price_perday,
        parseFloat(formListing.ETHprice_perday)*1000000000,
        JSON.stringify(roominfo),
        "0x3333322d30303332000000000000000000000000000000000000000000000000")
       .encodeABI();

         window.web3.eth.getTransactionCount(window.address).then(function(txCount) {
              var txData = {
                  nonce: window.web3.utils.toHex(txCount),
                  gasLimit: window.web3.utils.toHex(4476768),
                  gasPrice: window.web3.utils.toHex(4476768), // 10 Gwei
                  to: houselist_address,
                  from: window.address,
                  data: dataobj
              };

           
              var pk = new Buf(window.privateKey.substr(2, window.privateKey.length), 'hex');
              var transaction =new EthereumTx(txData);
              transaction.sign(pk);
              var serializedTx = transaction.serialize().toString('hex');


              var params = {};
              params.id              = uuids;
              params.price           = formListing.price_perday;
              params.districeCode    = "0x3333322d30303332000000000000000000000000000000000000000000000000";
              params.houseinfo       = JSON.stringify(roominfo);
              params.transactionData = serializedTx;
              params.hostAddress     = window.address;
              params.guests          = formListing.roombasics_guestsnumber;
              params.place           = formListing.roomtype_location;
              params.ethprice        = formListing.ETHprice_perday;
              params.usdprice        = formListing.USDprice_perday;
              params.profile         = { previewImage : formListing.selectedPictures[0].imagePreviewUrl };
              params.generateSmartContract = formListing.generate_smart_contract;
              params.roominfo        = roominfo;

              axios.post(process.env.Server_Address+'HouseInformation', params)
              .then(function (response) {
                resolve(response.data.txhash);
              })
              .catch(function (error) {
              console.error(error)
                reject(error)
              });
          });
      });
      });
 
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
       // var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address);
       // return contract.methods.getHostRoomLists(account).call();
      return new Promise((resolve, reject) => {
        axios.get(process.env.Server_Address+'HouseInformation?hostAddress='+account)
        .then((response)=> {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  
  getlocationtype(account){
    return new Promise((resolve, reject) => {
        axios.get(process.env.Server_Address+'HouseInformation?place='+account)
        .then((response)=> {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }




  getGuestPreorderList(account) {
       var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address);
       return contract.methods.getGuestOrders(account).call();
  }

  getHostOrderList(account) {

    var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address);
     return contract.methods.getHostOrders(account).call();
  }

   getHouseInfoById(id){

    return new Promise((resolve, reject) => {
      axios.get(process.env.Server_Address+'HouseInformation/'+id)
      .then((response)=> {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
    })


  }

    getRecommand(districtCode){

    return new Promise((resolve, reject) => {
      axios.get(process.env.Server_Address+'HouseInformation?districeCode='+districtCode)
      .then((response)=> {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
    })

   //   var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address)
   //   return contract.methods.getUUIDS(districtCode).call();
  }



  getHouseId(districtCode,from,to,guests,place){

     var url  = process.env.Server_Address+'HouseInformation?';

     if( place!=null || place !=undefined || place != null  || place !="undefined" )
     {
       url = url + 'place='+place;
     }

     if( guests!=null || guests !=undefined || guests != null  || guests !="undefined" )
     {
       url = url + '&guests='+guests;
     }

     if( to!=null || to !=undefined || to != null  || to !="undefined" )
     {
       url = url + '&to='+to;
     }

     if( from!=null || from !=undefined || from != null  || from !="undefined" )
     {
       url = url + '&from='+from;
     }

     if( districtCode!=null || districtCode !=undefined || districtCode != null  || districtCode !="undefined" )
     {
       url = url + '&districeCode='+districtCode;
     }
 

    return new Promise((resolve, reject) => {
      axios.get(url)
      .then((response)=> {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
    })

   //   var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address)
   //   return contract.methods.getUUIDS(districtCode).call();
  }


  getHouseInfoDetail(uuid){
     var contract = new window.web3.eth.Contract(HouseInfoListing.abi,houselist_address)
     return contract.methods.getHouseInfo(uuid).call();
 }


   getHouseInfoDetailFromDB(uuid){
      return new Promise((resolve, reject) => {
      axios.get(process.env.Server_Address+'HouseInformation/'+uuid)
      .then((response)=> {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
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
