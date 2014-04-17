var request = require('superagent');
var cname = require('./chall.js');

module.exports = function(username) {
    return new WeChall(username);
}

function WeChall(username) {
    this.baseurl = 'http://www.wechall.net/wechall.php?username=!sites '+username;
}

WeChall.prototype.getall = function(done) {
    request
        .get(this.baseurl)
        .end(function(err, res) {
            var slres = sl(res.text);
            var challres = chall(slres);
            return done(err, challres);
        });
};

function sl(msg) {
    return msg.slice(0,-1).split(': ').slice(1)[0].split(', ');
}

function chall(msg) {
    var i = 0;
    var result = {};
    for(i; i<msg.length; i++) {
        var short_name = msg[i].split('(')[0];
        var long_name = cname[short_name];
        var percentage = msg[i].split('(')[1].slice(0,-1);
        
        result[short_name] = {};
        result[short_name][long_name] = percentage;
    }
    return result;
}
