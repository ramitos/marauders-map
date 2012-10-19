var async = require('async'),
    request = require('request'),
    assert = require('assert')

var requests = require('../config/requests.json')

var onRequest = function (request, callback) {
  this.map.seek(request, function (node) {
    assert(request.expected === node.port)
    callback()
  })
}

module.exports = function (helpers, callback) {
  async.forEach(requests, onRequest.bind(helpers), callback)
}