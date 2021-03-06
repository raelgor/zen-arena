/**
 * Makes an element disposable by swiping away.
 * @class za.ui.Disposable
 * @param {Object} element A jQuery-wrapped or raw DOMElement object.
 */
za.ui.Disposable = function(e){
   var CLOSE_THRESHOLD = 0.50;

   e = e instanceof jQuery ? e[0] : e;

   var f = $(e);
   var h = new Hammer.Manager(e);
   var object = this;

   h.add(new Hammer.Pan({
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 5
   }));

   h.on('panstart', function(ev){
      if($(ev.target).is('input:focus,textarea:focus'))
         return;
       f
       .addClass('ani006')
       .removeClass('ani04');
       $('body,html').css('overflow','visible');
   });

   h.on('panmove', function(ev){
      if($(ev.target).is('input:focus,textarea:focus')){
         ev.preventDefault();
         return false;
      }
       var perc = ev.deltaX/(f.width()*CLOSE_THRESHOLD);

        f.css({
            transform:
                'translate('+ev.deltaX+'px, '+Math.abs(perc*10)+'px) rotate('+(perc*10)+'deg)',
            opacity: 1 - perc/1
        });
   });

   h.on('panend', function(ev){
      if($(ev.target).is('input:focus,textarea:focus'))
         return;
      $('body,html').css('overflow','');
       clearSelection();
       if(ev.deltaX >= f.width()*CLOSE_THRESHOLD) {
          /**
           * The window has been disposed by swiping.
           * @event za.ui.Disposable#disposed 
           */
           object.emit('disposed');
           setTimeout(restorePosition,400);
        } else
         restorePosition();

       function restorePosition(){
          f
          .removeClass('ani006')
          .addClass('ani04');
          f.css({
              transform: 'translate(0px, 0px) rotate(0deg)',
              opacity: ''
          });
       }

       function clearSelection() {
          if (window.getSelection) {
              window.getSelection().removeAllRanges();
          } else if (document.selection) {
              document.selection.empty();
          }
      }
   });
};

za.ui.Disposable.prototype = EventEmitter2.prototype;
