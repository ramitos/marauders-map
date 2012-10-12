var regex = require('./regex'),
    async = require('async'),
    axon = require('axon')

module.exports = function (port) {
  var sock = axon.socket('pull')
  sock.bind(port)
  return new seek(sock)
}

var seek = function (sock) {
  this.sock = sock
  this.nodes = {}
  sock.on('message', function (node) {
    node = JSON.parse(node.toString())
    nodes[node.name] = node
  }.bind(this))
}

seek.prototype.seek = function (req, callback) {
  async.filter(toArray(nodes), function (node, callback) {
    check(req, node, callback)
  }, function (results) {
    var node = results.shift()
    if(!node) callback(null)
    else callback(node.port)
  })
}

var toArray = function (nodes) {
  var array = []

  Object.keys(nodes).forEach(function (node) {
    array.push(nodes[node])
  })

  return array
}

var check = function (req, node, callback) {
  if(node.domain) domain(req, node, callback)
  else route(req, node, callback)
}

var domain = function (req, node, callback) {
  if(req.headers.host.split('.').shift() === node.selector) callback(true)
  else callback(false)
}

var route = function (req, node, callback) {
  var matched = false

  node.routes.forEach(function (route) {
    if(req.url.match(regex(route, [], false, false))) matched = true
  })

  callback(matched)
}