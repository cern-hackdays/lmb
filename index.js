var request = require('request'),
    connect = require('connect'),
    cors = require('cors'),
    cheerio = require('cheerio'),
    parse = require('url').parse;

var commandline = '<label for=command id=command>&lt;ref.number&gt;, Quit, or Help: <input autofocus></label><link rel=stylesheet class=ignore href=cmd.css type=text/css><script src=commandline.js></script>';

function proxy(req, res, next) {
  var url = parse(req.url, true);

  if (url.pathname === '/proxy') {
    var css = '<!doctype html><link class=ignore rel=stylesheet href=linemode.css type=text/css>'
    var js = '<script class=ignore src=linemodethis.js></script>'

    request(url.query.url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);
        $('style,iframe,frame,frameset,img').remove();
        $('link[rel=stylesheet]').remove();
        $('script').each(function () {
          $(this).attr('type', 'text/plain');
        });
        $('body').append(commandline);
        res.write(css + $.html());
        res.end();
      }
    })
  } else {
    next();
  }
}

connect()
  .use(connect.static('public'))
  // TODO add cors
  .use(proxy)
  .listen(process.env.PORT || 8000);
