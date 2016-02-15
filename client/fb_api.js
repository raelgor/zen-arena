/* global FB, clientData, za, log */

za.fb_ready = new Promise(function(r){ za._fb_resolve = r; });
za.fb_ready.then(function(){ FB.getLoginStatus(); });

za.fb_login = function(token){

   var register_frame = $('.auth-dialogs .register-frame')[0];
   var login_frame = $('.auth-dialogs .login-frame')[0];

   register_frame.loading(true);
   login_frame.loading(true);

   za.send('/api/fblogin', {
      access_token: token
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

};

window.fbAsyncInit = function () {
    FB.init({
        appId: clientData.fb_app_id,
        xfbml: true,
        version: clientData.fb_api_version
    });
    za._fb_resolve();
    log('FB loaded.');
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
