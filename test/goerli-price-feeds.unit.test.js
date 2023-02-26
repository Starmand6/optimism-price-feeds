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
  describe.skip("Optimism - Goerli Price Feeds Unit Tests", function () {
    let opGoerliPriceFeeds,
      ethersPhoenix,
      dogeMaxi,
      ethersPhoenixCalling,
      dogeMaxiCalling;

    beforeEach(async function () {
      accounts = await ethers.getSigners();
      ethersPhoenix = accounts[1];
      dogeMaxi = accounts[2];

      await deployments.fixture(["deploy"]);
      OracleMockPriceFeed = await ethers.getContract("MockV3Aggregator");
      opGoerliPriceFeeds = await ethers.getContract("OPGoerliPriceFeeds");
      ethersPhoenixCalling = opGoerliPriceFeeds.connect(ethersPhoenix);
      dogeMaxiCalling = opGoerliPriceFeeds.connect(dogeMaxi);
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
          "ETHMOCK",
          "0x2e2147bCd571CE816382485E59Cd145A2b7CA451"
        );
        // Expected to revert since Hardhat only knows the above address, since
        // it was included in the constructor. So, this means the address was
        // successfully changed. Hardhat.config is forking Op-Mainnet, not
        // Op-Goerli.
        await expect(ethersPhoenixCalling.getUSDPriceOf("ETHMOCK")).to.be
          .reverted;
      });
    });
    describe("removePriceFeed()", function () {
      it("reverts if called by non-owner account", async function () {
        await expect(
          ethersPhoenixCalling.removePriceFeed("LINK")
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });
      it("removes price feed", async function () {
        await opGoerliPriceFeeds.removePriceFeed("LINK");
        await expect(opGoerliPriceFeeds.getUSDPriceOf("LINK")).to.be.reverted;
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
        const dogeAddy = await opGoerliPriceFeeds.s_priceFeeds("DOGE");
        assert.equal(dogeAddy, "0xd3277B9Db5008116cd8727Fc00E704F2Db2e578F");
      });
      it("emits an event", async function () {
        await expect(
          dogeMaxiCalling.imALittleMemeZealot({
            value: utils.parseEther("1"),
          })
        ).to.emit(opGoerliPriceFeeds, "DogeLoverFound()");
      });
    });
    describe("GetUSDPriceOf()", function () {
      it("gets USD price correctly", async function () {
        const ethPrice = await ethersPhoenixCalling.getUSDPriceOf("ETHMOCK");
        assert.equal(ethPrice, INITIAL_PRICE);
      });
      it("using lowercase for the ticker reverts", async function () {
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
    // Skip this test since Goerli price feed addresses don't exist in Hardhat.
    describe.skip("GetPriceOf()", function () {
      it("gets SNX Agg. Debt Ratio correctly", async function () {
        await ethersPhoenixCalling.getPriceOf("SNX Agg. Debt Ratio");
      });
    });
    describe("Other Getter Functions", function () {
      it("getContractBalance returns balance", async function () {
        await dogeMaxiCalling.imALittleMemeZealot({
          value: utils.parseEther("1"),
        });
        const balance = await opGoerliPriceFeeds.getContractBalance();
        assert.equal(balance.toString(), utils.parseEther("1"));
      });
    });
  });
}
