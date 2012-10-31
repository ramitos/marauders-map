var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.b)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/b.pid', process.pid)