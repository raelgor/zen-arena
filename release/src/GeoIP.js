"use strict";

var colors = require('chalk');
var http = require('http');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GeoIP;
var GeoIP = {
    get: function get(req, address) {
        req._depth_name = '[GeoIP][get]';
        log.debug(req, 'Getting ' + colors.magenta(address) + '...');
        var resolved = false;
        var _resolve = void 0;
        var promise = new Promise(function (r) {
            return _resolve = r;
        });
        var resolve = function resolve(val) {
            if (resolved) return;
            resolved = true;
            _resolve(val);
        };
        var request = http.get(appConfig.geoip_url + '/json/' + address, function (response) {
            var data = '';
            response.on('data', function (c) {
                return data += c;
            });
            response.on('end', function () {
                try {
                    var parsed = JSON.parse(data);
                    // @todo Map properly
                    resolve({
                        language: parsed.country_code === 'GR' ? 'el' : 'en',
                        country_code: parsed.country_code
                    });
                    log.debug(req, 'Success. (' + parsed.country_code + ')');
                } catch (err) {
                    resolve(false);
                    log.debug(req, 'Failed to parse response.');
                }
            });
        });
        request.on('error', log);
        setTimeout(function () {
            if (resolved) return;
            request.abort();
            resolve(false);
            log.debug(req, 'Timed out.');
        }, appConfig.geoip_timeout);
        return promise;
    }
};