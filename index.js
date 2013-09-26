var request = require('request'),
    connect = require('connect'),
    cheerio = require('cheerio'),
    parse = require('url').parse,
    path = require('path'),
    urlparse = require('url'),
    prepare = require('./prepare'),
    serve = require('./serve'),
    fs = require('fs');

function inject(body, base) {
  if (body.toUpperCase().indexOf('<BODY') === -1) { // damn bodyless things...
    body = '<body>' + body + '</body>';
  }

  $ = cheerio.load(body);
  $ = prepare($, base ? '/proxy?url=' + base : '', require('url'));
  // FIXME escape & but don't bork the command line

  return $.html();
}

function proxy(req, res, next) {
  var url = parse(req.url, true);

  if (url.pathname === '/www/proxy') {
    var url = url.query.url;

    if (!url) {
      return next();
    }
    var base = urlparse.parse(url).protocol + '//' + urlparse.parse(url).hostname

    request(url, function (error, response, body) {
      base = response.request.uri.href;
      res.writeHead(200, { 'content-type': 'text/html' });
      if (!error && response.statusCode == 200) {
        var html = inject(body, base);
        res.write(html);
        res.end();
      } else {
        var html = "<title></title><pre>\n\n  WWW: Can't access '" + url+ "'\n</pre>";
        var html = inject(html, base);
        res.write(html);
        res.end();
      }
    })
  } else {
    next();
  }
}

process.cwd(); // tiny hack for live server

connect()
  .use(connect.logger())
  .use(function (req, res, next) {
    if ((req.url === '/www/referer' || req.url === '/www/referrer') && req.headers.referer) {
      res.writeHead(302, { location: '/www/proxy?url=' + req.headers.referer });
      res.end();
    } else {
      // TODO send a explanation page
    }
    next();
  })
  .use(serve('/www/', 'public', inject))
  .use(connect.static('public'))
  .use(proxy)
  .use(function (req, res) {
    res.writeHead(404);
    fs.createReadStream('public/Error404.html').pipe(res);
  })
  .listen(process.env.PORT || 8000);
