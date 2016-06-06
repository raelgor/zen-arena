'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new Route();

r.setName('authentication');

module.exports = r;

r.setHandler(function (response, req, res, next) {
   return co(_regenerator2.default.mark(function _callee() {
      var user, session, query;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  if (!(req.cookies && req.cookies.st)) {
                     _context.next = 34;
                     break;
                  }

                  user = void 0;
                  _context.next = 4;
                  return cache.hgetall('sessions:' + req.cookies.st);

               case 4:
                  session = _context.sent;

                  if (session.session_token) {
                     _context.next = 13;
                     break;
                  }

                  _context.next = 8;
                  return mongos.collection('sessions').find({
                     session_token: req.cookies.st
                  }).toArray();

               case 8:
                  query = _context.sent;


                  session = query[0];

                  if (!session) {
                     _context.next = 13;
                     break;
                  }

                  _context.next = 13;
                  return cache.hmset('sessions:' + session.session_token, session);

               case 13:
                  if (!session) {
                     _context.next = 17;
                     break;
                  }

                  _context.next = 16;
                  return data.getUser({ id: +session.user_id });

               case 16:
                  user = _context.sent;

               case 17:
                  if (user) {
                     _context.next = 22;
                     break;
                  }

                  log.debug(req, 'Cookies were invalid. Clearing...');
                  res.clearCookie('st');
                  _context.next = 32;
                  break;

               case 22:

                  log.debug(req, 'User found. Gathering info...');

                  req.__user = user;
                  req.__session = session;

                  // If user has a valid lang setting, set the request's lang
                  if (user.get('lang') && ~appLanguagesCodes.indexOf(user.get('lang'))) req.lang = user.get('lang');

                  // If the user has no lang setting but we have a lang cookie,
                  // set the user's lang
                  if (!user.get('lang') && ~appLanguagesCodes.indexOf(req.cookies.lang)) user.set('lang', req.cookies.lang);

                  // If user still has no language
                  if (!user.get('lang')) user.set('lang', appConfig.default_lang);

                  // Refresh session
                  req.__session.expires = Date.now() + appConfig.web_session_lifespan;

                  // Make sure user has an unsubscribe all token
                  if (!user.get('unsubscribe_all_token')) user.set('unsubscribe_all_token', uuid());

                  // Update user
                  _context.next = 32;
                  return user.updateRecord();

               case 32:
                  _context.next = 35;
                  break;

               case 34:
                  log.debug(req, 'No auth.');

               case 35:
                  next();

               case 36:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});