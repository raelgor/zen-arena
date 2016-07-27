"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methodOverride = require('method-override');
var multipart = require('connect-multiparty');
var eventemitter2_1 = require('eventemitter2');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var helmet = require('helmet');
var path = require('path');
var ws = require('ws');

var Server = function (_eventemitter2_1$Even) {
    (0, _inherits3.default)(Server, _eventemitter2_1$Even);

    function Server(options) {
        (0, _classCallCheck3.default)(this, Server);

        // In case of no options

        var _this = (0, _possibleConstructorReturn3.default)(this, Object.getPrototypeOf(Server).call(this));

        !options && (options = {});
        // Load default configuration
        _this.config = require('../defaultServerConfig.js');
        // Set initial status
        _this.status = -1;
        // Overwrite defaults
        for (var option in options) {
            _this.config[option] = options[option];
        } // Create the express app
        _this.server = express();
        // Use compression on all requests
        // @todo toggle compression with optional parameter
        //this.server.use(compression({threshold:0}));
        // Create router
        _this.router = express.Router();
        // Set upload limit
        _this.server.use(bodyParser.raw({
            limit: _this.config.uploadLimit
        }));
        // Block libwww-perl
        _this.server.use(function (req, res, next) {
            return (/libwww-perl/.test(req.get('user-agent')) ? res.status(403).end() : next()
            );
        });
        // Parse json api requests
        _this.server.use(bodyParser.urlencoded({ extended: true }));
        _this.server.use(bodyParser.json());
        // Add headers
        _this.server.use(function (req, res, next) {
            if (_this.config.serverHeader) res.setHeader('Server', 'ZenX/' + packageInfo.version);
            res.setHeader('Connection', 'Keep-Alive');
            res.setHeader('Keep-Alive', 'timeout=15, max=100');
            return next();
        });
        // Standard middleware
        _this.server.use(helmet.xssFilter());
        _this.server.use(cookieParser());
        _this.server.use(multipart());
        _this.server.use(methodOverride());
        // Disable x-powered-by header
        _this.server.disable('x-powered-by');
        // A route to be used later
        _this.server.use(_this.router);
        // If a static content path was provided
        if (_this.config.static) {
            // Always add cache control header
            _this.server.use(function (req, res, next) {
                res.setHeader("Cache-Control", "max-age=31104000, public");
                res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
                return next();
            });
            // Serve static content
            _this.server.use(express.static(path.resolve(_this.config.static)));
        }
        // Not found
        _this.server.get('*', function (req, res) {
            res.writeHead(404, 'Not found');
            res.end('404: Not found');
        });
        var config = _this.config;
        // Start server as specified in config
        if (config.ssl) {
            _this.httpServer = require('https').createServer({
                key: config.sslCert.key,
                cert: config.sslCert.cert,
                ca: config.sslCert.ca,
                passphrase: config.passphrase
            }, _this.server);
        } else _this.httpServer = require('http').createServer(_this.server);
        // Start and bind a WebSocket server if
        // specified in config
        if (config.ws) {
            // @todo check headers
            // var headers: any = {};
            // if (config.serverHeader)
            // headers.server = 'ZenX/' +
            // packageInfo.version;
            // Start and bind websocket server
            _this.ws = new ws.Server({
                server: _this.server
            });
        }
        // Callback
        _this.httpServer.listen(config.port, config.bind, function () {
            return _this.emit('listening');
        });
        _this.httpServer.on('listening', function () {
            return _this.emit('listening');
        });
        return _this;
    }

    return Server;
}(eventemitter2_1.EventEmitter2);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Server;
;