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
f.setName('feedLeftColumn');
f.setGenerator(generator);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = f;
function generator(req, coreText, user) {
    return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
        var feedPosts, result;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return data.getFeedHtml(req, coreText,
                        // Auth user
                        user.get('id'),
                        // Namespace origin
                        'user',
                        // Owner id
                        user.get('id'),
                        // Feed type (wall/feed)
                        'feed',
                        // Skip
                        0,
                        // Limit
                        10);

                    case 2:
                        feedPosts = _context.sent;
                        result = templates.feedLeftColumn({
                            coreText: coreText,
                            data: {
                                userImage: user.get('image'),
                                feedPosts: feedPosts
                            }
                        });
                        return _context.abrupt('return', result);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}