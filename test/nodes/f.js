var nodes = require('../config/nodes.json')
var reveal = require('../..').reveal(nodes.f)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/f.pid', process.pid)