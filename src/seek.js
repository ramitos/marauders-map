var toArray = require('./utils/toarray'),
    match = require('./utils/match'),
    regex = require('./utils/regex'),
    async = require('async'),
    axon = require('axon')

module.exports = function (port) {
  var sock = axon.socket('pull')
  sock.bind(port)
  return new seek(sock)
}

var seek = function (sock) {
  this.anodes = []
  this.sock = sock
  this.nodes = {}

  sock.on('message', function (node) {
    node = JSON.parse(node.toString())
    if(!node.subdomain) node.subdomain = ""
    this.nodes[node.name] = node
    delete this.nodes[node.name].name
    this.anodes = toArray(this.nodes)
  }.bind(this))
}

seek.prototype.seek = function (req, callback) {
  var self = this
  
  match.subdomain(req, self.anodes, function (node) {
    if(node) callback(node)
    else match.route(req, self.anodes, callback)
  })
}