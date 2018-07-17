function getClientEnvironment(publicUrl) {
  var processEnv =
    {
      'NODE_ENV': JSON.stringify('production'),
      'PUBLIC_URL': JSON.stringify(publicUrl),
      'IPFS_API_PORT': JSON.stringify("5001"),
      'IPFS_DOMAIN': JSON.stringify("ipfs.infura.io"),
      'RentHouseListingAddress':JSON.stringify("0x0b920e9d29e81d829bcdd6cc3a782f4389bdda31"),
      'PPSAddress':JSON.stringify("0x901c5be5768798217fd4ceefecc0c4e6c38ec684"),
      'Server_Address':JSON.stringify("http://133.130.99.204:1339/"),
      'Socket_Server':JSON.stringify("http://server.populstay.com/"),
      'Populstay_Wallet':JSON.stringify("0xB421ca5420dC2D6F0bf868c52ad1ff8614E68788"),
      'WEB3_PROVIDER':JSON.stringify("https://kovan.infura.io/FrDFhx3FbezOwQJjQv9T"),
      'Exchange_Contract':JSON.stringify("0xa88dd1ce8c1ffb87bf4a0dd097a674bf2b2530ef"),
      'Withdraw_fee':JSON.stringify("0.01")
    }

  return {'process.env': processEnv};

}

module.exports = getClientEnvironment;



