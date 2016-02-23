/* global za, resize, clientData, FB */
/**
 * @namespace za
 * @desc The za client library.
 */
window.za = {

   /**
    * @memberof za
    * @desc Whether we are on a touch device or not.
    * @type boolean
    */
   _touch: 'ontouchstart' in document.documentElement,

   /**
    * @memberof za
    * @desc An attempt to detect the browser from the userAgent.
    * @type string
    */
   _browser: (function(){
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
   })(),

   /**
    * @memberof za
    * @desc Logs the user out by deleting local data and messaging the server
    * to delete cookies and tokens.
    * @type function
    */
   logout: function() {
      za.send('/api/logout');
      delete clientData.csrf_token;
      delete clientData.user_data;
      za.userBar.setStatus(false);
   },

   /**
    * @namespace za.ui
    * @memberof za
    * @desc Stores UI functions and classes.
    * @type object
    */
   ui: {

      /**
       * @memberof za.ui
       * @desc Focuses an element only if environment is touch device.
       * @type function
       */
      ntFocus: function(selector){
         !za._touch && $(selector).focus();
      }
   },

   /**
    * @namespace za.controllers
    * @memberof za
    * @desc Stores controllers.
    * @type object
    */
   controllers: {}

};

$(window).ready(function(){

   if(!clientData.geolocation.city)
      za.geoRequest();

   za.ui.ntFocus('.navigation .search');

   var section = $('.content').attr('data-section');

   if(section in za.controllers)
      za.controllers[section]();

   // Safari fix
   setTimeout(resize, 0);

   $('.touch-nav .icon-user, .player-info .user-ui').click(function(){

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
