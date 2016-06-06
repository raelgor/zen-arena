'use strict';

/**
 * Loads a directory to a namespace or the global scope. Variables are
 * file names without the extention.
 *
 * @param {string} dir The directory to load.
 * @param {string} namespace The global.namespace to load to. (Optional)
 * @param {string} type File type to load. (Optional)
 * @param {function} loadFn The function used to load the file. (Optional)
 *
 * @return {undefined}
 */

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loaddirSync(dir, namespace, type, loadFn) {
   type = type || '.js';
   loadFn = loadFn || require;
   try {
      var target = global;
      if (namespace) {
         if (typeof namespace === 'string') target = global[namespace] = {};else if ((typeof namespace === 'undefined' ? 'undefined' : (0, _typeof3.default)(namespace)) === 'object') target = namespace;
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
         for (var _iterator = fs.readdirSync(path.resolve(__dirname, dir))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var file = _step.value;

            if (new RegExp('\\' + type + '$').test(file)) target[file.split(type)[0]] = loadFn(dir + '/' + file);else if (/^[^\.]*$/.test(file)) loaddirSync(dir + '/' + file, target[file] = {}, type, loadFn);
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
   } catch (error) {
      console.log(error);
   }
}

module.exports = loaddirSync;