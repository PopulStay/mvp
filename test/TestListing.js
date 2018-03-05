var Listing = artifacts.require("./Listing.sol")
var listingInstance

const initialListingsLength = 2
const ipfsHash = '0x6b14cac30356789cd0c39fec0acc2176c3573abdb799f3b17ccc6972ab4d39ba'

contract('Listing', function(accounts) {
  it("listing can be created and purchased", function() {
    return Listing.deployed().then(function(instance) {
      listingInstance = instance
      return listingInstance.create(ipfsHash, 2, {from: accounts[0]})
    })
    .then(function() {
      return listingInstance.listingsLength()
    })
    .then(function(length) {
      assert.equal(Number(length), initialListingsLength + 1, 'listings length has incremented')
    })
    .then(function() {
      return listingInstance.getListing(initialListingsLength)
    })
    .then(function([index, lister, ipfsHash, price]) {
      assert.equal(lister, accounts[0], 'lister is correct')
      assert.equal(ipfsHash, ipfsHash, 'ipfsHash is correct')
      assert.equal(Number(price), 2, 'price is correct')
    })
    .then(function() {
      return listingInstance.buyListing(initialListingsLength, 3, { from: accounts[1], value: 6 })
    })
    .then(function() {
      return listingInstance.listings(initialListingsLength)
    })
  })
})
