#!/usr/bin/env node

var util = require('util');
var WeChall = require('..')();
var parser = require('nomnom');
var clc = require('cli-color');

function callback(err, result) {
    if (!err) {
        console.log(result);
    }
    else {
        console.error(clc.red(util.format('[!] %s', err)));
    }
};

parser.command('userstats')
    .options({
        user: {
            abbr: 'u',
            default: '',
            help: 'Will output the general user ranking on wechall.'
        },
        sites: {
            abbr: 's',
            default: false,
            help: 'Will give an overview of all sites the user is linked to.'
        },
        sitealias: {
            abbr: 'a',
            default: '',
            help: 'Will give an overview of one particular site the user is playing.'
        }
    })
    .callback(function(opts) {
        WeChall.userstats(opts, function(err, result) {
            if (!err) {
                console.log(result);
            }
            else {
                console.error(clc.red(util.format('[!] %s', err)));
            }
        });
    })
    .help("Get userstats of a particular username in wechall.")

parser.command('activity')
    .options({
        datestamp: {
            abbr: 'd',
            default: '',
            help: 'Fetch only messages >= this timestamp. [YYYYmmddhhiiss]'
        },
        user: {
            abbr: 'u',
            default: '',
            help: 'Fetch only messages for one user.'
        },
        sitename: {
            abbr: 's',
            default: '',
            help: 'Fetch only messages for one site.'
        },
        limit: {
            abbr: 'l',
            default: '',
            help: 'Limit the results to a value.'
        },
        masterkey: {
            abbr: 'k',
            default: '',
            help: 'Raise the max limit of output rows.'
        },
        pass: {
            abbr: 'p',
            default: '',
            help: 'Private API password, when a single user is queried.'
        }
    })
    .callback(function(opts) {
        WeChall.activity(opts, function(err, result) {
            if (!err) {
                console.log(result);
            }
            else {
                console.error(clc.red(util.format('[!] %s', err)));
            }
        });
    })
    .help("Poll the latest activity in a machine readable format.")

/* TODO: implement user profile api */
parser.command('userapi')
    .options({
        user: {
            abbr: 'u',
            default: '',
            help: 'Username of the person on wechall.'
        },
        apikey: {
            abbr: 'k',
            default: '',
            help: 'The api key from wechall.'
        }
    })
    .callback(function(opts) {
        WeChall.userapi(opts, function(err, result) {
            if (!err) {
                console.log(result);
            }
            else {
                console.error(clc.red(util.format('[!] %s', err)))
            }
        });
    })
    .help("Get the user profile internals if the api key is provided.")

/* TODO: implement site profile api */
parser.command('siteapi')
    .options({
        sitename: {
            abbr: 's',
            default: '',
            help: 'The site name that you want to query for.'
        }
    })
    .callback(function(opts) {
        WeChall.siteapi(opts, function(err, result) {
            if (!err) {
                console.log(result);
            }
            else {
                console.error(clc.red(util.format('[!] %s', err)));
            }
        });
    })
    .help("Query challenge sites' API database.")

parser.parse()
