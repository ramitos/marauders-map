var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.j)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/j.pid', process.pid)