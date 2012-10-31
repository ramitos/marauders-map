var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.l)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/l.pid', process.pid)