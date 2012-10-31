var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.a)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/a.pid', process.pid)