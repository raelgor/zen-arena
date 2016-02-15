/* global za, resize, clientData, FB, grecaptcha */
window.za = {

   _touch: 'ontouchstart' in document.documentElement,
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
   ui: {
      nt_focus: function(selector){
         !za._touch && $(selector).focus();
      }
   }

};

$(window).ready(function(){

   za.ui.nt_focus('.navigation .search');

   // Safari fix
   setTimeout(resize, 0);

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
