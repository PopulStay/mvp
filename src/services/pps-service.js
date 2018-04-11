import PopulStayToken   from '../../build/contracts/PopulStayToken.json';
import Web3 from 'web3';

var web_provider = process.env.WEB3_PROVIDER;
var PPS_address = process.env.PPSAddress;

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


    //   return new Promise((resolve, reject) => {
    //   this.PPSContract.setProvider(window.web3.currentProvider)
    //   window.web3.eth.getAccounts((error, accounts) => {
    //   this.PPSContract.at(process.env.PPSAddress)
    //   .then((instance) => {
    //         return instance.balanceOf.call(address);
    //     })
    //     .then((result) => {
    //       // Success
    //       resolve(result)
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //       reject(error)
    //     })
    //   })
    // })
  }


    setPreOrder( hostaddress, totalTokens, uuid, from, to, days) {
      return new Promise((resolve, reject) => {
      this.PPSContract.setProvider(window.web3.currentProvider)
      window.web3.eth.getAccounts((error, accounts) => {
      this.PPSContract.at(process.env.PPSAddress)
      .then((instance) => {
          return instance.approveAndCall(
            process.env.RentHouseListingAddress,
            totalTokens,
            hostaddress,
            uuid,
            from,
            to,
            days,
            {from: accounts[0], gas: 876790})
            
          
        })
        .then((transactionReceipt) => {
          // Success
          resolve(transactionReceipt)
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
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



  const ppsService = new PPSService()

export default ppsService