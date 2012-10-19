/* Based on TJ Holowaychuk's should.js: https://github.com/visionmedia/should.js
 * =============================================================================
 * 
 * (The MIT License)
 * 
 * Copyright (c) 2010-2011 TJ Holowaychuk <tj@vision-media.ca> 
 * Copyright (c) 2011 Aseem Kishore <aseem.kishore@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the 'Software'), to deal 
 * in the Software without restriction, including without limitation the rights 
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
 * SOFTWARE.
 */
 
module.exports.keys = function () {
  var obj = Array.prototype.shift.call(arguments)
  var ok = false
  var keys = []
  
  if(arguments[0] instanceof Array) keys = arguments[0]
  else keys = Array.prototype.slice.call(arguments)
  
  ok = Object.keys(obj).every(function (key) {
    return keys.indexOf(key) >= 0
  })
  
  
  return ok && keys.every(function (key) {
    return obj.hasOwnProperty(key)
  })
}