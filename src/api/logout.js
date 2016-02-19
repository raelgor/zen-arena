/* global co, dataTransporter */
'use strict';

module.exports = (req, res) => co(function*(){

   res.clearCookie('st');

   yield dataTransporter.updateUser(
      req.__user.id,
      { $unset: { [`sessions.${req.__session.session_token}`]: 1 }}
   );

   res.__response.message = 'OK';
   res._end();

});
