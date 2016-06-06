'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('oauth.link.battlenet');

r.prependRoute(routes.authentication.route);
r.prependRoute(routes.authFilter.route);

module.exports = r;

var BnetStrategy = require('passport-bnet').Strategy;

passport.use(new BnetStrategy({
   clientID: appConfig.battle_net.key,
   clientSecret: appConfig.battle_net.secret,
   callbackURL: appConfig.battle_net.callbackUrl
}, function (accessToken, refreshToken, profile, done) {
   return done(null, profile);
}));

r.setHandler(function (response, req, res) {
   return co(_regenerator2.default.mark(function _callee() {
      var profile;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  _context.next = 2;
                  return job.getBattlenetProfile(req.query.code);

               case 2:
                  profile = _context.sent;

                  if (profile && profile.id) {
                     req.__user.set('bnetid', profile.id);
                     req.__user.set('_bnet_id', profile.id);
                     req.__user.set('_bnet_battletag', profile.battletag);
                     req.__user.updateRecord();
                  }
                  res.end('<script>window.opener&&window.opener.postMessage(\'' + JSON.stringify(profile) + '\', \'*\');window.close();window.location.href=\'/settings/accounts\';</script>');

               case 5:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   })).catch(function (error) {
      return instance.emit('error', error);
   });
});