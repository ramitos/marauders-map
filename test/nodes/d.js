var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.d)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/d.pid', process.pid)