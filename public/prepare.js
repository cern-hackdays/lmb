(function () {

var commandline = '<form id=command><label>[ref.number], Quit, or Help: <input autofocus></label></form><link rel=stylesheet class=ignore href=cmd.css type=text/css><script src=commandline.js></script>';

var prepare = (function ($) {
  // strip particular elements
  $('style,iframe,frame,frameset,img').remove();
  $('link[rel=stylesheet]').remove();

  // expose the content of scripts
  $('script').each(function () {
    $(this).attr('type', 'text/plain');
  });

  // all documents have an [END] at the...
  $('body').append('<pre id="lmb-footer">\n\n     [END]</pre>'); // TODO parser question?

  // insert command prompt
  $('body').append(commandline);

  // styles
  $('body').prepend('<link class=ignore rel=stylesheet href=linemode.css type=text/css>');

  // link numbering
  $('a').each(function (i) {
    var $el = $(this);
    $el.append('[' + (i+1) + ']');

    var href = $el.attr('href');
    if (href.indexOf('http') !== 0) {

    }
  });

  // node compat
  return $;
});

if (typeof exports !== 'undefined') {
  module.exports = prepare;
} else {
  prepare(jQuery);
}

})();