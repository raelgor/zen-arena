/* global za */
za.interceptor_map = {
   '/api/logout': za.logout,
   '/': function(){}
};

function interceptor(event) {

   var target = $(event.target);
   var href = target.attr('href');

   if(href) {
      var resolved;
      Object.keys(za.interceptor_map).forEach(function(key){
         if(key === href){
            resolved = true;
            if(event.which === 2)
               window.open(href, '_blank');
            else
               za.interceptor_map[key](key);
         }
      });
      if(resolved) {
         event.preventDefault();
         event.stopPropagation();
         return;
      }
   }

}

$(window).click(interceptor);
window.onpopstate = function(){console.log(arguments);};
