module.exports = function (nodes) {
  var array = []
  
  Object.keys(nodes).forEach(function (node) {
    array.push(nodes[node])
  })
  
  return array
}