
const { ethers } = require("hardhat");


async function main() {
  // Replace these with your actual values:
  // 1. The address of the rewards pool contract that implements IX2EarnRewardsPool
  const rewardsPoolAddress = "0xbf64cf86894Ee0877C4e7d03936e35Ee8D8b864F"; // e.g., "0x1234567890abcdef..."
  
  // 2. The VBD_APP_ID as a bytes32 value.
  // You can convert a string to bytes32 using ethers.utils.formatBytes32String.
  // For example, to use "MyAppID" as your app id:
  const VBD_APP_ID = "0xc291653ba805835d6ab0788ff65162c8f41fd6c776b73c386cb38d19ff4095d4";

  // Get the contract factory for the Burn contract.
  const Burn = await ethers.getContractFactory("Burn");

  console.log("Deploying Burn contract...");

  // Deploy the Burn contract with the required constructor arguments.
  const burn = await Burn.deploy();

  // Wait for the deployment transaction to be mined.
  await burn.waitForDeployment();

  const deployedAddress = await burn.getAddress();

  console.log("Deployment successful!");
  console.log("Contract address:", deployedAddress);
  
  // Optional: Log the transaction hash
  console.log("Deployment transaction hash:", burn.deploymentTransaction().hash);

  // Return the address in case you want to use it in tests
  return deployedAddress;
}

// Run the deploy script
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });
