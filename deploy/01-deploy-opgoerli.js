const { network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config.js");
const { verify } = require("../utils/verify.js");
const chainId = network.config.chainId;

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  let OPGPrices;

  if (chainId == 31337) {
    log("-------------------------------------");
    const ethUSDAggregator = await deployments.get("MockV3Aggregator");
    const ethUSDPriceFeed_Mock = ethUSDAggregator.address;
    const args = [ethUSDPriceFeed_Mock];
    opGoerliPriceFeeds = await deploy("OPGoerliPriceFeeds", {
      contract: "OPGoerliPriceFeeds",
      from: deployer,
      log: true,
      args: args,
      waitConfirmations: network.config.blockConfirmations || 1,
    });
  } else if (chainId == 420) {
    log("------------------------------------");
    opGoerliPriceFeeds = await deploy("OPGoerliPriceFeeds", {
      contract: "OPGoerliPriceFeeds",
      from: deployer,
      log: true,
      waitConfirmations: network.config.blockConfirmations || 3,
    });
  }

  if (
    chainId != 31337 &&
    chainId != 10 &&
    process.env.OPTIMISM_ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(opGoerliPriceFeeds.address);
  }
  log("-----------------------------------------------");
};

module.exports.tags = ["deploy", "goerli-prices"];
