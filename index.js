var request = require('request'),
    connect = require('connect'),
    cors = require('cors'),
    parse = require('url').parse;

function proxy(req, res, next) {
  var url = parse(req.url, true);

  if (url.pathname === '/proxy') {
   // var x = request(url.query.url);
    var css = '<link rel=stylesheet href=http://rawgithub.com/cern-hackdays/lmb/master/public/linemode.css type=text/css>'
    var js = '<script src=http://rawgithub.com/cern-hackdays/lmb/master/public/linemodethis.js></script>'
    //req.pipe(x);
    //x.pipe(res);

    request(url.query.url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body)
        res.write(body + css + js);
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
