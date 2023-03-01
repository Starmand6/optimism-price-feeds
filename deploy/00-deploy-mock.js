const {
  networkConfig,
  DECIMALS,
  INITIAL_PRICE,
} = require("../helper-hardhat-config.js");
const { network, ethers } = require("hardhat");
const chainId = network.config.chainId;

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  if (chainId == 31337) {
    log("Connected to Local network. Deploying price feed mock...");
    await deploy("MockV3Aggregator", {
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    });
    console.log("Mock Deployed!");
    log("-----------------------------------------------------------");
  }
};

module.exports.tags = ["deploy", "mock", "goerli-prices"];
