function Currencies() {
    var popularCurrenciesInOrder = ["USD","EUR","GBP","INR","AUD","CAD","AED","MYR","CHF","CNY","THB","SAR","NZD","JPY","SGD","PHP","TRY","HKD","IDR","ZAR","MXN","SEK","BRL","HUF","PKR","QAR","OMR","KWD","DKK","NOK","RUB","EGP","KRW","COP","CZK"];
    this.topTen = function() {
        return popularCurrenciesInOrder.slice(0, 10);
    };
    this.mostPopular = function() {
        return popularCurrenciesInOrder;
    };
}

