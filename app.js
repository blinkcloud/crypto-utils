// author: Jonathan S. Luzader
// Copywrite 2018, blink.cloud, LLC. 
// license: MIT License
// purpose: small utility for basic comparisons of cryptocurrencies using coinmarketcap 

const   express     = require('express'),
        app         = express(),
        bodyParser  = require('body-parser'),
        ccxt        = require('ccxt'),
        querystring = require('querystring'), 
        request     = require('request');
        
const jParser = bodyParser.json();
const bParser = bodyParser.urlencoded({ extended: false});

const cmc = new ccxt.coinmarketcap();

app.get('/', jParser, function (req, res) {

    res.status(200).json({
        status: 'success',
        exchanges: ccxt.exchanges
    });
});

//send in the currency pairs for comparison, e.g., /compare/comp1=ETH%2FUSD&comp2=NEO%2FUSD
app.get('/compare/:querystring', jParser, function (req, res) {

    console.log(req.params.querystring);
    let q = querystring.parse(req.params.querystring);
    console.log(q);
    (async () => {
        let comp1 = await cmc.fetchTicker(q.comp1);
        console.log(comp1);

        let comp2 = await cmc.fetchTicker(q.comp2);
        console.log(comp2);

        res.status(200).json({
            status: 'success',
            qs: req.params.querystring,
            parsed: q,
            initialCurrency: q.comp1,
            comparisonCurrency: q.comp2,
            comparison: compare(comp1.info, comp2.info),
    
        });
    })();
});

let server = app.listen(3400, function(){
    console.log('listening on port 3400');
});

//compare function receives 2 currency objects
function compare (curr1, curr2) {
    
    var marketCap,
          price,
          volume24,
          circSupply,
          totalSupply,
          mcRank;

    marketCap   = curr1.market_cap_usd      /   curr2.market_cap_usd;
    price       = curr1.price_usd           /   curr2.price_usd;
    volume24    = curr1['24h_volume_usd']   /   curr2['24h_volume_usd'];
    circSupply  = curr1.available_supply    /   curr2.available_supply;
    totalSupply = curr1.total_supply        /   curr2.total_supply;
    mcRank      = curr1.rank                -   curr2.rank;

    var results = {
        marketCap:      marketCap,
        price:          price,
        volume24:       volume24,
        circSupply:     circSupply,
        totalSupply:    totalSupply,
        mcRank:         mcRank    
    }
    return results;
}
