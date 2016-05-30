/**
 * @namespace za
 * @desc The za client library.
 */
window.za = function() {

   /**
    * @memberof za
    * @desc Shortcut for `clientData.core_text[key]`.
    * @type String
    */
   this.txt = function(key){
      return clientData.core_text[key];
   };

   // On login callback
   this.onlogin = null;

   /**
    * @memberof za
    * @desc Whether we are on a touch device or not.
    * @type boolean
    */
   this._touch = 'ontouchstart' in document.documentElement;

   /**
    * @memberof za
    * @desc An attempt to detect the browser from the userAgent.
    * @type string
    */
   this._browser = (function(){
       var ua= navigator.userAgent, tem,
       M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
       if(/trident/i.test(M[1])){
           tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
           return 'IE '+(tem[1] || '');
       }
       if(M[1]=== 'Chrome'){
           tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
           if(tem!== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
       }
       M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
       if((tem= ua.match(/version\/(\d+)/i))!== null) M.splice(1, 1, tem[1]);
       return M.join(' ');
   })();

   /**
    * @memberof za
    * @desc Logs the user out by deleting local data and messaging the server
    * to delete cookies and tokens.
    * @type function
    */
   this.logout = function() {
      delete clientData.csrf_token;
      delete clientData.user_data;
      $('html').removeClass('logged-in');
      za.userBar.setStatus(false);
      history.replaceState(history.state, document.title, '/');
   };

   /**
    * @namespace za.ui
    * @memberof za
    * @desc Stores UI functions and classes.
    * @type object
    */
   this.ui = {

      /**
       * @memberof za.ui
       * @desc Focuses an element only if environment is touch device.
       * @type function
       */
      ntFocus: function(selector){
         !za._touch && $(selector).focus();
      },

      /**
       * Controllers of the parameter element and all sub-elements with the
       * data-controller attribute set.
       * @method za.ui.initControllers
       */
      initControllers: function(element) {
         var controllerName = $(element).attr('data-controller');
         if(controllerName in za.controllers && $(element).is(':not([data-controller-init=1])'))
            za.controllers[controllerName].init(element);
         $(element).attr('data-controller-init', '1');
         $(element).find('[data-controller]:not([data-controller-init=1])')
         .each(function(index,element){
            za.ui.initControllers(element);
         });
      }

   };

   /**
    * @namespace za.controllers
    * @memberof za
    * @desc Stores controllers.
    * @type object
    */
   this.controllers = {};

   /**
    * View controller class.
    * @class za.Controller
    * @returns {Controller}
    */
   this.Controller = function(handlerFunction){
      return {
         init: function(element){
            $(element).attr('data-controller-init', '1');
            handlerFunction(element);
            za.ui.initControllers(element);
         }
      };
   };

};

za.prototype = EventEmitter2.prototype;

window.za = new za();

$(window).ready(function(){

   $('.auth-dialogs, .auth-dialogs > form')
     .find('input, textarea, button, [tabindex]')
     .attr('disabled', true);

   if(!clientData.geolocation.city || !clientData.geolocation.country)
      za.geoRequest();

   if(!za._touch)
      $('html').addClass('no-touch');

   za.ui.ntFocus('.navigation .search');

   za.ui.initControllers('body > .content');

   if(clientData.user_data)
      $('html').addClass('logged-in');

   // Safari fix
   setTimeout(za.resize, 0);

   $('.touch-nav .icon-user, .player-info .user-ui [class^="user-"]').click(function(){

      var offset = $(this).is('.user-ui') ? 120 : 0;

      if(!clientData.user_data)
         za.login.promptLogin();
      else {
         za.ui.spawnUserBubbleMenu({
            top: 50,
            left: $(this).offset().left + offset,
         });
      }

   });

   if(/code\=/i.test(window.location.search)) {

      za.login.promptLogin();
      setTimeout(function(){
         $('.auth-dialogs .login-frame')[0].loading(true);
         $('.auth-dialogs .register-frame')[0].loading(true);
      }, 10);

      za.fb_ready.then(function(){

         FB.getLoginStatus(function(response){

            if(response.status === 'connected')
               za.fb_login(response.authResponse.accessToken);
            else {
               $('.auth-dialogs .login-frame')[0]
               .loading(false)
               .error(clientData.core_text.fb_no_perm);

               $('.auth-dialogs .register-frame')[0]
               .loading(false)
               .error(clientData.core_text.fb_no_perm);
            }

         });

      });

   }

});
