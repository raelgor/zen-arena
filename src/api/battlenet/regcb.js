'use strict';

var r = new APIRoute();

r.setName('battlenet.regcb');

module.exports = r;

var BnetStrategy = require('passport-bnet').Strategy;

passport.use(new BnetStrategy({
    clientID: appConfig.battle_net.key,
    clientSecret: appConfig.battle_net.secret,
    callbackURL: "https://zenarena.com/api/battlenet/regcb"
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

r.setHandler((response, req, res) => co(function*(){

   res.redirect('/bnet-success');

}).catch(error => instance.emit('error', error)));
