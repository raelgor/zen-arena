/* global appConfig, cacheClient, config, uuid */
'use strict';

module.exports = user => {

   // Is async function
   let resolve;
   let promise = new Promise(r => resolve = r);

   // If record has no sessions property, don't freak out
   if(!user.sessions)
      user.sessions = {};
      
   // First try to clear expired sessions
   clear_expired_sessions(user.sessions);

   // If we reached max_web_sessions, try to make some room
   if(Object.keys(user.sessions).length >= appConfig.max_web_sessions)
      remove_oldest_web_session(user.sessions);

   let session_token = uuid();
   let csrf_token = uuid();

   user.sessions[session_token] = {
      session_token,
      csrf_token,
      expires: Date.now() + appConfig.web_session_lifespan,
      date_created: Date.now()
   };

   // Strip objects
   delete user._id;
   delete user.date_joined;

   cacheClient.update({
      query: { id: user.id },
      update: { $set: user },
      database: config.cache_server.db_name,
      collection: 'users'
   })
      .then(() => resolve(user.sessions[session_token]));

   return promise;

};

// Deletes expired sessions from the index
function clear_expired_sessions(sessions) {
   for(let token in sessions)
      if(sessions[token].expires < Date.now())
         delete sessions[token];
}

// Deletes the web session that will expire the soonest
function remove_oldest_web_session(sessions) {

   let min_token;
   let min_expires = Infinity;

   for(let token in sessions)
      if(sessions[token].expires < min_expires) {
         min_token = token;
         min_expires = sessions[token].expires;
      }

   delete sessions[min_token];

}
