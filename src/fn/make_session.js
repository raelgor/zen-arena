/* global appConfig, uuid, co, dataTransporter, cache */
'use strict';

module.exports = user => co(function*(){
   
   let sessions = yield dataTransporter.get({
      query: { user_id: user.get('id') },
      collection: 'sessions'
   });

   // First try to clear expired sessions
   sessions = sessions.filter(s => { return s.expires > Date.now(); });

   // If we reached max_web_sessions, try to make some room
   if(Object.keys(sessions).length >= appConfig.max_web_sessions)
      yield dataTransporter.remove({
         query: {
            session_token: get_oldest_web_session(sessions)
         },
         collection: 'sessions'
      });

   let session_token = uuid();
   let csrf_token = uuid();

   let session = {
      session_token,
      csrf_token,
      user_id: user.get('id'),
      type: 'web',
      expires: Date.now() + appConfig.web_session_lifespan,
      date_created: Date.now()
   };

   yield dataTransporter.update({
      query: {},
      update: { $set: session },
      options: { upsert: true },
      collection: 'sessions'
   });

   yield cache.hmset(`sessions:${session.session_token}`, session);

   return session;

});

// Deletes the web session that will expire the soonest
function get_oldest_web_session(sessions) {

   let min_token;
   let min_expires = Infinity;

   for(let index in sessions)
      if(sessions[index].expires < min_expires) {
         min_token = index;
         min_expires = sessions[index].expires;
      }

   return sessions[min_token].session_token;

}
