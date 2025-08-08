// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SkillToken
 * @dev ERC20 token for rewarding educational achievements
 */
contract SkillToken is ERC20, Ownable {
    
    // Maximum supply of tokens (10 million tokens with 18 decimals)
    uint256 public constant MAX_SUPPLY = 10_000_000 * 10**18;
    
    // Events
    event TokensRewarded(address indexed recipient, uint256 amount, string reason);
    
    constructor() ERC20("SkillToken", "SKILL") {
        // Mint initial supply to owner for distribution
        _mint(msg.sender, 1_000_000 * 10**18); // 1 million tokens initially
    }
    
    /**
     * @dev Mint new tokens to reward students (only owner can call)
     * @param recipient The address to receive tokens
     * @param amount The amount of tokens to mint (in wei)
     * @param reason The reason for the reward (for tracking)
     */
    function rewardTokens(address recipient, uint256 amount, string memory reason) public onlyOwner {
        require(recipient != address(0), "Cannot reward to zero address");
        require(amount > 0, "Amount must be greater than zero");
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed maximum supply");
        
        _mint(recipient, amount);
        emit TokensRewarded(recipient, amount, reason);
    }
    
    /**
     * @dev Batch reward tokens to multiple recipients
     * @param recipients Array of addresses to receive tokens
     * @param amounts Array of amounts corresponding to each recipient
     * @param reason The reason for the rewards
     */
    function batchReward(
        address[] memory recipients, 
        uint256[] memory amounts, 
        string memory reason
    ) public onlyOwner {
        require(recipients.length == amounts.length, "Arrays length mismatch");
        require(recipients.length > 0, "No recipients provided");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            rewardTokens(recipients[i], amounts[i], reason);
        }
    }
    
    /**
     * @dev Allow students to transfer tokens to each other
     * @param recipient The address to transfer tokens to
     * @param amount The amount of tokens to transfer
     * @return success Whether the transfer was successful
     */
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(recipient != address(0), "Cannot transfer to zero address");
        require(amount > 0, "Amount must be greater than zero");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        return super.transfer(recipient, amount);
    }
    
    /**
     * @dev Get token balance in a human-readable format
     * @param account The account to check balance for
     * @return The balance in tokens (not wei)
     */
    function getTokenBalance(address account) public view returns (uint256) {
        return balanceOf(account) / 10**18;
    }
    
    /**
     * @dev Emergency function to pause transfers (if needed)
     */
    function pause() public onlyOwner {
        // In a production environment, you might want to implement pausable functionality
        // For this simple example, we'll leave it as a placeholder
    }
    
    /**
     * @dev Function to check remaining mintable supply
     * @return The amount of tokens that can still be minted
     */
    function remainingMintableSupply() public view returns (uint256) {
        return MAX_SUPPLY - totalSupply();
    }
}