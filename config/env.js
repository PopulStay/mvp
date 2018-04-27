var REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  debugger;
  var processEnv = Object
    .keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce((env, key) => {
      env[key] = JSON.stringify(process.env[key]);
      return env;
    }, {
      'NODE_ENV': JSON.stringify('production'),
      'PUBLIC_URL': JSON.stringify(publicUrl),
      'IPFS_API_PORT': JSON.stringify("5001"),
      'IPFS_DOMAIN': JSON.stringify("ipfs.infura.io"),
      // 'IPFS_API_PORT': JSON.stringify("5002"),
      // 'IPFS_DOMAIN': JSON.stringify("gateway.originprotocol.com"),
      'RentHouseListingAddress':JSON.stringify("0x0b920e9d29e81d829bcdd6cc3a782f4389bdda31"),
      'PPSAddress':JSON.stringify("0x901c5be5768798217fd4ceefecc0c4e6c38ec684"),
      'Server_Address':JSON.stringify("http://133.130.99.204:1337/"),
      'WEB3_PROVIDER':JSON.stringify("https://kovan.infura.io/FrDFhx3FbezOwQJjQv9T")
       // "https://kovan.infura.io/FrDFhx3FbezOwQJjQv9T";
       //https://mainnet.infura.io/FrDFhx3FbezOwQJjQv9T

       

  


    });
  return {'process.env': processEnv};
}

module.exports = getClientEnvironment;



