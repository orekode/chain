# VechainBurn NFT Transfer Contract

## Overview
VechainBurn is a smart contract for secure NFT transfers and reward distribution on the VeChainThor blockchain.

## Features
- Secure NFT transfer mechanism
- Owner-controlled reward pool management
- Fixed maximum reward amount
- VIP721 NFT standard compatibility

## Prerequisites
- VeChainThor blockchain
- VIP721 compatible NFT contract
- Solidity ^0.8.20

## Installation
1. Deploy contract with:
   - Rewards pool address
   - App-specific identifier

## Usage
### NFT Transfer
```solidity
function nftTransfer(
    uint256 tokenId, 
    uint256 rewardAmount, 
    address nftContractAddress, 
    address target
)
```

### Update Rewards Pool
```solidity
function updateRewardsPool(address newPoolAddress)
```

## Security Considerations
- Owner-only pool updates
- Maximum reward limit
- Ownership verification
- Address validation

## Dependencies
- @vechain/contracts

## License
MIT License