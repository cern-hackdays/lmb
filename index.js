var request = require('request'),
    connect = require('connect'),
    cors = require('cors'),
    cheerio = require('cheerio'),
    parse = require('url').parse,
    prepare = require('./public/prepare');

function proxy(req, res, next) {
  var url = parse(req.url, true);

  if (url.pathname === '/proxy') {
    var path = url.query.url;
    request(path, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        $ = cheerio.load(body);
        $ = prepare($);
        res.write($.html());
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
