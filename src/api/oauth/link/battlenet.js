'use strict';

var r = new APIRoute();

r.setName('oauth.link.battlenet');

module.exports = r;

var BnetStrategy = require('passport-bnet').Strategy;

passport.use(new BnetStrategy({
    clientID: appConfig.battle_net.key,
    clientSecret: appConfig.battle_net.secret,
    callbackURL: appConfig.battle_net.callbackUrl
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

r.setHandler((response, req, res) => co(function*(){
   var profile = yield job.getBattlenetProfile(req.query.code);
   if(profile && profile.id) {
      req.__user.set('bnetid', profile.id);
      req.__user.set('_bnet_battletag', profile.battletag);
      req.__user.updateRecord();
   }
   res.end(`<script>window.opener&&window.opener.postMessage('${JSON.stringify(profile)}', '*');window.close();window.location.href='/settings/accounts';</script>`);
}).catch(error => instance.emit('error', error)));
