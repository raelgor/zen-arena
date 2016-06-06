function interceptor(event) {
  
   var target = $(event.target);
   var href = target.attr('href') || target.parents('a[href]').attr('href');

   if(href) {
      event.preventDefault();
      event.stopPropagation();

      if(event.which === 2)
         return window.open(href, '_blank');

      var resolved = za.goToStateByUrl(href);

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
   var stateObject = za.makeStateObjectFromUrl(href);

   if(stateObject)
      za.goToState(stateObject);

   return stateObject;
};

za.makeStateObjectFromUrl = function(href) {

   var exp = za.getUrlStateHandler(href);
   var handler = exp && exp[0];
   var key = exp && exp[1];
   var stateObject;

   if(exp) {
      var viewUrl =
         typeof handler[0] === 'function' ?
            handler[1]:
            handler[0];

      var matches = href.match(new RegExp(key));

      if(viewUrl)
         for(var i in matches)
            i && (viewUrl = viewUrl.split('$'+i).join(matches[i]));

      stateObject = {
         isBack: false,
         href: href,
         key: key,
         viewUrl: viewUrl
      };
   }

   return stateObject;

};

$(window).click(interceptor);
$(window).ready(function(){
   var path = window.location.pathname + window.location.search;
   window.history &&
   history.replaceState(za.makeStateObjectFromUrl(path), document.title, path);
});

window.addEventListener('popstate', function(e){

   e.preventDefault();
   e.stopPropagation();

   if(!e.state || e.virginState) return;

   e.state.isBack=true;
   za.goToState(e.state);

});
