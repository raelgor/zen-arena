/* global co, config, User */
'use strict';

/**
 * @class DataTransporter
 * @desc Creates a portable transporter object with useful methods for data
 * exchanges.
 * @param {zenx.cache.Client} cacheClient The client that will actually make
 * the exchanges.
 * @returns {DataTransporter}
 */
module.exports = class DataTransporter {

   constructor(cacheClient){
      this._client = cacheClient || null;
   }

   /**
    * @method DataTransporter.setClient
    * @access public
    * @desc Replaces the client used with the one provided, if valid. Returns
    * `true` on success, or `false` if client was invalid.
    * @param {zenx.cache.Client} cacheClient The new cache client object.
    * @returns {boolean}
    */
   setClient(cacheClient){
      this._client = cacheClient || this._client || null;
      return typeof cacheClient === 'object';
   }

   /**
    * @method DataTransporter.getUser
    * @access public
    * @desc Gets a user record based on a MongoDB query object.
    * @param {object} query The MongoDB query object.
    * @returns {Promise}
    */
   getUser(query){

      var transporter = this;

      return co(function*(){

         if(!transporter._client)
            return Promise.resolve(false);

         var queryResult = yield transporter._client.get({
            query,
            database: config.cache_server.db_name,
            collection: 'users'
         });

         return queryResult[0] && new User(queryResult[0]);

      });

   }

   /**
    * @method DataTransporter.updateUser
    * @access public
    * @desc Update's a user's record in the database using the user's object
    * or an update object if provided.
    * @param {User|object} user The user object.
    * @param {object} update MongoDB update object. (Optional)
    * @returns {Promise}
    */
   updateUser(user, update) {

      var transporter = this;

      if(user instanceof User)
         user = user.record;

      return co(function*(){

         if(!transporter._client)
            return Promise.resolve(false);

         update = update || { $set: user };

         // Remove keys that can't be transported
         delete user._id;
         delete user.date_joined;

         var queryResult = yield transporter._client.update({
            query: { id: user.id },
            update,
            database: config.cache_server.db_name,
            collection: 'users'
         });

         return queryResult[0];

      });

   }

   /**
    * @method DataTransporter.insertUser
    * @access public
    * @desc Inserts a user into the database using `upsert: true`.
    * @param {User|object} user The user object.
    * @returns {Promise}
    */
   insertUser(user){

      var transporter = this;

      if(user instanceof User)
         user = user.record;

      return co(function*(){

         if(!transporter._client)
            return Promise.resolve(false);

         var queryResult = yield transporter._client.update({
            query: { id: user.id },
            update: { upsert: true },
            database: config.cache_server.db_name,
            collection: 'users'
         });

         return queryResult[0];

      });

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
