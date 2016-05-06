/* global co, config, User, Timer, log, mongodb, cache, factory */
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

   getRandomAdViews(req, coreText, uid, amount) {

      var transporter = this;
      return co(function*(){

         var html = '';
         var inCache = +(yield cache.exists(`adIds`));

         if(!inCache) {
            let ads = yield transporter.dbc.collection('ads').find({
               approved: true,
               published: true
            }).toArray();
            yield cache.sadd(`adIds`, ...ads.map(o => o.id));
         }

         var adIds = yield cache.srandmember(`adIds`, amount);

         for(let id of adIds)
            html += yield factory.ad.make(req, coreText, id);

         return html;

      }).catch(log.error);

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

   getFeedHtml(req, coreText, uid, ns_origin, owner_id, type, skip, limit) {

      var transporter = this;
      return co(function*(){

         var cacheKey = `feed:${ns_origin}:${owner_id}:${type}`;
         var html = '';
         var postIds;

         if(+(yield cache.exists(cacheKey)))
            postIds = yield cache.zrevrange(cacheKey, skip, +skip + (+limit));
         else {
            let posts = yield transporter.dbc.collection('feeds').find({
               ns_origin,
               owner_id: +owner_id,
               type
            }).sort({date:1}).toArray();
            //postIds = posts.map(o => +o.post_id);
            //postIds.reverse();
            for(let post of posts)
               yield cache.zadd(cacheKey, post.date_added, post.post_id);
         }

         postIds = yield cache.zrevrange(cacheKey, skip, +skip + (+limit));

         for(let id of postIds)
            html += yield factory.post.make(req, +id, coreText, +uid);

         return html;

      }).catch(log.error);

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
            if(comment) {
               comment.likes = yield transporter
                                    .dbc
                                    .collection('comment_likes')
                                    .find({ comment_id: +id })
                                    .count();
               yield cache.hmset(`commentview:${id}`, comment);
            }
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

         yield cache.hmset(`user:${user.id}`, user);

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

   getPostViewData(req, id, coreText, uid) {

      return co(function*(){

         var data = cache.hgetall(`postview:${id}`);

         if(!data.id) {

            data = yield dataTransporter.getPost(id);

            if(!data) {
               return '';
            }

            data.likes = yield dataTransporter
                                 .dbc
                                 .collection('post_likes')
                                 .find({ post_id: id })
                                 .count();

            data.comments = yield dataTransporter
                                 .dbc
                                 .collection('comments')
                                 .find({ post_id: id })
                                 .count();

            data.shares = 0;

            var publisher = yield dataTransporter.getRecordByNamespace(req, +data.publisher);

            data.publisher_namespace = publisher.namespace || publisher.get('id');

            if(publisher instanceof User) {
               data.publisher_namespace = publisher.get('username') || publisher.get('id');
               data.publisher_image = publisher.get('image');
               data.publisher_display_name = publisher.displayName();
            }

            yield cache.hmset(`postview:${id}`, data);

         } else log.debug('factory.post: Found in cache.');

         if(uid) {
            data.selfLiked = yield cache.get(`postselflike:${id}:${uid}`);

            if(!data.selfLiked) {

               let result = yield dataTransporter.dbc.collection('post_likes').find({
                  post_id: +id,
                  user_id: +uid
               }).count();

               data.selfLiked = result;

               yield cache.set(`postselflike:${id}:${uid}`, data.selfLiked);

            }

            data.selfLiked = +data.selfLiked;
         }

         var NUM_OF_COMM = 2;
         data.commentsHtml = [];

         if(+(yield cache.exists(`commentpool:${data.id}`))) {

            let totalComments = +(yield cache.zcount(`commentpool:${data.id}`,'-inf','+inf'));
            let commentIds = yield cache.zrange(
               `commentpool:${data.id}`,
               totalComments-NUM_OF_COMM,
               totalComments);

            data.commentsHtml = commentIds;

         } else {

            let comments = yield dataTransporter
               .dbc
               .collection('comments')
               .find({ post_id: +data.id })
               .sort({date:1})
               .toArray();

            for(let comment of comments)
               yield cache.zadd(`commentpool:${data.id}`, comment.date, comment.id);

            while(NUM_OF_COMM--) {
               let comment = comments.pop();
               comment && data.commentsHtml.push(comment.id);
            }
            data.commentsHtml.reverse();
         }

         for(let index in data.commentsHtml)
            data.commentsHtml[index] = yield factory.comment.make(req, data.commentsHtml[index], coreText, uid);

         if(+uid === +data.publisher)
            data.isOwner = true;

         return data;

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

      return co(function*(){

         var post = yield cache.hgetall(`post:${id}`);

         if(!post || !post.id) {

            var result = yield transporter.get({
               query: { id: +id },
               collection: 'posts'
            });

            post = result[0];

            if(!post){
               log.debug(`DataTransporter.getPost(${id}): Post not found.`);
               return null;
            }

            yield cache.hmset(`post:${id}`, post);

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
    getRecordByNamespace(req, namespace) {
      var transporter = this;

      return co(function*(){
         var i = indent(req, 1);
         log.debug(`${i}[dt][getRecordByNamespace] Getting ns record...`);
         var timer = new Timer();

         var response = yield transporter.get({
            query: { $or: [{id: namespace}, {namespace}] },
            collection: 'namespaces',
            database: config.systemDatabase.name
         });

         var result = response[0];

         if(result && result.collection === 'users')
            result = yield transporter.getUser({ id: result.id });

         log.debug(`${i}[dt][getRecordByNamespace] Done. (${timer.click()}ms)`);
         indent(req, -1);
         return result;
      });
    }

};
