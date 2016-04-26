/* global co, config, User, Timer, log, mongodb, cache */
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

         var user;
         var queryResult;

         if(query.id)
            user = yield cache.hgetall(`user:${query.id}`);

         if(!user || !user.id) {
            queryResult = yield transporter._client.get({
               query,
               database: config.systemDatabase.name,
               collection: 'users'
            });

            user = queryResult[0];

            if(user.id)
               yield cache.hmset(`user:${user.id}`, user);
         }

         return user && new User(user);

      });

   }

   getCommentView(id) {

      var transporter = this;

      return co(function*(){

         var comment;

         // Get comment info
         if(+(yield cache.exists(`commentview:${id}`)))
            comment = yield cache.hgetall(`commentview:${id}`);
         else {
            comment = yield transporter.dbc.collection('comments').find({id:+id}).toArray();
            comment = comment[0];
            comment.likes = yield transporter
                                 .dbc
                                 .collection('comment_likes')
                                 .find({ comment_id: +id })
                                 .count();
            yield cache.hmset(`commentview:${id}`, comment);
         }

         return comment;

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
            database: config.systemDatabase.name,
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
            database: config.systemDatabase.name,
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

   /**
    * Asynchronously fetches a post.
    * @method DataTransporter.getPost
    * @param {number} postId The post's Id.
    * @returns {Promise}
    */
    getPost(id) {
      var transporter = this;
console.log('w1');
      return co(function*(){
console.log('w2');
         var post = yield cache.hgetall(`post:${id}`);
console.log('w3');
         if(!post || !post.id) {
console.log('w4');
            var result = yield transporter.get({
               query: { id: +id },
               collection: 'posts'
            });
console.log('w5');
            post = result[0];
console.log('w6');
try{ console.log({post,id});
            yield cache.hmset(`post:${id}`, post);
}catch(err){console.log(err);}
console.log('w7');
         }

         return post;
      });
    }

    /**
    * Asynchronously fetches a post.
    * @method DataTransporter.getPost
    * @param {number} postId The post's Id.
    * @returns {Promise}
    */
    getRecordByNamespace(namespace) {
      var transporter = this;

      return co(function*(){
         log.debug(`dataTransporter.getRecordByNamespace: Getting ns record...`);
         var timer = new Timer();

         var response = yield transporter.get({
            query: { $or: [{id: namespace}, {namespace}] },
            collection: 'namespaces',
            database: config.systemDatabase.name
         });

         log.debug(`dataTransporter.getRecordByNamespace: Done. (${timer.click()}ms) Getting refered record...`);
         var result = response[0];

         if(result && result.collection === 'users')
            result = yield transporter.getUser({ id: result.id });

         log.debug(`dataTransporter.getRecordByNamespace: Done. (${timer.click()}ms)`);
         return result;
      });
    }

};
