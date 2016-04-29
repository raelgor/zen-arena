'use strict';

/**
 * @class Factory
 * @desc Main view factory calss.
 * @param {generator} generator A generator function.
 * @returns {Route}
 */
module.exports = class Factory {

   constructor(generator) {
      this.setGenerator(generator);
   }

   setName(name) {
      this.name = name;
   }

   setGenerator(generator) {
      if(generator)
         this.generator = co.wrap(generator);
   }

   make() {
      if(DEBUG_MODE) {
         let i = indent(arguments[0], 1);
         let t = new Timer();
         log.debug(`${i}[factory][${this.name}] Starting...`);
         let promise = this.generator(...arguments).catch(log.error);
         promise.then(() => {
            indent(arguments[0], -1);
            log.debug(`${i}[factory][${this.name}] Finished. (${t.click()}ms)`);
         });
         return promise;
      } else
         return this.generator(...arguments).catch(log.error);
   }

};
