import { EventEmitter2 } from 'eventemitter2';
import * as mongodb from 'mongodb';
import * as redis from 'thunk-redis';
import * as path from 'path';
import make_mongo_url from '../fn/make_mongo_url';
import Server from './Server';

export default class Instance extends EventEmitter2 {

    flags: ClusterFlags;
    config: any;
    cache: ThunkRedisClient;
    app: Server;
    mongos: any;

    async init(message: {
      config: any,
      flags: ClusterFlags,
      clientConfig: any
    }) {

        this.config = message.config;
        this.flags = message.flags;

        this.cache = redis.createClient(
            message.clientConfig.config.cacheClients,
            { debugMode: false });

        this.cache.on('connect', () => log.green('Redis client connected.'));
        this.cache.on('error', err => log.error(`Redis client error: ${err}`));

        log('Connecting to mongos...');

        await dataTransporter.connectMongos(make_mongo_url(this.config.systemDatabase));

        this.mongos = await new Promise(r =>
            new mongodb.MongoClient().connect(make_mongo_url(this.config.systemDatabase),
                (err, db) => r(db)));

        log('Getting configuration...');

        await require('../cache');

        log('Loading postman...');

        postman.init();

        log('Loading api routes...');

        loaddirSync('./api', 'api');

        log('Starting server...');

        // Start server
        this.app = new Server({
            bind: message.clientConfig.config.bind_ip,
            port: message.clientConfig.config.port,
            ws: true,
            static: path.resolve(__dirname + '/../../../assets')
        });

        await new Promise(r => this.app.on('listening', r));

        // Temporarily expose props
        global["app"] = this.app;
        global["cache"] = this.cache;
        global["config"] = this.config;
        global["flags"] = this.flags;

        log('Loading templates...');

        // Load jade templates
        require('../templates');

        log('Loading pageHandlers...');
        loaddirSync('./pageHandlers', 'pageHandlers');

        log('Loading routes...');
        require('../routes');

        log('Loading msStatLogger...');
        require('../msStatLogger');

        require('../g_test')();

        log('Loading data namespace...');
        loaddirSync('./dataExchanges', 'data');

        this.emit('ready');

    }

    constructor(message) {
        super();
        this.init(message);
    }

};
