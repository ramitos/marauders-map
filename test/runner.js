var requests = require('./config/requests.json'),
    nodes = require('./config/nodes.json'),
    crypto = require('crypto')

var processes = new Object()
var messages = new Object()
var seeks = new Object()
var anns = new Object()
var random = null
var master = null

var child_process = require('child_process'),
    interpolate = require('util').format,
    assert = require('chai').assert,
    crypto = require('crypto')

before(function (done) {
  processes['master'] = child_process.fork(interpolate('%s/nodes/%s.js', __dirname, 'master'))
  master = processes['master']
  
  Object.keys(nodes).forEach(function (node) {
    processes[node] = child_process.fork(interpolate('%s/nodes/%s.js', __dirname, node))
  })
  
  messages.nodes = function (m) {
    anns = m.nodes
  }
  
  master.on('message', function (m) {
    messages[m.channel](m)
  })
    
  var it = setInterval(function () {
    if(Object.keys(anns).length >= 12) clear()
    else master.send({channel: 'nodes'})
  }, 1000)
  
  var tm = setTimeout(function () {
    Object.keys(processes).forEach(function (process) {
      if(process[process]) process[process].exit()
    })
  
    throw new Error('the lighthouse hasn\'t received enough nodes')
  }, 50000)
  
  var clear = function () {
    clearTimeout(tm)
    clearInterval(it)
    done()
  }
})

suite('announcement')

Object.keys(nodes).forEach(function (node) {
  test(interpolate('node %s', node), function () {
    Object.keys(nodes[node]).forEach(function (prop) {
      if(prop ==='routes') return
      assert.propertyVal(anns[node], prop, nodes[node][prop])
    })

    if(!nodes[node].routes) return

    Object.keys(nodes[node].routes).forEach(function (route) {
      assert.property(anns[node].routes, route)
      assert.isArray(anns[node].routes[route])
      assert.lengthOf(anns[node].routes[route], nodes[node].routes[route].length)

      nodes[node].routes[route].forEach(function (method) {
        assert.include(anns[node].routes[route], method)
      })
    })
  })
})

suite('matching')

before(function (done) {
  var length = requests.length
  var received = 0

  messages.seek = function (m) {
    seeks[m.code] = m.node
    received += 1
    if(received === length) done()
  }

  requests.forEach(function (request) {
    var code = crypto.createHash('md5').update(JSON.stringify(request)).digest('hex')
    seeks[code] = new Object()

    master.send({
      code: code,
      request: request,
      channel: 'seek'
    })
  })
})

requests.forEach(function (request) {
  var code = crypto.createHash('md5').update(JSON.stringify(request)).digest('hex')

  test(interpolate('%s %s%s', request.method, request.headers.host, request.url), function () {
    assert.strictEqual(request.expected, seeks[code].port)
  })
})

suite('reacting')

test('kill and relanuch a random node', function (done) {
  var keys = Object.keys(anns)
  var random = keys[Math.floor(Math.random()*keys.length)]
  processes[random].kill()

  setTimeout(function () {
    master.send({channel: 'nodes'})
    setTimeout(function () {
      assert.notProperty(anns, random)
      processes[random] = child_process.fork(interpolate('%s/nodes/%s.js', __dirname, random))
      setTimeout(function () {
        master.send({channel: 'nodes'})
        setTimeout(function () {
          assert.property(anns, random)
          done()
        }, 1000)
      }, 20000)
    }, 1000)
  }, 2000)
})


test('kill master and relaunch it', function (done) {
  master.kill()
  
  var relaunched = function () {
    Object.keys(nodes).forEach(function (node) {
      Object.keys(nodes[node]).forEach(function (prop) {
        if(prop ==='routes') return
        assert.propertyVal(anns[node], prop, nodes[node][prop])
      })
      
      if(!nodes[node].routes) return
      
      Object.keys(nodes[node].routes).forEach(function (route) {
        assert.property(anns[node].routes, route)
        assert.isArray(anns[node].routes[route])
        assert.lengthOf(anns[node].routes[route], nodes[node].routes[route].length)
      
        nodes[node].routes[route].forEach(function (method) {
          assert.include(anns[node].routes[route], method)
        })
      })
    })
    
    done()
  }

  setTimeout(function () {
    anns = new Object()
    processes['master'] = child_process.fork(interpolate('%s/nodes/%s.js', __dirname, 'master'))
    master = processes['master']
    master.on('message', function (m) {
      messages[m.channel](m)
    })
    setTimeout(function () {
      master.send({channel: 'nodes'})
      setTimeout(relaunched, 1500)
    }, 7000)
  }, 2000)
})