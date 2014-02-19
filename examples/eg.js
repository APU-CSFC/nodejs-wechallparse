var WeChall = require('..');
var wc = WeChall('mavjs');

wc.getall(function(err, result) {
    console.log(result);
});
