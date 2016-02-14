/* global clientData, za, $, grecaptcha, window */
za.login = {};

za.login.promptLogin = function() {

    $('.auth-dialogs').removeClass('hide');
    $('.auth-dialogs > *').addClass('hide');

    $('.login-frame')
        .removeClass('hide')
        .find('.username')
        .focus();

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

    $('.register-frame')
       .removeClass('hide')
       .find('.username')
       .focus();

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

    function error(message){
        $(this).find('.error').html(message);
    }

    function loading(bool){
        $(this)[bool?'addClass':'removeClass']('loading');
        $(this).find('input, button').prop('disabled', bool);
        $(this).find('input, button, a').blur();
        $(this).find('.loader').html(bool?za.ui.loader():'');
    }

    $('.player-info .login').click(za.login.promptLogin);
    $('.player-info .signup').click(za.login.promptRegister);
    $('.auth-dialogs .create-acc').click(za.login.promptRegister);
    $('.auth-dialogs .log-acc').click(za.login.promptLogin);

    $('.auth-dialogs').click(function(event){

        event.target === $('.auth-dialogs')[0] &&
        za.login.exitPrompts();

    });

    $('.auth-dialogs .login-frame')[0].error = error;
    $('.auth-dialogs .login-frame')[0].loading = loading;

    $('.auth-dialogs .login-frame').submit(function(event){

      var frame = this;

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
        .success(function(response){

           if(response && response.success && response.user_data) {

             za.login.exitPrompts();
             clientData.user_data = response.user_data;
             clientData.csrf_token = response.csrf_token;

           } else frame.error(clientData.core_text.login_fail_default);

        })
        .always(function(){
            grecaptcha.reset(za.grecaptcha.login_no_robot);
            $('.auth-dialogs .login-frame')[0].loading(false);
        });

    });

});
