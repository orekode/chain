const func = async function (hre) {
    try {
        // Get the deployer account
        const [deployer] = await hre.getUnnamedAccounts();
        console.log("Deploying with account:", deployer);

        // Deploy the Burn contract
        const deployResult = await hre.deployments.deploy("Burn", {
            contract: "Burn",
            from: deployer,
            log: true,
            args: ["0x45AA107BeE8E86De51c613449EcF30A37090aaB1"], // B3TR token address
            gasLimit: 5000000,
            gasPrice: hre.ethers.utils.parseUnits("1", "gwei"),
        });

        // Get the deployed contract instance
        const burnContract = await hre.ethers.getContract("Burn", deployer);

        // Access deployed address
        const BurnDeployment = await hre.deployments.get("Burn");
        console.log("\nDeployment Summary:");
        console.log("-------------------");
        console.log("Burn Contract is deployed at:", BurnDeployment.address);
        console.log("B3TR Token Address:", await burnContract.b3trTokenAddress());
    } catch (error) {
        console.error("Deployment failed:", error);
        throw error;
    }
};

// Configure deployment
func.id = "burn-contract";
func.tags = ["burn"];
func.dependencies = [];

module.exports = func;