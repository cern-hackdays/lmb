var request = require('request'),
    connect = require('connect'),
    cheerio = require('cheerio'),
    parse = require('url').parse,
    path = require('path'),
    prepare = require('./public/prepare'),
    urlparse = require('url')

function proxy(req, res, next) {
  var url = parse(req.url, true);

  if (url.pathname === '/proxy') {
    var url = url.query.url;
    var base = urlparse.parse(url).protocol + '//' + urlparse.parse(url).hostname

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if (body.toUpperCase().indexOf('<BODY') === -1) { // damn bodyless things...
          body = '<body>' + body + '</body>';
        }

        $ = cheerio.load(body);
        $ = prepare($, '/proxy?url=' + base);
        res.write($.html());
        res.end();
      } else if (response) {
        res.end(JSON.stringify({ error: error, status: response.statusCode }));
      } else {
        res.end(err.toString('utf8'))
      }
    })
  } else {
    next();
  }
}

connect()
  .use(function (req, res, next) {
    console.log(req.headers);
    if ((req.url === '/referer' || req.url === '/referrer') && req.headers.referer) {
      res.writeHead(302, { location: '/proxy?url=' + req.headers.referer });
      res.end();
    } else {
      // TODO send a explanation page
    }
    next();
  })
  .use(connect.static('public'))
  .use(proxy)
  .listen(process.env.PORT || 8000);
