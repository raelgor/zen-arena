"use strict";

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var make_core_text_1 = require('./fn/make_core_text');
(function get_data() {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var configResponse, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pair, textResponse, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, lang, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, row, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, code, origin, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _row, language;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        log('Getting cache data...');
                        _context.next = 3;
                        return dataTransporter.get({
                            query: {},
                            collection: 'configuration'
                        });

                    case 3:
                        configResponse = _context.sent;

                        global["appConfig"] = {};
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 8;
                        for (_iterator = configResponse[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            pair = _step.value;

                            appConfig[pair.key] = pair.value;
                        }_context.next = 16;
                        break;

                    case 12:
                        _context.prev = 12;
                        _context.t0 = _context['catch'](8);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 16:
                        _context.prev = 16;
                        _context.prev = 17;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 19:
                        _context.prev = 19;

                        if (!_didIteratorError) {
                            _context.next = 22;
                            break;
                        }

                        throw _iteratorError;

                    case 22:
                        return _context.finish(19);

                    case 23:
                        return _context.finish(16);

                    case 24:
                        _context.next = 26;
                        return dataTransporter.get({
                            query: {},
                            collection: 'text'
                        });

                    case 26:
                        textResponse = _context.sent;

                        global["text"] = {};
                        global["appLanguagesCodes"] = appConfig.app_languages.map(function (l) {
                            return l.code;
                        });
                        global["appLanguageCodeIndex"] = {};
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context.prev = 33;
                        for (_iterator2 = appConfig.app_languages[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            lang = _step2.value;

                            appLanguageCodeIndex[lang.code] = lang;
                        }_context.next = 41;
                        break;

                    case 37:
                        _context.prev = 37;
                        _context.t1 = _context['catch'](33);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context.t1;

                    case 41:
                        _context.prev = 41;
                        _context.prev = 42;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 44:
                        _context.prev = 44;

                        if (!_didIteratorError2) {
                            _context.next = 47;
                            break;
                        }

                        throw _iteratorError2;

                    case 47:
                        return _context.finish(44);

                    case 48:
                        return _context.finish(41);

                    case 49:
                        global["languageCodes"] = new Set(appLanguagesCodes);
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        _context.prev = 53;
                        for (_iterator3 = textResponse[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            row = _step3.value;

                            text[row.origin] = text[row.origin] || {};
                        }_context.next = 61;
                        break;

                    case 57:
                        _context.prev = 57;
                        _context.t2 = _context['catch'](53);
                        _didIteratorError3 = true;
                        _iteratorError3 = _context.t2;

                    case 61:
                        _context.prev = 61;
                        _context.prev = 62;

                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }

                    case 64:
                        _context.prev = 64;

                        if (!_didIteratorError3) {
                            _context.next = 67;
                            break;
                        }

                        throw _iteratorError3;

                    case 67:
                        return _context.finish(64);

                    case 68:
                        return _context.finish(61);

                    case 69:
                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        _context.prev = 72;
                        for (_iterator4 = appLanguagesCodes[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            code = _step4.value;

                            for (origin in text) {
                                text[origin][code] = {};
                            }
                        }_context.next = 80;
                        break;

                    case 76:
                        _context.prev = 76;
                        _context.t3 = _context['catch'](72);
                        _didIteratorError4 = true;
                        _iteratorError4 = _context.t3;

                    case 80:
                        _context.prev = 80;
                        _context.prev = 81;

                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }

                    case 83:
                        _context.prev = 83;

                        if (!_didIteratorError4) {
                            _context.next = 86;
                            break;
                        }

                        throw _iteratorError4;

                    case 86:
                        return _context.finish(83);

                    case 87:
                        return _context.finish(80);

                    case 88:
                        _iteratorNormalCompletion5 = true;
                        _didIteratorError5 = false;
                        _iteratorError5 = undefined;
                        _context.prev = 91;
                        for (_iterator5 = textResponse[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            _row = _step5.value;

                            text[_row.origin][_row.language][_row.id] = _row;
                        }_context.next = 99;
                        break;

                    case 95:
                        _context.prev = 95;
                        _context.t4 = _context['catch'](91);
                        _didIteratorError5 = true;
                        _iteratorError5 = _context.t4;

                    case 99:
                        _context.prev = 99;
                        _context.prev = 100;

                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }

                    case 102:
                        _context.prev = 102;

                        if (!_didIteratorError5) {
                            _context.next = 105;
                            break;
                        }

                        throw _iteratorError5;

                    case 105:
                        return _context.finish(102);

                    case 106:
                        return _context.finish(99);

                    case 107:
                        global["coreTextCache"] = {};
                        for (language in text.core) {
                            coreTextCache[language] = make_core_text_1.default(language);
                        }global["coreDbData"] = {};
                        _context.next = 112;
                        return dataTransporter.dbc.collection('games').find({}).sort({ order: 1 }).toArray();

                    case 112:
                        coreDbData.games = _context.sent;

                        log.green('Cache up to date.');

                    case 114:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[8, 12, 16, 24], [17,, 19, 23], [33, 37, 41, 49], [42,, 44, 48], [53, 57, 61, 69], [62,, 64, 68], [72, 76, 80, 88], [81,, 83, 87], [91, 95, 99, 107], [100,, 102, 106]]);
    }));
})();