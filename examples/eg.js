var WeChall = require('..');

var wc = WeChall('mavjs');
var blah = wc.getall(function(err, result) {
    console.log(result);
});
