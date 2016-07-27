import * as querystring from 'querystring';
import * as https from 'https';

export default function verify_grecaptcha(rkey, ip) {

    return new Promise(function (resolve) {

        var rdata = querystring.stringify({
            secret: appConfig.grecaptcha.secret_key,
            response: rkey,
            remoteip: ip
        });

        var request = https.request({
            hostname: 'www.google.com',
            method: 'post',
            path: '/recaptcha/api/siteverify',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(rdata)
            }
        }, function (response) {

            var data = "";

            response.on('data', function (c) { data += c; });

            response.on('error', () => resolve(null));

            response.on('end', function () {

                try {

                    JSON.parse(data).success ? resolve(true) : resolve(false);

                } catch (e) { resolve(null); }

            });

        });

        request.on('error', () => resolve(null));

        request.write(rdata);

        request.end();

    });

};
