export default async function getPost(id: number) {

  var post = await instance.cache.hgetall(`post:${id}`);

  if(!post || !post.id) {

     var result = await instance.mongos.collection('posts').find({ id: +id }).toArray();

     post = result[0];

     if(!post){
        log.debug(`data.getPost(${id}): Post not found.`);
        return null;
     }

     await instance.cache.hmset(`post:${id}`, post);

  }

  return post;

};
