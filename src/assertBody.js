'use strict';

module.exports = skel => {

   return (req, res, next) => {

      var result = compareObjects(req.body, skel);
console.log('assertBody:', result);
      if(result)
         next();
      else
         res.end('{"error":"error_invalid_parameters"}');

         function compareObjects(a, b) {
            for(let key in a)
               if(!(key in b) || typeof a[key] !== typeof b[key])
                  return false;
               else if(typeof a[key] === 'object')
                  if(!compareObjects(a[key], b[key]))
                     return false;
            return true;
         }

   };

};
