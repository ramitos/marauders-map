var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.e)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/e.pid', process.pid)