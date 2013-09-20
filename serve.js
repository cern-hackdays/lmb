// servedir HTTP Server
// http://github.com/rem/servedir

// Copyright 2011, Remy Sharp
// http://remysharp.com

// Convenience aliases.
var createServer = require('http').createServer, parse = require('url').parse, path = require('path'), fs = require('fs'), types,

// Matches control characters in URLs.
escapable = /[\x00-\x1f\x7f"'&?$\x20+,:;=@<>#%{}|\\\^~\[\]`]/g,

// Escape sequences and entities for control characters.
escapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&apos;'
};

fs.exists || (fs.exists = path.exists);

// The `servedir` function creates a new simple HTTP server.
var servedir = module.exports = function (routerPath, root, handler) {
  return function(req, res, next) {
    // Resolve the path to the requested file or folder.

    var end = res.end,
        writeHead = res.writeHead,
        statusCode;

    var pathname = decodeURIComponent(parse(req.url).pathname),
        file = path.join(root, pathname);

    console.log(pathname, file);

    if (pathname.indexOf(routerPath) !== 0) {
      console.log('exit');
      return next();
    }

    fs.exists(file, function(exists) {
      if (!exists) {
        next();
      } else {
        // Serve files and directories.
        fs.stat(file, function(err, stats) {
          if (err) {
            // Internal server error; avoid throwing an exception.
            next();
          } else if (stats.isFile()) {
            // Read and serve files.
            res.statusCode = 200;
            // Set the correct MIME type using the extension.
            var ext = path.extname(file).slice(1);
            res.setHeader('Content-Type', types[ext] || servedir.defaultType);

            var content = '';

            fs.createReadStream(file).on('error', function(err) {
              // Internal server error; avoid throwing an exception.
              next(new Error('An internal server error occurred: ' + err));
            }).on('data', function (chunk) {
              content += chunk;
            }).on('end', function () {
              res.end(handler(content));
            });
          } else {
            // Automatically append a trailing slash for directories.
            if (pathname.charAt(pathname.length - 1) != '/') pathname += '/';
            fs.readdir(file, function(err, files) {
              if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.write('An internal server error occurred: ' + err);
              } else {
                // Create a basic directory listing.
                files = files.map(function(name) {
                  // URL-encode the path to each file or directory.
                  return '<a href="' + (pathname + name).replace(escapable, function(match) {
                    // Cache escape sequences not already in the escapes hash.
                    return escapes[match] || (escapes[match] = '%' + match.charCodeAt(0).toString(16));
                  }) + '">' + name + '</a>';
                });
                // Add a link to the root directory.
                if (pathname != '/') files.unshift('<a href="..">..</a>');
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write('<!DOCTYPE html><meta charset=utf-8><title>[dir] ' + file + '</title><ul><li>' + files.join('<li>') + '</ul>');
              }
              res.end();
            });
          }
        });
      }
    });
  };
};

// The current version of `servedir`. Keep in sync with `package.json`.
servedir.version = '0.1.10';

// The default MIME type, root directory, and port.
servedir.defaultType = 'application/octet-stream';
servedir.defaultRoot = '.';
servedir.defaultPort = 8000;

// Common MIME types.
servedir.types = types = {
  'aiff': 'audio/x-aiff',
  'appcache': 'text/cache-manifest',
  'atom': 'application/atom+xml',
  'bmp': 'image/bmp',
  'crx': 'application/x-chrome-extension',
  'css': 'text/css',
  'eot': 'application/vnd.ms-fontobject',
  'gif': 'image/gif',
  'htc': 'text/x-component',
  'html': 'text/html',
  'ico': 'image/vnd.microsoft.icon',
  'ics': 'text/calendar',
  'jpeg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'mathml': 'application/mathml+xml',
  'midi': 'audio/midi',
  'mov': 'video/quicktime',
  'mp3': 'audio/mpeg',
  'mp4': 'video/mp4',
  'mpeg': 'video/mpeg',
  'ogg': 'video/ogg',
  'otf': 'font/opentype',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'rtf': 'application/rtf',
  'sh': 'application/x-sh',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tar': 'application/x-tar',
  'tiff': 'image/tiff',
  'ttf': 'font/truetype',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'webm': 'video/webm',
  'webp': 'image/webp',
  'woff': 'font/woff',
  'xhtml': 'application/xhtml+xml',
  'xml': 'text/xml',
  'xsl': 'application/xml',
  'xslt': 'application/xslt+xml',
  'zip': 'application/zip'
};

// MIME type aliases for different extensions.
types.aif = types.aiff;
types.htm = types.html;
types.jpe = types.jpg = types.jpeg;
types.jsonp = types.js;
types.manifest = types.appcache;
types.markdown = types.markdn = types.mdown = types.mdml = types.md = types.txt;
types.mid = types.midi;
types.mpg = types.mpeg;
types.ogv = types.ogg;
types.rb = types.txt;
types.svgz = types.svg;
types.tif = types.tiff;
types.xht = types.xhtml;
types.php = types.html;