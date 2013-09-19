var request = require('request'),
    connect = require('connect'),
    parse = require('url').parse;

function proxy(req, res, next) {
  var url = parse(req.url, true);

  if (url.pathname === '/proxy') {
    var x = request(url.query.url);
    req.pipe(x);
    x.pipe(res);
  } else {
    next();
  }
}

connect()
  .use(connect.static('public'))
  // TODO add cors
  .use(proxy)
  .listen(process.env.PORT || 8000, function() { console.log('Running local server http://localhost:8000') });
