import Factory from '../classes/Factory';

var f = new Factory();

f.setName('comment');
f.setGenerator(generator);

export default f;

async function generator(req, id, coreText, uid) {

    var cache = instance.cache;
    var mongos = instance.mongos;

    var comment = await data.getCommentView(id);

    // Get poster info
    var user_id = comment.user_id;

    var user = await data.getUser({ id: +user_id });

    comment.userImage = user.get('image');
    comment.displayName = user.displayName();

    // Check if auth user has liked and if can delete
    if (uid) {
        if (+(await cache.exists(`commentselflike:${id}:${uid}`)))
            comment.selfLiked = await cache.get(`commentselflike:${id}:${uid}`);
        else {
            let result = await mongos.collection('comment_likes').find({
                comment_id: +id,
                user_id: +uid
            }).count();
            comment.selfLiked = +result;
            await cache.set(`commentselflike:${id}:${uid}`, comment.selfLiked);
        }
        if (+uid === +comment.user_id) {
            comment.deletable = true;
        } else {
            let post = await data.getPost(comment.post_id);
            +post.publisher === +uid && (comment.deletable = true);
        }
    }

    // Build
    var result = templates.comment({
        coreText,
        comment
    });

    return result;

}
