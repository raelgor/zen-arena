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
module.exports = class DataTransporter {

   constructor(){
   }

   /**
    * @method DataTransporter.setClient
    * @access public
    * @desc Replaces the client used with the one provided, if valid. Returns
    * `true` on success, or `false` if client was invalid.
    * @param {zenx.cache.Client} cacheClient The new cache client object.
    * @returns {boolean}
    */
   connectMongos(url){

      var dbc;

      this._client = {
         get: obj => { return new Promise(r => dbc.collection(obj.collection).find(obj.query,obj.options).toArray((err, res) => r(res))); },
         update: obj => { return new Promise(r => dbc.collection(obj.collection).update(obj.query,obj.update,obj.options, (err, res) => r(res))); },
         remove: obj => { return new Promise(r => dbc.collection(obj.collection).remove(obj.query,obj.options, (err, res) => r(res))); }
      };

      return new Promise(r =>
         mongodb.connect(url, (err, db) => {
            this.dbc = dbc = db;
            r();
         }));

   }

   /**
    * @method DataTransporter.get
    * @desc A port to `zenx.cache.Client`'s `.get()` method.
    * @returns {Promise}
    */
   get() {
      return this._client.get(...arguments);
   }

   /**
   * @method DataTransporter.update
   * @desc A port to `zenx.cache.Client`'s `.update()` method.
   * @returns {Promise}
   */
   update() {
      return this._client.update(...arguments);
   }

   /**
   * @method DataTransporter.remove
   * @desc A port to `zenx.cache.Client`'s `.remove()` method.
   * @returns {Promise}
   */
   remove() {
      return this._client.remove(...arguments);
   }

};
