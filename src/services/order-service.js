import PreOrder   from '../../build/contracts/PreOrder.json';



class PreOrderService {
  constructor() 
  {
    this.contract = require('truffle-contract');
    this.PreOrderContract = this.contract(PreOrder);
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