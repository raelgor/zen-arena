import Factory from '../classes/Factory';

var f = new Factory();

f.setName('feedLeftColumn');
f.setGenerator(generator);

export default f;

async function generator(req, coreText, user){

   var feedPosts = await data.getFeedHtml(
      req,
      coreText,
      // Auth user
      user.get('id'),
      // Namespace origin
      'user',
      // Owner id
      user.get('id'),
      // Feed type (wall/feed)
      'feed',
      // Skip
      0,
      // Limit
      10
   );

   var result = templates.feedLeftColumn({
      coreText,
      data: {
         userImage: user.get('image'),
         feedPosts
      }
   });

   return result;

}
