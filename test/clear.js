var spawn = require('child_process').spawn,
    path = require('path'),
    fs = require('fs')

var pids = new Array()

fs.readdir(path.join(__dirname, 'nodes'), function (e, files) {
  files.forEach(function (file) {
    if(!file.match(/.pid$/)) return
    fs.readFile(path.join(__dirname, 'nodes', file), 'utf8', function (e, pid) {
      fs.unlink(path.join(__dirname, 'nodes', file))
      spawn('kill', ['-s', 'kill',  pid])
    })
  })
})