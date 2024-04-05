// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voucher {
    address public owner;
    mapping(bytes32 => uint) public vouchers; // Mapping de hash de code à montants en wei

    constructor() {
        owner = msg.sender; 
    }

    modifier isOwner() {
        require(msg.sender == owner, "Seul le proprietaire peut executer cette operation");
        _;
    }

    function createVoucher(bytes32 _codeHash, uint _etherAmount) public payable  {
        require(_etherAmount > 0, "Le montant doit etre superieur a 0");
        uint _amountInWei = _etherAmount; //en wei
        require(vouchers[_codeHash] == 0, "Voucher deja existant");
        require(msg.value == _amountInWei, "Le montant d'ether envoye ne correspond pas au montant du voucher");
        
        vouchers[_codeHash] = _amountInWei;
    }

    // Fonction pour réclamer un voucher
    function claimVoucher(string memory _code) public {
        bytes32 codeHash = keccak256(abi.encodePacked(_code));
        uint amount = vouchers[codeHash];
        require(amount > 0, "Voucher invalide ou deja utilise");
        require(address(this).balance >= amount, "Contrat insuffisamment finance");
        
        vouchers[codeHash] = 0; 
        payable(msg.sender).transfer(amount);
    }


    receive() external payable {}

    // Fonction permettant au propriétaire de retirer les ethers du contrat
    function withdraw() public isOwner {
        payable(owner).transfer(address(this).balance);
    }
}