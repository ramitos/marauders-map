var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.g)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/g.pid', process.pid)