/* global log, colors, appConfig */
'use strict';

const http = require('http');

const GeoIP = {

    get: address => {

        log(`GeoIP getting ${colors.magenta(address)}...`);

        let resolved = false;
        let _resolve;
        let promise = new Promise(r => _resolve = r);

        let resolve = val => {
            if(resolved) return;
            resolved = true;
            _resolve(val);
        };

        let request = http.get(`${appConfig.geoip_url}/json/${address}`, response => {

            let data = '';
            response.on('data', c => data += c);
            response.on('end', () => {

                try {
                    // @todo Map properly
                    resolve(JSON.parse(data).country_code === 'GR' ? 'el' : 'en');
                } catch(err) {
                    resolve(false);
                }

            });

        });

        request.on('error', log);

        setTimeout(() => {

            request.abort();
            resolve(false);

        }, appConfig.geoip_timeout);

        return promise;

    }

};

module.exports = GeoIP;
