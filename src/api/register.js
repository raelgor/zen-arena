/* global co, cacheClient, cacheClient, bcrypt, on_user_created, uuid */
/* global config, log_user_in, increment, postman */
'use strict';

module.exports = (req, res) => co(function*(){

   if(!res._recaptcha)
      return res._error('error_bad_recaptcha');

   var valid_request =
      req.body &&
      req.body.message &&
      req.body.message.uid &&
      req.body.message.password;

   if(!valid_request)
      return res._error('error_invalid_request');

   var user = yield cacheClient.get({
      query: { email: String(req.body.message.uid) },
      database: config.cache_server.db_name,
      collection: 'users'
   });

   user = user[0];

   if(user)
      return res._error('error_user_exists');

   if(!/^[^\@\&\_\! ]+\@[^\@\&\_\! ]+$/.test(req.body.message.uid))
      return res._error('error_bad_email');

   var email = req.body.message.uid;
   user = { verify_email_token: uuid(2), email, unsubscribe_all_token: uuid(), lang: req.lang };

   var email_attempt = yield postman.verifyAccountEmail(user);

   if(!email_attempt || !email_attempt.accepted.length)
      return res._error('error_bad_email');

   var salt = yield new Promise(resolve => bcrypt.genSalt(10, (err, res) => resolve(res)));
   var password = yield new Promise(resolve => bcrypt.hash(req.body.message.password, salt, (err, res) => resolve(res)));

   user.id = yield increment('users', 'id');
   user.password = password;
   user.date_joined = new Date().toISOString();

   yield cacheClient.update({
      query: { id: user.id },
      update: { $set: user },
      options: { upsert: true },
      database: config.cache_server.db_name,
      collection: 'users'
   });

   yield on_user_created(user);

   log_user_in(res, user);

});
