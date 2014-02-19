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
        result[msg[i].split('(')[0]] = msg[i].split('(')[1].slice(0,-1);
    }
    return result;
}
