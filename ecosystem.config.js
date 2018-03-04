module.exports = {
  apps : [
    {
      name      : 'PopulStay MVP',
      script    : 'scripts/start.js',
      
      env: {
        NODE_ENV: 'development'
      },

      // In production we're proxying IPFS through nginx
      // for SSL.
      env_production : {
        IPFS_API_PORT: "5002",
        IPFS_DOMAIN: "demo.originprotocol.com",  //TODO update
        NODE_ENV: 'production'
      }
    }
  ]

};

