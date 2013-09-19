var request = require('request'),
    connect = require('connect'),
    cors = require('cors'),
    cheerio = require('cheerio'),
    parse = require('url').parse,
    path = require('path'),
    prepare = require('./public/prepare');

function proxy(req, res, next) {
  var url = parse(req.url, true);

  if (url.pathname === '/proxy') {
    var url = url.query.url;
    var base = path.normalize(url) + '/';

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        if (body.toUpperCase().indexOf('<BODY') === -1) { // damn bodyless things...
          body = '<body>' + body + '</body>';
        }

        $ = cheerio.load(body);
        $ = prepare($, '/proxy?url=' + base);
        res.write($.html());
        res.end();
      } else {
        res.end(JSON.stringify({ error: error, status: response.statusCode }));
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
  // TODO add cors
  .use(proxy)
  .listen(process.env.PORT || 8000);
