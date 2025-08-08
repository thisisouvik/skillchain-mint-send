// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title SkillBadge
 * @dev ERC721 NFT contract for educational achievement badges
 */
contract SkillBadge is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Mapping from token ID to badge name
    mapping(uint256 => string) public badgeNames;
    
    // Events
    event BadgeMinted(address indexed recipient, uint256 indexed tokenId, string badgeName);
    
    constructor() ERC721("SkillBadge", "SKILL") {}
    
    /**
     * @dev Mint a new badge NFT to a recipient
     * @param recipient The address to receive the badge
     * @param badgeName The name/description of the badge
     */
    function mintBadge(address recipient, string memory badgeName) public onlyOwner {
        require(recipient != address(0), "Cannot mint to zero address");
        require(bytes(badgeName).length > 0, "Badge name cannot be empty");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        badgeNames[tokenId] = badgeName;
        _safeMint(recipient, tokenId);
        
        emit BadgeMinted(recipient, tokenId, badgeName);
    }
    
    /**
     * @dev Get the badge name for a given token ID
     * @param tokenId The token ID to query
     * @return The badge name
     */
    function getBadgeName(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Badge does not exist");
        return badgeNames[tokenId];
    }
    
    /**
     * @dev Get all badges owned by an address
     * @param owner The address to query
     * @return tokenIds Array of token IDs owned by the address
     * @return names Array of badge names corresponding to the token IDs
     */
    function getBadgesByOwner(address owner) public view returns (uint256[] memory tokenIds, string[] memory names) {
        uint256 balance = balanceOf(owner);
        tokenIds = new uint256[](balance);
        names = new string[](balance);
        
        uint256 currentIndex = 0;
        uint256 totalSupply = _tokenIdCounter.current();
        
        for (uint256 i = 0; i < totalSupply; i++) {
            if (ownerOf(i) == owner) {
                tokenIds[currentIndex] = i;
                names[currentIndex] = badgeNames[i];
                currentIndex++;
            }
        }
    }
    
    /**
     * @dev Get the total number of badges minted
     * @return The total supply of badges
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Override tokenURI to return metadata
     * @param tokenId The token ID to get metadata for
     * @return The token URI (can be extended to return actual metadata)
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Badge does not exist");
        
        // In a real implementation, this would return a proper metadata URI
        // For now, we return a simple string with the badge name
        return string(abi.encodePacked("Badge: ", badgeNames[tokenId]));
    }
}