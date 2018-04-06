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
      'RentHouseListingAddress':JSON.stringify("0x0b0083027863239fb72194a640bb0a9d476dc722"),
      'PPSAddress':JSON.stringify("0x7184589d0e38ebdcee9a8e046845d665bf33c782"),
      'Server_Address':JSON.stringify("http://localhost:1337/")

    });
  return {'process.env': processEnv};
}

module.exports = getClientEnvironment;



