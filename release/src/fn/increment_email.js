"use strict";

var _regenerator = require("babel-runtime/regenerator");

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function increment_email(email) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var emailIsAllowed, max, interval, record, messages, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _expiry;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // Maximum pending expiry dates
                        max = appConfig.max_emails_per_interval;
                        // TTL for each message record

                        interval = appConfig.email_blacklist_interval;
                        _context.next = 4;
                        return dataTransporter.get({
                            query: { email: email },
                            database: instance.config.systemDatabase.name,
                            collection: 'email_blacklist'
                        });

                    case 4:
                        record = _context.sent;
                        messages = [];

                        record = record[0];
                        // If there is a record of this email

                        if (!record) {
                            _context.next = 29;
                            break;
                        }

                        // Make a new array with just the expiry dates pending
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 11;
                        for (_iterator = record.messages[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            _expiry = _step.value;

                            _expiry > Date.now() && messages.push(_expiry);
                        }_context.next = 19;
                        break;

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context["catch"](11);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 19:
                        _context.prev = 19;
                        _context.prev = 20;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 22:
                        _context.prev = 22;

                        if (!_didIteratorError) {
                            _context.next = 25;
                            break;
                        }

                        throw _iteratorError;

                    case 25:
                        return _context.finish(22);

                    case 26:
                        return _context.finish(19);

                    case 27:
                        _context.next = 30;
                        break;

                    case 29:
                        record = { email: email, messages: messages };

                    case 30:
                        emailIsAllowed = messages.length < max;
                        // Add this attempt if valid
                        if (emailIsAllowed) messages.push(Date.now() + interval);
                        // Delete object _id
                        delete record._id;
                        // Update or insert
                        _context.next = 35;
                        return dataTransporter.update({
                            query: { email: email },
                            update: { $set: record },
                            options: { upsert: true },
                            database: instance.config.systemDatabase.name,
                            collection: 'email_blacklist'
                        });

                    case 35:
                        return _context.abrupt("return", emailIsAllowed);

                    case 36:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[11, 15, 19, 27], [20,, 22, 26]]);
    }));
};