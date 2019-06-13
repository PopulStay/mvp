pragma solidity ^0.4.18;

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



contract Exchange{
    
    address company_wallet;
    address owner;
    
   function Exchange()
   public{
        owner = msg.sender;
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
  
  modifier checkBalance(bytes32 _id ){
    require( Token( record[_id].token ).balanceOf(this) >= record[_id].size );
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
  
  // "0xccea2b92988be9170101408bd2cb10024f6ef28a9bcb22ed9a677c9ccb46cf82","0xca35b7d915458ef540ade6068dfe2f44e8fa733c",88,"0x692a70d2e424a56d2c6c27aa97d1a86395877b3a"
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
  
  
  function getTransactionFee(uint _size)
  public
  payable
  onlyOwner
  {
      owner.transfer(_size);
  }
  
  function withdraw(bytes32 _id)
  public
  payable
  checkUser( _id )
  checkBalance( _id )
  {
        if(Token( record[_id].token ).transfer( record[_id].useraddress,record[_id].size ))//transfer token to contract address
        {
                record[_id].state = 1;
        }
  }
  
  // "0xccea2b92988be9170101408bd2cb10024f6ef28a9bcb22ed9a677c9ccb46cf56","0xca35b7d915458ef540ade6068dfe2f44e8fa733c",88,"0x692a70d2e424a56d2c6c27aa97d1a86395877b3a"
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
  
  function getDepositList(address _useraddress)
  view
  public
  returns ( bytes32[] )
  {
      return depositList[_useraddress];
  }
  
  function getWithdrawList(address _useraddress)
  view
  public
  returns ( bytes32[] )
  {
      return withdrawList[_useraddress];
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

