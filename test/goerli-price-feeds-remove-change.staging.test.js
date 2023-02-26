const { deployments, ethers, network } = require("hardhat");
const { assert, expect } = require("chai");
// const { utils } = require("ethers");
const chainId = network.config.chainId;

if (chainId == 420) {
  describe("Optimism - Goerli Price Feeds Staging Tests for Removing/Adding Functions", function () {
    let opGoerliPriceFeeds, ethersPhoenix, ethersPhoenixCalling;

    beforeEach(async function () {
      accounts = await ethers.getSigners();
      ethersPhoenix = accounts[1];

      opGoerliPriceFeeds = await ethers.getContract("OPGoerliPriceFeeds");
      ethersPhoenixCalling = opGoerliPriceFeeds.connect(ethersPhoenix);
    });

    describe("changeOrAddPriceFeed()", function () {
      it("reverts if called by non-owner account", async function () {
        // Arbitrarily using XMR's Goerli address here in place of XAG's.
        await expect(
          ethersPhoenixCalling.changeOrAddPriceFeed(
            "XAG",
            "0xaA4D946f4b081Cc6c2F30b4e343E15c8455DDfFB"
          )
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
      it("changes price feed", async function () {
        // Arbitrarily using USDT's Goerli address here.
        await opGoerliPriceFeeds.changeOrAddPriceFeed(
          "ETH",
          "0x2e2147bCd571CE816382485E59Cd145A2b7CA451"
        );
        const ethPrice = await ethersPhoenixCalling.getUSDPriceOf("ETH");
        // "ETH" should now be mapped to the USDT feed address, so should equal ~1.
        assert.closeTo(ethPrice, 100000000, 5000000, "numbers are close");
      });
    });
    describe("removePriceFeed()", function () {
      it("reverts if called by non-owner account", async function () {
        await expect(
          ethersPhoenixCalling.removePriceFeed("DOGE")
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
      it("removes price feed", async function () {
        await expect(opGoerliPriceFeeds.getUSDPriceOf("DOGE")).to.not.be
          .reverted;
        await opGoerliPriceFeeds.removePriceFeed("DOGE");
        await expect(opGoerliPriceFeeds.getUSDPriceOf("DOGE")).to.be.reverted;
      });
    });
  });
}
