'use strict';

module.exports = skel => {

   return (req, res, next) => {

      var result = compareObjects(skel, req.body);
      
      if(result)
         next();
      else
         new JSONResponse(req, res).error('error_invalid_parameters');

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
