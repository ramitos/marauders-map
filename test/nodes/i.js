if(process.env['MP_COV']) var reveal = require('../../src-cov/reveal')
else var reveal = require('../..').reveal

var nodes = require('../config/nodes.json')
reveal(nodes.i)

setInterval(function () {}, 100000000)

require('fs').writeFile(__dirname + '/i.pid', process.pid)