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
      'RentHouseListingAddress':JSON.stringify("0xd5e24bc3697a74e6c7caa88c5d855e0c1646518b"),
      'PPSAddress':JSON.stringify("0x7184589d0e38ebdcee9a8e046845d665bf33c782"),
      'Server_Address':JSON.stringify("http://133.130.99.204:1338/")

    });
  return {'process.env': processEnv};
}

module.exports = getClientEnvironment;



