pragma solidity ^0.4.0;

/*
MaroCoin issued by the creatro and transfered to anyone 
*/

contract MaroCoin {
    address public creator;
    mapping  (address  => uint) public balances

    //even that notifies when the transfer is completed
    event Delivered(address from, address to, uint amount);

    function MaroCoin() {
        creator = msg.sender;
    }

    function create(address receiver, uint amount) {
        if (msg.sender != creator) throw;
        balances[receiver] += amount;
    }

    function transfer(address receiver, unit amout) {
        if (balances[msg.sender] < amount) throw;
        balances[msg.sender] -= amount;
        balances[receiver] += amout;
        Delivered(msg.sender, receiver, amount);
    }
}
