(function () {

  var disqus_shortname = '<%= jekyllConfig.disqus_username %>',
    s = document.createElement('script');

  s.type = 'text/javascript';
  s.async = true;
  s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';

  ( document.getElementsByTagName('HEAD')[ 0 ] || document.getElementsByTagName('BODY')[ 0 ] ).appendChild( s );
}());
