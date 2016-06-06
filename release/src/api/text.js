'use strict';

var r = new APIRoute();

r.setName('text');

module.exports = r;

r.setHandler(function (response, req, res) {

   response.responseData = coreTextCache[req.params.lang_code];

   res.cookie('lang', req.params.lang_code, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true
   });

   response.end();
});