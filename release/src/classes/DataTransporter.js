'use strict';

/**
 * @class DataTransporter
 * @desc Creates a portable transporter object with useful methods for data
 * exchanges.
 * @prop {zenx.cache.Client} _client The cache client stored internally.
 * @param {zenx.cache.Client} cacheClient The client that will actually make
 * the exchanges.
 * @returns {DataTransporter}
 */

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
   function DataTransporter() {
      (0, _classCallCheck3.default)(this, DataTransporter);
   }

   /**
    * @method DataTransporter.setClient
    * @access public
    * @desc Replaces the client used with the one provided, if valid. Returns
    * `true` on success, or `false` if client was invalid.
    * @param {zenx.cache.Client} cacheClient The new cache client object.
    * @returns {boolean}
    */


   (0, _createClass3.default)(DataTransporter, [{
      key: 'connectMongos',
      value: function connectMongos(url) {
         var _this = this;

         var dbc;

         this._client = {
            get: function get(obj) {
               return new Promise(function (r) {
                  return dbc.collection(obj.collection).find(obj.query, obj.options).toArray(function (err, res) {
                     return r(res);
                  });
               });
            },
            update: function update(obj) {
               return new Promise(function (r) {
                  return dbc.collection(obj.collection).update(obj.query, obj.update, obj.options, function (err, res) {
                     return r(res);
                  });
               });
            },
            remove: function remove(obj) {
               return new Promise(function (r) {
                  return dbc.collection(obj.collection).remove(obj.query, obj.options, function (err, res) {
                     return r(res);
                  });
               });
            }
         };

         return new Promise(function (r) {
            return mongodb.connect(url, function (err, db) {
               _this.dbc = dbc = db;
               r();
            });
         });
      }

      /**
       * @method DataTransporter.get
       * @desc A port to `zenx.cache.Client`'s `.get()` method.
       * @returns {Promise}
       */

   }, {
      key: 'get',
      value: function get() {
         var _client;

         return (_client = this._client).get.apply(_client, arguments);
      }

      /**
      * @method DataTransporter.update
      * @desc A port to `zenx.cache.Client`'s `.update()` method.
      * @returns {Promise}
      */

   }, {
      key: 'update',
      value: function update() {
         var _client2;

         return (_client2 = this._client).update.apply(_client2, arguments);
      }

      /**
      * @method DataTransporter.remove
      * @desc A port to `zenx.cache.Client`'s `.remove()` method.
      * @returns {Promise}
      */

   }, {
      key: 'remove',
      value: function remove() {
         var _client3;

         return (_client3 = this._client).remove.apply(_client3, arguments);
      }
   }]);
   return DataTransporter;
}();