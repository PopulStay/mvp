pragma solidity ^0.4.18;

contract HouseInfoListing{
    
  struct HouseInfo {
    string  doorkey;
    string  houseaddress;
    uint    price;
    uint    contractdatetime;
    uint    state;//0 close , 1 open
    address owner;
    bytes32 ipfsHash;
  }
    
  mapping ( uint => HouseInfo ) private houseInfo;
  mapping ( address => uint[] ) private uuids;
  
   function setHouseInfo(uint _uuid, string _doorkey,string _houseaddress,uint _price,bytes32 _ipfsHash) 
   public 
   returns(bool success)
  {
    houseInfo[_uuid] = HouseInfo(
      {
        doorkey : _doorkey,
        houseaddress : _houseaddress,
        price   : _price,
        contractdatetime:block.timestamp,
        owner   : msg.sender,
        state   : 1,
        ipfsHash: _ipfsHash
      });
              
    uuids[msg.sender].push(_uuid);
    return true;
  }
    
    
  function getUUIDS(address houseowner)
    view
    public
    returns(uint[] _uuid)
  {
    return uuids[houseowner];
  }
    
  function getHouseInfo(uint _uuid)
    view
    public
    returns (string _houseaddress,uint _price, uint _contractdatetime, address _owner,uint _state,bytes32 _ipfsHash)
  {
    //check the contract list, the most important thing is that if state is 0, that means this house had been rented.
    return (
      houseInfo[_uuid].houseaddress,
      houseInfo[_uuid].price,
      houseInfo[_uuid].contractdatetime,
      houseInfo[_uuid].owner,
      houseInfo[_uuid].state,
      houseInfo[_uuid].ipfsHash
    );
  }
 
}