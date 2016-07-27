/**
 * Gets a URL and returns data in the form of a utf8 string as promised.
 * @method fn.get
 * @returns {Promise}
 */
export default async function delete_comment(id) {

   var comment = await data.getCommentView(id);

   await instance.cache.zrem(`commentpool:${comment.post_id}`, comment.id);
   await instance.cache.hincrby(`postview:${comment.post_id}`, 'comments', -1);
   await instance.mongos.collection('comments').remove({id:+id});
   await instance.mongos.collection('comment_likes').remove({comment_id:+id},{multi:true});
   await instance.cache.del(`commentview:${id}`);

};
