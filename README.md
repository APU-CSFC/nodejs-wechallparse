wechall
=======
wechall is a cli utility to get challenge results of a particular username 
from [http://www.wechall.net](http://www.wechall.net).

Install
=======
for node.js and npm:
    
    npm install wechall

Usage
=====
.....would look like this:

    Usage: node cmd.js <command>

    command     
        userstats     Get userstats of a particular username in wechall.
        activity      Poll the latest activity in a machine readable format.
        userapi       Get the user profile internals if the api key is provided.
        siteapi       I don't even know what this actually does yet.

for getting help of each command (e.g. userstats):

    Usage: node cmd.js userstats [options]

    Options:
       -u, --user        Username of the person you want to see stats of.  []
       --sites           Find only sites with a given username.  [false]
       -a, --sitealias   The alias of the wargames name that you want to query.  []

    Get userstats of a particular username in wechall.

Examples
========
Querying information about percentage in each game:

    $ node cmd.js userstats -u mavjs --sites true
    mavjs plays 3 sites, primary: OTW(29.08%), HTS(6.72%), WC(2.92%).
