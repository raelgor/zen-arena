import indent from '../fn/indent';
import Timer from './Timer';

/**
 * @class Factory
 * @desc Main view factory calss.
 * @param {generator} generator A generator function.
 * @returns {Route}
 */
export default class Factory {

  name: string;
  generator: (...args: any[]) => Promise<void>;

   constructor(generator?) {
      this.setGenerator(generator);
   }

   setName(name: string) {
      this.name = name;
   }

   setGenerator(generator: (...args: any[]) => Promise<void>) {
      if(generator)
         this.generator = generator;
   }

   make() {
      if(instance.flags.DEBUG_MODE) {
         let dn = `[factory][${this.name}]`;
         let i = indent(arguments[0], 1, dn);
         let t = new Timer();
         log.debug(`${i}${dn} Starting...`);
         let promise = this.generator(...arguments);
         promise.then(() => {
            indent(arguments[0], -1);
            let d = t.click();
            msStats.log(`factory.${this.name}`, d);
            log.debug(`${i}${dn} Finished. (${d}ms)`);
         });
         return promise;
      } else
         return this.generator(...arguments);
   }

};
