module.exports = function prepare ($, location) {

  var commandline = ['<form id=command><label><span class=cmd-prompt>&lt;ref.number&gt;, Quit, or Help: </span>',
                     '<span autofocus autocapitalize=off spellcheck=false autocorrect=off contenteditable id=cmd-input></span>',
                     '<span class=wait id=cmd-cursor>&nbsp;</span><input hidden autofocus></label></form>',
                     '<script src=blocker.js></script>',
                     '<script src=keyboardSounds.js></script>',
                     '<script src=commandline.js></script>'].join('');


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
  $('body').append('<pre id=lmb-footer>\n\n     [End]</pre>');

  
  // insert command prompt
  $('body').append(commandline);

  
  // styles (early to attempt to avoid FOUC)
  $('body').prepend('<link class=ignore rel=stylesheet href=linemode.css type=text/css>');


  // link numbering
  $('a').each(function (i) {
    var $el = $(this);
    $el.append('[' + (i+1) + ']');

    var href = $el.attr('href');
    //href = '/about/foo/foobar'
    var url = require('querystring').parse(location)['/proxy?url'] // brian.io/whatever/whatevers
    var host = require('url').parse(url).hostname                  // brian.io
    var protocol = require('url').parse(url).protocol

    // console.log(href)

    // FIXME this is the href munging code. should be own, tested, module.
    // order important here
    if (href === '/') href = protocol + '//' + host    
    if (href.toString().slice(0, 2) === '//') href = protocol + href;
    if (href.slice(0, 1) === '/') href = protocol + '//' +  host + href
    if (href.slice(0, protocol.length) != protocol) href = protocol + '//' + host + '/' +  href 
    
    // final rewrite to proxy url
    href = '/proxy?url=' + href

    // console.log(href)

    // set the proper rewritten url
    $el.attr('href', href);
  });

  // node compat
  return $;
}

