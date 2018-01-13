# crypto-utils

Small node.js API for returning basic comparison information from two crypto pairs using the CCXT library and CoinMarketCap.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
nodejs version > 7.6
```

### Installing

Clone repo, navigate to directory on local machine, and:

```
npm install
```

## Testing it out

```
navigate to http://localhost:3400/compare/comp1=[enter pair 1]&comp2=[enter pair 2].  Example pairs are: BTC/USD, NEO/BTC, etc.  
Backslashes need to be escaped, so a real URL would look like http://localhost:3400/compare/comp1=ETH%2FUSD&comp2=NEO%2FUSD
```

A successful response will look like:

```
{"status":"success","qs":"comp1=ETH/USD&comp2=NEO/USD","parsed":{"comp1":"ETH/USD","comp2":"NEO/USD"},"initialCurrency":"ETH/USD","comparisonCurrency":"NEO/USD","comparison":{"marketCap":14.893826902972076,"price":9.984416056353776,"volume24":12.786496606756158,"circSupply":1.4917073538461538,"totalSupply":0.96960978,"mcRank":-9}}
```

Fields calculated:

```
    marketCap   = curr1.market_cap_usd      /   curr2.market_cap_usd;
    price       = curr1.price_usd           /   curr2.price_usd;
    volume24    = curr1['24h_volume_usd']   /   curr2['24h_volume_usd'];
    circSupply  = curr1.available_supply    /   curr2.available_supply;
    totalSupply = curr1.total_supply        /   curr2.total_supply;
    mcRank      = curr1.rank                -   curr2.rank;
```

## Deployment

This can be deployed on Azure, AWS, Heroku, etc. 

## Built With

* [Node JS](https://nodejs.org/en/ 

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/blinkcloud/262d6df5793fd57ccf7daf46a93c0b9f) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Jonathan Luzader** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## References

* [ccxt](https://www.npmjs.com/package/ccxt)
* [cmc-api](https://coinmarketcap.com/api/)