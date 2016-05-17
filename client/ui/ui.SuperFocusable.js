za.ui.SuperFocusable = function() {

    var FOCUS;

    var originalTop;
    var originalLeft;
    var originalHeight;
    var originalWidth;

    var darkness;
    var element;

    function clearSelection() {
      if (window.getSelection) {
          window.getSelection().removeAllRanges();
      } else if (document.selection) {
          document.selection.empty();
      }
    }

    function focus(){

        if(FOCUS)
            return;

        FOCUS = true;

        darkness = new za.ui.Darkness();
        darkness.spawn();

        darkness.on('click', restore);

        var scrollTop = $('body').scrollTop() || $('html').scrollTop();

        element = $(this);

        originalTop = $(this).offset().top;
        originalLeft = $(this).offset().left;
        originalHeight = $(this).height();
        originalWidth = $(this).width();

        $(this).css({
            position: 'fixed',
            top: $(this).offset().top - scrollTop - 9,
            left: $(this).offset().left - 20,
            width: originalWidth,
            height: originalHeight,
            zIndex: 2
        });

        position(clearSelection);
        $(window).bind('resize', position);

    }

    function position(callback){

        element.animate({
            top: window.innerHeight/2 - 100,
            left: window.innerWidth/2 - 200,
            width: 400,
            height: 200
        }, 200, 'swing', callback);

    }

    function restore() {

        FOCUS = false;

        darkness.fade();

        $(window).unbind('resize', position);

        element.css({
            position: 'absolute',
            top: element.offset().top - 9,
            left: element.offset().left - 20
        })
        .animate({
            top: originalTop - 9,
            left: originalLeft - 20,
            width: originalWidth,
            height: originalHeight
        }, 200, 'swing', function(){
            element.css({
                position: 'static',
                width: '',
                height: ''
            });
            clearSelection();
        });

    }

    this.focus = focus;
    this.restore = restore;

};
