"use strict";

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var fs = require('fs');
/**
 * Loads a directory to a namespace or the global scope. Variables are
 * file names without the extention.
 */
function loaddirSync(
/**
 * The directory to load.
 */
dir,
/**
 * The `global.namespace` to load to.
 */
loadKey) {
  var fileType = arguments.length <= 2 || arguments[2] === undefined ? '.js' : arguments[2];
  var loadFn = arguments.length <= 3 || arguments[3] === undefined ? require : arguments[3];

  var target = global;
  if (loadKey) if (typeof loadKey === 'string') target = global[loadKey] = {};else if ((typeof loadKey === 'undefined' ? 'undefined' : (0, _typeof3.default)(loadKey)) === 'object') target = loadKey;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fs.readdirSync(path.resolve(__dirname, dir))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var file = _step.value;

      if (new RegExp('\\' + fileType + '$').test(file)) target[file.split(fileType)[0]] = loadFn(dir + '/' + file);else if (/^[^\.]*$/.test(file)) loaddirSync(dir + '/' + file, target[file] = {}, fileType, loadFn);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loaddirSync;