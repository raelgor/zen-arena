'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = get_data();

function get_data() {

        log('Getting cache data...');

        return co(_regenerator2.default.mark(function _callee() {
                var updated, configResponse, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pair, textResponse, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, lang, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, row, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, code, origin, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _row, language;

                return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                                switch (_context.prev = _context.next) {
                                        case 0:

                                                global._cache_is_updating = true;
                                                global._on_cache_updated = new Promise(function (r) {
                                                        return updated = r;
                                                });

                                                _context.next = 4;
                                                return dataTransporter.get({
                                                        query: {},
                                                        collection: 'configuration'
                                                });

                                        case 4:
                                                configResponse = _context.sent;


                                                global.appConfig = {};

                                                _iteratorNormalCompletion = true;
                                                _didIteratorError = false;
                                                _iteratorError = undefined;
                                                _context.prev = 9;
                                                for (_iterator = configResponse[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                                        pair = _step.value;

                                                        appConfig[pair.key] = pair.value;
                                                }_context.next = 17;
                                                break;

                                        case 13:
                                                _context.prev = 13;
                                                _context.t0 = _context['catch'](9);
                                                _didIteratorError = true;
                                                _iteratorError = _context.t0;

                                        case 17:
                                                _context.prev = 17;
                                                _context.prev = 18;

                                                if (!_iteratorNormalCompletion && _iterator.return) {
                                                        _iterator.return();
                                                }

                                        case 20:
                                                _context.prev = 20;

                                                if (!_didIteratorError) {
                                                        _context.next = 23;
                                                        break;
                                                }

                                                throw _iteratorError;

                                        case 23:
                                                return _context.finish(20);

                                        case 24:
                                                return _context.finish(17);

                                        case 25:
                                                _context.next = 27;
                                                return dataTransporter.get({
                                                        query: {},
                                                        collection: 'text'
                                                });

                                        case 27:
                                                textResponse = _context.sent;


                                                global.text = {};

                                                global.appLanguagesCodes = appConfig.app_languages.map(function (l) {
                                                        return l.code;
                                                });
                                                global.appLanguageCodeIndex = {};

                                                _iteratorNormalCompletion2 = true;
                                                _didIteratorError2 = false;
                                                _iteratorError2 = undefined;
                                                _context.prev = 34;
                                                for (_iterator2 = appConfig.app_languages[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                                        lang = _step2.value;

                                                        global.appLanguageCodeIndex[lang.code] = lang;
                                                }_context.next = 42;
                                                break;

                                        case 38:
                                                _context.prev = 38;
                                                _context.t1 = _context['catch'](34);
                                                _didIteratorError2 = true;
                                                _iteratorError2 = _context.t1;

                                        case 42:
                                                _context.prev = 42;
                                                _context.prev = 43;

                                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                                        _iterator2.return();
                                                }

                                        case 45:
                                                _context.prev = 45;

                                                if (!_didIteratorError2) {
                                                        _context.next = 48;
                                                        break;
                                                }

                                                throw _iteratorError2;

                                        case 48:
                                                return _context.finish(45);

                                        case 49:
                                                return _context.finish(42);

                                        case 50:
                                                global.languageCodes = new Set(global.appLanguagesCodes);

                                                _iteratorNormalCompletion3 = true;
                                                _didIteratorError3 = false;
                                                _iteratorError3 = undefined;
                                                _context.prev = 54;
                                                for (_iterator3 = textResponse[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                                        row = _step3.value;

                                                        global.text[row.origin] = global.text[row.origin] || {};
                                                }_context.next = 62;
                                                break;

                                        case 58:
                                                _context.prev = 58;
                                                _context.t2 = _context['catch'](54);
                                                _didIteratorError3 = true;
                                                _iteratorError3 = _context.t2;

                                        case 62:
                                                _context.prev = 62;
                                                _context.prev = 63;

                                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                                        _iterator3.return();
                                                }

                                        case 65:
                                                _context.prev = 65;

                                                if (!_didIteratorError3) {
                                                        _context.next = 68;
                                                        break;
                                                }

                                                throw _iteratorError3;

                                        case 68:
                                                return _context.finish(65);

                                        case 69:
                                                return _context.finish(62);

                                        case 70:
                                                _iteratorNormalCompletion4 = true;
                                                _didIteratorError4 = false;
                                                _iteratorError4 = undefined;
                                                _context.prev = 73;
                                                for (_iterator4 = global.appLanguagesCodes[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                                        code = _step4.value;

                                                        for (origin in global.text) {
                                                                global.text[origin][code] = {};
                                                        }
                                                }_context.next = 81;
                                                break;

                                        case 77:
                                                _context.prev = 77;
                                                _context.t3 = _context['catch'](73);
                                                _didIteratorError4 = true;
                                                _iteratorError4 = _context.t3;

                                        case 81:
                                                _context.prev = 81;
                                                _context.prev = 82;

                                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                                        _iterator4.return();
                                                }

                                        case 84:
                                                _context.prev = 84;

                                                if (!_didIteratorError4) {
                                                        _context.next = 87;
                                                        break;
                                                }

                                                throw _iteratorError4;

                                        case 87:
                                                return _context.finish(84);

                                        case 88:
                                                return _context.finish(81);

                                        case 89:
                                                _iteratorNormalCompletion5 = true;
                                                _didIteratorError5 = false;
                                                _iteratorError5 = undefined;
                                                _context.prev = 92;
                                                for (_iterator5 = textResponse[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                                        _row = _step5.value;

                                                        global.text[_row.origin][_row.language][_row.id] = _row;
                                                }_context.next = 100;
                                                break;

                                        case 96:
                                                _context.prev = 96;
                                                _context.t4 = _context['catch'](92);
                                                _didIteratorError5 = true;
                                                _iteratorError5 = _context.t4;

                                        case 100:
                                                _context.prev = 100;
                                                _context.prev = 101;

                                                if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                                        _iterator5.return();
                                                }

                                        case 103:
                                                _context.prev = 103;

                                                if (!_didIteratorError5) {
                                                        _context.next = 106;
                                                        break;
                                                }

                                                throw _iteratorError5;

                                        case 106:
                                                return _context.finish(103);

                                        case 107:
                                                return _context.finish(100);

                                        case 108:
                                                global._cache_is_updating = false;
                                                updated();

                                                global.coreTextCache = {};

                                                for (language in global.text.core) {
                                                        coreTextCache[language] = make_core_text(language);
                                                }global.coreDbData = {};

                                                _context.next = 115;
                                                return dataTransporter.dbc.collection('games').find({}).sort({ order: 1 }).toArray();

                                        case 115:
                                                global.coreDbData.games = _context.sent;


                                                log.green('Cache up to date.');

                                                //setTimeout(get_data, 5*6e4);

                                        case 117:
                                        case 'end':
                                                return _context.stop();
                                }
                        }
                }, _callee, this, [[9, 13, 17, 25], [18,, 20, 24], [34, 38, 42, 50], [43,, 45, 49], [54, 58, 62, 70], [63,, 65, 69], [73, 77, 81, 89], [82,, 84, 88], [92, 96, 100, 108], [101,, 103, 107]]);
        })).catch(function (e) {
                return instance.emit('error', e);
        });
}