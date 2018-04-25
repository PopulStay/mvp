pragma solidity ^0.4.18;
contract HouseInfoListing{
   address   public tokenAddress;//tokenAddress used to pay 
   bytes32[] private districtcode;//district code
   address   private contractowner;
   uint   public preOrderaddressfortest;

   function HouseInfoListing(address _tokenAddress)
   payable
   public{
       tokenAddress   = _tokenAddress;
       contractowner  = msg.sender; 
   }
   
   
 function setDistrictCode(bytes32 _districtcode) 
   public 
   returns(bool success)
  {
    if(msg.sender!= contractowner)
    return false;
    districtcode.push(_districtcode);
    return true;
  }
   
   function getDistrictCode() 
   public 
   view
   returns(bytes32[] _districtcode)
  {
    return districtcode;
  }
   
    
    
  struct HouseInfo {
    string  roominfo;
    uint    price;//PPS price
    uint    contractdatetime;
    uint    state;//0 close , 1 open
    address owner;
    uint    ethPrice;//Gwei
  
  }
  
  mapping ( address => bytes32[] ) private hostRoomList;//every house info has one uuid,find house info by host address
  mapping ( bytes32 => HouseInfo ) private houseInfo;   //describ the house information
  mapping ( bytes32 => bytes32[] ) private uuids;       //every house info has one uuid,find house info by districtcode
                                                        //should add find house info by city street 
  //通过房屋信息uuid确定预定合约信息                                                        
  mapping ( bytes32 => address[] ) private PreOrders;   
                                                        //find preorders lists by house info uuid 
                                                        //find preOrder or order infomation from this connection 
  //通过房客address找到合约信息
  mapping (address => address[]) private GuestOrders;   //find guest orders by guest address
  //通过房东address找到合约信息
  mapping (address => address[]) private HouseOwnerOrders;//find house owner orders by house owner address
  
  //preOrder by PPS
  function preOrder( address _guestaddress,address _hostaddress, bytes32 _houseinfo, uint _from, uint _to, uint _days)
  payable
  public
  returns (address _contractaddress)
  {
        uint transferPrice = _days * houseInfo[_houseinfo].price;
        PreOrder preorder = new PreOrder( tokenAddress , _hostaddress , _guestaddress , _houseinfo , _from , _to , _days , 0 , transferPrice , 0 );
        if(Token(tokenAddress).transferFrom(_guestaddress,preorder,transferPrice))//transfer token to contract address
        {
            PreOrders[_houseinfo].push(preorder); 
            GuestOrders[_guestaddress].push(preorder);
            HouseOwnerOrders[_hostaddress].push(preorder);
            return address(preorder);
        }
        return ;
  }
  
  modifier hasValueToPurchase( bytes32 _houseinfo, uint _days ) {
    require (msg.value >= ( _days * houseInfo[_houseinfo].ethPrice * 1000000000 ));
    _;
  }
  
  //"0xca35b7d915458ef540ade6068dfe2f44e8fa733c","0xca35b7d915458ef540ade6068dfe2f44e8fa733c","0x7465737431000000000000000000000000000000000000000000000000000000",3,4,1
  function preOrderByEth( address _guestaddress,address _hostaddress, bytes32 _houseinfo, uint _from, uint _to, uint _days)
  public
  payable
  hasValueToPurchase( _houseinfo,  _days ) 
  returns (address _preorder)
  {
    uint transferPrice = _days * houseInfo[_houseinfo].ethPrice;
    PreOrder preorder = new PreOrder( tokenAddress , _hostaddress , _guestaddress , _houseinfo ,  _from , _to , _days , 0 , 0 , transferPrice );
    preOrderaddressfortest = msg.value;
    if(  address(preorder).send(msg.value) )
    {
        PreOrders[_houseinfo].push(preorder); 
        GuestOrders[_guestaddress].push(preorder);
        HouseOwnerOrders[_hostaddress].push(preorder);
        return address(preorder);
    }
     return ;
  }
  
  //"test1",999,1000000000,"roominfo","0x3333322d30303332000000000000000000000000000000000000000000000000"
   function setHouseInfo(bytes32 _uuid,uint _price,uint _ethPrice,string _roominfo,bytes32 _districtcode) 
   public 
   returns(bool success)
  {
    houseInfo[_uuid] = HouseInfo(
      {
        roominfo: _roominfo,
        price   : _price,
        ethPrice: _ethPrice,
        contractdatetime:block.timestamp,
        owner   : msg.sender,
        state   : 1
      });
              
    uuids[_districtcode].push(_uuid);
    hostRoomList[msg.sender].push(_uuid);
    return true;
  }
  
  function getHostRoomLists(address _hostaddress)
    view
    public
    returns(bytes32[] _hostRoomList)
  {
    return hostRoomList[_hostaddress];
  }
    
    
  function getGuestOrders(address _guestaddress)
  view
  public
  returns (address[] _guestOrders)
  {
      return GuestOrders[_guestaddress];
  }
  
  function getHostOrders(address _hostaddress)
  view
  public
  returns (address[] _hostOrders)
  {
      return HouseOwnerOrders[_hostaddress];
  }
  
  function getPreorders(bytes32 _houseinfo)
  view
  public
  returns (address[] _preorders)
  {
      return PreOrders[_houseinfo];
  }
  
  function getUUIDS(bytes32 _districtcode)
    view
    public
    returns(bytes32[] _uuid)
  {
    return uuids[_districtcode];
  }
    
  function getHouseInfo(bytes32 _uuid)
    view
    public
    returns (uint _price,uint _ethPrice, uint _contractdatetime, address _owner,uint _state,string _roominfo)
  {
    //check the contract list, the most important thing is that if state is 0, that means this house had been rented.
    return (
      houseInfo[_uuid].price,
      houseInfo[_uuid].ethPrice,
      houseInfo[_uuid].contractdatetime,
      houseInfo[_uuid].owner,
      houseInfo[_uuid].state,
      houseInfo[_uuid].roominfo
    );
  }
 
}





contract PreOrder{
    address public tokenAddress;
    address public owneraddress;
    address public guestaddress;
    bytes32 public houseinfo;
    uint public from;
    uint public to;
    uint public rentDays;
    uint public status;//0:preorder 1: success  -1: cancel
    uint public price;
    uint public ethPrice;
    
    function () 
    public 
    payable {
    }
    

        
    function PreOrder (
                        address _tokenAddress, 
                        address _owneraddress,
                        address _guestaddress,
                        bytes32 _houseinfo,
                        uint _from,
                        uint _to,
                        uint _days,
                        uint _status,
                        uint _price,
                        uint _ethPrice
                    ) 
    public                
    payable 
    {
        tokenAddress = _tokenAddress;
        owneraddress = _owneraddress;
        guestaddress = _guestaddress;
        houseinfo    = _houseinfo;
        from         = _from;
        to           = _to;
        rentDays     = _days;
        status       = _status;
        price        = _price;
        ethPrice     = _ethPrice;
    }
    
    function getPreorderInfo()
    view
    public
    returns (
                address _tokenAddress, 
                address _owneraddress,
                address _guestaddress,
                bytes32 _houseinfo,
                uint _from,
                uint _to,
                uint _days,
                uint _status,
                uint _price,
                uint _ethPrice
            ) 
    {
    //check the contract list, the most important thing is that if state is 0, that means this house had been rented.
    return (
        tokenAddress ,
        owneraddress ,
        guestaddress ,
        houseinfo    ,
        from         ,
        to           ,
        rentDays     ,
        status       ,
        price        ,
        ethPrice
    );
    }
    
    
    
    function confirmOrder()
    public
    payable
    returns(bool success)
    {
       if( msg.sender == guestaddress && status == 0)   
       {
         if(Token(tokenAddress).transfer(owneraddress,price))//transfer token to contract address
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
   
    function confirmOrderByEth()
    public
    payable
    returns(bool success)
    {
        if( msg.sender == guestaddress && status == 0)   
       {
            if(owneraddress.send(ethPrice* 1000000000))//transfer token to contract address
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
    }
    bool private houseOwnerAgreeToCancel = false;
    bool private guestAgreeToCancel      = false;
//     function cancelOrder()
//     public
//     returns(bool success)
//     {
//       //both of house owner and guest should be agreed to cancel this contract then the Token in this contract can send back

//       //1 transfer token from contract address to guest address
//       //2 if step 1 successfully finished, update info of preOrder contract
//       return true;
//   }
    
    
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

