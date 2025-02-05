// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/IX2EarnRewardsPool.sol";

contract SecureBurn is Ownable(msg.sender), ReentrancyGuard {
    event NftTransfered(
        uint256 tokenId, 
        uint256 rewardAmount, 
        address nftContractAddress, 
        address target
    );

    IX2EarnRewardsPool public x2EarnRewardsPool;
    bytes32 public immutable VBD_APP_ID;
    uint256 public constant MAX_REWARD_AMOUNT = 1000 ether;

    constructor(address _x2EarnRewardsPoolAddress, bytes32 _vbdAppId) {
        require(_x2EarnRewardsPoolAddress != address(0), "Invalid pool address");
        x2EarnRewardsPool = IX2EarnRewardsPool(_x2EarnRewardsPoolAddress);
        VBD_APP_ID = _vbdAppId;
    }

    function nftTransfer(
        uint256 tokenId, 
        uint256 rewardAmount, 
        address nftContractAddress, 
        address target
    ) external nonReentrant {
        require(rewardAmount <= MAX_REWARD_AMOUNT, "Reward amount exceeds limit");
        require(target != address(0), "Invalid target address");

        IERC721 nftContract = IERC721(nftContractAddress);
        require(nftContract.ownerOf(tokenId) == msg.sender, "Not token owner");

        nftContract.safeTransferFrom(msg.sender, target, tokenId);
        
        x2EarnRewardsPool.distributeReward(
            VBD_APP_ID,
            rewardAmount,
            msg.sender,
            "" 
        );

        emit NftTransfered(tokenId, rewardAmount, nftContractAddress, target);
    }

    function updateRewardsPool(address newPoolAddress) external onlyOwner {
        require(newPoolAddress != address(0), "Invalid pool address");
        x2EarnRewardsPool = IX2EarnRewardsPool(newPoolAddress);
    }
}