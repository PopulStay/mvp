import axios from 'axios';

class ConfigurationService {
  static instance

  constructor() 
  {
    if(!sessionStorage.getItem('webtoken') )
    {
      localStorage.removeItem('wallet');
    }

    const NODE_ENV = 'production';
    const IPFS_API_PORT = "5001"
    const IPFS_DOMAIN = "ipfs.infura.io";
    const RentHouseListingAddress = "0x0b920e9d29e81d829bcdd6cc3a782f4389bdda31";
    const PPSAddress = "0x901c5be5768798217fd4ceefecc0c4e6c38ec684";
    const Server_Address = "http://133.130.99.204:1339/";
    const Socket_Server = "https://server.populstay.com";
    const Populstay_Wallet = "0xB421ca5420dC2D6F0bf868c52ad1ff8614E68788";
    const WEB3_PROVIDER = "https://kovan.infura.io/FrDFhx3FbezOwQJjQv9T";
    const Exchange_Contract = "0xa88dd1ce8c1ffb87bf4a0dd097a674bf2b2530ef";
    const Withdraw_fee = "0.01";

    return new Promise((resolve, reject) => {
        axios.get(Socket_Server+'/configuration')
        .then(function (response) {
            window.sessionStorage.setItem('Configuration',JSON.stringify(response.data))
          resolve(response.data);
        })
        .catch(function (error) {
        console.error(error);
        reject(error);
        });
      });

  }




 }



  const configurationService = new ConfigurationService()

export default ConfigurationService