<a name="readme-top"></a>

## Chainlink Price Feeds on Optimism (Goerli and Mainnet)

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#development-stack-and-plugins">Development Stack and Plugins</a></li>
    <li><a href="#cli-and-interaction-steps">CLI and Interaction Steps</a></li>
    <li><a href="#usage">Usage Notes</a></li>
    <li><a href="#future-considerations">Future Considerations</a></li>
    <li><a href="#lessons-learned">Lessons Learned</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

If you're developing on Optimism, instead of wasting your sacred and precious time searching for the Chainlink price feeds and messing around with `latestRoundData()`, just inherit these contracts and sit back and take a load off, why don't ya? These contracts have all currently available pairs on Optimism - Goerli and Optimism - Mainnet, with the exception of BUSD (since it's death has been proclaimed) and DOGE, because I don't want to. (If you're a smarmy whale and are feeling extra meme-y and saucy, feel free to call `imALittleMemeZealot()` and send 1 ETH with the call to the contract on Mainnet, and it will automatically add DOGE to the price feed mapping `s_priceFeeds`. I think it's a reasonable ask for selling out part of my soul. You can also send 0.01 testnet ETH to the Goerli contract to do the same, but I mean, like, why?)

Once you inherit either contract, if it's a USD pair, call `getUSDPrice()` with the ticker symbol as an input and you'll now have the USD price. If you need the other side of the pair, divide a USD value by the return of `getUSDPrice()`. Call `getUSDAmount()` with amount and ticker symbol as inputs to get the amount in USD. I included a `getPriceOf()` function, for non-USD price feeds as well.

See the Usage Notes section below for a quick word on the returned decimals of these functions.

<u>Ticker Symbols for all Available Price Feeds</u>

OPTIMISM - GOERLI:

<b>Note: If you do not type the tickers exactly as they appear below, the functions will revert. Case sensitivity and stuff.</b>

- USD feeds: AAVE, APE, AVAX, AXS, BNB, BTC, DAI, DYDX, ETH, EUR, LINK, MATIC, SNX, SNX Agg. Debt Ratio, SNX Agg. Issued Synths, SOL, TSLA, UNI, USDC, USDT, WTI, XAG, XAU, XMR
- Non-USD feeds: LINK/ETH

OPTIMISM - MAINNET:

- USD feeds: AAVE, APE, ATOM, AUD, AVAX, AXS, BAL, BNB, BOND, BTC, CAD, CRV, DAI, DYDX, ETH, EUR, FLOW, FRAX, FTM, FXS, GBP, IMX, INR, JPY, KNC, LINK, LOOKS, LUSD, MATIC, NEAR, ONE, OP, PERP, RUNE, SAND, SNX, SOL, stETH, SUSD, Total Marketcap, UNI, USDC, USDT, WAVES, WBTC, WstETH, XAG, XAU, XMR, ZIL
- Non-USD feeds: LINK/ETH, wstETH/stETH

CAUTION regarding "Total Marketcap": Per Chainlink, it is a Custom Feed. Read more here:
https://docs.chain.link/data-feeds/selecting-data-feeds

I'll try to keep these contracts updated using the add/change/remove functions as Chainlink adds/removes data feeds, but please let me know if you see any changes that have not been reflected yet. (Side note: I've read in a few places that Chainlink will never change the contract addresses to these price feeds, but you can never know for sure. That said, it does add another moving part to these contracts, so if people want that functionality removed, I'm definitely open to it.)

<u>Contract Links</u>

Contract Address on Optimism - Goerli Testnet: `0xb1f2D9f670ec966056823E605E17804383aeC374`

Contract Address on Optimism - Mainnet: Coming soon

<p>

[OP Price Feeds Contract Page on Optimistim Etherscan - Goerli](https://goerli-optimism.etherscan.io/address/0xb1f2D9f670ec966056823E605E17804383aeC374#code)

OP Price Feeds Contract Page on Optimistim Etherscan - Mainnet: coming soon

<u>Project Highlights</u>

- My first mainnet deployment is coming shortly!

<u>Background in case you care:</u>

As I've been building my blockchain dev portfolio, I've found that the projects I start tend to spiral out, getting bigger and more complex, and so it's taken me a long time to finish them. Thus, I made it a challenge to myself to make a super simple contract tool. I've found myself needing to use Chainlink Data Feeds a lot in development, so I thought I'd make this tool in case anyone else finds themselves in the same boat. I also wanted to contribute to the open source / public goods movement, as well as to deploy a project to a mainnet, so it seemed like a great fit to deploy on Optimism.

<!-- GETTING STARTED -->

## Development Stack and Plugins

Not used for this repo.

## CLI and Interaction Steps

Not used for this repo.

## Usage Notes

The main `getUSDPriceOf()`, `getUSDAmountOf()`, and `getPriceOf()` functions all retain the number format obtained from Chainlink. This means that non-ETH pairs will have 8 decimals, and ETH pairs will have 18 decimals. Please read [this forum post](https://ethereum.stackexchange.com/questions/92508/do-all-chainlink-feeds-return-prices-with-8-decimals-of-precision) for reference.

Examples:

- `getUSDPriceOf(ETH)` returns `160000000000` which is $1,600
- `getUSDAmountOf(700, MATIC)` returns `86800000000` which is $868.00
- `getPriceOf(LINK/ETH)` returns `4580000000000000` which is 0.00458

I was thinking about adding a `dropZeros()` or `dropDecimals()` function to get it closer to the typical USD format, but not sure how much value that would add. If you'd like to see that incorporated, let's discuss. Or just fork it yourself!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FUTURE CONSIDERATIONS -->

## Future Considerations

Not used for this repo.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LESSONS LEARNED -->

## Lessons Learned

- I was going too fast and was using the [Chainlink Data Feeds main page](https://data.chain.link/optimism/mainnet) like the little n00b I am, and I didn't realize that the contract addresses on those pages are decidedly NOT in checksum format (why so, Chainlink?), so I wasted eight minutes of my life (ALL FOR YOU NO LESS) copying and pasting all the addresses that were destined to fail into the code editor before I realized this and had to erase them all and then do the thing all over again using the properly checksummed addresses in the developer docs.
- EFF.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Not used for this repo.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Armand Daigle - [@\_Starmand](https://twitter.com/_Starmand) - armanddaoist@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments and Resources

Chainlink's services are awesomely crucial!

<p align="right">(<a href="#readme-top">back to top</a>)</p>
