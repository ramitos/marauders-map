/********************************** ADDRESSES *********************************/

var interfaces = require('os').networkInterfaces()

var addresses = new Array()

Object.keys(interfaces).forEach(function (interface) {
  interfaces[interface].forEach(function (instance) {
    var address = instance.address
    if(!address) return;
    if(!address.match(/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/)) return;
    var index = addresses.indexOf(address)
    if(index > 0) return;
    addresses.push(address)
  })
})

module.exports.address = function (service) {
  var address = service.addresses.filter(function (address) {
    return addresses.indexOf(address) > 0
  })
  
  if(address.length < 1) return;
  return address.pop()
}


/************************************ JSON ************************************/

var json = module.exports.json = new Object()

json.parse = function (str, callback) {
  var err = null

  try {
    var parsed = JSON.parse(str)
  } catch (e) {
    err = e
  } finally {
    callback(err, parsed)
  }
}

json.stringify = function (obj, callback) {
  var err = null

  try {
    var str = JSON.stringify(obj)
  } catch (e) {
    err = e
  } finally {
    callback(err, str)
  }
}

/************************************* LOG ************************************/

// var interpolate = require('util').format
// var debug = require('debug')('client1')
// var log = new Object()
//
// var print = function (str) {
//   debug(str)
// }
//
// log.message = function (msg) {
//   print(interpolate('[message] upd server received message %s', msg.toString()))
// }
//
// log.reannouncing = function (msg) {
//   print(interpolate('[message] re-announcing node %s', msg.toString()))
// }
//
// log.address = function (address) {
//   print(interpolate('[serviceUp] service is up has address %s', address))
// }
//
// log.serviceUp = function (name) {
//   print(interpolate('[serviceUp] service is up with name %s', name))
// }
//
// log.announce = function (e, bytes) {
//   if(e) print(interpolate('node announcement failed %s', e))
//   else print(interpolate('node announcement successeful with size %s bytes', bytes))
// }
//
// log.listening = function (address) {
//   print(interpolate('marauders-map client listening at %s:%s', address.address, address.port))
// }
//
//
// /**
//  * Description
//  *
//  * @param {Type} name
//  * @return {Type}
//  * @api public
//  */
//
//
//
// var interpolate = require('util').format
// var debug = require('debug')('server')
// var log = new Object()
//
// var print = function (str) {
//   debug(str)
// }
//
// log.message = function (msg) {
//   print(interpolate('[message] upd server received message %s', msg.toString()))
// }
//
// log.fdecode = function (msg) {
//   print(interpolate('[message] failed to decode message %s', msg.toString()))
// }
//
//
// log.try = function (port, tries) {
//   print(interpolate('[server][message] port %s tried %s times', port, tries))
// }
//
// log.retry = function (port) {
//   print(interpolate('[server][message] port %s will retry ', rinfo.port))
// }
//
// log.resend = function (e, bytes) {
//   if(e) print(interpolate('[message] send retry %s', e))
//   else print(interpolate('[message] send retry successeful with size %s bytes', bytes))
// }
//
// log.listening = function (address) {
//   print(interpolate('marauders-map client listening at %s:%s', address.address, address.port))
// }