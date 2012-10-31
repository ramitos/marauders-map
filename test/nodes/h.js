var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.h)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/h.pid', process.pid)