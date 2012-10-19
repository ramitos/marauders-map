var async = require('async'),
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