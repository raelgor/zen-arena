/* global za, ga */
za.interceptor_map = {
   '^/api/logout$': za.logout,
   '^/$': ['/api/view/index', 'body > .content > .page-view'],
   '^/([0-9]*)$': ['/api/view/namespace/$1', 'body > .content > .page-view']
};

function interceptor(event) {

   var target = $(event.target);
   var href = target.attr('href');

   if(href) {
      var resolved = za.goToStateByUrl(href);

      if(resolved) {
         event.preventDefault();
         event.stopPropagation();
         return;
      }
   }

}

za.goToState = function(options){
   ga('send', 'pageview');

   if(typeof options.handler === 'function')
      options.handler(options.href);
   else {
      za.ui.fetchView(options.viewUrl, options.handler[1]);
      if(window.history && !options.isBack) {
         window.___POPSTATE_FLAG = true;
         history.pushState(options, document.title, options.href);
      }
   }
};

za.goToStateByUrl = function(href){
   var resolved;
   Object.keys(za.interceptor_map).forEach(function(key){
      if(resolved) return;
      if(new RegExp(key).test(href)){
         resolved = true;
         if(event.which === 2)
            window.open(href, '_blank');
         else {
            var viewUrl = za.interceptor_map[key][0];
            var matches = href.match(new RegExp(key));

            if(viewUrl)
               for(var i in matches)
                  i && (viewUrl = viewUrl.split('$'+i).join(matches[i]));

            za.goToState({
               isBack: false,
               handler: za.interceptor_map[key],
               href: href,
               key: key,
               viewUrl: viewUrl
            });
         }
      }
   });
   return resolved;
};

$(window).click(interceptor);

window.onpopstate = function(e){
   if(!e.state) return;
   if(window.___POPSTATE_FLAG) {
      window.___POPSTATE_FLAG = false;
      return;
   }
   e.state.isBack=true;
   za.goToState(e.state);
};
