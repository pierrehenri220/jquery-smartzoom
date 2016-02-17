/*

 ___  _   _   ___  ____ _____ ___   ___   ___   _   _
/ __|/ \_/ \ / _ \| |\_\_  __|  /  / _ \ / _ \ / \_/ \ 
\__ \ /| |\ | | | |  \   | | / /__| |_| | |_| | /| |\ |
|___/_||_||_|_| |_|_|\_\ |_|/_____|\___/ \___/|_||_||_|

 Version: 0.1.2
  Author: Alliance Port, LLC
 Website: http://alliance.port.rocks/
    Docs: http://alliance.port.rocks/jquery-ap-smartzoom/
    Repo: http://github.com/allianceport/jquery-ap-smartzoom/
  Issues: http://github.com/allianceport/jquery-ap-smartzoom/issues
 */
 
window.ap = window.ap || {};

window.ap.smartzoom = (function( _w ) {

    var $     = _w.jQuery || _w.Zepto || _w.jquip
      , myApp = _w.ap;

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
        if ( currentZoom < 200 ) {
            document.documentElement.style.zoom = currentZoom + '%';
            if ( myApp.isMobile.iOS() ) {
                document.documentElement.style.webkitTextSizeAdjust = '100%';
                document.body.style.fontSize = ( models.fontSize * currentZoom / 100 ) + "%";
            }
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
            $( _w ).bind( 'resize', controllers.resize );
            return models.screen;
        }
      , terminate:  function() {
            $( _w ).unbind( 'resize', controllers.resize );
            document.documentElement.style.zoom = '100%';
            if ( myApp.isMobile.iOS() ) {
                document.documentElement.style.webkitTextSizeAdjust = 'auto'; 
                document.body.style.fontSize = models.fontSize + "%";
            }
            return models.screen;
      }
    };


})( window );
