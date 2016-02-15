/* global gapi, clientData, za, log */
za.gapi_ready = new Promise(function(resolve){
   za._gapi_resolve = resolve;
});

$(window).ready(function(){

   var register_frame = $('.auth-dialogs .register-frame')[0];
   var login_frame = $('.auth-dialogs .login-frame')[0];

   gapi.load('auth2', function(){

      // Retrieve the singleton for the GoogleAuth library and set up the client.
      var auth2 = gapi.auth2.init({
         client_id: clientData.google_client_id,
         cookiepolicy: 'single_host_origin'
      });

      attachSignin(document.getElementById('g_log'));
      attachSignin(document.getElementById('g_reg'));

      function attachSignin(element) {
         auth2.attachClickHandler(element, {},
            function(response) {
               register_frame.loading(true);
               login_frame.loading(true);
               za.send('/api/goauth', {
                  access_token: response.hg.access_token
               })
               .success(za._login_response_handler)
               .fail(function(){
                  register_frame.error(clientData.core_text.error_something_went_wrong);
                  login_frame.error(clientData.core_text.error_something_went_wrong);
               })
               .always(function(){
                  register_frame.loading(false);
                  login_frame.loading(false);
               });
            }, function() {
               register_frame.error(clientData.core_text.gauth_no_perm);
               login_frame.error(clientData.core_text.gauth_no_perm);
            }
         );
      }

      za._gapi_resolve();
      log('gapi loaded.');

   });

});
