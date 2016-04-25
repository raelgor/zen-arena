/* global APIRoute, routes, co, dataTransporter, cache */
'use strict';

/**
 * Returns the core application text for a specified language.
 * @method api.updategeo
 * @param {JSONResponse} response The response object.
 * @returns undefined
 */
var route = new APIRoute((response, req) => co(function*(){

   var action = req.params.action;
   var type = req.params.type;
   var id = req.params.id;

   var query = {
      user_id: +req.__user.get('id'),
      [`${type}_id`]: +id
   };

   if(!~['add','remove'].indexOf(action))
      response.error('error_invalid_action');

   if(!~['post','page','comment'].indexOf(type))
      response.error('error_invalid_type');

   if(!id)
      response.error('error_no_id');

   if(action == 'add')
      query.date = Date.now();

   try{
      yield dataTransporter
               .dbc
               .collection(`${type}_likes`)[action=='add'?'insert':'remove'](query);
   }catch(err){ /* Swallow */ }

   yield cache.hincrby(`${type}view:${id}`, 'likes', action == 'add' ? 1 : -1);
   yield cache.set(`${type}selflike:${id}:${req.__user.get('id')}`, action == 'add' ? 1 : 0);

   // Return geo info
   response.responseData = { message: 'OK' };

   response.end();

}));

route.prependRoute(routes.authentication.route);
route.prependRoute(routes.authFilter.route);

module.exports = route;
