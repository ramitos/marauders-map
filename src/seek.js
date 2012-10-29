var match = require('./match'),
    axon = require('axon')

module.exports = function (port) {
  var sock = axon.socket('pull')
  var returns = new Object()
  var nodes = new Object()
  
  sock.bind(port)
  
  sock.on('message', function (node) {
    node = JSON.parse(node.toString())
    if(!node.subdomain) node.subdomain = ''
    if(!node.domain) node.domain = ''
    node.subdomain = node.subdomain.toLowerCase()
    node.domain = node.domain.toLowerCase()
    nodes[node.name] = node
  })
  
  returns.nodes = nodes
  returns.seek = function (req) {
    return match(req, nodes)
  }
  
  return returns
}