require("@nomicfoundation/hardhat-toolbox");
require("@vechain/sdk-hardhat-plugin");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    vechain_testnet: {
      url: "https://sync-testnet.vechain.org",
      accounts: ['0x92ad83070c37bfbe68b0527c5423b3813cbef9db1006f1bd491bfdf3aad21804'],
      timeout: 100000, // 60 seconds
      gas: 500000000,
      gasPrice: 1000000000
    }
  }
};
