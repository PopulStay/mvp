import axios         from 'axios';
import PreOrder      from '../../build/contracts/PreOrder.json';
import Web3          from 'web3';
const  Buf           = require('buffer/').Buffer ;
const  EthereumTx    = require('ethereumjs-tx');
const  web_provider  = process.env.WEB3_PROVIDER;

class PreOrderService {
  constructor() 
  {
    this.contract = require('truffle-contract');
    this.PreOrderContract = this.contract(PreOrder);
  }



  confirm(address,ethOrPPS,from,to,houseinfoid){
  
       return new Promise((resolve, reject) => {
      var contract = new window.web3.eth.Contract(PreOrder.abi,address);
      
      var dataobj;
      if( ethOrPPS =='PPS')
      dataobj  = contract.methods.confirmOrder().encodeABI();

      if( ethOrPPS =='ETH' )
      dataobj  = contract.methods.confirmOrderByEth().encodeABI();  

      window.web3.eth.getTransactionCount(window.address).then(function(txCount) {
              var params = {};

              var txData = {
                              nonce      : window.web3.utils.toHex(txCount),
                              gasLimit   : window.web3.utils.toHex(4476768),
                              gasPrice   : window.web3.utils.toHex(window.gas*1000000), // 10 Gwei
                              to         : address,
                              from       : window.address,
                              data       : dataobj
              };

              var pk = new Buf(window.privateKey.substr(2, window.privateKey.length), 'hex')
              var transaction =new EthereumTx(txData);
              transaction.sign(pk);
              var serializedTx = transaction.serialize().toString('hex');
              var fromLen;
              var toLen;
              if(from.length<13){
                fromLen = from+"000";
                toLen = to+"000";
              }else{
                fromLen = from;
                toLen = to;
              }
              params.from            = fromLen;//+"000" in order to match data in DB
              params.to              = toLen;
              params.houseinfoid     = houseinfoid;
              params.address         = address;
              params.transactionData = '0x' + serializedTx;

              axios.post(process.env.Server_Address+'checkin/',params)
              .then((response)=> {
                //state:0准备提交。1 已经提交 2 已经写入以太链
                resolve(response);
              })
              .catch(function (error) {
                reject(error);
              });

          });
    });
  }



    getPreOrderInfo(address) {
       var contract = new window.web3.eth.Contract(PreOrder.abi,address);
       return contract.methods.getPreorderInfo().call();
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

const preOrderService = new PreOrderService()
export default preOrderService