const { network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config.js");
const { verify } = require("../utils/verify.js");
const chainId = network.config.chainId;

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  let OPPrices;

  if (chainId == 31337) {
    log("-------------------------------------");
    const ethUSDAggregator = await deployments.get("MockV3Aggregator");
    const ethUSDPriceFeed_Mock = ethUSDAggregator.address;
    const args = [ethUSDPriceFeed_Mock];
    OPPrices = await deploy("OPPriceFeeds", {
      contract: "OPPriceFeeds",
      from: deployer,
      log: true,
      args: args,
      waitConfirmations: network.config.blockConfirmations || 1,
    });
  } else if (chainId == 10) {
    log("------------------------------------");
    OPPrices = await deploy("OPPriceFeeds", {
      contract: "OPPriceFeeds",
      from: deployer,
      log: true,
      waitConfirmations: network.config.blockConfirmations || 3,
    });
  }

  if (
    chainId != 31337 &&
    chainId != 420 &&
    process.env.OPTIMISM_ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(OPPrices.address);
  }
  log("-----------------------------------------------");
};

module.exports.tags = ["deploy", "mainnet-prices"];
