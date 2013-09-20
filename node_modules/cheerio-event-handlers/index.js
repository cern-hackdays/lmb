var fs = require('fs')
,   path = require('path')


module.exports = function purge (e) {
    // when we have an array purge it
    if ({}.toString.call(e).indexOf('Array') > 0) e.forEach(purge)
    
    // if we have attributes grab them and check for ones that start w/ 'on'
    if (e.attribs) {
        var keys = Object.keys(e.attribs)
        keys.forEach(function(k) {
            if (k.slice(0, 2) === 'on') e.attribs[k] = ''
        })
    }

    if (e.children) purge(e.children)
}

