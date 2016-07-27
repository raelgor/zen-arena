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
exports.default = function delete_comment(id) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var comment;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return data.getCommentView(id);

                    case 2:
                        comment = _context.sent;
                        _context.next = 5;
                        return instance.cache.zrem("commentpool:" + comment.post_id, comment.id);

                    case 5:
                        _context.next = 7;
                        return instance.cache.hincrby("postview:" + comment.post_id, 'comments', -1);

                    case 7:
                        _context.next = 9;
                        return instance.mongos.collection('comments').remove({ id: +id });

                    case 9:
                        _context.next = 11;
                        return instance.mongos.collection('comment_likes').remove({ comment_id: +id }, { multi: true });

                    case 11:
                        _context.next = 13;
                        return instance.cache.del("commentview:" + id);

                    case 13:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};