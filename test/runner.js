var requests = require('./config/requests.json')
var ports = require('./config/ports.json')
var nodes = require('./config/nodes.json')

var seek = require('../').map(ports.map).seek,
    assert = require('chai').assert,
    reveal = require('../').reveal,
    crypto = require('crypto')

before(function (done) {
  nodes.forEach(function (node) {
    reveal(ports.map, node)
  })
  
  setTimeout(done, 75)
})


suite('requests')

requests.forEach(function (request) {
  test(crypto.createHash('md5').update(JSON.stringify(request)).digest('hex'), function () {
    assert(request.expected === seek(request).port)
  })
})



//
// suite('Array');
//
// test('#length', function(){
//   var arr = [1,2,3];
//   ok(arr.length == 3);
// });
//
// test('#indexOf()', function(){
//   var arr = [1,2,3];
//   ok(arr.indexOf(1) == 0);
//   ok(arr.indexOf(2) == 1);
//   ok(arr.indexOf(3) == 2);
// });
//
// suite('String');
//
// test('#length', function(){
//   ok('foo'.length == 3);
// });
//
//
// var mocha = require('mocha')
//
// console.log(mocha);