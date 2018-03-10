pragma solidity ^0.4.4;

contract RentHouse{
    
    struct RentContract{
        string doorkey;
        uint price;
        uint start;
        uint end;
        uint contractdatetime;
        uint state;//0 close , 1 open
        address owner;
       
    }
    
    mapping ( uint    => RentContract ) private rentContracts;
    mapping ( address => uint[] ) private uuids;
   
    function setRentContracts(uint _uuid, string _doorkey,uint _price,uint _start,uint _end) public returns  (bool success)
    {
        rentContracts[_uuid]
        = RentContract(
                                 {
                                    doorkey : _doorkey,
                                    price   : _price,
                                    start   : _start,
                                    end     : _end,
                                    contractdatetime:block.timestamp,
                                    owner   : msg.sender,
                                    state   : 1
                                }

              );
              
        uuids[msg.sender].push(_uuid);
        
        return true;
    }
    
    function getUUIDS(address houseowner) view public returns(uint[] _uuid) {
       return uuids[houseowner];
    }
    
    function getRentContract(uint _uuid)  view public returns (uint _price,uint _start, uint _end, uint _contractdatetime,address _owner,uint _state)  
    {
        
        //check the contract list, the most important thing is that if state is 0, that means this house had been rented.       
        return (
            rentContracts[_uuid].price, 
            rentContracts[_uuid].start,
            rentContracts[_uuid].end,
            rentContracts[_uuid].contractdatetime,
            rentContracts[_uuid].owner,
            rentContracts[_uuid].state
            );
    }
      
    event RentResult(string _doorkey, uint _price, uint _start, uint _end, uint _contractdatetime);
    
    function Rent(uint _uuid,address token) public returns (bool success)  {
        
         //remember to call Token.approve(this_contract_address,mount)
         //tranfer token to houseowner
         if(rentContracts[_uuid].state == 0)
         {
             //the contract had been closed
             return false;
         }
         
         
         if(Token(token).transferFrom(msg.sender,rentContracts[_uuid].owner,rentContracts[_uuid].price))
         {
             //set the contract to close
             rentContracts[_uuid].state = 0;
             RentResult (
                            rentContracts[_uuid].doorkey, 
                            rentContracts[_uuid].price, 
                            rentContracts[_uuid].start,
                            rentContracts[_uuid].end,
                            rentContracts[_uuid].contractdatetime
                            );
                            
            return true;
             
         }
         else
         {
             //transfer token failure
             return false;
         }
         
    }

}



contract Token {

    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);

}
