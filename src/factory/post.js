/* global co, templates, dataTransporter, User, log, Timer */
'use strict';

/**
 * Produces html for the home view and returns it asynchronously.
 * @method factory.post
 * @param {object} id The post's id.
 * @param {object} coreText The core application text to use.
 * @returns Promise
 */
module.exports = (id, coreText) => co(function*(){
   log.debug('factory.post: Making...');
   var timer = new Timer();

   log.debug('factory.post: Getting post by id...');
   var data = yield dataTransporter.getPost(id);

   log.debug(`factory.post: Done. (${timer.click()}ms) Getting record by namespace...`);
   var publisher = yield dataTransporter.getRecordByNamespace(+data.publisher);

   log.debug(`factory.post: Done. (${timer.click()}ms) Setting view variables...`);
   data.publisher_namespace = publisher.namespace || publisher.get('id');

   if(publisher instanceof User) {
      data.publisher_namespace = publisher.get('username') || publisher.get('id');
      data.publisher_image = publisher.get('image');
      data.publisher_display_name = publisher.displayName();
   }

   log.debug(`factory.post: Done. (${timer.click()}ms) Building html...`);
   var result = templates.post({
      coreText,
      data
   });

   log.debug(`factory.post: Done. (${timer.click()}ms)`);
   return result;
});
