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
      'RentHouseListingAddress':JSON.stringify("0xE8aE9ccfF1C38D6606ca58Da44d746140B21a73a"),
      'PPSAddress':JSON.stringify("0x0F7f8CA2C9B617B4dABB1a16c3e2dC5d83FAF907"),
      'Server_Address':JSON.stringify("http://localhost:1337/"),
      'WEB3_PROVIDER':JSON.stringify("https://mainnet.infura.io/FrDFhx3FbezOwQJjQv9T")
       // "https://kovan.infura.io/FrDFhx3FbezOwQJjQv9T";


    });
  return {'process.env': processEnv};
}

module.exports = getClientEnvironment;



