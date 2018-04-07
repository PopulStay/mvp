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
      'RentHouseListingAddress':JSON.stringify("0x8b5a4dd97d800a16a1625c7233b6073941ccd396"),
      'PPSAddress':JSON.stringify("0x5106570cc0128a926b42e2d4765d9ce814460a2a"),
      'Server_Address':JSON.stringify("http://133.130.99.204:1338/")

    });
  return {'process.env': processEnv};
}

module.exports = getClientEnvironment;



