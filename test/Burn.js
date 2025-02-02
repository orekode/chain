const { Driver, SimpleNet } = require("@vechain/connex.driver-nodejs");
const { Framework } = require("@vechain/connex-framework");
const contractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_tokenId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "payoutAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "target",
        "type": "address"
      }
    ],
    "name": "NftTransfered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "VBD_APP_ID",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "rewardAmount",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "nftContractAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "payoutAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "target",
        "type": "address"
      }
    ],
    "name": "nftTransfer",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "x2EarnRewardsPool",
    "outputs": [
      {
        "internalType": "contract IX2EarnRewardsPool",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const network = new SimpleNet("https://sync-testnet.vechain.org");
Driver.connect(network).then( driver => {

const connex = new Framework(driver);

console.log("waiting for auth :-)")
connex.vendor.sign("cert", {
  purpose: "identification",
  payload: {
    type: "text",
    content: "authentication"
  }
}).request().then( result => {
  console.log("I got here")

console.log(result)
nftTransferAbi = contractAbi.find(({name}) => name === "nftTransfer");

const clause = connex.thor.account("0xfc83e7ea0c26c631a7dac9e197d6eb5bc29076ee")
                          .method(nftTransferAbi)
                          .asClause([ 
                            1,  
                            10, 
                            "0x45aa107bee8e86de51c613449ecf30a37090aab1", 
                            "0x7a34a6fddcbbeeb3c3a1e9e7b337582cab351cc3", 
                            "0x7a34a6fddcbbeeb3c3a1e9e7b337582cab351cc3", 
                            "0x2cacbccee400c7d5f564115729e4484e936afd4e"
                          ]);
let result2 = connex.vendor.sign("tx", [clause]).comment("sending your nft bye bye");
console.log(result2);

});
});