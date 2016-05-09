'use strict';

/**
 * Loads a directory to a namespace or the global scope. Variables are
 * file names without the extention.
 *
 * @param {string} dir The directory to load.
 * @param {string} namespace The global.namespace to load to. (Optional)
 *
 * @return {undefined}
 */
function loaddirSync(dir, namespace) {
   try{
      if(namespace) {
         global[namespace] = {};
         for(let file of fs.readdirSync(path.resolve(__dirname, dir)))
            global[namespace][file.split('.js')[0]] = require(`${dir}/${file}`);
      } else
         for(let file of fs.readdirSync(path.resolve(__dirname, dir)))
            global[file.split('.js')[0]] = require(`${dir}/${file}`);
   } catch(error) {
      log.error(error);
      process.emit('error', error);
   }
}

module.exports = loaddirSync;
