const { deployments, ethers, network } = require("hardhat");
const { assert, expect } = require("chai");
const { utils } = require("ethers");
const chainId = network.config.chainId;
const { INITIAL_PRICE } = require("../helper-hardhat-config");

/**
 * Before running this unit test, add an address variable as a constructor parameter,
 * and 's_priceFeeds["ETHMOCK"] = AggregatorV3Interface(ethUSDMockaddress);' in the
 * contract constructor body, so that the Chainlink Mock address can be added,
 * so that you can have one address to test getting prices from. Otherwise, they
 * will all revert, since Hardhat doesn't have it's own Chainlink addresses to test.
 * Also add `getEthMockFeed()` (copy `getUSDPriceOf()`) to the Solidity contract.
 */
if (chainId == 31337) {
  describe("Optimism - Mainnet Price Feeds Unit Tests", function () {
    let opPriceFeeds,
      ethersPhoenix,
      dogeMaxi,
      ethersPhoenixCalling,
      dogeMaxiCalling;

    beforeEach(async function () {
      accounts = await ethers.getSigners();
      ethersPhoenix = accounts[1];
      dogeMaxi = accounts[2];

      await deployments.fixture(["mainnet-prices"]);
      OracleMockPriceFeed = await ethers.getContract("MockV3Aggregator");
      opPriceFeeds = await ethers.getContract("OPPriceFeeds");
      ethersPhoenixCalling = opPriceFeeds.connect(ethersPhoenix);
      dogeMaxiCalling = opPriceFeeds.connect(dogeMaxi);
    });

    describe("changeOrAddPriceFeed()", function () {
      it("reverts if called by non-owner account", async function () {
        // Arbitrarily using XMR's Goerli address here in place of XAG's.
        await expect(
          ethersPhoenixCalling.changeOrAddPriceFeed(
            "XAG",
            "0x290dd71254874f0d4356443607cb8234958DEe49"
          )
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
      it("changes price feed", async function () {
        await expect(ethersPhoenixCalling.getUSDPriceOf("ETHMOCK")).to.not.be
          .reverted;

        // Using USDT's Op-Mainnet address here.
        await opPriceFeeds.changeOrAddPriceFeed(
          "ETHMOCK",
          "0xECef79E109e997bCA29c1c0897ec9d7b03647F5E"
        );
        // Since we are forking Op-Mainnet in our hardhat.config, we actually
        // have access to Chainlink's Op-Mainnet USDT address!
        const ethPrice = await ethersPhoenixCalling.getUSDPriceOf("ETHMOCK");
        assert.closeTo(ethPrice, 100000000, 1000000);
      });
    });
    describe("removePriceFeed()", function () {
      it("reverts if called by non-owner account", async function () {
        await expect(
          ethersPhoenixCalling.removePriceFeed("LINK")
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
      it("removes price feed when called by owner", async function () {
        await opPriceFeeds.removePriceFeed("LINK");
        await expect(opPriceFeeds.getUSDPriceOf("LINK")).to.be.reverted;
      });
    });
    describe("imALittleMemeZealot()", function () {
      it("reverts if amount sent is less than 1 ether", async function () {
        await expect(
          dogeMaxiCalling.imALittleMemeZealot({
            value: utils.parseEther("0.9"),
          })
        ).to.be.revertedWith(
          "Obviously, Dogecoin isn't worth that much to you."
        );
      });
      it("adds DOGE correctly", async function () {
        await dogeMaxiCalling.imALittleMemeZealot({
          value: utils.parseEther("1"),
        });
        const dogeAddy = await opPriceFeeds.s_priceFeeds("DOGE");
        assert.equal(dogeAddy, "0xC6066533917f034Cf610c08e1fe5e9c7eADe0f54");
      });
      it("emits an event", async function () {
        await expect(
          dogeMaxiCalling.imALittleMemeZealot({
            value: utils.parseEther("1"),
          })
        )
          .to.emit(opPriceFeeds, "DogeLoverFound")
          .withArgs(dogeMaxi.address.toString());
      });
    });
    describe("GetUSDPriceOf()", function () {
      it("gets USD price correctly", async function () {
        const ethPrice = await ethersPhoenixCalling.getUSDPriceOf("ETHMOCK");
        assert.equal(ethPrice, INITIAL_PRICE);
      });
      it("using lowercase for the ticker symbol reverts", async function () {
        await expect(ethersPhoenixCalling.getUSDPriceOf("ethmock")).to.be
          .reverted;
      });
    });
    describe("getUSDAmountOf()", function () {
      it("gets USD Amount correctly", async function () {
        const ethAmount = await ethersPhoenixCalling.getUSDAmountOf(
          1,
          "ETHMOCK"
        );
        assert.equal(ethAmount, INITIAL_PRICE);
        const secondAmount = await ethersPhoenixCalling.getUSDAmountOf(
          5,
          "ETHMOCK"
        );
        assert.equal(secondAmount, 5 * INITIAL_PRICE);
      });
    });
    // Just for sanity's sake.
    describe("GetPriceOf()", function () {
      it("gets USD price correctly", async function () {
        const ethPrice = await ethersPhoenixCalling.getPriceOf("ETHMOCK");
        assert.equal(ethPrice, INITIAL_PRICE);
      });
    });
    describe("Other Getter Functions", function () {
      it("getContractBalance returns balance", async function () {
        await dogeMaxiCalling.imALittleMemeZealot({
          value: utils.parseEther("1"),
        });
        const balance = await opPriceFeeds.getContractBalance();
        assert.equal(balance.toString(), utils.parseEther("1"));
      });
    });
  });
}
