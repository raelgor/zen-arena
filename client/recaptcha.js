/* global za, log, grecaptcha, clientData */

// Store instance ids
za.grecaptcha = {};

// Promise of loaded
za.recaptcha_ready = new Promise(function(r){ za._recaptcha_resolve = r; });

// Load callback
window.rccb = function() {

    log('ReCaptcha loaded.');
    za._recaptcha_resolve();

};

$(window).ready(function(){

   // grecaptcha hack for dynamic language and fade in
   za.recaptcha_ready.then(function(){
      var _render = grecaptcha.render;
      var _reset = grecaptcha.reset;
      var map = {};

      grecaptcha.render = function(id, options){
         var num = _render.call(grecaptcha, id, options);
         map[num] = id;
         animate_and_adjust(id);
         return num;
      };

      grecaptcha.reset = function(num){
         var result = _reset.call(grecaptcha, num);
         animate_and_adjust(map[num]);
         return result;
      };

      function animate_and_adjust(id) {
         var iframe = $('#'+id).find('iframe');

         iframe.css('opacity', 0);
         iframe.load(function(){
            $(this).animate({opacity:1},200,'swing');
         });

         var lang = iframe.attr('src').match(/hl=([a-z]{2})/);

         if(lang !== clientData.lang) {
            var new_src = iframe.attr('src').replace(/hl=[a-z]{2}/,'hl=' + clientData.lang);
            iframe.attr('src', new_src);
         }
      }
   });

});
