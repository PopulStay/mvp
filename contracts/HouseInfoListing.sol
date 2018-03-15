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
    
  mapping ( bytes32 => HouseInfo ) private houseInfo;//describ the house information
  mapping ( address => bytes32[] ) private uuids;//every house info has one uuid,find house info by house owner address
  //should add find house info by city street 
  mapping ( bytes32 => address[] ) private PreOrders;//find preorders lists by house info uuid 
                                                     // find preOrder or order infomation from this connection 
  
  function preOrder()
  public
  returns (bool success)
  {
      //1:new preOrder contract ,add house info , guest address, date from , date to etc info to preorder contract
      //2:transfer token to contract address
      //3:if step 2 successfully finished, add preOrder contract address to PreOrders lists
      
      return true;
      
  }
  
  function cancelOrder()
  public
  returns(bool success)
  {
      //1 transfer token from contract address to guest address
      //2 if step 1 successfully finished, update info of preOrder contract
      //3 if step 1 successfully finished, remove order info from PreOrders lists
       return true;
  }
  
  
   function setHouseInfo(bytes32 _uuid, string _doorkey,string _houseaddress,uint _price,bytes32 _ipfsHash) 
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
    returns(bytes32[] _uuid)
  {
    return uuids[houseowner];
  }
    
  function getHouseInfo(bytes32 _uuid)
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