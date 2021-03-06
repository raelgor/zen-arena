/**
 * Make a DOMElement that serves as a loader with extra methods.
 * @class za.ui.Loader
 */
za.ui.Loader = function() {

    var element = $('<div>');

    element.addClass('loader').html(
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

    element.spawn = function(){
      $('body').append(element);
   };

    element.loaderify = function(target) {
      element.absBindToElement(target);
      $('body').append(element);
      $(target)
      .css('pointer-events', 'none')
      .animate({opacity: 0.4}, 100, 'swing');
   };

   element.unloaderify = function(){
      element.boundElement.css('pointer-events', 'all')
                        .animate({opacity: 1}, 100, 'swing');
      element.lazyKill();
   };

    function positionLoader() {
      if(!element) return window.removeEventListener('resize', positionLoader);
      element.css({
         position: 'absolute',
         top: element.boundElement.offset().top + 20,
         left: element.boundElement.offset().left + element.boundElement.width()/2 - 20
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
