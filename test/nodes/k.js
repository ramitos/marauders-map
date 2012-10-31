var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.k)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/k.pid', process.pid)