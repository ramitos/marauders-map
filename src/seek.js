var lighthouse = require('./lighthouse'),
    match = require('./match')

module.exports = function () {
  var farol = lighthouse()
  var nodes = new Object()
  
  farol.on('node', function (node) {
    if(!node.name) return
    if(!node.subdomain) node.subdomain = ''
    if(!node.domain) node.domain = ''
    node.subdomain = node.subdomain.toLowerCase()
    node.domain = node.domain.toLowerCase()
    nodes[node.name] = node
  })
  
  farol.on('!node', function (name) {
    delete nodes[name]
  })
  
  var returns = function (req) {
    return match(req, nodes)
  }
  
  returns.nodes = nodes
  return returns
}