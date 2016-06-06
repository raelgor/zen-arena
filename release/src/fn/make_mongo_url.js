'use strict';

function make_mongo_url(options) {

    var auth_string = options.username ? options.username + ':' + options.password + '@' : '';

    var mongoUrl = 'mongodb://' + (auth_string + (options.host || 'localhost')) + ':' + (options.port || 27017) + '/' + options.name;

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

module.exports = make_mongo_url;