window.ap = window.ap || {};


window.ap.smartzoom = (function( $ ) {


    var models      = {}
      , views       = {}
      , controllers = {};


    models = {
        fontSize: 62.5
      , width:    320
    };


    views.getCurrent = function() {
        return models.screen; 
    };


    controllers.viewPort = function() {
        var windowWidth  = $( window ).width()
          , windowHeight = $( window ).height()
          , currentZoom  = ( windowWidth / models.width ) * 100
          , orientation  = false;
        if ( windowWidth > windowHeight ) {
            orientation = 'portrait';
            views.body.removeClass( 'ui-landscape' ).addClass( 'ui-portrait' );
        }
        else {
            orientation = 'landscape';
            views.body.removeClass( 'ui-portrait' ).addClass( 'ui-landscape' );
        }
        if ( currentZoom < 300 ) {
            document.documentElement.style.zoom = currentZoom + '%';
            document.documentElement.style.webkitTextSizeAdjust = '100%'; 
            document.body.style.fontSize = ( models.fontSize * currentZoom / 100 )+ "%";  
        }
        return {
            width:       windowWidth  || 320
          , height:      windowHeight || 480
          , zoom:        currentZoom  || 100
          , orientation: orientation  || 'portrait'
        };
    };


    controllers.resize = function() {
        var resizeTimerID = false;
        return function() {
            if ( ! resizeTimerID ) {
                resizeTimerID = setTimeout(function() {
                    models.screen = controllers.viewPort();
                    clearTimeout( resizeTimerID );
                    resizeTimerID = false;
                }, 450 );
            }
        };
    }();


    return {
        getCurrent: function() {
            return models.screen;
        }
      , initialize: function( options ) {
            models.width = options && options.width ? options.width : 320;
            models.fontSize = options && options.fontSize ? options.fontSize : 62.5;
            views.body = $( 'body' );
            models.screen    = controllers.viewPort();
            // Deprecated: window.scrollTo( 0, 1 );
            $( window ).bind( 'resize', controllers.resize );
            return models.screen;
        }
      , terminate:  function() {
            $( window ).unbind( 'resize', controllers.resize );
            document.documentElement.style.zoom = '100%';
            document.documentElement.style.webkitTextSizeAdjust = 'auto'; 
            document.body.style.fontSize = models.fontSize + "%"; 
            return models.screen;
      }
    };


})( window.jQuery || window.Zepto || window.jquip );
