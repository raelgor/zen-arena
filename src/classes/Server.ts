import { EventEmitter2 } from 'eventemitter2';
import * as path from 'path';

const libs = {
    ws: require('ws'),
    compression: require('compression'),
    express: require('express'),
    path: require('path'),
    bodyParser: require('body-parser'),
    helmet: require('helmet'),
    cookieParser: require('cookie-parser'),
    multipart: require('connect-multiparty'),
    methodOverride: require('method-override')
};

export default class Server extends EventEmitter2 {

    config: any;
    status: number;
    server: any;
    router: any;
    httpServer: any;
    ws: any;

    constructor(options) {

        super();

        // In case of no options
        !options && (options = {});

        // Load default configuration
        this.config = require('../defaultServerConfig.js');

        // Set initial status
        this.status = -1;

        // Overwrite defaults
        for (let option in options)
            this.config[option] = options[option];

        // Create the express app
        this.server = libs.express();

        // Use compression on all requests
        //this.server.use(libs.compression({threshold:0}));

        // Create router
        this.router = libs.express.Router();

        // Set upload limit
        this.server.use(libs.bodyParser.raw({
            limit: this.config.uploadLimit
        }));

        // Block libwww-perl
        this.server.use(
            (req, res, next) =>
                /libwww-perl/.test(req.get('user-agent')) ? res.status(403).end() : next());

        // Parse json api requests
        this.server.use(libs.bodyParser.urlencoded({ extended: true }));
        this.server.use(libs.bodyParser.json({ extended: true }));


        // Add headers
        this.server.use((req, res, next) => {

            if (this.config.serverHeader)
                res.setHeader(
                    'Server',
                    'ZenX/' + packageInfo.version);

            res.setHeader('Connection', 'Keep-Alive');
            res.setHeader('Keep-Alive', 'timeout=15, max=100');

            return next();

        });

        // Standard middleware
        this.server.use(libs.helmet.xssFilter());
        this.server.use(libs.cookieParser());
        this.server.use(libs.multipart());
        this.server.use(libs.methodOverride());


        // Disable x-powered-by header
        this.server.disable('x-powered-by');

        // A route to be used later
        this.server.use(this.router);

        // If a static content path was provided
        if (this.config.static) {

            // Always add cache control header
            this.server.use(function(req, res, next) {

                res.setHeader("Cache-Control", "max-age=31104000, public");
                res.setHeader('Expires',
                    new Date(Date.now() + 345600000).toUTCString());

                return next();

            });

            // Serve static content
            this.server.use(
                libs.express.static(
                    path.resolve(this.config.static)));

        }

        // Not found
        this.server.get('*', function(req, res) {

            res.writeHead(404, 'Not found');

            res.end('404: Not found');

        });

        var config = this.config;

        // Start server as specified in config
        if (config.ssl) {
            this.httpServer = require('https').createServer({
                key: config.sslCert.key,
                cert: config.sslCert.cert,
                ca: config.sslCert.ca,
                passphrase: config.passphrase
            }, this.server);
        }
        else this.httpServer = require('http').createServer(this.server);

        // Start and bind a WebSocket server if
        // specified in config
        if (config.ws) {

            var ws = require('ws');
            var headers: any = {};

            if (config.serverHeader)
                headers.server = 'ZenX/' +
                    packageInfo.version;

            // Start and bind websocket server
            this.ws = new ws.Server({
                server: this.server,
                headers: headers
            });

        }

        // Callback
        this.httpServer.listen(config.port, config.bind, () => this.emit('listening'));
        this.httpServer.on('listening', () => this.emit('listening'));

    }

};
