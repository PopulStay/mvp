import HouseInfoListing from '../../build/contracts/HouseInfoListing.json'

var md5 = require('md5');//最后改IPFS
var address="0xfb88de099e13c3ed21f80a7a1e49f8caecf10df6";

class HouseInfoListingService {
  static instance

  constructor() 
  {
    if (HouseInfoListingService.instance) {
      return HouseInfoListingService.instance
    }

    HouseInfoListingService.instance = this;

    this.contract = require('truffle-contract')
    this.houseInfoListingContract = this.contract(HouseInfoListing)
  }

  submitListing(formListing) {
  	var roominfo ="{beds:"+formListing.formData.beds+
  				  ",category:"+formListing.formData.category+
  				  ",location:"+formListing.formData.location+
  				  "}";
    return new Promise((resolve, reject) => {
      this.houseInfoListingContract.setProvider(window.web3.currentProvider);
       window.web3.eth.getAccounts((error, accounts) => {
        this.houseInfoListingContract.at(address).then(function(instance){
        	//最后改IPFS
      	return instance.setHouseInfo(md5(roominfo),formListing.formData.price,roominfo,md5(roominfo),{from: accounts[0]});
      })
      .then((transactionReceipt) => {
          resolve(transactionReceipt.tx);
        })
        .catch((error) => {
          reject(error);
        })
    })
    })
  }

    getHostAddresses() {
    return new Promise((resolve, reject) => {
      this.houseInfoListingContract.setProvider(window.web3.currentProvider)
      this.houseInfoListingContract.at(address)
      .then((instance) => {
        return instance.getHouseOwnerAddresses.call();
      })
      .then((addresses) => {
        resolve(addresses);
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
    })
  }

  getHouseId(hostAddress){

  	 return new Promise((resolve, reject) => {
      this.houseInfoListingContract.setProvider(window.web3.currentProvider)
      this.houseInfoListingContract.at(address)
      .then((instance) => {
        return instance.getUUIDS.call(hostAddress);
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



  //   submitListing(formListing) {

  //   return new Promise((resolve, reject) => {

  //     const jsonBlob = {
  //       'schema': `http://localhost:3000/schemas/housing.json`,
  //       'data': formListing.formData,
  //     }

  //   	// Submit to IPFS
  //     ipfsService.submitListing(jsonBlob)
  //     .then((ipfsHash) => {
  //       console.log(`IPFS file created with hash: ${ipfsHash} for data:`)
  //       console.log(jsonBlob)

  // 	  	// Submit to ETH contract
  //       let units = 1; // TODO: Allow users to set number of units in form
  // 	    return contractService.submitListing(ipfsHash, formListing.formData.price, units)
  //     })
  //     .then((transactionReceipt) => {
  //       // Success!
  //       console.log(`Submitted to ETH blockchain with transactionReceipt.tx: ${transactionReceipt.tx}`)
  //       resolve(transactionReceipt.tx)
  //     })
  //     .catch((error) => {
  //       reject(`Failure: ${error}`)
  //     });

  //   });
  // }



    waitTransactionFinished(transactionReceipt, pollIntervalMilliseconds=1000) {
    return new Promise((resolve, reject) => {
      let txCheckTimer = setInterval(txCheckTimerCallback, pollIntervalMilliseconds);
      function txCheckTimerCallback() {
        window.web3.eth.getTransaction(transactionReceipt, (error, transaction) => {
          if (transaction.blockNumber != null) {
            console.log(`Transaction mined at block ${transaction.blockNumber}`)
            console.log(transaction)
            // TODO: Wait maximum number of blocks
            // TODO: Confirm transaction *sucessful* with getTransactionReceipt()

            // // TODO (Stan): Metamask web3 doesn't have this method. Probably could fix by
            // // by doing the "copy local web3 over metamask's" technique.
            // window.web3.eth.getTransactionReceipt(this.props.transactionReceipt, (error, transactionReceipt) => {
            //   console.log(transactionReceipt)
            // })

            clearInterval(txCheckTimer)
            // Hack to wait two seconds, as results don't seem to be
            // immediately available.
            setTimeout(()=>resolve(transaction.blockNumber), 2000)
          }
        })
      }
    })
  }






    gethouseInfoInstance() {
      this.houseInfoListingContract.setProvider(window.web3.currentProvider);
      this.houseInfoListingContract.at(address)
      .then(function(instance){
      	return instance.tokenAddress.call();
      })
      .then(function(object){
         console.log(object);
      });
    }

  }



  const houseInfoListingService = new HouseInfoListingService()

export default houseInfoListingService
