const { ethers, utils } = require("hardhat");
const amount = "0.25";

async function sendTestnetEther(amount) {
  let accounts = await ethers.getSigners();
  deployer = accounts[0];
  ethersPhoenix = accounts[1];
  console.log("Sending Goerli testnet ETH to second testing account.");
  await deployer.sendTransaction({
    to: ethersPhoenix.address,
    value: ethers.utils.parseEther(amount),
  });
}

sendTestnetEther(amount)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports.tags = ["sendEther"];
