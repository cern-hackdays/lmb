(function () {

var commandline = ['<form id=command><label><span class="cmd-prompt"></span><input autofocus autocapitalize=off spellcheck=false autocorrect=off contenteditable id="cmd-input"><span class=wait id="cmd-cursor">&nbsp;</span></label></form>',
  '<script src=blocker.js></script>',
  '<script src=keyboardSounds.js></script>',
  '<script src=commandline.js></script>',].join('');

var prepare = (function ($, location) {
  // strip particular elements
  $('style,iframe,frame,frameset,img,hr,br').remove();
  $('link[rel=stylesheet]').remove();
  $('[style]').each(function () {
    $(this).removeAttr('style');
  });

  // expose the content of scripts
  $('script').each(function () {
    $(this).attr('type', 'text/plain');
  });

  // all documents have an [END] at the...
  // TODO parser question?
  $('body').append('<pre id="lmb-footer">\n\n     [End]</pre>');

  // insert command prompt
  $('body').append(commandline);

  // styles (early to attempt to avoid FOUC)
  $('body').prepend('<link class=ignore rel=stylesheet href=linemode.css type=text/css>');

  // link numbering
  $('a').each(function (i) {
    var $el = $(this);
    $el.append('[' + (i+1) + ']');

    var href = $el.attr('href');
    // console.log(href);

    // if (href.slice(0, 2) === '//') {
    //   href = 'http:' + href;
    // }

    // if (href.slice(0, 1) === '/') {
    //   href = href.slice(1);
    // }

    // console.log(location + href);
    $el.attr('href', href);
  });

  // node compat
  return $;
});

if (typeof exports !== 'undefined') {
  module.exports = prepare;
} else {
  prepare(jQuery, window.location.toString());
}

})();
