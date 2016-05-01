/* global APIRoute, routes, co, dataTransporter, cache, factory */
/* global make_core_text */
'use strict';

/**
 * Returns the core application text for a specified language.
 * @method api.updategeo
 * @param {JSONResponse} response The response object.
 * @returns undefined
 */
var route = new APIRoute((response, req) => co(function*(){

   var post_id = req.params.post_id;
   var index = +req.params.earliest_index;
   var comments = [];

   if(!post_id)
      response.error('error_no_id');

   if(!index || isNaN(index))
      response.error('error_no_index');

   if(+(yield cache.exists(`commentpool:${post_id}`))) {

      comments = yield cache.zrange(`commentpool:${post_id}`,(index-9)<0?0:index-9,index);

   } else {

      let result = yield dataTransporter
         .dbc
         .collection('comments')
         .find({ post_id: +post_id })
         .sort({date:1})
         .toArray();

      for(let comment of result) {
         yield cache.zadd(`commentpool:${post_id}`, comment.date, comment.id);
         comments.push(comment.id);
      }

   }

   for(let index in comments)
      comments[index] = yield factory.comment.make(
         req,
         comments[index],
         coreTextCache[req.lang],
         req.__user && +req.__user.get('id')
      );

   // Return geo info
   response.responseData = {
      message: 'OK',
      commentHtml: comments
   };

   response.end();

}));

route.prependRoute(routes.authentication.route);

module.exports = route;
