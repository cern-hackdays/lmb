module.exports = function prepare ($, location) {
  var commandline = ['<form id=command><label><span class="cmd-prompt"></span>',
                     '<input autofocus autocapitalize=off spellcheck=false autocorrect=off contenteditable id="cmd-input">',
                     '<span class=wait id="cmd-cursor">&nbsp;</span></label></form>',
                     '<script src=/js/blocker.js></script>',
                     '<script src=/js/keyboardSounds.js></script>',
                     '<script src=/js/commandline.js></script>'].join('');

  // strip particular elements
  $('iframe,frame,frameset,img,hr,br,video').remove();
  $('script,style').each(function(){
    var $this = $(this);
    var $span = $('<span>');
    $span.html($this.html());
    $this.replaceWith($span);
  });
  $('link[rel=stylesheet]').remove();
  $('[style]').each(function () {
    $(this).removeAttr('style');
  });


  // all documents have an [END] at the...
  // TODO parser question?
  $('body').append('<pre id=lmb-footer>\n\n     [End]</pre>');


  // insert command prompt
  $('body').append(commandline);


  // styles (early to attempt to avoid FOUC)
  $('body').prepend('<link class=ignore rel=stylesheet href=/css/linemode.css type=text/css>');


  // link numbering
  $('a').each(function (i) {
    var $el = $(this);
    $el.append('[' + (i+1) + ']');

    if (location) {

      var href = $el.attr('href') || '';
      // href = '/about/foo/foobar'
      var url = require('querystring').parse(location)['/proxy?url'] // brian.io/whatever/whatevers
      var host = require('url').parse(url).hostname                  // brian.io
      var protocol = require('url').parse(url).protocol

      // FIXME this is the href munging code. it is brittle. should be own, tested, module. bl
      // order important here
      if (href === '/') href = protocol + '//' + host
      if (href.toString().slice(0, 2) === '//') href = protocol + href;
      if (href.slice(0, 1) === '/') href = protocol + '//' +  host + href
      if (href.slice(0, protocol.length) != protocol) href = protocol + '//' + host + '/' +  href

      // set the proper rewritten url
      $el.attr('href', '/www/proxy?url=' + href);
    }
  });

  require('cheerio-event-handlers')($._root)
  // node compat
  return $;
}

