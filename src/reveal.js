var addr = require('./utils').address,
    json = require('./utils').json,
    dgram = require('dgram'),
    mdns = require('mdns')

module.exports = function (node) {
  if(!node.name) return
  var browser = mdns.createBrowser(mdns.udp('marauders'))
  var server = dgram.createSocket('udp4')

  var announce = function (str, port, address) {
    var message = new Buffer(str)
    server.send(message, 0, message.length, port, address, function (e, bytes) {
      if(e) throw e
    })
  }

  browser.on('serviceUp', function (service) {
    if(service.name !== 'O000fê$YòwpÎ') return
    var address = addr(service)
    if(!address) return
    json.stringify(node, function (e, str) {
      if(e) throw e
      announce(str, service.port, address)
    })
  })
  
  var ad = mdns.createAdvertisement(mdns.udp('marauders'), node.port, {
    name: node.name
  })
  
  browser.start()
  ad.start()
}