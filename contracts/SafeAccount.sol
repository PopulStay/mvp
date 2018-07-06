contract exchange{
    
    address company_wallet;
    
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
  
  modifier checkUser( bytes32 _id ) {
    require ( msg.sender == record[_id].useraddress && record[_id].state == 0 );
    _;
  }
   
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
   
   
}
