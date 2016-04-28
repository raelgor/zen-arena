za.ui.loader = function() {

    var element = $('<div>');
    
    element.html(
        '<div class="sk-cube-grid">' +
            '<div class="sk-cube sk-cube1"></div>' +
            '<div class="sk-cube sk-cube2"></div>' +
            '<div class="sk-cube sk-cube3"></div>' +
            '<div class="sk-cube sk-cube4"></div>' +
            '<div class="sk-cube sk-cube5"></div>' +
            '<div class="sk-cube sk-cube6"></div>' +
            '<div class="sk-cube sk-cube7"></div>' +
            '<div class="sk-cube sk-cube8"></div>' +
            '<div class="sk-cube sk-cube9"></div>' +
        '</div>'
    );

    element.absBindToElement = function(element) {
      this.boundElement = $(element);
      this.positionLoader();
      window.addEventListener('resize', positionLoader);
    };

    function positionLoader() {
      if(!element) return window.removeEventListener('resize', positionLoader);
      element.css({
         position: 'absolute',
         top: this.boundElement.offset().top + 20,
         left: this.boundElement.offset().left + this.boundElement.width()/2
      });
    }

    element.positionLoader = positionLoader;

   element.lazyKill = function(ms) {
      this.stop().animate({opacity:0},ms||200,'swing',function(){
         element.remove();
         element.boundElement &&
         window.removeEventListener('resize', positionLoader);
      });
   };

   element.kill = function(){
      element.remove();
      window.removeEventListener('resize', positionLoader);
   };

   return element;

};
