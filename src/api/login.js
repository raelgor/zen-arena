/* global bcrypt */
/* global verify_grecaptcha */
/* global co */
/* global cacheClient */
/* global make_user_data */
'use strict';

function mw(req, res) {

    co(function*(){

        var valid_request =
            req.body &&
            req.body.message &&
            req.body.message.uid &&
            req.body.message.password;

        if(!valid_request)
            return res.end(JSON.stringify({error: 'error_bad_request'}));

        if(!(yield verify_grecaptcha(req.body.message.grecaptcha, req._address)))
            return res.end(JSON.stringify({error: 'error_no_robot'}));

        var user = yield cacheClient.get({
            query: {
                $or: [
                    { username: String(req.body.message.uid) },
                    { email: String(req.body.message.uid) },
                    { phone: String(req.body.message.uid) }
                ]
            },
            database: 'zenarena',
            collection: 'users'
        });

        user = user[0];

        if(!user)
            return res.end(JSON.stringify({error: 'error_unknown_auth_combo'}));

        var correct_password = yield new Promise(resolve => bcrypt.compare(req.body.message.password, user.password, (error, result) => resolve(result)));

        if(!correct_password)
            return res.end(JSON.stringify({error: 'error_unknown_auth_combo'}));

        return res.end(JSON.stringify({
           success: true,
           user_data: make_user_data(user)
        }));

    });

}

module.exports = mw;
