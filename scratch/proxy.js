var request = require('request'),
    connect = require('connect');

var server = connect
    .use(connect.static('../www'))
    .use(function(req, res){
      if (req.url === '/proxy') {
        console.log(req);
      }

      res.end('ok');
    }).listen(process.env.PORT || 8000);


/*

/proxy?url=http://remysharp.com

<html>


 */