pragma solidity ^0.4.18;

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

