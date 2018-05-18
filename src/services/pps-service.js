import PopulStayToken from '../../build/contracts/PopulStayToken.json';
import Web3 from 'web3';
import axios from 'axios';
const Buf = require('buffer/').Buffer ;
const EthereumTx = require('ethereumjs-tx');

var web_provider = process.env.WEB3_PROVIDER;
var PPS_address = process.env.PPSAddress;
var Populstay_Wallet = process.env.Populstay_Wallet;

class PPSService {
  static instance

  constructor() 
  {
    if (PPSService.instance) {
      return PPSService.instance
    }

    PPSService.instance = this;

    if(!window.web3loaded)
    {
      window.web3 = new Web3( new Web3.providers.HttpProvider(web_provider));
      window.web3loaded = true;
    }
  }


  getBalance(address) {
       var contract = new window.web3.eth.Contract(PopulStayToken.abi,PPS_address);
       return contract.methods.balanceOf(address).call();
  }


  deposit(size){
    return new Promise((resolve, reject) => {

          var contract = new window.web3.eth.Contract(PopulStayToken.abi,PPS_address);
          var dataobj = contract.methods.transfer( Populstay_Wallet , size ).encodeABI();

          window.web3.eth.getTransactionCount(window.address).then((txCount) =>{
                     
            var txData = {
                          nonce    : window.web3.utils.toHex(txCount),
                          gasLimit : window.web3.utils.toHex(4476768),
                          gasPrice : window.web3.utils.toHex(window.gas), // 10 Gwei
                          to       : PPS_address,
                          from     : window.address, 
                          data     : dataobj
                        }

            var pk = new Buf(window.privateKey.substr(2, window.privateKey.length), 'hex');
            var transaction =new EthereumTx(txData);
            transaction.sign(pk);
            var serializedTx = transaction.serialize().toString('hex');

            var params = {};
          
            params.transactionData = '0x' + serializedTx;
            params.id              = window.address;
            params.balance         = size;

            axios.post(process.env.Server_Address+'deposit', params)
            .then(function (response) {
            resolve(response);
            })
            .catch(function (error) {
            console.error(error)
            reject(error)
            });
                    
          });
      });
  }

  getDepositBalance(id){
    
      return new Promise((resolve, reject) => {
            axios.get(process.env.Server_Address+'deposit/'+id)
            .then(function (response) {
            resolve(response);
            })
            .catch(function (error) {
            console.error(error);
            reject(error);
            });
          });
  }

  getUsdOrderList(guestaddress){
    
      return new Promise((resolve, reject) => {
            axios.get(process.env.Server_Address+'book?state=2&guestaddress='+guestaddress)
            .then(function (response) {
            resolve(response);
            })
            .catch(function (error) {
            console.error(error);
            reject(error);
            });
          });
  }


  setOrderByUSD( hostaddress, usd, uuid, from, to, days ){
    return new Promise((resolve, reject) => {
     var params  = {};
     params.from = from;
     params.to   = to;
     params.days = days;  
     params.hostaddress  = hostaddress;
     params.price        = 0;
     params.ethprice     = 0;
     params.usdprice     = usd;
     params.guestaddress = window.address;
     params.houseinfoid  = uuid;

     axios.post(process.env.Server_Address+'payment', params)
      .then(function (response) {
      resolve(response.data);
      })
      .catch(function (error) {
      console.error(error)
      reject(error)
      });
    });
  }

  setPreOrder( hostaddress, totalTokens, uuid, from, to, days ) {
      return new Promise((resolve, reject) => {
       var contract = new window.web3.eth.Contract(PopulStayToken.abi,PPS_address);
       var dataobj= contract.methods.approveAndCall(
            process.env.RentHouseListingAddress,
            totalTokens,
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
       params.price        = totalTokens;
       params.ethprice     = 0;
       params.guestaddress = window.address;
       params.houseinfoid  = uuid;

       window.web3.eth.getTransactionCount(window.address).then(function(txCount) {
              var txData = {
                  nonce: window.web3.utils.toHex(txCount),
                  gasLimit: window.web3.utils.toHex(4476768),
                  gasPrice: window.web3.utils.toHex(4476768), // 10 Gwei
                  to: PPS_address,
                  from: window.address,
                  data: dataobj
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



  const ppsService = new PPSService()

export default ppsService