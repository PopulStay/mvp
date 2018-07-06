

contract exchange{
    
    address company_wallet;
    
    struct Record {
        address useraddress;
        uint  size;// price
        uint  side;// 0 deposit  1 withdraw
    }
  
   mapping ( bytes32 => Record ) private record;   //find account infomation through id
   mapping ( address => bytes32[] ) private recordList;//find recordList by user address
   
   
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
                    side        : 0
                });
                
                recordList[_useraddress].push(_id);
        }
  }
   
   
}