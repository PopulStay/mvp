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
      'IPFS_API_PORT': JSON.stringify("5002"),
      'IPFS_DOMAIN': JSON.stringify("https://ipfs.infura.io"),
      'RentHouseListingAddress':JSON.stringify("0x370fcc6e09a803634b60d52de9fb969face46a05"),
      'PPSAddress':JSON.stringify("0x7184589d0e38ebdcee9a8e046845d665bf33c782"),
      'Server_Address':JSON.stringify("http://localhost:1337/")

    });
  return {'process.env': processEnv};
}

module.exports = getClientEnvironment;



