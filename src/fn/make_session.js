/* global appConfig, uuid, co */
'use strict';

module.exports = user => co(function*(){

   // If record has no sessions property, don't freak out
   if(!user.get('sessions'))
      user.set('sessions', {});

   // First try to clear expired sessions
   clear_expired_sessions(user.record.sessions);

   // If we reached max_web_sessions, try to make some room
   if(Object.keys(user.record.sessions).length >= appConfig.max_web_sessions)
      remove_oldest_web_session(user.record.sessions);

   let session_token = uuid();
   let csrf_token = uuid();

   user.record.sessions[session_token] = {
      session_token,
      csrf_token,
      expires: Date.now() + appConfig.web_session_lifespan,
      date_created: Date.now()
   };

   yield user.updateRecord();

   return user.getSession(session_token);

});

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
