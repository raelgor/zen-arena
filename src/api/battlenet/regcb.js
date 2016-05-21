'use strict';

var r = new APIRoute();

r.setName('battlenet.regcb');

module.exports = r;

var BnetStrategy = require('passport-bnet').Strategy;

passport.use(new BnetStrategy({
    clientID: appConfig.battle_net.key,
    clientSecret: appConfig.battle_net.secret,
    callbackURL: appConfig.battle_net.callbackUrl
}, function(accessToken, refreshToken, profile, done) {
   console.log('passport itself:');
   console.log({accessToken, profile});
    return done(null, profile);
}));

r.setHandler((response, req, res) => co(function*(){
   console.log('regcb:');
   console.log(yield job.getBattlenetProfile(req.query.code));
   res.end(`<script>window.opener.postMessage('bnc:${req.query.code}', '*');window.close();</script>`);
}).catch(error => instance.emit('error', error)));
