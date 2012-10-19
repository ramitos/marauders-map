var test = require('specced')(),
    http = require('http'),
    path = require('path')

var ports = require('./config/ports.json')

test.timeout = 10000

test.before = function (helpers, callback) {
  var onRequest = function (req, res) {
    helpers.req = {url: req.url, headers: {host: req.headers.host}}
    res.end()
  }
  
  http.createServer(onRequest).listen(ports.server)
  callback()
}

test.helpers = {
  map: require('../').map(ports.map)
}

test.specs = {
  reveal: require('./specs/reveal'),
  seek: require('./specs/seek')
}

test.run(function (e) {
  if(e) throw e
  console.log('something went wrong')
  process.kill()
}, function () {
  console.log('all tests passed')
  process.kill()
})