/* global za, ga */
za.interceptor_map = {
   '^/api/logout$': [
      za.logout,
      '/api/logout',
      'body > .content > .page-view'
   ],
   '^/$': [
      '/api/view/index',
      '.logged-in .page-view .left-column',
      'body > .content > .page-view'
   ],
   '^/([0-9]*)$': [
      '/api/view/namespace/$1',
      '.page-view .left-column',
      'body > .content > .page-view'
   ],
   '^/post/([0-9]*)$': [
      '/api/view/post/$1',
      '.page-view .left-column',
      'body > .content > .page-view'
   ]
};

function interceptor(event) {

   var target = $(event.target);
   var href = target.attr('href') || target.parents('a[href]').attr('href');

   if(href) {
      var resolved = za.goToStateByUrl(href);

      event.preventDefault();
      event.stopPropagation();

      if(
         (target.is('.navigation .logo') || target.parents('.navigation .logo').length) &&
         event.which !== 2
      )
         window.location.href = '/';
      else
         if(!resolved)
            window.open(href);
   }

}

za.goToState = function(options){
   ga('send', 'pageview');

   var handler = za.getUrlStateHandler(options.href)[0];

   if(typeof handler === 'function')
      handler(options.href);
   else {
      za.ui.fetchView(options.viewUrl, handler);
      if(window.history && !options.isBack) {
         history.pushState(options, document.title, options.href);
      }
   }
};

za.getUrlStateHandler = function(href) {

   var resolved;
   var exp;

   Object.keys(za.interceptor_map).forEach(function(key){
      if(resolved) return;
      if(new RegExp(key).test(href)){
         resolved = true;
         exp = [za.interceptor_map[key], key];
      }
   });

   return exp;

};

za.goToStateByUrl = function(href){
   var exp = za.getUrlStateHandler(href);
   var handler = exp && exp[0];
   var key = exp && exp[1];

   if(exp) {
      if(event.which === 2)
         window.open(href, '_blank');
      else {
         var viewUrl =
            typeof handler[0] === 'function' ?
               handler[1]:
               handler[0];

         var matches = href.match(new RegExp(key));

         if(viewUrl)
            for(var i in matches)
               i && (viewUrl = viewUrl.split('$'+i).join(matches[i]));

         za.goToState({
            isBack: false,
            href: href,
            key: key,
            viewUrl: viewUrl
         });
      }
   }
   return exp;
};

$(window).click(interceptor);

window.onpopstate = function(e){
   if(!e.state) return;

   e.state.isBack=true;
   za.goToState(e.state);
};
