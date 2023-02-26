const { utils } = require("ethers");

const networkConfig = {
  // If needed, chain ID for New Goerli Alpha Testnet for Optimism Bedrock is 28528
  420: {
    name: "optimismGoerli",
  },
  10: {
    name: "optimismMainnet",
  },
};

const DECIMALS = "18";
const INITIAL_PRICE = "1600000000000000000000"; // For mock price feed and testing

module.exports = {
  networkConfig,
  DECIMALS,
  INITIAL_PRICE,
};
