const { ethers, network } = require("hardhat");
const { assert, expect } = require("chai");
const { utils } = require("ethers");
const chainId = network.config.chainId;

if (chainId == 420) {
  describe.skip("Optimism - Goerli Price Feeds Staging Tests for DOGE Adding", function () {
    let opGoerliPriceFeeds, dogeMaxi, dogeMaxiCalling;

    beforeEach(async function () {
      accounts = await ethers.getSigners();
      dogeMaxi = accounts[1];

      opGoerliPriceFeeds = await ethers.getContract("OPGoerliPriceFeeds");
      dogeMaxiCalling = opGoerliPriceFeeds.connect(dogeMaxi);
    });

    describe("imALittleMemeZealot()", function () {
      // For mainnet deployment, the required payment will be 1 ETH.
      // Since that is a metric ton of testnet ETH, reducing to 0.01 ETH
      // for testing purposes.
      it("reverts if amount sent is less than 0.01 ETH", async function () {
        await expect(
          dogeMaxiCalling.imALittleMemeZealot({
            value: utils.parseEther("0.001"),
          })
        ).to.be.revertedWith(
          "Obviously, Dogecoin isn't worth that much to you."
        );
      });
      it("emits an event and adds DOGE correctly", async function () {
        await expect(
          dogeMaxiCalling.imALittleMemeZealot({
            value: utils.parseEther("0.01"),
          })
        ).to.emit(opGoerliPriceFeeds, "DogeLoverFound");
        const dogeAddy = await opGoerliPriceFeeds.s_priceFeeds("DOGE");
        assert.equal(dogeAddy, "0xd3277B9Db5008116cd8727Fc00E704F2Db2e578F");
      });
    });
    describe("Other Getter Functions", function () {
      it("getContractBalance returns balance", async function () {
        const balance = await opGoerliPriceFeeds.getContractBalance();
        assert.equal(balance.toString(), utils.parseEther("0.01").toString());
      });
    });
  });
}
