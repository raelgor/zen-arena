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
         let dn = `[factory][${this.name}]`;
         let i = indent(arguments[0], 1, dn);
         let t = new Timer();
         log.debug(`${i}${dn} Starting...`);
         let promise = this.generator(...arguments).catch(log.error);
         promise.then(() => {
            indent(arguments[0], -1);
            let d = t.click();
            msStats.log(`factory.${this.name}`, d);
            log.debug(`${i}${dn} Finished. (${d}ms)`);
         });
         return promise;
      } else
         return this.generator(...arguments).catch(log.error);
   }

};
