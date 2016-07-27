import Factory from '../classes/Factory';

var f = new Factory();

f.setName('feed');
f.setGenerator(generator);

export default f;

async function generator(req, coreText, user, lang){

   return templates.feed({
      coreText,
      data: {
         leftColumn: await factory.feedLeftColumn.make(req, coreText, user),
         rightColumn: await factory.rightcol.make(req, coreText, user, lang)
      }
   });

}
