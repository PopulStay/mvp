pragma solidity ^0.4.18;


library SafeMath {

  function add(uint a, uint b)
    internal
    pure
    returns (uint c)
  {
    c = a + b;
    require(c >= a);
  }

  function sub(uint a, uint b)
    internal
    pure
    returns (uint c)
  {
    require(b <= a);
    c = a - b;
  }

  function mul(uint a, uint b)
    internal
    pure
    returns (uint c)
  {
    c = a * b;
    require(a == 0 || c / a == b);
  }

  function div(uint a, uint b)
    internal
    pure
    returns (uint c)
  {
    require(b > 0);
    c = a / b;
  }

}


contract ERC20Interface {

  event Transfer(address indexed from, address indexed to, uint tokens);
  event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

  function totalSupply() public constant returns (uint);
  function balanceOf(address tokenOwner) public constant returns (uint balance);
  function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
  function transfer(address to, uint tokens) public returns (bool success);
  function approve(address spender, uint tokens) public returns (bool success);
  function transferFrom(address from, address to, uint tokens) public returns (bool success);

}


contract Owned {

  event OwnershipTransferred(address indexed _from, address indexed _to);

  address public owner;
  address public newOwner;

  modifier onlyOwner {
    require(msg.sender == owner);
    _;
  }

  function Owned()
    public
  {
    owner = msg.sender;
  }

  function transferOwnership(address _newOwner)
    public
    onlyOwner
  {
    newOwner = _newOwner;
  }

  function acceptOwnership()
    public
  {
    require(msg.sender == newOwner);
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
    newOwner = address(0);
  }

}

contract PopulStayToken is ERC20Interface, Owned {

  using SafeMath for uint;

  string public symbol;
  string public  name;
  uint8 public decimals;
  uint public _totalSupply;

  mapping(address => uint) balances;
  mapping(address => mapping(address => uint)) allowed;

  function PopulStayToken()
    public
  {
    symbol = "PPS";
    name = "PopulStay Token";
    decimals = 18;
    _totalSupply = 5000000000;
    balances[owner] = _totalSupply;
    emit Transfer(address(0), owner, _totalSupply);
  }

  function totalSupply()
    public
    constant
    returns (uint)
  {
    return _totalSupply  - balances[address(0)];
  }

  function balanceOf(address tokenOwner)
    public
    constant
    returns (uint balance)
  {
    return balances[tokenOwner];
  }


  function transfer(address to, uint tokens)
    public
    returns (bool success)
  {
    balances[msg.sender] = balances[msg.sender].sub(tokens);
    balances[to] = balances[to].add(tokens);
    emit Transfer(msg.sender, to, tokens);
    return true;
  }


  // ------------------------------------------------------------------------
  // Token owner can approve for `spender` to transferFrom(...) `tokens`
  // from the token owner's account
  //
  // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
  // recommends that there are no checks for the approval double-spend attack
  // as this should be implemented in user interfaces
  // ------------------------------------------------------------------------
  function approve(address spender, uint tokens)
    public
    returns (bool success)
  {
    allowed[msg.sender][spender] = tokens;
    emit Approval(msg.sender, spender, tokens);
    return true;
  }


  // ------------------------------------------------------------------------
  // Transfer `tokens` from the `from` account to the `to` account
  //
  // The calling account must already have sufficient tokens approve(...)-d
  // for spending from the `from` account and
  // - From account must have sufficient balance to transfer
  // - Spender must have sufficient allowance to transfer
  // - 0 value transfers are allowed
  // ------------------------------------------------------------------------
  function transferFrom(address from, address to, uint tokens)
    public
    returns (bool success)
  {
    balances[from] = balances[from].sub(tokens);
    allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
    balances[to] = balances[to].add(tokens);
    emit Transfer(from, to, tokens);
    return true;
  }


  // ------------------------------------------------------------------------
  // Returns the amount of tokens approved by the owner that can be
  // transferred to the spender's account
  // ------------------------------------------------------------------------
  function allowance(address tokenOwner, address spender)
    public
    constant
    returns (uint remaining)
  {
    return allowed[tokenOwner][spender];
  }


  // ------------------------------------------------------------------------
  // Token owner can approve for `spender` to transferFrom(...) `tokens`
  // from the token owner's account. The `spender` contract function
  // `receiveApproval(...)` is then executed
  // ------------------------------------------------------------------------
    function approveAndCall(address spender, uint tokens, address _owneraddress, bytes32 _houseinfo, uint _from, uint _to ,uint _days)
     public
    returns (address _preorder)
  {
    allowed[msg.sender][spender] = tokens;
    emit Approval(msg.sender, spender, tokens);
    return HouseInfoListing(spender).preOrder(msg.sender,_owneraddress, _houseinfo, _from, _to,_days);
  }


  // ------------------------------------------------------------------------
  // Don't accept ETH
  // ------------------------------------------------------------------------
  function ()
    public
    payable
  {
    revert();
  }


  // ------------------------------------------------------------------------
  // Owner can transfer out any accidentally sent ERC20 tokens
  // ------------------------------------------------------------------------
  function transferAnyERC20Token(address tokenAddress, uint tokens)
    public
    onlyOwner
    returns (bool success)
  {
    return ERC20Interface(tokenAddress).transfer(owner, tokens);
  }

}




























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
  
  //通过房屋信息uuid确定预定合约信息                                                        
  mapping ( bytes32 => address ) private AddressPreOrder; 
  
 
  
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
            AddressPreOrder[_houseinfo] = address(preorder);
            return address(preorder);
        }
        return ;
  }
  
  modifier hasValueToPurchase( bytes32 _houseinfo, uint _days ) {
    require (msg.value >= ( _days * houseInfo[_houseinfo].ethPrice * 1000000000));
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
    
    if(  address(preorder).send(transferPrice) )
    {
        PreOrders[_houseinfo].push(preorder); 
        GuestOrders[_guestaddress].push(preorder);
        HouseOwnerOrders[_hostaddress].push(preorder);
        AddressPreOrder[_houseinfo] = address(preorder);
        return address(preorder);
    }
     return ;
  }
  
  //"0xccea2b92988be9170101408bd2cb10024f6ef28a9bcb22ed9a677c9ccb46cf87",999,1000000000,"roominfo","0x3333322d30303332000000000000000000000000000000000000000000000000"
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
  
    function getOrderAddressByID(bytes32 _id)
    view
    public
    returns(address _orderAddress)
  {
    return AddressPreOrder[_id];
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
            if(owneraddress.send(ethPrice* 100000000))//transfer token to contract address
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


contract exchange{
    
    address company_wallet;
    address owner;
    
   function exchange(address _owner)
   public{
        owner = _owner;
   }
    
    struct Record {
        address useraddress;
        uint  size;// price
        uint  side;// 0 deposit  1 withdraw
        address token;
        uint state;
    }
  
   mapping ( bytes32 => Record ) private record;   //find account infomation through id
   mapping ( address => bytes32[] ) private depositList;//find depositList by user address
   mapping ( address => bytes32[] ) private withdrawList;//find withdrawList by user address
   
   modifier onlyCompanyWallet{
    require(msg.sender == company_wallet);
    _;
  }
  
  modifier onlyOwner{
    require(msg.sender == owner);
    _;
  }
  
  modifier checkUser( bytes32 _id ) {
    require ( msg.sender == record[_id].useraddress && record[_id].state == 0 );
    _;
  }
  
  function setCompanyWallet( address _wallet)
  public
  onlyOwner
  {
      company_wallet = _wallet;
  }
  
  // "0xccea2b92988be9170101408bd2cb10024f6ef28a9bcb22ed9a677c9ccb46cf82","0x14723a09acff6d2a60dcdf7aa4aff308fddc160c",88,"0x692a70d2e424a56d2c6c27aa97d1a86395877b3a"
  function deposit(bytes32 _id, address _useraddress,uint _size,address _tokenAddress)
  public
  payable
  {
        //remember to call Token(address).approve(this, amount) or this contract will not be able to do the transfer on your behalf.
        if(Token(_tokenAddress).transferFrom(_useraddress,company_wallet,_size))//transfer token to contract address
        {
                record[_id] = Record(
                {
                    useraddress : _useraddress,
                    size        : _size,
                    side        : 0,
                    token       : _tokenAddress,
                    state       : 0
                });
                
                depositList[_useraddress].push(_id);
        }
  }
  
  function withdraw(bytes32 _id)
  public
  payable
  checkUser( _id )
  {
        if(Token( record[_id].token ).transfer( record[_id].useraddress,record[_id].size ))//transfer token to contract address
        {
                record[_id].state = 1;
        }
  }
  
  // "0xccea2b92988be9170101408bd2cb10024f6ef28a9bcb22ed9a677c9ccb46cf56","0x14723a09acff6d2a60dcdf7aa4aff308fddc160c",88,"0x692a70d2e424a56d2c6c27aa97d1a86395877b3a"
  function approveWithdraw(bytes32 _id,address _useraddress,uint _size,address _tokenAddress)
  public
  onlyCompanyWallet
  {
        record[_id] = Record(
                {
                    useraddress : _useraddress,
                    size        : _size,
                    side        : 1,
                    token       : _tokenAddress,
                    state       :0
                });
                
        withdrawList[_useraddress].push(_id);
      
  }
  
  function getDepositList(address _hostaddress)
  view
  public
  returns ( bytes32[] )
  {
      return depositList[_hostaddress];
  }
  
  function getWithdrawList(address _hostaddress)
  view
  public
  returns ( bytes32[] )
  {
      return withdrawList[_hostaddress];
  }
  
    function getRecord(bytes32 _id)
    view
    public
    returns (
                 address useraddress, uint size , uint side , address token,uint state  
            ) 
    {
        return (
                    record[_id].useraddress,
                    record[_id].size,
                    record[_id].side,
                    record[_id].token,
                    record[_id].state
              );
    }
}



