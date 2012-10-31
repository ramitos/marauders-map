var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.c)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/c.pid', process.pid)