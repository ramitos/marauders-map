var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.i)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/i.pid', process.pid)