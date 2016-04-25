/* global APIRoute, routes, co, dataTransporter, cache,increment */
'use strict';

/**
 * Returns the core application text for a specified language.
 * @method api.updategeo
 * @param {JSONResponse} response The response object.
 * @returns undefined
 */
var route = new APIRoute((response, req) => co(function*(){

   var action = req.params.action;
   var id = req.params.id;
   
   var comment = {
      user_id: +req.__user.get('id'),
      id: increment('comments','id'),
      post_id: +id,
      text: req.body.message.comment,
      date: Date.now()
   };

   if(!~['create','delete'].indexOf(action))
      response.error('error_invalid_action');

   if(!id)
      response.error('error_no_id');

   yield dataTransporter
            .dbc
            .collection(`comments`).insert(comment);

   yield cache.hincrby(`postview:${id}`, 'comments', action == 'create' ? 1 : -1);
   yield cache.hmset(`commentview:${comment.id}`,comment);

   // Return geo info
   response.responseData = { message: 'OK' };

   response.end();

}));

route.prependRoute(routes.authentication.route);
route.prependRoute(routes.authFilter.route);

module.exports = route;
