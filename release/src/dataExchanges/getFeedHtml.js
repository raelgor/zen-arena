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
exports.default = function getFeedHtml(req, coreText, uid, ns_origin, owner_id, type, skip, limit) {
    return __awaiter(this, void 0, Promise, _regenerator2.default.mark(function _callee() {
        var cache, mongos, cacheKey, html, postIds, posts, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _post, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _id, postHtml;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        cache = instance.cache;
                        mongos = instance.mongos;
                        cacheKey = "feed:" + ns_origin + ":" + owner_id + ":" + type;
                        html = '';
                        _context.next = 6;
                        return cache.exists(cacheKey);

                    case 6:
                        if (! +_context.sent) {
                            _context.next = 12;
                            break;
                        }

                        _context.next = 9;
                        return cache.zrevrange(cacheKey, skip, +skip + +limit);

                    case 9:
                        postIds = _context.sent;
                        _context.next = 42;
                        break;

                    case 12:
                        _context.next = 14;
                        return mongos.collection('feeds').find({
                            ns_origin: ns_origin,
                            owner_id: +owner_id,
                            type: type
                        }).sort({ date: 1 }).toArray();

                    case 14:
                        posts = _context.sent;

                        if (!(posts instanceof Array)) {
                            _context.next = 42;
                            break;
                        }

                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 19;
                        _iterator = posts[Symbol.iterator]();

                    case 21:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 28;
                            break;
                        }

                        _post = _step.value;
                        _context.next = 25;
                        return cache.zadd(cacheKey, _post.date_added, _post.post_id);

                    case 25:
                        _iteratorNormalCompletion = true;
                        _context.next = 21;
                        break;

                    case 28:
                        _context.next = 34;
                        break;

                    case 30:
                        _context.prev = 30;
                        _context.t0 = _context["catch"](19);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 34:
                        _context.prev = 34;
                        _context.prev = 35;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 37:
                        _context.prev = 37;

                        if (!_didIteratorError) {
                            _context.next = 40;
                            break;
                        }

                        throw _iteratorError;

                    case 40:
                        return _context.finish(37);

                    case 41:
                        return _context.finish(34);

                    case 42:
                        _context.next = 44;
                        return cache.zrevrange(cacheKey, skip, +skip + +limit);

                    case 44:
                        postIds = _context.sent;

                        if (!(postIds instanceof Array)) {
                            _context.next = 78;
                            break;
                        }

                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context.prev = 49;
                        _iterator2 = postIds[Symbol.iterator]();

                    case 51:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context.next = 64;
                            break;
                        }

                        _id = _step2.value;
                        _context.next = 55;
                        return factory.post.make(req, +_id, coreText, +uid);

                    case 55:
                        postHtml = _context.sent;
                        _context.t1 = !postHtml;

                        if (!_context.t1) {
                            _context.next = 60;
                            break;
                        }

                        _context.next = 60;
                        return cache.zrem(cacheKey, _id);

                    case 60:
                        html += postHtml;

                    case 61:
                        _iteratorNormalCompletion2 = true;
                        _context.next = 51;
                        break;

                    case 64:
                        _context.next = 70;
                        break;

                    case 66:
                        _context.prev = 66;
                        _context.t2 = _context["catch"](49);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context.t2;

                    case 70:
                        _context.prev = 70;
                        _context.prev = 71;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 73:
                        _context.prev = 73;

                        if (!_didIteratorError2) {
                            _context.next = 76;
                            break;
                        }

                        throw _iteratorError2;

                    case 76:
                        return _context.finish(73);

                    case 77:
                        return _context.finish(70);

                    case 78:
                        return _context.abrupt("return", html);

                    case 79:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[19, 30, 34, 42], [35,, 37, 41], [49, 66, 70, 78], [71,, 73, 77]]);
    }));
};