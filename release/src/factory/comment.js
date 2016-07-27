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
var Factory_1 = require('../classes/Factory');
var f = new Factory_1.default();
f.setName('comment');
f.setGenerator(generator);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = f;
function generator(req, id, coreText, uid) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var cache, mongos, comment, user_id, user, _result, post, result;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        cache = instance.cache;
                        mongos = instance.mongos;
                        _context.next = 4;
                        return data.getCommentView(id);

                    case 4:
                        comment = _context.sent;

                        // Get poster info
                        user_id = comment.user_id;
                        _context.next = 8;
                        return data.getUser({ id: +user_id });

                    case 8:
                        user = _context.sent;

                        comment.userImage = user.get('image');
                        comment.displayName = user.displayName();
                        // Check if auth user has liked and if can delete

                        if (!uid) {
                            _context.next = 34;
                            break;
                        }

                        _context.next = 14;
                        return cache.exists('commentselflike:' + id + ':' + uid);

                    case 14:
                        if (! +_context.sent) {
                            _context.next = 20;
                            break;
                        }

                        _context.next = 17;
                        return cache.get('commentselflike:' + id + ':' + uid);

                    case 17:
                        comment.selfLiked = _context.sent;
                        _context.next = 26;
                        break;

                    case 20:
                        _context.next = 22;
                        return mongos.collection('comment_likes').find({
                            comment_id: +id,
                            user_id: +uid
                        }).count();

                    case 22:
                        _result = _context.sent;

                        comment.selfLiked = +_result;
                        _context.next = 26;
                        return cache.set('commentselflike:' + id + ':' + uid, comment.selfLiked);

                    case 26:
                        if (!(+uid === +comment.user_id)) {
                            _context.next = 30;
                            break;
                        }

                        comment.deletable = true;
                        _context.next = 34;
                        break;

                    case 30:
                        _context.next = 32;
                        return data.getPost(comment.post_id);

                    case 32:
                        post = _context.sent;

                        +post.publisher === +uid && (comment.deletable = true);

                    case 34:
                        // Build
                        result = templates.comment({
                            coreText: coreText,
                            comment: comment
                        });
                        return _context.abrupt('return', result);

                    case 36:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}