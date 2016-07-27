'use strict';

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function getCommentView(id) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var comment;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return instance.cache.exists('commentview:' + id);

                    case 2:
                        if (! +_context.sent) {
                            _context.next = 8;
                            break;
                        }

                        _context.next = 5;
                        return instance.cache.hgetall('commentview:' + id);

                    case 5:
                        comment = _context.sent;
                        _context.next = 18;
                        break;

                    case 8:
                        _context.next = 10;
                        return instance.mongos.collection('comments').find({ id: +id }).toArray();

                    case 10:
                        comment = _context.sent;

                        comment = comment[0];

                        if (!comment) {
                            _context.next = 18;
                            break;
                        }

                        _context.next = 15;
                        return instance.mongos.collection('comment_likes').find({ comment_id: +id }).count();

                    case 15:
                        comment.likes = _context.sent;
                        _context.next = 18;
                        return instance.cache.hmset('commentview:' + id, comment);

                    case 18:
                        return _context.abrupt('return', comment);

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};