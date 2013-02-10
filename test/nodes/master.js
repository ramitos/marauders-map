if(process.env['MP_COV']) var seek = require('../../src-cov/map').map()
else var seek = require('../..').map()

require('fs').writeFile(__dirname + '/master.pid', process.pid)

var messages = new Object()

messages.seek = function (m) {
  process.send({channel: 'seek', node: seek(m.request), code: m.code})
}

messages.nodes = function () {
  process.send({channel: 'nodes', nodes: seek.nodes})
}

process.on('message', function (m) {
  messages[m.channel](m)
})