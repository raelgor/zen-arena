'use strict';

/**
 * Loads a directory to a namespace or the global scope. Variables are
 * file names without the extention.
 *
 * @param {string} dir The directory to load.
 * @param {string} namespace The global.namespace to load to. (Optional)
 * @param {string} type File type to load. (Optional)
 * @param {function} loadFn The function used to load the file. (Optional)
 *
 * @return {undefined}
 */
function loaddirSync(dir, namespace, type, loadFn) {
   type = type || '.js';
   loadFn = loadFn || require;
   try{
      var target = global;
      if(namespace) {
         if(typeof namespace === 'string')
            target = global[namespace] = {};
         else if (typeof namespace === 'object')
            target = namespace;
      }
      for(let file of fs.readdirSync(path.resolve(__dirname, dir)))
         if(new RegExp(`\\${type}$`).test(file))
            target[file.split(type)[0]] = loadFn(`${dir}/${file}`);
         else
            if(/^[^\.]*$/.test(file))
               loaddirSync(`${dir}/${file}`, target[file] = {}, type, loadFn);
   } catch(error) {
      console.log(error);
   }
}

module.exports = loaddirSync;
