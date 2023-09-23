// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.9.3/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.9.3/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts@4.9.3/access/Ownable.sol";

contract Olea is ERC20, Ownable {
    uint256 public constant BOND_PERCENTAGE = 1; // 1% annual bond distribution
    uint256 public constant bond_price = 100;
    uint256 public lastBondDistributionTime;
    uint256 public maximumAmount;
    //uint256 public total_Supply = 1000000;
    
    struct Lock {
        uint256 amount;
        bool issued25;
        bool issued50;
        bool issued75;
        bool issued100;
    }
    
    mapping(address => Lock) public locks;

    constructor(uint256 _maximumAmount, address _usdcAddress) {
        totalSupply = _maximumAmount; // Set the total supply during contract deployment
        maximumAmount = _maximumAmount;
        lastBondDistributionTime = block.timestamp;
        usdc = IERC20(_usdcAddress); // Initialize the USDC token contract
    }

    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    function buyTokens(uint256 amount) external payable {
        require(msg.value >= amount, "Insufficient ether sent");
        _mint(msg.sender, amount);
    }

    function distributeBonds() external onlyOwner { //Changer et distribuer en USDC et faire en sorte que le contrat stock des USDC
        uint256 currentTime = block.timestamp;
        require(currentTime >= lastBondDistributionTime + 365 days, "Bond distribution period not met yet");

        uint256 totalSupply = totalSupply();
        uint256 bondAmount = (totalSupply * BOND_PERCENTAGE) / 100;
        _mint(owner(), bondAmount);

        lastBondDistributionTime = currentTime;
    }
    
    function lockEther(uint256 amount) external payable {
        require(msg.value == amount, "Incorrect Ether amount sent");
        require(amount > 0, "Amount must be greater than zero");
        require(amount <= maximumAmount, "Amount exceeds maximum amount");
        
        Lock storage userLock = locks[msg.sender];
        userLock.amount += amount;
        
        if (userLock.amount >= (maximumAmount / 4) && !userLock.issued25) {
            userLock.issued25 = true;
            _mint(msg.sender, (maximumAmount / 4)); // Issue 25% of maximum amount as tokens
        }
        
        if (userLock.amount >= (maximumAmount / 2) && !userLock.issued50) {
            userLock.issued50 = true;
            _mint(msg.sender, (maximumAmount / 4)); // Issue another 25% of maximum amount as tokens
        }
        
        if (userLock.amount >= ((maximumAmount * 3) / 4) && !userLock.issued75) {
            userLock.issued75 = true;
            _mint(msg.sender, (maximumAmount / 4)); // Issue another 25% of maximum amount as tokens
        }
        
        if (userLock.amount >= maximumAmount && !userLock.issued100) {
            userLock.issued100 = true;
            _mint(msg.sender, (maximumAmount / 4)); // Issue the remaining 25% of maximum amount as tokens
        }
    }
}