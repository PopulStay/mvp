pragma solidity ^0.4.18;



contract HouseInfoListing{
   address private tokenAddress;//tokenAddress used to pay 
   
   function HouseInfoListing(address _tokenAddress) public{
       tokenAddress = _tokenAddress;
   }
    
    
  struct HouseInfo {
    string  doorkey;
    string  houseaddress;
    uint    price;
    uint    contractdatetime;
    uint    state;//0 close , 1 open
    address owner;
    bytes32 ipfsHash;
  }
  //通过房东的address确定房屋信息uuid
  mapping ( bytes32 => HouseInfo ) private houseInfo;   //describ the house information
  mapping ( address => bytes32[] ) private uuids;       //every house info has one uuid,find house info by house owner address
                                                        //should add find house info by city street 
                                                        
                                                        
  //通过房屋信息uuid确定预定合约信息                                                        
  mapping ( bytes32 => address[] ) private PreOrders;   
                                                        //find preorders lists by house info uuid 
                                                        //find preOrder or order infomation from this connection 
  //通过房客address找到合约信息
  mapping (address => address[]) private GuestOrders;   //find guest orders by guest address
  
  //通过房东address找到合约信息
  mapping (address => address[]) private HouseOwnerOrders;//find house owner orders by house owner address
  
  function preOrder( address _owneraddress, bytes32 _houseinfo, uint _from, uint _to)
  public
  returns (bool success)
  {
      //1:new preOrder contract ,add house info , guest address, date from , date to etc info to preorder contract
      //2:transfer token to contract address
      //3:if step 2 successfully finished, add preOrder contract address to PreOrders lists
      uint transferPrice = (_to - _from) * houseInfo[_houseinfo].price;
     
      PreOrder preorder = new PreOrder( tokenAddress, _owneraddress,msg.sender,_houseinfo,_from,_to,0,transferPrice);
      
       if(Token(tokenAddress).transferFrom(msg.sender,preorder,transferPrice))//transfer token to contract address
         {
             
            PreOrders[_houseinfo].push(preorder); 
            GuestOrders[msg.sender].push(preorder);
            HouseOwnerOrders[_owneraddress].push(preorder);
            return true;
             
         }
         else
         {
             //transfer token failure
             return false;
         }
      
      
      return false;
      
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



contract PreOrder{
    address private tokenAddress;
    address private owneraddress;
    address private guestaddress;
    bytes32 private houseinfo;
    uint private from;
    uint private to;
    uint private status;//0:preorder 1: success  -1: cancel
    uint private price;
    
    
    function PreOrder(
                        address _tokenAddress, 
                        address _owneraddress,
                        address _guestaddress,
                        bytes32 _houseinfo,
                        uint _from, 
                        uint _to,
                        uint _status,
                        uint _price
                    ) 
    public{
        tokenAddress = _tokenAddress;
        owneraddress = _owneraddress;
        guestaddress = _guestaddress;
        houseinfo    = _houseinfo;
        from         = _from;
        to           = _to;
        status       = _status;
        price        = _price;
        
    }
    
    function confirmOrder()
    public
    returns(bool success)
    {
       if( msg.sender == guestaddress && status == 0)   
       {
            if(Token(tokenAddress).transferFrom(msg.sender,owneraddress,price))//transfer token to contract address
         {
             
            status = 1;
            return true;
             
         }
         else
         {
             //transfer token failure
             return false;
         }
           
       }
      //1 transfer token from contract address to guest address
      //2 if step 1 successfully finished, update info of preOrder contract
      //3 if step 1 successfully finished, remove order info from PreOrders lists
      return true;
   }
    
    bool private houseOwnerAgreeToCancel = false;
    bool private guestAgreeToCancel      = false;
    function cancelOrder()
    public
    returns(bool success)
    {
       //both of house owner and guest should be agreed to cancel this contract then the Token in this contract can send back

      //1 transfer token from contract address to guest address
      //2 if step 1 successfully finished, update info of preOrder contract
      return true;
   }

}

contract Token {

  event Transfer(address indexed from, address indexed to, uint tokens);
  event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

  function totalSupply() public constant returns (uint);
  function balanceOf(address tokenOwner) public constant returns (uint balance);
  function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
  function transfer(address to, uint tokens) public returns (bool success);
  function approve(address spender, uint tokens) public returns (bool success);
  function transferFrom(address from, address to, uint tokens) public returns (bool success);

}