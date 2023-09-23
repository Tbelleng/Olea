// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.9.3/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.9.3/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts@4.9.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.3/token/ERC20/extensions/ERC20Snapshot.sol";

contract Olea is ERC20, ERC20Snapshot, Ownable {
    uint256 public constant bond_percentage = 1; // 1% annual bond distribution
    uint256 public bondPriceInUSDC;
    uint256 public maturityDate;
    uint256 public interestRate;
    uint256 public lastInterestPaymentDate;
    uint256 public lastBondDistributionTime;

    IERC20 public usdc;

    mapping(address => uint256) public initialInvestments;

    event InterestPaid(address indexed investor, uint256 amount);
    event BondMatured(address indexed investor, uint256 amount);
    event SnapshotTaken(uint256 id);

    address[] public bondHolders;

    constructor(
        uint256 _bondPriceInUSDC,
        uint256 _maturityDate,
        uint256 _interestRate,
        address _usdcAddress
    ) ERC20("GreenBond", "GB") {
        bondPriceInUSDC = _bondPriceInUSDC;
        maturityDate = _maturityDate;
        interestRate = _interestRate;
        lastInterestPaymentDate = block.timestamp;
        usdc = IERC20(_usdcAddress);
    }

    function snapshot() public onlyOwner {
        _snapshot();
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function buyBonds(uint256 usdcAmount) external {
    require(usdcAmount == bondPriceInUSDC, "Please send the exact bond price in USDC");
    usdc.transferFrom(msg.sender, address(this), usdcAmount);

    if (balanceOf(msg.sender) == 0) {
        bondHolders.push(msg.sender); // Ajouter à la liste seulement si c'est un nouvel acheteur
    }

    _mint(msg.sender, 1); // 1 bond token for simplicity
    initialInvestments[msg.sender] = usdcAmount;
    }

    function distributeInterest() external onlyOwner {
    uint256 currentTime = block.timestamp;
    require(currentTime >= lastInterestPaymentDate + 365 days, "Interest distribution period not met yet");

    uint256 snapshotId = _snapshot(); // Take a snapshot
    emit SnapshotTaken(snapshotId);

    for (uint256 i = 0; i < bondHolders.length; i++) {
        address investor = bondHolders[i];
        uint256 balance = balanceOfAt(investor, snapshotId);
        if (balance > 0) {
            uint256 interestAmount = (initialInvestments[investor] * interestRate) / 100;
            usdc.transfer(investor, interestAmount);
            emit InterestPaid(investor, interestAmount);
        }
    }

    lastInterestPaymentDate = currentTime;
    }

    function redeemBond() external {
        require(block.timestamp >= maturityDate, "Bond has not matured yet");
        uint256 bondAmount = balanceOf(msg.sender);
        require(bondAmount > 0, "No bonds to redeem");
        
        uint256 initialInvestment = initialInvestments[msg.sender];
        usdc.transfer(msg.sender, initialInvestment);
        _burn(msg.sender, bondAmount);
        emit BondMatured(msg.sender, initialInvestment);
    }
}