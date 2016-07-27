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
var User_1 = require('../classes/User');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function getPostViewData(req, id, coreText, uid) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var cache, mongos, viewData, publisher, result, NUM_OF_COMM, totalComments, commentIds, comments, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _comment, comment, index;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        cache = instance.cache;
                        mongos = instance.mongos;
                        viewData = cache.hgetall("postview:" + id);

                        if (viewData.id) {
                            _context.next = 27;
                            break;
                        }

                        _context.next = 6;
                        return data.getPost(id);

                    case 6:
                        viewData = _context.sent;

                        if (viewData) {
                            _context.next = 9;
                            break;
                        }

                        return _context.abrupt("return", '');

                    case 9:
                        _context.next = 11;
                        return mongos.collection('post_likes').find({ post_id: id }).count();

                    case 11:
                        viewData.likes = _context.sent;
                        _context.next = 14;
                        return mongos.collection('comments').find({ post_id: id }).count();

                    case 14:
                        viewData.comments = _context.sent;

                        viewData.shares = 0;
                        _context.next = 18;
                        return data.getRecordByNamespace(req, +viewData.publisher);

                    case 18:
                        publisher = _context.sent;

                        if (publisher) {
                            _context.next = 21;
                            break;
                        }

                        return _context.abrupt("return", '');

                    case 21:
                        viewData.publisher_namespace = publisher.namespace || publisher.get('id');
                        if (publisher instanceof User_1.default) {
                            viewData.publisher_namespace = publisher.get('username') || publisher.get('id');
                            viewData.publisher_image = publisher.get('image');
                            viewData.publisher_display_name = publisher.displayName();
                        }
                        _context.next = 25;
                        return cache.hmset("postview:" + id, viewData);

                    case 25:
                        _context.next = 28;
                        break;

                    case 27:
                        log.debug('factory.post: Found in cache.');

                    case 28:
                        if (!uid) {
                            _context.next = 40;
                            break;
                        }

                        _context.next = 31;
                        return cache.get("postselflike:" + id + ":" + uid);

                    case 31:
                        viewData.selfLiked = _context.sent;

                        if (viewData.selfLiked) {
                            _context.next = 39;
                            break;
                        }

                        _context.next = 35;
                        return mongos.collection('post_likes').find({
                            post_id: +id,
                            user_id: +uid
                        }).count();

                    case 35:
                        result = _context.sent;

                        viewData.selfLiked = result;
                        _context.next = 39;
                        return cache.set("postselflike:" + id + ":" + uid, viewData.selfLiked);

                    case 39:
                        viewData.selfLiked = +viewData.selfLiked;

                    case 40:
                        NUM_OF_COMM = 2;

                        viewData.commentsHtml = [];
                        _context.next = 44;
                        return cache.exists("commentpool:" + viewData.id);

                    case 44:
                        if (! +_context.sent) {
                            _context.next = 54;
                            break;
                        }

                        _context.next = 47;
                        return cache.zcount("commentpool:" + viewData.id, '-inf', '+inf');

                    case 47:
                        totalComments = +_context.sent;
                        _context.next = 50;
                        return cache.zrange("commentpool:" + viewData.id, totalComments - NUM_OF_COMM, totalComments);

                    case 50:
                        commentIds = _context.sent;

                        viewData.commentsHtml = commentIds;
                        _context.next = 85;
                        break;

                    case 54:
                        _context.next = 56;
                        return mongos.collection('comments').find({ post_id: +viewData.id }).sort({ date: 1 }).toArray();

                    case 56:
                        comments = _context.sent;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 60;
                        _iterator = comments[Symbol.iterator]();

                    case 62:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 69;
                            break;
                        }

                        _comment = _step.value;
                        _context.next = 66;
                        return cache.zadd("commentpool:" + viewData.id, _comment.date, _comment.id);

                    case 66:
                        _iteratorNormalCompletion = true;
                        _context.next = 62;
                        break;

                    case 69:
                        _context.next = 75;
                        break;

                    case 71:
                        _context.prev = 71;
                        _context.t0 = _context["catch"](60);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 75:
                        _context.prev = 75;
                        _context.prev = 76;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 78:
                        _context.prev = 78;

                        if (!_didIteratorError) {
                            _context.next = 81;
                            break;
                        }

                        throw _iteratorError;

                    case 81:
                        return _context.finish(78);

                    case 82:
                        return _context.finish(75);

                    case 83:
                        while (NUM_OF_COMM--) {
                            comment = comments.pop();

                            comment && viewData.commentsHtml.push(comment.id);
                        }
                        viewData.commentsHtml.reverse();

                    case 85:
                        _context.t1 = _regenerator2.default.keys(viewData.commentsHtml);

                    case 86:
                        if ((_context.t2 = _context.t1()).done) {
                            _context.next = 93;
                            break;
                        }

                        index = _context.t2.value;
                        _context.next = 90;
                        return factory.comment.make(req, viewData.commentsHtml[index], coreText, uid);

                    case 90:
                        viewData.commentsHtml[index] = _context.sent;
                        _context.next = 86;
                        break;

                    case 93:
                        if (+uid === +viewData.publisher) viewData.isOwner = true;
                        return _context.abrupt("return", viewData);

                    case 95:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this, [[60, 71, 75, 83], [76,, 78, 82]]);
    }));
};