//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";  // Import ERC721
import "./interfaces/IX2EarnRewardsPool.sol";

contract Burn {
    event NftTransfered(uint256 _tokenId, uint256 rewardAmount, address nftContractAddress, address target);

    IX2EarnRewardsPool public x2EarnRewardsPool;
    bytes32 public VBD_APP_ID;

    constructor() {
        // Set the contract address for x2EarnRewardsPool
        x2EarnRewardsPool = IX2EarnRewardsPool(0x5F8f86B8D0Fa93cdaE20936d150175dF0205fB38);
        // Convert the string to bytes32 for VBD_APP_ID
        VBD_APP_ID = 0xc291653ba805835d6ab0788ff65162c8f41fd6c776b73c386cb38d19ff4095d4;
    }


    function nftTransfer(uint256 tokenId, uint256 rewardAmount, address nftContractAddress, address target) external payable {
        
        IERC721 nftContract = IERC721(nftContractAddress);
        
        // Ensure the 'from' address owns the NFT
        require(nftContract.ownerOf(tokenId) == msg.sender, "You are not the owner of this token");

        nftContract.safeTransferFrom(msg.sender, target, tokenId);

        x2EarnRewardsPool.distributeReward(
            VBD_APP_ID,
            rewardAmount  * 100,
            msg.sender,  // the user calling the claimReward function
            "" // Generate a unique proof
        );
        
        emit NftTransfered(tokenId, rewardAmount, nftContractAddress, target);

    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(42);
        s[0] = "0";
        s[1] = "x";
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            s[2+i*2] = char(uint8(b) / 16);
            s[3+i*2] = char(uint8(b) % 16);
        }
        return string(s);
    }

    function char(uint8 b) internal pure returns (bytes1 c) {
        if (b < 10) return bytes1(b + 48);
        else return bytes1(b + 87);
    }

    function getOwner(uint256 tokenId, address nftContractAddress, address owner) public view returns (address) {

        IERC721 nftContract = IERC721(nftContractAddress);
        
        require(
            nftContract.ownerOf(tokenId) == msg.sender, 
            string(abi.encodePacked(
                "Sender (", toAsciiString(msg.sender), 
                ") must be the owner (", toAsciiString(nftContract.ownerOf(tokenId)), ") of this token"
            ))
        );
        
        // If you need to verify against a specific owner parameter
        require(msg.sender == owner, "Sender must match the specified owner");

        return msg.sender;
    }
}