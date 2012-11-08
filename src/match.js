var interpolate = require('util').format,
    gsubdomain = require('subdomain.js'),
    regex = require('path-to-regexp'),
    waterfall = require('waterfall'),
    gdomain = require('domain.js'),
    clone = require('clone'),
    url = require('url')

var allmethods = new Array('get', 'put', 'post', 'delete')

var match = module.exports = function (req, nodes) {
  var origin = url.parse(interpolate('http://%s', req.headers.host))
  var attempts = Object.keys(match)
  var results = clone(nodes)
  var keys = new Array()
  var wf = waterfall()

  attempts.forEach(function (attempt) {
    if(keys.length === 1) return
    results = match[attempt](req, origin, results)
    keys = Object.keys(results)
  })

  return results[keys[Math.floor(Math.random()*keys.length)]]
}

match.domain = function (req, origin, nodes) {
  var undomained = new Object()
  var matched = new Object()
  var domain = gdomain(origin)

  Object.keys(nodes).forEach(function (name) {
    var node = nodes[name]
    if(node.domain === domain) matched[name] = node
    if(node.domain === '') undomained[name] = node
  })

  if(Object.keys(matched).length > 0) return matched
  else return undomained
}

match.subdomain = function (req, origin, nodes) {
  var subdomain = gsubdomain(origin)
  var matched = new Object()

  Object.keys(nodes).forEach(function (name) {
    var node = nodes[name]
    if(node.subdomain === subdomain) matched[name] = node
  })

  return matched
}

match.route = function (req, origin, nodes) {
  var fallback = unrouted(nodes)
  var results = new Object()

  Object.keys(nodes).forEach(function (name) {
    var node = nodes[name]
    if(node.routes) Object.keys(node.routes).forEach(function (route) {
      var regexp = regex(route, new Array(), false, false)
      var pathname = url.parse(req.url).pathname
      var matchedroute = pathname.match(regexp)
      var methods = node.routes[route]
      if(!methods.length) methods = allmethods
      var matchmethod = methods.filter(function (method) {
        return method.toLowerCase() === req.method.toLowerCase()
      })

      if(matchmethod.length && matchedroute) results[name] = node
    })
  })

  if(Object.keys(results).length) return results
  else return fallback
}

var unrouted = function (nodes) {
  var results = new Object()

  Object.keys(nodes).forEach(function (name) {
    if(!nodes[name].routes) results[name] = nodes[name]
  })

  return results
}