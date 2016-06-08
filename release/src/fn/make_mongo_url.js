"use strict";
/**
 * Creates a mongodb connection url from an options object.
 */

function make_mongo_url() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {
        host: 'localhost',
        port: '27017',
        name: ''
    } : arguments[0];

    var auth_string = options.username ? options.username + ':' + options.password + '@' : '';
    var mongoUrl = 'mongodb://' + (auth_string + options.host) + ':' + options.port + '/' + options.name;
    if (options.query) if (typeof options.query !== 'string') {
        if (Object.keys(options.query).length) {
            mongoUrl += '?';
            for (var key in options.query) {
                mongoUrl += key + '=' + options.query[key] + '&';
            }mongoUrl = mongoUrl.substring(0, mongoUrl.length - 1);
        }
    } else {
        mongoUrl += options.query.replace(/(^[^?])/, '?$1');
    }
    return mongoUrl;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = make_mongo_url;