var ports = require('../config/ports.json')
var nodes = require('../config/nodes.json')

var reveal = require('../..').reveal,
    utils = require('../utils'),
    assert = require('assert')
    

module.exports = function (helpers, callback) {
  var ok = false
  
  //ALL
  ok = utils.keys(helpers.map.nodes, 'd', 'f', 'e', 't', 'g', 'h')
  assert(ok)
  
  //D
  ok = utils.keys(helpers.map.nodes.d, 'subdomain', 'port')
  assert(ok)
  
  assert(helpers.map.nodes.d.subdomain === 'B0GXPEPtMJ')
  assert(helpers.map.nodes.d.port === 8147)
  
  //H
  ok = utils.keys(helpers.map.nodes.h, 'subdomain', 'port', 'routes')
  assert(ok)
  
  assert(helpers.map.nodes.h.subdomain === 'B0GXPEPtMJ')
  assert(helpers.map.nodes.h.routes.length === 2)
  assert(helpers.map.nodes.h.port === 8047)
  
  //F
  ok = utils.keys(helpers.map.nodes.f, 'subdomain', 'port', 'routes')
  assert(ok)
  
  assert(helpers.map.nodes.f.subdomain === 'zmeyyjxusi')
  assert(helpers.map.nodes.f.port === 6078)
  
  assert(helpers.map.nodes.f.routes.length === 2)
  
  //E
  ok = utils.keys(helpers.map.nodes.e, 'port', 'routes', 'subdomain')
  assert(ok)
  
  assert(helpers.map.nodes.e.port === 5237)
  
  assert(helpers.map.nodes.e.routes.length === 2)
  
  //T
  ok = utils.keys(helpers.map.nodes.t, 'port', 'routes', 'subdomain')
  assert(ok)
  
  assert(helpers.map.nodes.t.port === 3617)
  
  assert(helpers.map.nodes.t.routes.length === 1)
  
  //G
  assert(utils.keys(helpers.map.nodes.g, 'port', 'subdomain'))
  
  assert(helpers.map.nodes.g.port === 9508)
  
  callback()
}

module.exports.before = function (helpers, callback) {
  nodes.forEach(function (node) {
    reveal(ports.map, node)
  })
  setTimeout(callback, 100)
}