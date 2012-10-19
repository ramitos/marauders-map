var interpolate = require('util').format,
    regex = require('./regex'),
    async = require('async'),
    url = require('url'),
    uri = require('URIjs')

module.exports.subdomain = function (req, nodes, callback) {
  var subdomain = new uri(interpolate('http://%s', req.headers.host)).subdomain()
  var matches = new Array()
  var all = nodes.slice()
  
  nodes.forEach(function (node, i) {
    if(node.subdomain === subdomain) matches.push(node)
    else all.splice(i, 1)
  })
  
  if(matches.length === 1) callback(matches.shift())
  else module.exports.route(req, matches, callback)
}

module.exports.route = function (req, nodes, callback) {
  var fallback = unrouted(nodes)

  
  async.filter(nodes, function (node, callback) {
    var matched = false
    
    node.routes.forEach(function (route) {
      if(matched) return
      
      if(typeof route === 'string') {
        var regexp = regex(route, [], false, false)
        if(req.url.match(regexp)) matched = true
        return
      }
            
      var key = Object.keys(route).shift()
      var methods = route[key]
      var matchmethod = methods.filter(function (method) {
        return method.toLowerCase() === req.method.toLowerCase()
      })
      
      if(matchmethod.length === 0) return
      
      var regexp = regex(key, [], false, false)
      if(req.url.match(regexp)) matched = true
    })
    
    callback(matched)
  }, function (nodes) {
    if(nodes.length === 0) callback(fallback.shift())
    else callback(nodes.shift())
  })
}

var unrouted = function (nodes) {
  var returns = new Array()
  
  nodes.forEach(function (node, i) {
    if(!node.routes) returns.push(nodes.splice(i, 1).pop())
  })
  
  return returns
}