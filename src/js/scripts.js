(function ( window, document, undefined ) {

  'use strict';

  // Twitter share

  (function( d, s, id ){
    var js,
        fjs = d.getElementsByTagName( s )[ 0 ],
        p = /^http:/.test( d.location ) ? 'http' : 'https';

    if( !d.getElementById( id ) ) {

      js = d.createElement( s );
      js.id = id;
      js.src = p + '://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore( js, fjs );
    }
  })( document, 'script', 'twitter-wjs' );

  // Google Plus share

  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/platform.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();

})( this, document );