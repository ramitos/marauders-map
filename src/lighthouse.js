var json = require('./utils').json,
    dgram = require('dgram'),
    mdns = require('mdns')

module.exports = function () {
  return new lighthouse()
}

var lighthouse = function () {
  var browser = mdns.createBrowser(mdns.udp('marauders'))
  var server = dgram.createSocket('udp4')
  var self = this
  
  server.on('message', function (msg, rinfo) {
    json.parse(msg.toString(), function (e, node) {
      if(node) self.emit('node', node)
    })
  })
  
  server.on('listening', function () {
    process.nextTick(announce(server.address().port))
  })
  
  browser.on('serviceDown', function (service) {
    self.emit('!node', service.name)
  })
  
  browser.start()
  server.bind()
}

require('util').inherits(lighthouse, require('events').EventEmitter)

/*********************************** PRIVATE **********************************/

var announce = function (port) {
  return function () {
    mdns.createAdvertisement(mdns.udp('marauders'), port, {
      name: 'O000fê$YòwpÎ'
    }).start()
  }
}