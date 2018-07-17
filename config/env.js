var REACT_APP     = /^REACT_APP_/i;
var axios         = require('axios');
var Socket_Server = "http://server.populstay.com";

function getConfigData() {
  return new Promise(resolve => {
   axios.get(Socket_Server+'/configuration')
   .then((res)=>{
        resolve(res.data);
   });
  });
}

async function getClientEnvironment(publicUrl) {

  var config = await getConfigData();
  var configuration = {};
      
      for(var i =0;i < config.length;i++)
      {

        if(config[i].key ==='web3Provider')
        {
           configuration.web3Provider = config[i].value;
           
        }

        //get exchange address
        if(config[i].key ==='exchangeAddress')
        {
           configuration.exchangeAddress = config[i].value;
        }

        //get pps address
        if(config[i].key ==='ppsAddress')
        {
           configuration.ppsAddress = config[i].value;
        }

        //get etherscan url
        if(config[i].key ==='etherscan')
        {
           configuration.etherscan = config[i].value;
        }

              //get etherscan url
        if(config[i].key ==='PopulstayServer')
        {
           configuration.PopulstayServer = config[i].value;
        }

        if(config[i].key ==='houselistAddress')
        {
           configuration.houselistAddress = config[i].value;
        }

        if(config[i].key ==='IPFSDomain')
        {
           configuration.IPFSDomain = config[i].value;
        }

        if(config[i].key ==='IPFSPort')
        {
           configuration.IPFSPort = config[i].value;
        }

        if(config[i].key ==='SocketServer')
        {
           configuration.SocketServer = config[i].value;
        }
      }

  
  var processEnv = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key]);
      return env;
    }, 
    {
      'NODE_ENV': JSON.stringify('production'),
      'PUBLIC_URL': JSON.stringify(publicUrl),
      'IPFS_API_PORT': JSON.stringify(configuration.IPFSPort+""),
      'IPFS_DOMAIN': JSON.stringify(configuration.IPFSDomain+""),
      'RentHouseListingAddress':JSON.stringify(configuration.houselistAddress+""),
      'PPSAddress':JSON.stringify(configuration.ppsAddress+""),
      'Server_Address':JSON.stringify(configuration.PopulstayServer+""),
      'Socket_Server':JSON.stringify(configuration.SocketServer+""),
      'WEB3_PROVIDER':JSON.stringify(configuration.web3Provider+""),
      'Exchange_Contract':JSON.stringify(configuration.exchangeAddress+"")
    });

    console.log(processEnv);
    
  return {'process.env': processEnv};
}

module.exports = getClientEnvironment;



