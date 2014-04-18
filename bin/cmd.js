#!/usr/bin/env node

var util = require('util');
var WeChall = require('..')();
var parser = require('nomnom');
var clc = require('cli-color');

parser.command('userstats')
    .options({
        user: {
            abbr: 'u',
            default: '',
            help: 'Username of the person you want to see stats of.'
        },
        sites: {
            default: false,
            help: 'Find only sites with a given username.'
        },
        sitealias: {
            abbr: 'a',
            default: '',
            help: 'The alias of the wargames name that you want to query.'
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

/* TODO: implement activity api */
parser.command('activity')
    .options({
        datestamp: {
            abbr: 'date',
            default: '',
            help: 'Find a particular activity based on the datestamp.'
        },
        user: {
            abbr: 'u',
            default: '',
            help: 'Username of the person you want to see stats of.'
        },
        sitename: {
            abbr: 'sa',
            default: '',
            help: 'Find a particular activity based on a wargame sitename.'
        },
        limit: {
            default: '',
            help: 'Find a particular activity based on a range of limit.'
        },
        masterkey: {
            abbr: 'key',
            default: '',
            help: 'The masterkey to query a particular activity.'
        }
    })
    .callback(function(opts) {
        console.log(opts);
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
            abbr: 'key',
            default: '',
            help: 'The api key from wechall.'
        }
    })
    .callback(function(opts) {
        console.log(opts);
    })
    .help("Get the user profile internals if the api key is provided.")

/* TODO: implement site profile api */
parser.command('siteapi')
    .options({
        sitename: {
            abbr: 'sa',
            default: '',
            help: 'The site name that you want to query for.'
        }
    })
    .callback(function(opts) {
        console.log(opts);
    })
    .help("I don't even know what this actually does yet.")

parser.parse()
