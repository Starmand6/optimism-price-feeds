const { deployments, ethers, network } = require("hardhat");
const { assert, expect } = require("chai");
// const { utils } = require("ethers");
const chainId = network.config.chainId;

if (chainId == 420) {
  describe.skip("Optimism - Goerli Price Feeds Staging Tests for Getters", function () {
    let opGoerliPriceFeeds, ethersPhoenix, ethersPhoenixCalling;

    beforeEach(async function () {
      accounts = await ethers.getSigners();
      ethersPhoenix = accounts[1];
      opGoerliPriceFeeds = await ethers.getContract("OPGoerliPriceFeeds");
      ethersPhoenixCalling = opGoerliPriceFeeds.connect(ethersPhoenix);
    });

    describe("Constructor", function () {
      it("sets Oracle price feeds", async function () {
        // Testing a few random ones
        const btcFeed = await opGoerliPriceFeeds.s_priceFeeds("BTC");
        assert.equal(btcFeed, "0xC16679B963CeB52089aD2d95312A5b85E318e9d2");
        const daiFeed = await opGoerliPriceFeeds.s_priceFeeds("DAI");
        assert.equal(daiFeed, "0x31856c9a2A73aAee6100Aed852650f75c5F539D0");
        const maticFeed = await opGoerliPriceFeeds.s_priceFeeds("MATIC");
        assert.equal(maticFeed, "0x11C944427B9ebeb1417Dd44645Ad04edBF33b95e");
      });
    });
    // Non-ETH pairs have 8 decimals.
    describe("GetUSDPriceOf()", function () {
      it("gets USD price correctly", async function () {
        // This test was originally done with ETH around $1,600
        const ethPrice = await ethersPhoenixCalling.getUSDPriceOf("ETH");
        assert.closeTo(
          ethPrice,
          160000000000,
          10000000000,
          "numbers are close"
        );
      });
      it("using lowercase for the ticker reverts", async function () {
        await expect(ethersPhoenixCalling.getUSDPriceOf("eth")).to.be.reverted;
      });
    });
    describe("getUSDAmountOf()", function () {
      it("gets USD Amount correctly", async function () {
        // This test was originally done with MATIC around $1.259
        const maticAmount = await ethersPhoenixCalling.getUSDAmountOf(
          700,
          "MATIC"
        );
        assert.closeTo(
          maticAmount,
          88130000000,
          1000000000,
          "numbers are close"
        );
      });
    });
    describe("GetPriceOf()", function () {
      it("gets LINK/ETH correctly", async function () {
        const linkEth = await ethersPhoenixCalling.getPriceOf("LINK/ETH");
        // LINK/ETH has been in the 0.004 to 0.0006 range for the past several months.
        // Since it's an ETH pair, it has 18 decimals -- hence, the "large" numbers.
        // Either way, numbers will need to be updated even a few weeks after deployment.
        assert.closeTo(
          linkEth,
          4580000000000000,
          10000000000000,
          "numbers are close"
        );
      });
    });
    // getContractBalance() is tested in the "goerli-price-feeds-memezealot" staging tests.
  });
}
