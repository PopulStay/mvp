import HouseInfoListing from '../../build/contracts/HouseInfoListing.json';

var RentHouseListingAddress = process.env.RentHouseListingAddress;
var PPSAddress              = process.env.PPSAddress;

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



  const guestService = new GuestService()

export default guestService