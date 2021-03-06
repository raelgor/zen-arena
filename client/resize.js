/* global za */
za.resize = function resize(){

   /*
   // Fix carousel
   $('.carousel').css({
      height: window.innerWidth*0.38 - 50 + 'px',
      // lineHeight: window.innerWidth*0.51 - 50 + 'px',
      maxHeight: window.innerHeight + 'px'
   });
   */

   // Translate fix
   var ho = window.innerHeight*0.95 < 507 ? window.innerHeight*0.95/2 : 254;
   $('.auth-dialogs > *').css({
      top: window.innerHeight/2 - ho + 'px',
      left: window.innerWidth/2 - 170 + 'px'
   });

   if(window.innerWidth <= 940) {
      $('.navigation .foreground .wrapper > *:not(.logo)').hide();
      $('.navigation .touch-nav').show();
   } else {
      $('.navigation .foreground .wrapper > *:not(.logo)').show();
      $('.navigation .touch-nav').hide();
   }

   if(window.innerWidth > 530) {
      $('.tagline').css({fontSize: '25px', paddingTop: '18%'});
   } else {
      $('.tagline').css({fontSize: '20px', paddingTop: '18%'});
   }

};

$(window).resize(za.resize).ready(za.resize);
