var request = require('superagent');
var util = require('util');
var cname = require('./chall.js');
var clc = require('cli-color');

module.exports = function() {
    return new WeChall();
}

var WeChall = function() {
    this.userurl = 'http://www.wechall.net/wechall.php';
    this.baseurl = 'http://www.wechall.net/index.php';
    this.basepayload = {'mo': 'WeChall', 'me': '', 'no_session': '1'};
}


WeChall.prototype.userstats = function(opts, cb) {
    var payload = {};
    
    if (opts.user && opts.sites === false && opts.sitealias === '') {
        payload = {'username': opts.user};
    }
    else if (opts.sites === true && opts.sitealias === '') {
        payload = {'username': '!sites '+opts.user}
    }
    else if (cname[opts.sitealias] !== undefined) {
        data = '!'+opts.sitealias+' '+opts.user;
        payload = {'username': data}
    }
    else if (cname[opts.sitealias] === undefined) {
        console.error(clc.red(util.format('[!] %s is not a valid site alias.', opts.sitealias)));
        return false;
    }
    request
        .get(this.userurl)
        .query(payload)
        .end(function(err, res) {
            return cb(err, res.text);
        });
}

WeChall.prototype.activity = function(opts, cb) {
    var payload = this.basepayload;
    payload.me = 'API_History';
   
    if (opts.datestamp) {
        payload['datestamp'] = opts.datestamp;
    } else if (opts.user) {
        payload['username'] = opts.user;
    } else if (opts.sitename) {
        payload['sitename'] = opts.sitename;
    } else if (opts.limit) {
        payload['limit'] = opts.limit;
    } else if (opts.masterkey) {
        payload['masterkey'] = opts.masterkey;
    } else if (opts.pass) {
        payload['password'] = opts.pass;
    }

    request
        .get(this.baseurl)
        .query(payload)
        .end(function(err, res) {
            return cb(err, res.text);
        });
}
