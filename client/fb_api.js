/* global FB, clientData, za, log */

za.fb_ready = new Promise(function(r){ za._fb_resolve = r; });

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
