'use strict';

module.exports = id => co(function*(){

  var post = yield cache.hgetall(`post:${id}`);

  if(!post || !post.id) {

     var result = yield mongos.collection('posts').find({ id: +id }).toArray();

     post = result[0];

     if(!post){
        log.debug(`data.getPost(${id}): Post not found.`);
        return null;
     }

     yield cache.hmset(`post:${id}`, post);

  }

  return post;

});
