import * as path from 'path';
import * as fs from 'fs';

/**
 * Loads a directory to a namespace or the global scope. Variables are
 * file names without the extention.
 */
export default function loaddirSync(
  /**
   * The directory to load.
   */
  dir: string,
  /**
   * The `global.namespace` to load to.
   */
  loadKey?: string|Object,
  /**
   * File type to load.
   */
  fileType: string = '.js',
  /**
   * The function used to load the file.
   */
  loadFn: Function = require): void {

    var target: any = global;

    if(loadKey)
       if(typeof loadKey === 'string')
          target = global[loadKey] = {};
       else if (typeof loadKey === 'object')
          target = loadKey;

    for(let file of fs.readdirSync(path.resolve(__dirname, dir)))
       if(new RegExp(`\\${fileType}$`).test(file))
          target[file.split(fileType)[0]] = loadFn(`${dir}/${file}`);
       else
          if(/^[^\.]*$/.test(file))
             loaddirSync(`${dir}/${file}`, target[file] = {}, fileType, loadFn);

}
