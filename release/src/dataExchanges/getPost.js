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
exports.default = function getPost(id) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var post, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return instance.cache.hgetall("post:" + id);

                    case 2:
                        post = _context.sent;

                        if (!(!post || !post.id)) {
                            _context.next = 13;
                            break;
                        }

                        _context.next = 6;
                        return instance.mongos.collection('posts').find({ id: +id }).toArray();

                    case 6:
                        result = _context.sent;

                        post = result[0];

                        if (post) {
                            _context.next = 11;
                            break;
                        }

                        log.debug("data.getPost(" + id + "): Post not found.");
                        return _context.abrupt("return", null);

                    case 11:
                        _context.next = 13;
                        return instance.cache.hmset("post:" + id, post);

                    case 13:
                        return _context.abrupt("return", post);

                    case 14:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};