var cheerio = require('cheerio')
,   fs      = require('fs')
,   path    = require('path')
,   $       = cheerio.load(fs.readFileSync(path.join(__dirname, 'test.html')))

require('./index')($._root)
console.log($.html())
