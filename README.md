New version for front end development.

# PopulStay mvp
This is PopulStay's MVP. 
## Project Overview

PopulStay is a peer-to-peer home sharing network

## Core Technologies

If you're new to the space, it may be helpful to first familiarize yourself with some of the core technologies

 * [JSON Schema](http://json-schema.org/)
 * [IPFS](https://ipfs.io/)
 * [Ethereum](https://www.ethereum.org/)

## Install and run Demo DApp locally

1. Make sure you have `node` version 8.5.0 or greater
```
node --version
```

2. Download [truffle](http://truffleframework.com/):
```
npm install -g truffle
```
3. Clone Origin:
```
git clone https://github.com/PopulStay/mvp populstay-mvp && cd populstay-mvp
```
4. Start truffle:
```
truffle develop
```
 This will begin a new Ethereum blockchain. It will output 10 accounts that it has put 100 ETH into, and the mnemonic to generate them.

5. In the truffle console, type `migrate --reset`. This will compile our contracts and add them to the blockchain.

6. Install [Metamask Chrome Browser Extension](https://metamask.io/).

7. Click the Metamask icon in the toolbar, accept terms, and then click `Import Existing DEN`

8. Enter the seed phrase (Mnemonic):
```
candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```
 This is the default seed phrase for truffle development.

9. Click where it says "Ethereum Main Network", select "Custom RPC" and enter `http://localhost:9545/`. This takes us off of the real ETH blockchain and onto our local blockchain. Click the back arrow to return to your account.

 **Be careful not to mix up your test wallet with your real one on the Main Network.**

10. You should see your first test account now has 100 ETH. (Address of `0x627306090abaB3A6e1400e9345bC60c78a8BEf57`) Additional generated accounts will also have this amount.

11. In a new terminal tab, install and start the Origin node application.
```
npm install
npm run start
```

12. A browser will open to http://localhost:3000

13. Try it! Create a listing and post it to IPFS and Ethereum.

### Using Docker

1. Start container:
```
docker-compose up -d
```

2. Set up Metamask using steps 6-10 above.

3. Visit http://localhost:3000 in your browser.
