// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title Optimism - Mainnet Chainlink Price Feeds
 * @author Armand Daigle
 * @notice Inherit this contract, and you will have quick access to all available
 * Chainlink Price Feeds on Optimism - Mainnet, as well as get calculated amounts
 * for all USD pairs (e.g. 257 AVAX in USD), via convenient getter functions.
 * @dev Heart hands to you!
 */
contract OPPriceFeeds is Ownable {
    // s_priceFeeds maps a ticker symbol to its respective price feed address.
    mapping(string => AggregatorV3Interface) public s_priceFeeds;

    // Event emits when the Doge is summoned.
    event DogeLoverFound(address sender);

    constructor() {
        s_priceFeeds["AAVE"] = AggregatorV3Interface(
            0x338ed6787f463394D24813b297401B9F05a8C9d1
        );
        s_priceFeeds["APE"] = AggregatorV3Interface(
            0x89178957E9bD07934d7792fFc0CF39f11c8C2B1F
        );
        s_priceFeeds["ATOM"] = AggregatorV3Interface(
            0xEF89db2eA46B4aD4E333466B6A486b809e613F39
        );
        s_priceFeeds["AUD"] = AggregatorV3Interface(
            0x39be70E93D2D285C9E71be7f70FC5a45A7777B14
        );
        s_priceFeeds["AVAX"] = AggregatorV3Interface(
            0x5087Dc69Fd3907a016BD42B38022F7f024140727
        );
        s_priceFeeds["AXS"] = AggregatorV3Interface(
            0x805a61D54bb686e57F02D1EC96A1491C7aF40893
        );
        s_priceFeeds["BAL"] = AggregatorV3Interface(
            0x30D9d31C1ac29Bc2c2c312c1bCa9F8b3D60e2376
        );
        s_priceFeeds["BNB"] = AggregatorV3Interface(
            0xD38579f7cBD14c22cF1997575eA8eF7bfe62ca2c
        );
        s_priceFeeds["BOND"] = AggregatorV3Interface(
            0x8fCfb87fc17CfD5775d234AcFd1753764899Bf20
        );
        s_priceFeeds["BTC"] = AggregatorV3Interface(
            0xD702DD976Fb76Fffc2D3963D037dfDae5b04E593
        );
        s_priceFeeds["CAD"] = AggregatorV3Interface(
            0x6fD5e4a193459FC7DFCFc674357a123F655f6EF8
        );
        s_priceFeeds["CRV"] = AggregatorV3Interface(
            0xbD92C6c284271c227a1e0bF1786F468b539f51D9
        );
        s_priceFeeds["DAI"] = AggregatorV3Interface(
            0x8dBa75e83DA73cc766A7e5a0ee71F656BAb470d6
        );
        s_priceFeeds["DYDX"] = AggregatorV3Interface(
            0xee35A95c9a064491531493D8b380bC40A4CCd0Da
        );
        s_priceFeeds["ETH"] = AggregatorV3Interface(
            0x13e3Ee699D1909E989722E753853AE30b17e08c5
        );
        s_priceFeeds["EUR"] = AggregatorV3Interface(
            0x3626369857A10CcC6cc3A6e4f5C2f5984a519F20
        );
        s_priceFeeds["FLOW"] = AggregatorV3Interface(
            0x2fF1EB7D0ceC35959F0248E9354c3248c6683D9b
        );
        s_priceFeeds["FRAX"] = AggregatorV3Interface(
            0xc7D132BeCAbE7Dcc4204841F33bae45841e41D9C
        );
        s_priceFeeds["FTM"] = AggregatorV3Interface(
            0xc19d58652d6BfC6Db6FB3691eDA6Aa7f3379E4E9
        );
        s_priceFeeds["FXS"] = AggregatorV3Interface(
            0xB9B16330671067B1b062B9aC2eFd2dB75F03436E
        );
        s_priceFeeds["GBP"] = AggregatorV3Interface(
            0x540D48C01F946e729174517E013Ad0bdaE5F08C0
        );
        s_priceFeeds["IMX"] = AggregatorV3Interface(
            0x26Fce884555FAe5F0E4701cc976FE8D8bB111A38
        );
        s_priceFeeds["INR"] = AggregatorV3Interface(
            0x5535e67d8f99c8ebe961E1Fc1F6DDAE96FEC82C9
        );
        s_priceFeeds["JPY"] = AggregatorV3Interface(
            0x536944c3A71FEb7c1E5C66Ee37d1a148d8D8f619
        );
        s_priceFeeds["KNC"] = AggregatorV3Interface(
            0xCB24d22aF35986aC1feb8874AdBbDF68f6dC2e96
        );
        s_priceFeeds["LINK/ETH"] = AggregatorV3Interface(
            0x464A1515ADc20de946f8d0DEB99cead8CEAE310d
        );
        s_priceFeeds["LINK"] = AggregatorV3Interface(
            0xCc232dcFAAE6354cE191Bd574108c1aD03f86450
        );
        s_priceFeeds["LOOKS"] = AggregatorV3Interface(
            0xd682c5f1A8eaA2389D6f8Fa43067956C2386a557
        );
        s_priceFeeds["LUSD"] = AggregatorV3Interface(
            0x9dfc79Aaeb5bb0f96C6e9402671981CdFc424052
        );
        s_priceFeeds["MATIC"] = AggregatorV3Interface(
            0x0ded608AFc23724f614B76955bbd9dFe7dDdc828
        );
        s_priceFeeds["NEAR"] = AggregatorV3Interface(
            0xca6fa4b8CB365C02cd3Ba70544EFffe78f63ac82
        );
        s_priceFeeds["ONE"] = AggregatorV3Interface(
            0x7CFB4fac1a2FDB1267F8bc17FADc12804AC13CFE
        );
        s_priceFeeds["OP"] = AggregatorV3Interface(
            0x0D276FC14719f9292D5C1eA2198673d1f4269246
        );
        s_priceFeeds["PERP"] = AggregatorV3Interface(
            0xA12CDDd8e986AF9288ab31E58C60e65F2987fB13
        );
        s_priceFeeds["RUNE"] = AggregatorV3Interface(
            0x372cc5e685115A56F14fa7e4716F1294e04c278A
        );
        s_priceFeeds["SAND"] = AggregatorV3Interface(
            0xAE33e077a02071E62d342E449Afd9895b016d541
        );
        s_priceFeeds["SNX"] = AggregatorV3Interface(
            0x2FCF37343e916eAEd1f1DdaaF84458a359b53877
        );
        s_priceFeeds["SOL"] = AggregatorV3Interface(
            0xC663315f7aF904fbbB0F785c32046dFA03e85270
        );
        s_priceFeeds["stETH"] = AggregatorV3Interface(
            0x41878779a388585509657CE5Fb95a80050502186
        );
        s_priceFeeds["SUSD"] = AggregatorV3Interface(
            0x7f99817d87baD03ea21E05112Ca799d715730efe
        );
        // CAUTION: Per Chainlink, "Total Marketcap USD" is a Custom Feed. Read more here:
        // https://docs.chain.link/data-feeds/selecting-data-feeds
        s_priceFeeds["Total Marketcap"] = AggregatorV3Interface(
            0x15772F61e4cDC81c7C1c6c454724CE9c7065A6fF
        );
        s_priceFeeds["UNI"] = AggregatorV3Interface(
            0x11429eE838cC01071402f21C219870cbAc0a59A0
        );
        s_priceFeeds["USDC"] = AggregatorV3Interface(
            0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3
        );
        s_priceFeeds["USDT"] = AggregatorV3Interface(
            0xECef79E109e997bCA29c1c0897ec9d7b03647F5E
        );
        s_priceFeeds["WAVES"] = AggregatorV3Interface(
            0x776003ECdF644F87a95B05da549b5e646d5F2Ae4
        );
        s_priceFeeds["WBTC"] = AggregatorV3Interface(
            0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F
        );
        s_priceFeeds["WstETH"] = AggregatorV3Interface(
            0x698B585CbC4407e2D54aa898B2600B53C68958f7
        );
        s_priceFeeds["XAG"] = AggregatorV3Interface(
            0x290dd71254874f0d4356443607cb8234958DEe49
        );
        s_priceFeeds["XAU"] = AggregatorV3Interface(
            0x8F7bFb42Bf7421c2b34AAD619be4654bFa7B3B8B
        );
        s_priceFeeds["XMR"] = AggregatorV3Interface(
            0x2a8D91686A048E98e6CCF1A89E82f40D14312672
        );
        s_priceFeeds["ZIL"] = AggregatorV3Interface(
            0x1520874FC216f5F07E03607303Df2Fda6C3Fc203
        );
        s_priceFeeds["wstETH/stETH"] = AggregatorV3Interface(
            0xe59EBa0D492cA53C6f46015EEa00517F2707dc77
        );
    }

    receive() external payable {}

    fallback() external payable {}

    function imALittleMemeZealot() external payable {
        require(
            msg.value >= 1 ether,
            "Obviously, Dogecoin isn't worth that much to you."
        );
        s_priceFeeds["DOGE"] = AggregatorV3Interface(
            0xC6066533917f034Cf610c08e1fe5e9c7eADe0f54
        );
        emit DogeLoverFound(msg.sender);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @notice Although it technically does the exact same thing as `getUSDPriceOf()`, this
     * function is named more accurately for the purposes of non-USD price feeds, capisce?
     * @return If ETH is in the pair's denominator, then `answer` will have 18 decimals.
     */
    function getPriceOf(string calldata feed) external view returns (uint256) {
        (, int256 price, , , ) = s_priceFeeds[feed].latestRoundData();
        uint256 answer = uint256(price);
        return answer;
    }

    function getUSDAmountOf(
        uint256 amount,
        string calldata ticker
    ) external view returns (uint256) {
        uint256 usdAmount = getUSDPriceOf(ticker) * amount;
        return usdAmount;
    }

    /**
     * @notice Pretty self-explanatory, using Chainlink's awesome services how they tell us to.
     * @return I even typecasted the price to uint256 for you. I only exist to serve you. Also,
     * keep in mind this will return a number with 8 decmials for USD pairs and 18 decimals for
     * ETH pairs (such as LINK/ETH).
     */
    function getUSDPriceOf(
        string calldata ticker
    ) public view returns (uint256) {
        (, int256 price, , , ) = s_priceFeeds[ticker].latestRoundData();
        uint256 usdPrice = uint256(price);
        return usdPrice;
    }

    /// Owner Functions

    function changeOrAddPriceFeed(
        string calldata ticker,
        AggregatorV3Interface priceFeedAddress
    ) external onlyOwner {
        s_priceFeeds[ticker] = AggregatorV3Interface(priceFeedAddress);
    }

    function removePriceFeed(string calldata ticker) external onlyOwner {
        delete s_priceFeeds[ticker];
    }

    function withdrawDogeFee() external onlyOwner {
        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(success, "Failed to withdraw Ether");
    }
}
