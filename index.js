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

function isValidUrl(s) {
  var regexp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
  return regexp.test(s);
}

function proxy(req, res, next) {
  var url = parse(req.url, true);

  if (url.pathname === '/www/proxy') {
    var url = url.query.url;

    if (!url) {
      return next();
    }

    var base_proto = urlparse.parse(url).protocol;

    if (base_proto === 'http:' || base_proto === 'https:') {
      if (urlparse.parse(url).hostname) {
        var base = base_proto + '//' + urlparse.parse(url).hostname;
      } else {
        var html = "<title></title><pre>\n\n  Hostname is empty. \n</pre>";
        var html = inject(html, base);
        res.write(html);
        res.end();
      }
    } else {
        var html = "<title></title><pre>\n\n  Invalid protocol. \n</pre>";
        var html = inject(html, url);
        res.write(html);
        res.end();
    }

    if (!isValidUrl(base)) {
      var html = "<title></title><pre>\n\n  Invalid url. \n</pre>";
      var html = inject(html, base);
      res.write(html);
      res.end();
    }

    if (base.indexOf("cern.ch") != -1 && base.indexOf("info.cern") === -1) {
      var html = "<title></title><pre>\n\n Sorry, only info.cern.ch can be parsed via the line-mode browser \n" +
                 " on the cern.ch domain  \n</pre>";
      var html = inject(html, base);
      res.write(html);
      res.end();
    }

    request(base, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, { 'content-type': 'text/html' });
        var html = inject(body.replace(/&/g, '&amp;'), base);
        res.write(html);
        res.end();
      } else {
        res.writeHead(500, { 'content-type': 'text/html' });
        var html = "<title></title><pre>\n\n  WWW: Can't access '" + url + "'\n</pre>";
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
