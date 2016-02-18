/* global co, dataTransporter, config */
'use strict';

module.exports = (req, res) => co(function*(){

   res.clearCookie('st');

   yield dataTransporter.update({
      query: { id: req.__user.id },
      update: { $unset: { [`sessions.${req.__session.session_token}`]: 1 } },
      database: config.cache_server.db_name,
      collection: 'users'
   });

   res.__response.message = 'OK';
   res._end();

});
