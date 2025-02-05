# SecureBurn Smart Contract

## Overview
SecureBurn enables secure NFT transfers with integrated reward distribution through X2Earn Rewards Pool.

## Features
- NFT transfers with reward distribution
- Reentrancy protection
- Owner-controlled rewards pool
- Maximum reward limit (1000 ether)

## Contract Functions

### nftTransfer
Transfers NFT and distributes rewards.
```solidity
function nftTransfer(
    uint256 tokenId,
    uint256 rewardAmount,
    address nftContractAddress,
    address target
)
```

### updateRewardsPool
Updates X2Earn rewards pool address (owner only).
```solidity
function updateRewardsPool(address newPoolAddress)
```

## Security Features
- ReentrancyGuard implementation
- Owner-restricted functions
- Address validation
- Reward amount limits
- NFT ownership verification

## Dependencies
- @openzeppelin/contracts v4.x
  - ERC721
  - Ownable
  - ReentrancyGuard

## Setup
Deploy with:
- X2Earn rewards pool address
- VBD app ID (bytes32)

## Events
- `NftTransfered`: Emitted after successful NFT transfer and reward distribution

## License
MIT