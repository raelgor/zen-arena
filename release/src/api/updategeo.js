'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var r = new APIRoute();

r.setName('updategeo');

module.exports = r;

r.prependRoute(routes.authentication.route);

r.setHandler(function (response, req, res) {
   return co(_regenerator2.default.mark(function _callee() {
      var valid_request, lat, lng, url, key, options, geoInfo, country, city, user;
      return _regenerator2.default.wrap(function _callee$(_context) {
         while (1) {
            switch (_context.prev = _context.next) {
               case 0:
                  valid_request = req.body && req.body.message && req.body.message.latitude && req.body.message.longitude;

                  if (valid_request) {
                     _context.next = 3;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_invalid_request'));

               case 3:
                  lat = req.body.message.latitude;
                  lng = req.body.message.longitude;

                  // If valid cookies exist, abort

                  if (!(req.cookies.country_code && req.cookies.city_code)) {
                     _context.next = 7;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_geoinfo_exists'));

               case 7:
                  url = 'https://maps.googleapis.com/maps/api/geocode/json';
                  key = appConfig.google_maps_server_key;
                  options = 'result_type=country|locality';

                  // Get geo info

                  _context.next = 12;
                  return get(url + '?key=' + key + '&sensor=false&latlng=' + lat + ',' + lng + '&' + options);

               case 12:
                  geoInfo = _context.sent;


                  if (geoInfo) try {
                     geoInfo = JSON.parse(geoInfo);
                  } catch (e) {}

                  try {
                     (function () {
                        var found = [];

                        geoInfo.results.forEach(function (e) {
                           return e.address_components.forEach(function (e) {
                              return ~e.types.indexOf('country') && found.push(e);
                           });
                        });

                        country = found[0].short_name;
                     })();
                  } catch (e) {}

                  try {
                     (function () {
                        var found = [];

                        geoInfo.results.forEach(function (e) {
                           return e.address_components.forEach(function (e) {
                              return ~e.types.indexOf('locality') && found.push(e);
                           });
                        });

                        city = found[0].short_name;
                     })();
                  } catch (e) {}

                  if (!((typeof geoInfo === 'undefined' ? 'undefined' : (0, _typeof3.default)(geoInfo)) !== 'object' || !country && !city)) {
                     _context.next = 18;
                     break;
                  }

                  return _context.abrupt('return', response.error('error_get_geoinfo_failed'));

               case 18:
                  if (!req.__user) {
                     _context.next = 26;
                     break;
                  }

                  user = req.__user;


                  country && user.set('country', country);
                  city && user.set('city', city);

                  _context.t0 = country || city;

                  if (!_context.t0) {
                     _context.next = 26;
                     break;
                  }

                  _context.next = 26;
                  return user.updateRecord();

               case 26:

                  // Set cookies
                  if (country) res.cookie('country_code', country, {
                     maxAge: 200 * 24 * 60 * 60 * 1000,
                     httpOnly: true,
                     secure: true
                  });

                  if (city) res.cookie('city_code', city, {
                     maxAge: 200 * 24 * 60 * 60 * 1000,
                     httpOnly: true,
                     secure: true
                  });

                  // Return geo info
                  response.responseData = { country: country, city: city };

                  response.end();

               case 30:
               case 'end':
                  return _context.stop();
            }
         }
      }, _callee, this);
   }));
});