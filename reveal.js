var axon = require('axon')

module.exports = function (port, node) {
  sock = axon.socket('push')
  sock.connect(port)
  process.nextTick(function () {
    sock.send(JSON.stringify(node))
    sock.close()
  })
}