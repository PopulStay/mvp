import axios from 'axios';
const ipfsAPI = require('ipfs-api');
const MapCache = require('map-cache');

class IpfsService {
  static instance

  constructor() {
    if (IpfsService.instance) {
      return IpfsService.instance
    }

    // If connecting to a local IPFS daemon, set envionment variables
    // IPFS_DOMAIN = 127.0.0.1 and IPFS_API_PORT = 5001
    this.ipfsDomain = process.env.IPFS_DOMAIN ;
    this.ipfsApiPort = process.env.IPFS_API_PORT;
    this.ipfsGatewayPort = process.env.IPFS_GATEWAY_PORT;
    this.ipfsProtocol = 'https'

    this.ipfs = ipfsAPI(this.ipfsDomain, this.ipfsApiPort, {protocol: this.ipfsProtocol})
    // this.ipfs.swarm.peers(function(error, response) {
    //   if (error) {
    //     console.error("IPFS - Can't connect to the IPFS API.")
    //     console.error(error)
    //   }
    // })
    IpfsService.instance = this

    // Caching
    this.mapCache = new MapCache()
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
          this.mapCache.set(ipfsHashStr, formListingJson)
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
      if (this.mapCache.has(ipfsHashStr)) {
        resolve(this.mapCache.get(ipfsHashStr))
      }
      // Get from IPFS network
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
          this.mapCache.set(ipfsHashStr, res)
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
        resolve(res);
    });

  }   

  getListing(ipfsHashStr) {

    return new Promise((resolve, reject) => {
     this.getIPFSInfo(ipfsHashStr).then((res)=>{
      console.log("###########ipfsHashStr###############:",res);
      if(res && res.data && res.data.content)
      {
        resolve(res.data.content);
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
