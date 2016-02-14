/* global clientData, za, grecaptcha, FB */
za.login = {};

za.login.promptLogin = function() {

    $('.auth-dialogs').removeClass('hide');
    $('.auth-dialogs > *').addClass('hide');

    $('.login-frame').removeClass('hide');

    za.ui.nt_focus('.login-frame .username');

    grecaptcha ?
    render() :
    za.recaptcha_ready.then(render);

    function render(){

        if(!isNaN(za.grecaptcha.login_no_robot))
            grecaptcha.reset(za.grecaptcha.login_no_robot);
        else
            za.grecaptcha.login_no_robot = grecaptcha.render('login_no_robot', {
            'sitekey': clientData.grecaptcha_site_key,
            'theme': 'dark'
        });

    }

};

za.login.promptRegister = function() {

    $('.auth-dialogs').removeClass('hide');
    $('.auth-dialogs > *').addClass('hide');

    $('.register-frame').removeClass('hide');

    za.ui.nt_focus('.register-frame .hide');

    grecaptcha ?
    render() :
    za.recaptcha_ready.then(render);

    function render(){

        if(!isNaN(za.grecaptcha.register_no_robot))
            grecaptcha.reset(za.grecaptcha.register_no_robot);
        else
            za.grecaptcha.register_no_robot = grecaptcha.render('register_no_robot', {
            'sitekey': clientData.grecaptcha_site_key,
            'theme': 'dark'
        });

    }

};

za.login.exitPrompts = function(callback) {

    $('.auth-dialogs, .auth-dialogs > form').addClass('hide');

    if(typeof callback === 'function')
       setTimeout(callback, 400);

};

$(window).ready(function(){

    // Enable fbauth buttons when FB API is availalbe
    za.fb_ready.then(function(){
      $('.auth-dialogs form .fb.disabled').removeClass('disabled');
    });

    // Make x buttons close frames
    $('.auth-dialogs .icon-cancel-circle')
      .click(za.login.exitPrompts);

    function error(message){
        $(this).find('.error').html(message);
    }

    function loading(bool){
        $(this)[bool?'addClass':'removeClass']('loading');
        $(this).find('input, button').prop('disabled', bool);
        $(this).find('input, button, a').blur();
        $(this).find('.loader').html(bool?za.ui.loader():'');
    }

    // Bind FB Oauth handler
    $('.auth-dialogs form .fb').click(function(){

      var token = FB.getAccessToken();
      var frame = $(this).parents('.auth-dialogs > form');

      if(token)
         fb_login(token);
      else
         FB.login(function(response){
            if(!response.authResponse)
               frame[0].error(clientData.core_text.fb_no_perm);
            else
               fb_login(response.authResponse.accessToken);
         }, {
            scope: 'public_profile,user_friends,email'
         });

      function fb_login(token){
         za.send('/api/fblogin', {
            access_token: token
         })
         .success(za._login_response_handler)
         .fail(function(){
            frame[0].error(clientData.core_text.error_something_went_wrong);
         });
      }

    });

    // Make auth buttons work
    $('.player-info .login').click(za.login.promptLogin);
    $('.player-info .signup').click(za.login.promptRegister);
    $('.auth-dialogs .create-acc').click(za.login.promptRegister);
    $('.auth-dialogs .log-acc').click(za.login.promptLogin);

    // Escape frames by clicking outside
    $('.auth-dialogs').click(function(event){
        event.target === this &&
        za.login.exitPrompts();
    });

    // Bind error(string) and loading(bool) methods to all frames
    $('.auth-dialogs > *').each(function(index, element){
       element.error = error;
       element.loading = loading;
   });

    $('.auth-dialogs .login-frame').submit(function(event){

        this.error('');
        event.preventDefault();
        event.stopPropagation();

        var uid = $(this).find('.username').val();
        var password = $(this).find('.password').val();

        if(!uid || !password)
            return this.error(clientData.core_text.error_both_credentials);

        var grecaptchaResponse = grecaptcha.getResponse(za.grecaptcha.login_no_robot);

        if(!grecaptchaResponse)
            return this.error(clientData.core_text.error_no_robot);

        this.loading(true);

        za.send('/api/login', {
            uid: uid,
            password: password,
            grecaptcha: grecaptchaResponse
        })
        .success(za._login_response_handler)
        .always(function(){
            grecaptcha.reset(za.grecaptcha.login_no_robot);
            $('.auth-dialogs .login-frame')[0].loading(false);
        });

    });

});

za._login_response_handler = function(response){

   if(response && response.success && response.user_data) {

     za.login.exitPrompts();
     clientData.user_data = response.user_data;
     clientData.csrf_token = response.csrf_token;

  } else
      $(this).parents('.auth-dialogs > *')[0]
             .error(clientData.core_text.login_fail_default);

};
