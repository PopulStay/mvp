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
      'RentHouseListingAddress':JSON.stringify("0xe8ae9ccff1c38d6606ca58da44d746140b21a73a"),
      'PPSAddress':JSON.stringify("0x0f7f8ca2c9b617b4dabb1a16c3e2dc5d83faf907"),
      'Server_Address':JSON.stringify("http://133.130.99.204:1339/"),
      'WEB3_PROVIDER':JSON.stringify("https://kovan.infura.io/FrDFhx3FbezOwQJjQv9T")
       // "https://kovan.infura.io/FrDFhx3FbezOwQJjQv9T";
       //https://mainnet.infura.io/FrDFhx3FbezOwQJjQv9T

       

  


    });
  return {'process.env': processEnv};
}

module.exports = getClientEnvironment;



