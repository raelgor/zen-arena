/* global clientData, za, grecaptcha, FB, resize */
za.login = {};

za.login.promptLogin = function() {

    resize();
    $('.login-frame')[0].error('');

    $('.auth-dialogs').removeClass('hide');
    $('.auth-dialogs > *').addClass('hide');

    $('.login-frame').removeClass('hide');

    za.ui.ntFocus('.login-frame .username');

    window.grecaptcha ?
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

    resize();
    $('.register-frame')[0].error('');

    $('.auth-dialogs').removeClass('hide');
    $('.auth-dialogs > *').addClass('hide');

    $('.register-frame').removeClass('hide');

    za.ui.ntFocus('.register-frame .username');

    window.grecaptcha ?
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

za.login.promptRecoverFrame = function(token) {

   $('.recover-password-frame .not-sent-yet').show();
   $('.recover-password-frame .success').hide();

    resize();
    $('.recover-password-frame')[0].error('');

    $('.auth-dialogs').removeClass('hide');
    $('.auth-dialogs > *').addClass('hide');

    $('.recover-password-frame').removeClass('hide');

    za.ui.ntFocus('.recover-password-frame .password');

    $('.recover-password-frame .token').val(token);

};

za.login.promptForgotPassword = function() {

   $('.forgot-password-frame .not-sent-yet').show();
   $('.forgot-password-frame .success').hide();

    resize();
    $('.forgot-password-frame')[0].error('');

    $('.auth-dialogs').removeClass('hide');
    $('.auth-dialogs > *').addClass('hide');

    $('.forgot-password-frame').removeClass('hide');

    za.ui.ntFocus('.forgot-password-frame .username');

    $('.forgot-password-frame .username').val($('.login-frame .username').val());

    window.grecaptcha ?
    render() :
    za.recaptcha_ready.then(render);

    function render(){

        if(!isNaN(za.grecaptcha.fpass_no_robot))
            grecaptcha.reset(za.grecaptcha.fpass_no_robot);
        else
            za.grecaptcha.fpass_no_robot = grecaptcha.render('fpass_no_robot', {
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

   var termsCheckbox = new za.ui.Checkbox(clientData.core_text.register_accept_terms,{
      'data-html-register_accept_terms':1
   },true);

   $('.auth-dialogs .register-frame .checkbox').html(termsCheckbox.element);

    // Enable fbauth buttons when FB API is availalbe
    za.fb_ready.then(function(){
      $('.auth-dialogs form .fb.disabled').removeClass('disabled');
    });

    // Enable fbauth buttons when Google API is availalbe
    za.gapi_ready.then(function(){
      $('.auth-dialogs form .g-plus.disabled').removeClass('disabled');
    });

    // Make x buttons close frames
    $('.auth-dialogs .icon-cancel-circle')
      .click(za.login.exitPrompts);

    function error(message){
        $(this).find('.error').html(message);
        return this;
    }

    function loading(bool){
        $(this)[bool?'addClass':'removeClass']('loading');
        $(this).find('input, button').prop('disabled', bool);
        $(this).find('input, button, a').blur();
        $(this).find('.loader').html(bool?za.ui.loader():'');
        return this;
    }

    // Bind FB Oauth handler
    $('.auth-dialogs form .fb').click(function(){

      var token = FB.getAccessToken();
      var frame = $(this).parents('.auth-dialogs > form');
      var permission_scope = 'public_profile,user_friends,email';

      if(token)
         za.fb_login(token);
      else {
         if(/chrome|crios/i.test(navigator.userAgent) && za._touch) {

            window.location.href =
               'https://www.facebook.com/dialog/oauth?client_id=' + clientData.fb_app_id +
               '&redirect_uri=' + clientData.base_url +
               '&scope=' + permission_scope;

         }
         else FB.login(function(response){
            if(!response.authResponse)
               frame[0].error(clientData.core_text.fb_no_perm);
            else
               za.fb_login(response.authResponse.accessToken);
         }, {
            scope: permission_scope
         });

      }

    });

    // Forgot password click handler
    $('.auth-dialogs .fpass-btn').click(za.login.promptForgotPassword);

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

   $('.auth-dialogs .recover-password-frame').submit(function(){

      this.error('');
      event.preventDefault();
      event.stopPropagation();

      var password = $(this).find('.password').val();
      var frame = this;

      if(!password)
          return this.error(clientData.core_text.error_must_enter_new_password);

      if(password.length > clientData.max_pass_length || password.length < clientData.min_pass_length)
         return this.error(
            clientData.core_text.error_invalid_password_size +
            ' ('+clientData.min_pass_length+'-'+
            clientData.max_pass_length +
            ' ' + clientData.core_text.characters + ')');

      this.loading(true);

      za.send('/api/recoverpass',{
         p: password,
         token: $('.recover-password-frame .token').val()
      })
      .success(function(response){
         if(response.data.message === 'OK') {
            $('.recover-password-frame .not-sent-yet').hide();
            $('.recover-password-frame .success').show();
         } else
            frame.error(clientData.core_text.error_something_went_wrong);
      })
      .always(function(){
          $('.auth-dialogs .password').val('');
          $('.auth-dialogs .recover-password-frame')[0].loading(false);
      });

   });

   $('.auth-dialogs .forgot-password-frame').submit(function(){

      this.error('');
      event.preventDefault();
      event.stopPropagation();

      var uid = $(this).find('.username').val();
      var frame = this;

      if(!uid)
          return this.error(clientData.core_text.error_fpass_email_needed);

      var grecaptchaResponse = grecaptcha.getResponse(za.grecaptcha.fpass_no_robot);

      if(!grecaptchaResponse)
         return this.error(clientData.core_text.error_no_robot);

      this.loading(true);

      za.send('/api/forgotpass', {
          uid: uid,
          grecaptcha: grecaptchaResponse
      })
      .success(function(response){
         if(response.data.message === 'OK') {
            $('.forgot-password-frame .not-sent-yet').hide();
            $('.forgot-password-frame .success').show();
         } else
            frame.error(clientData.core_text.error_something_went_wrong);
      })
      .always(function(){
          grecaptcha.reset(za.grecaptcha.fpass_no_robot);
           $('.auth-dialogs .password').val('');
          $('.auth-dialogs .forgot-password-frame')[0].loading(false);
      });

   });

   $('.auth-dialogs .register-frame').submit(function(){

      this.error('');
      event.preventDefault();
      event.stopPropagation();

      var uid = $(this).find('.username').val();
      var password = $(this).find('.password').val();
      var frame = this;

      if(!uid || !password)
           return this.error(clientData.core_text.error_both_credentials);

      var grecaptchaResponse = grecaptcha.getResponse(za.grecaptcha.register_no_robot);

      if(!grecaptchaResponse)
           return this.error(clientData.core_text.error_no_robot);

      if(!/^[^\@\&\_\! ]+\@[^\@\&\_\! ]+$/.test(uid))
         return this.error(clientData.core_text.error_invalid_email);

      if(password.length > clientData.max_pass_length || password.length < clientData.min_pass_length)
         return this.error(clientData.core_text.error_invalid_password_size + ' ('+clientData.min_pass_length+' - '+clientData.max_pass_length+') ' + clientData.core_text.characters);

      if(!termsCheckbox.isChecked())
         return this.error(clientData.core_text.error_must_accept_terms);

      this.loading(true);

      za.send('/api/register', {
           uid: uid,
           password: password,
           grecaptcha: grecaptchaResponse
      })
      .success(function(response){
         if(response.error || !response.data){
            if(response.error === 'error_user_exists')
               return frame.error(clientData.core_text.error_user_exists);
            return frame.error(clientData.core_text.error_something_went_wrong);
         } else
            za._login_response_handler(response);
      })
      .always(function(){
           grecaptcha.reset(za.grecaptcha.register_no_robot);
           $('.auth-dialogs .register-frame')[0].loading(false);
               $('.auth-dialogs .password').val('');
      });

   });


    $('.auth-dialogs .login-frame').submit(function(){

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
             $('.auth-dialogs .password').val('');
        });

    });

    if(/recoverpass=.+/i.test(window.location.search)) {
      var token = window.location.search.match(/^.*[\?\&]recoverpass=([^\&\#]+)$/i)[1];

      if(token)
          za.login.promptRecoverFrame(token);
    }

});

za._login_response_handler = function(response){

   response = response.data;

   var register_frame = $('.auth-dialogs .register-frame')[0];
   var login_frame = $('.auth-dialogs .login-frame')[0];

   if(response && response.success && response.user_data) {

      // Exit login dialogs
      za.login.exitPrompts();

      $('html').addClass('logged-in');

      // Set data
      clientData.user_data = response.user_data;
      clientData.csrf_token = response.csrf_token;

      // Check for language change
      if(response.user_data.lang !== clientData.lang) {
         clientData.lang = response.user_data.lang;
         za.send('/api/text/' + response.user_data.lang)
            .success(za._language_change_handler);
      }

      // Update navigation bar
      za.userBar.setUser(clientData.user_data);

      // On logged in field
      $('.user-comment .comment-user-image').css('background-image','url('+clientData.user_data.image+')');

   } else {
      register_frame.error(clientData.core_text.error_something_went_wrong);
      login_frame.error(clientData.core_text.error_something_went_wrong);
   }

};

za._language_change_handler = function(core_text){

   core_text = core_text.data;

   if(typeof core_text !== 'object')
      return console.warn('_language_change_handler called with invalid input.');

   var keys = Object.keys(core_text);
   clientData.core_text = core_text;

   keys.forEach(function(key){
      $('[data-html-' + key + ']').html(core_text[key]);
      $('[data-val-' + key + ']').val(core_text[key]);
      $('[data-title-' + key + ']').attr('title', core_text[key]);
      $('[data-placeholder-' + key + ']').attr('placeholder', core_text[key]);
   });

};
