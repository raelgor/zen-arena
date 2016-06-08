/*
zen-arena
Developed by Kosmas Papadatos
*/

const flags: ClusterFlags = {
    DEBUG_MODE: Boolean(~process.argv.indexOf('-d') || ~process.argv.indexOf('--debug')),
    TEST_MODE: Boolean(~process.argv.indexOf('-t') || ~process.argv.indexOf('--test'))
}

require('./src/catchPromisePolyfill');

import * as os from 'os';
import * as cluster from 'cluster';
import * as colors from 'chalk';
import * as fs from 'fs';
import log from './src/log';
import make_mongo_url from './src/fn/make_mongo_url';

const packageInfo = require('./../package');
const co = require('co');
const mongodb = require('mongodb');
const numOfCores = os.cpus().length;
const uuid = require('./src/fn/uuid');

const roleHandlerMap = {
    'app': './src/app',
    'balancer': './src/balancer'
};

// Set master process title
process.title = 'zen-arena-cm';

// Client configuration file
var config;

// Client ID
var clientID;

// Persistent connection to the System Database
var systemDB;

log(`Initializing zen-arena client ${packageInfo.version}...`);
flags.DEBUG_MODE && log.debug('DEBUG_MODE = ON');
flags.TEST_MODE && log.debug('TEST_MODE = ON');

try {

    log(`Loading configuration from config file...`);

    config = require('./../config');

    log.green(`Configuration loaded.`);

    log(`Loading client ID...`);

    try {

        clientID = fs.readFileSync('./id').toString('utf8');
        log.magenta(clientID);

    } catch (err) {

        log.warn(`No client ID found. Generating...`);

        clientID = uuid();

        log.magenta(clientID);

        log.warn(`Writing to file...`);

        fs.writeFileSync('./id', clientID);

        log.warn(`Done.`);

    }

    init();

} catch (err) {

    log(`Load failed: ${colors.red(err)}`);
    process.exit();

}

async function init() {

    log(`Connecting to system database...`);

    while (!systemDB)
        try {
            systemDB = await mongodb.connect(make_mongo_url(config.systemDatabase));
        } catch (err) {
            console.log(err);
            log.warn('Could not connect to system database. Retrying in 1s...');
            await new Promise(r => setTimeout(r, 1e3));
        }

    var clientConfig = await systemDB.collection('clients').find({ id: clientID }).toArray();

    if (!clientConfig.length)
        await systemDB.collection('clients').insert({ id: clientID });
    else
        clientConfig = clientConfig[0];

    if (!clientConfig.role) {
        log.warn(`No client configuration in database. Client idle.`);
        return;
    }

    log(`Role: ${colors.magenta(clientConfig.role.toUpperCase())}`);
    log(`Instances: ${colors.magenta(clientConfig.instances)}`);

    require(roleHandlerMap[clientConfig.role]).default(clientConfig, flags, config, numOfCores);

    log.green('Master process initialized.');

}
