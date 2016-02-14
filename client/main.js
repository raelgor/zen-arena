/* global za */
window.za = {

   _touch: Boolean(window.touchstart),
   ui: {
      nt_focus: function(selector){
         !za._touch && $(selector).focus();
      }
   }

};

$(window).ready(function(){

    za.ui.nt_focus('.navigation .search');

});
