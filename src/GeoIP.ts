import * as colors from 'chalk';
import * as http from 'http';

export default GeoIP;

var GeoIP = {

    get: (req, address) => {

      req._depth_name = `[GeoIP][get]`;

        log.debug(req, `Getting ${colors.magenta(address)}...`);

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
                   let parsed = JSON.parse(data);
                    // @todo Map properly
                    resolve({
                       language: parsed.country_code === 'GR' ? 'el' : 'en',
                       country_code: parsed.country_code
                    });
                    log.debug(req, `Success. (${parsed.country_code})`);
                } catch(err) {
                    resolve(false);
                    log.debug(req, 'Failed to parse response.');
                }

            });

        });

        request.on('error', log);

        setTimeout(() => {

           if(resolved) return;

            request.abort();
            resolve(false);
            log.debug(req, 'Timed out.');

        }, appConfig.geoip_timeout);

        return promise;

    }

};
