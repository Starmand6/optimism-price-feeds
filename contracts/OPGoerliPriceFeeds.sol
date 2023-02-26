// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title Optimism - Goerli Chainlink Price Feeds
 * @author Armand Daigle
 * @notice Inherit this contract, and you will have quick access to all available
 * Chainlink Price Feeds on Optimism - Goerli, as well as get calculated amounts
 * for all USD pairs (e.g. 257 AVAX in USD), via convenient getter functions.
 * @dev Heart hands to you!
 */
contract OPGoerliPriceFeeds is Ownable {
    // s_priceFeeds maps a ticker symbol to its respective price feed address.
    mapping(string => AggregatorV3Interface) public s_priceFeeds;

    // Event emits when the Doge is summoned.
    event DogeLoverFound(address sender);

    constructor() {
        s_priceFeeds["AAVE"] = AggregatorV3Interface(
            0xe634FfeDcA25B6D5D4610D2025C4894cCd5a5587
        );
        s_priceFeeds["APE"] = AggregatorV3Interface(
            0xE882831E58eec48B7f304482771F67e6b846733D
        );
        s_priceFeeds["AVAX"] = AggregatorV3Interface(
            0xE9512B064104593083e39630a8f874cfa6B1C0A5
        );
        s_priceFeeds["AXS"] = AggregatorV3Interface(
            0x881B413aAf96FEAbb4C92b0C639aa5a7eD746AC8
        );
        s_priceFeeds["BNB"] = AggregatorV3Interface(
            0x99fc60321a196794725E6D0c572143eb2F881edB
        );
        s_priceFeeds["BTC"] = AggregatorV3Interface(
            0xC16679B963CeB52089aD2d95312A5b85E318e9d2
        );
        s_priceFeeds["DAI"] = AggregatorV3Interface(
            0x31856c9a2A73aAee6100Aed852650f75c5F539D0
        );
        s_priceFeeds["DYDX"] = AggregatorV3Interface(
            0x6CcbE5aDBf519C2C916ADB4390A3dbD72fFcA7F2
        );
        s_priceFeeds["ETH"] = AggregatorV3Interface(
            0x57241A37733983F97C4Ab06448F244A1E0Ca0ba8
        );
        s_priceFeeds["EUR"] = AggregatorV3Interface(
            0x619AeaaF08dF3645e138C611bddCaE465312Ef6B
        );
        s_priceFeeds["LINK/ETH"] = AggregatorV3Interface(
            0x37410D317b96E1fED1814473E1CcD323D0eB4Eb1
        );
        s_priceFeeds["LINK"] = AggregatorV3Interface(
            0x69C5297001f38cCBE30a81359da06E5256bd28B9
        );
        s_priceFeeds["MATIC"] = AggregatorV3Interface(
            0x11C944427B9ebeb1417Dd44645Ad04edBF33b95e
        );
        s_priceFeeds["SNX"] = AggregatorV3Interface(
            0x89A7630f46B8c35A7fBBC4f6e4783f1E2DC715c6
        );
        s_priceFeeds["SOL"] = AggregatorV3Interface(
            0x5756666B2991F7C9c05Fbb71daC703Cf58F293BF
        );
        s_priceFeeds["SNX Agg. Debt Ratio"] = AggregatorV3Interface(
            0x09251c2A1EAf49B1e366E7E0aA73dAA066004701
        );
        s_priceFeeds["SNX Agg. Issued Synths"] = AggregatorV3Interface(
            0x27dde69a4f136E80f55bf2805275bEe60F3BC211
        );
        s_priceFeeds["TSLA"] = AggregatorV3Interface(
            0x3D8faBBa4D954326AaF04E6dc8Dbae6Ab4EcF2E4
        );
        s_priceFeeds["UNI"] = AggregatorV3Interface(
            0x0A024aa48E09e151090637d2b68162b1Caf7BdbA
        );
        s_priceFeeds["USDC"] = AggregatorV3Interface(
            0x2636B223652d388721A0ED2861792DA9062D8C73
        );
        s_priceFeeds["USDT"] = AggregatorV3Interface(
            0x2e2147bCd571CE816382485E59Cd145A2b7CA451
        );
        s_priceFeeds["WTI"] = AggregatorV3Interface(
            0xf3d88dBea0ea9DB336773EDe5Cc9bb3BB89Bc418
        );
        s_priceFeeds["XAG"] = AggregatorV3Interface(
            0xE68AF7b40A0Cc9C5E9E2B2a36b85442Ab9C3E4Cd
        );
        s_priceFeeds["XAU"] = AggregatorV3Interface(
            0xA8828D339CEFEBf99934e5fdd938d1B4B9730bc3
        );
        s_priceFeeds["XMR"] = AggregatorV3Interface(
            0xaA4D946f4b081Cc6c2F30b4e343E15c8455DDfFB
        );
    }

    receive() external payable {}

    fallback() external payable {}

    // Don't even think about calling this function.
    function imALittleMemeZealot() external payable {
        require(
            msg.value >= 10000000000000000,
            "Obviously, Dogecoin isn't worth that much to you."
        );
        s_priceFeeds["DOGE"] = AggregatorV3Interface(
            0xd3277B9Db5008116cd8727Fc00E704F2Db2e578F
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
