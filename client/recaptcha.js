/* global za, log */

// Store instance ids
za.grecaptcha = {};

// Promise of loaded
za.recaptcha_ready = new Promise(function(r){ za._recaptcha_resolve = r; });

// Load callback
function rccb() {

    log('ReCaptcha loaded.');
    za._recaptcha_resolve();

}
