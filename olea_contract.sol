// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Eloa token contract, this contract is used as an example
// Contract authors :
    //Lucien (https://github.com/lucienfer)
    //Thomas (https://github.com/0xTrinityy)
    //Axel (https://github.com/axelizsak)

import "@openzeppelin/contracts@4.9.3/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.9.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.3/token/ERC20/extensions/ERC20Snapshot.sol";

contract Olea is ERC20, ERC20Snapshot, Ownable {
    uint256 public constant bond_percentage = 1; // Here we set the percentage of the bond that will be distributed to the investors
    uint256 public bondPriceInEth; // Price of the bond in ETH
    uint256 public maturityDate; // Expiration date of the bond
    uint256 public interestRate;
    uint256 public lastInterestPaymentDate; //Interest payment date
    uint256 public lastBondDistributionTime; //Bond time distribution
    uint256 public max_seed_amount; // Max amount that the seed want to raise

    mapping(address => uint256) public initialInvestments;

    event InterestPaid(address indexed investor, uint256 amount);
    event BondMatured(address indexed investor, uint256 amount);
    event SnapshotTaken(uint256 id);

    address[] public bondHolders;

    // In this section, we define the constructor of the contract and all the value that we will be used in as parameters for the token.
    constructor(
        uint256 _bondPriceInEth,
        uint256 _maturityDate,
        uint256 _interestRate,
        uint256 _maxSeedAmount,
        uint256 _totalSupply
    ) ERC20("GreenBond", "GB") {
        bondPriceInEth = _bondPriceInEth;
        maturityDate = _maturityDate;
        interestRate = _interestRate;
        lastInterestPaymentDate = block.timestamp;
        max_seed_amount = _maxSeedAmount;
        _mint(msg.sender, _totalSupply);
    }

    function snapshot() public onlyOwner
    {
        _snapshot();
    }

    function getContractBalance() public view returns (uint256) 
    {
        return address(this).balance;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function distributeInterest() external onlyOwner {
    uint256 currentTime = block.timestamp;
    require(currentTime >= lastInterestPaymentDate + 365 days, "Interest distribution period not met yet");

    // interest period computing
    uint256 periodEnd = (currentTime > maturityDate) ? maturityDate : currentTime;
    uint256 interestPeriod = periodEnd - lastInterestPaymentDate;

    uint256 snapshotId = _snapshot();
    emit SnapshotTaken(snapshotId);

    for (uint256 i = 0; i < bondHolders.length; i++) 
    {
        address investor = bondHolders[i];
        uint256 balance = balanceOfAt(investor, snapshotId);
        if (balance > 0) {
            // Calculate the interest for the investor based on the interest period
            uint256 interestAmount = (initialInvestments[investor] * interestRate * interestPeriod) / (365 days * 100);
            payable(investor).transfer(interestAmount);
            emit InterestPaid(investor, interestAmount);
        }
    }

    lastInterestPaymentDate = currentTime;
    }

    function redeemBond() external 
    {
        require(block.timestamp >= maturityDate, "Bond has not matured yet");
        uint256 bondAmount = balanceOf(msg.sender);
        require(bondAmount > 0, "No bonds to redeem");
        
        uint256 initialInvestment = initialInvestments[msg.sender];
        payable(msg.sender).transfer(initialInvestment);
        _burn(msg.sender, bondAmount);
        emit BondMatured(msg.sender, initialInvestment);
    }

    //This function will be called every time a treshold is triggered, in order to issue interest to the investors
    modifier checkAndSendTokens() 
    {
        require(
            address(this).balance > (max_seed_amount / 4),
            "Contract balance is less than 25% of max_seed_amount"
        );
        _;
    }

    function InvestorToSeed(address recipient, uint256 amount) internal onlyOwner 
    {
        require(recipient != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");

        payable(recipient).transfer(amount);
    }
   
    function triggerSendTokens() external onlyOwner checkAndSendTokens {
        uint256 amountToSend = address(this).balance / 4;
        InvestorToSeed(msg.sender, amountToSend);
    }


    //1 ETH for 10 Eloa (GreenBond tokens) as example
    uint256 public constant exchangeRate = 10;

    // Event to log the swap
    event TokensSwapped(address indexed user, uint256 tokensSwapped, uint256 ethReceived);

    // Function to allow users to swap tokens for ETH
    function swapTokensForEth(uint256 tokenAmount) external 
    {
        require(tokenAmount > 0, "Token amount must be greater than zero");
        require(balanceOf(msg.sender) >= tokenAmount, "Not enough tokens in the user's balance");

        uint256 ethAmount = tokenAmount / exchangeRate;

        // Ensure the contract has enough ETH to perform the swap
        require(address(this).balance >= ethAmount, "Not enough ETH in the contract");

        _transfer(msg.sender, address(this), tokenAmount);

        payable(msg.sender).transfer(ethAmount);

        emit TokensSwapped(msg.sender, tokenAmount, ethAmount);

    }

    function sendFound() external onlyOwner
    {
        uint32 count = 0;

        for (uint8 i = 0; i < bondHolders.length; i++) 
        {
            uint256 total_amount = balanceOf(bondHolders[count]) * bondPriceInEth;
            _beforeTokenTransfer(owner(), bondHolders[count], total_amount);
        }
    }
    // Allowing contract to receive ETH

    // Function to deposit ETH
    receive() external payable 
    {
        emit EtherReceived(msg.sender, msg.value);
    }

    // Function to withdraw Ether from the contract (only owner)
    function withdrawEther(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient contract balance");
        payable(owner()).transfer(amount);
    }

    // Event to log received Ether
    event EtherReceived(address indexed sender, uint256 value);


}