/* global co, cache, dataTransporter */
'use strict';

/**
 * Gets a URL and returns data in the form of a utf8 string as promised.
 * @method fn.get
 * @returns {Promise}
 */
module.exports = id => co(function*(){

   var comment = yield dataTransporter.getCommentView(id);

   yield cache.zrem(`commentpool:${comment.post_id}`, comment.id);
   yield cache.hincrby(`postview:${comment.post_id}`, 'comments', -1);
   yield dataTransporter.dbc.collection('comments').remove({id:+id});
   yield dataTransporter.dbc.collection('comment_likes').remove({comment_id:+id},{multi:true});
   yield cache.del(`commentview:${id}`);

});
