import Web3 from 'web3';
import {reactLocalStorage} from 'reactjs-localstorage';
var web_provider = process.env.WEB3_PROVIDER;


class Web3Service {
  static instance

  constructor() 
  {
    if (Web3Service.instance) {
      return Web3Service.instance
    }

    Web3Service.instance = this;  
  }

  getETHBalance(address){
    return window.web3.eth.getBalance(address);
  }

getBalanceForCharge(address, expectbalance, pollIntervalMilliseconds=1000) {
    return new Promise((resolve, reject) => {
      let txCheckTimer = setInterval(txCheckTimerCallback, pollIntervalMilliseconds);
      function txCheckTimerCallback() {
           window.web3.eth.getBalance(address).then((balance)=>{
  
            if (balance >= expectbalance ) {
              clearInterval(txCheckTimer);
              setTimeout(()=>resolve(balance), 2000);
            }
           });

            
      }
    });
  }

  loadWallet(){

    if(!window.web3loaded)
    {
      window.web3 = new Web3( new Web3.providers.HttpProvider(web_provider));
      window.web3loaded = true;
    }

    if( !window.address )
    {
      var obj =reactLocalStorage.getObject('wallet');
      if(obj && obj.address && obj.privateKey)
      {
          window.address = obj.address;
          window.privateKey = obj.privateKey;
          window.addressshow = obj.address.substring(0,10)+"...";
          window.gas = 4;
      }
    }
    
 }

}

  const web3Service = new Web3Service()
export default web3Service