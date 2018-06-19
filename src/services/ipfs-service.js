import axios from 'axios';
const ipfsAPI = require('ipfs-api');

class IpfsService {
  static instance

  constructor() {
    if (IpfsService.instance) {
      return IpfsService.instance
    }

    this.ipfsDomain = process.env.IPFS_DOMAIN ;
    this.ipfsApiPort = process.env.IPFS_API_PORT;
    this.ipfsGatewayPort = process.env.IPFS_GATEWAY_PORT;
    this.ipfsProtocol = 'https'

    this.ipfs = ipfsAPI(this.ipfsDomain, this.ipfsApiPort, {protocol: this.ipfsProtocol})
    IpfsService.instance = this;
  }

  submitListing(formListingJson) {
    return new Promise((resolve, reject) => {
      const file = {
        path: 'listing.json',
        content: JSON.stringify(formListingJson)
      }
      this.ipfs.files.add([file], (error, response) => {
        if (error) {
          console.error("Can't connect to IPFS.")
          console.error(error)
          reject('Can\'t connect to IPFS. Failure to submit listing to IPFS')
        }
        const file = response[0]
        const ipfsHashStr = file.hash
        if (ipfsHashStr) {
          resolve(ipfsHashStr)
        } else {
          reject('Failure to submit listing to IPFS')
        }
      })
    })
  }

 getIPFSInfo(id) {
      return new Promise((resolve, reject) => {
        axios.get(process.env.Server_Address+'ipfs/'+id)
        .then((response)=> {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  setIPFSInfo(content)
  {
        return new Promise((resolve, reject) => {
          axios.post(process.env.Server_Address+'ipfs', content)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            console.error(error);
            reject(error);
          });
        });


  }
  
  getListingFromIpfs(ipfsHashStr){

    return new Promise((resolve, reject) => {
     
      this.ipfs.files.cat(ipfsHashStr, (err, stream) => {
        if (err) {
          console.error(err)
          reject("Got ipfs cat err:" + err)
        }
        let res = ''
        stream.on('data', (chunk) => {
          res += chunk.toString()
        })
        stream.on('error', function (err) {
          reject("Got ipfs cat stream err:" + err)
        })
        stream.on('end', () => {
          resolve(res)
        })
      });
    });


  }



  getFromIPFSAndCache(ipfsHashStr,resolve)
  {
    this.getListingFromIpfs(ipfsHashStr).then((res)=>{
        var content = {};
        content.id      = ipfsHashStr;
        content.content = res;
        this.setIPFSInfo(content).then((res)=>{
          console.log(res);
        });
        
        resolve(JSON.parse(res));
    });

  }   

  getListing(ipfsHashStr) {

    return new Promise((resolve, reject) => {

    

     this.getIPFSInfo(ipfsHashStr).then((res)=>{
      console.log("###########ipfsHashStr###############:",res);
      if(res && res.data )
      {
        resolve(res.data);

         
      }else
      {
       this.getFromIPFSAndCache(ipfsHashStr,resolve);
      }
      
    }).catch( (error)=> {
      this.getFromIPFSAndCache(ipfsHashStr,resolve);
    });
  })
}


  gatewayUrlForHash(ipfsHashStr) {
    return (`${this.ipfsProtocol}://${this.ipfsDomain}:` +
      `${this.ipfsGatewayPort}/ipfs/${ipfsHashStr}`)
  }

}

const ipfsService = new IpfsService()

export default ipfsService
