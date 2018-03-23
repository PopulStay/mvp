import PreOrder   from '../../build/contracts/PreOrder.json';



class PreOrderService {
  constructor() 
  {
    this.contract = require('truffle-contract');
    this.PreOrderContract = this.contract(PreOrder);
  }

    confirm(address){

    return new Promise((resolve, reject) => {

      this.PreOrderContract.setProvider(window.web3.currentProvider);
      window.web3.eth.getAccounts((error, accounts) => {
      this.PreOrderContract.at(address)
      .then((instance) => {
        return instance.confirmOrder.call({from: accounts[0], gas: 876790});
      })
      .then((transactionReceipt) => {
        resolve(transactionReceipt);
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })

      })
    })
  }



    getPreOrderInfo(address) {
      return new Promise((resolve, reject) => {

      this.PreOrderContract.setProvider(window.web3.currentProvider)
      this.PreOrderContract.at(address)
      .then((instance) => {
        return instance.getPreorderInfo.call();
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.error(error)
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

const preOrderService = new PreOrderService()
export default preOrderService