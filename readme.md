# marauders map

![](http://f.cl.ly/items/3g1Y1y0u3O380c0k3v3U/1350616949_map_location.png)

## usage
```js
var map = require('marauders-map').map(4546)
var reveal = require('marauders-map').reveal

reveal(4546, {
  name: 'web',
  subdomain: 'web',
  routes: [
    '/:method/:id': ['get', 'post', 'delete'],
    '/:method': ['put']
  ],
  port: 6078
})

map.seek({
  headers: {host: 'web.lvh.me'},
  method: 'GET',
  url: '/get/5'
}, function (node) {
  assert(node.port === 6078)
})
```

## install
```bash
npm install marauders-map
```

## test [![Build Status](https://secure.travis-ci.org/ramitos/marauders-map.png)](http://travis-ci.org/ramitos/marauders-map)
```bash
npm test
```

## api

### map(port)
This will start a tcp server that will listen to `reveal` announcements

```js
var map = require('marauders-map').map(4546)
```

Returns a map instance that contains the `seek` function

### reveal(port, node)
`port`: the port to announce the node. It needs to be the same port used in the map function

```js
reveal(4546, {
  name: 'web',
  subdomain: 'web',
  routes: [
    '/:method/:id': ['get', 'post', 'delete'],
    '/:method': ['put']
  ],
  port: 6078
})
```

Node parameters:
 * `name` (**required**) the name is completely irrelevant. It's only used to map the various nodes and to avoid repeated nodes. This means that you can announce the same node multiple times with differente configurations that the mapping will adjust
 * `port` (**required**) the port were this port is listening
 * `subdomain`(*optional*) This node will only be considered when the request subdomain matches the defined subdomain. If not defined, only is considered with requests with no subdomain. *In the future the idea is to allow subdomain matching like `*.domain.com`*
 * `routes` (*optional*) This node will only be considered when the routes and the methods match. You can also define routes like `routes: ['/']` where all methods are considered
 * you can pass other parameters that you find usefull. The object is not modified.

### seek(http request, callback)
```js
map.seek({
  headers: {host: 'web.lvh.me'},
  method: 'GET',
  url: '/get/5'
}, function (node) {
  assert(node.port === 6078)
})
```

## license
    Copyright (C) 2012 Sérgio Ramos <mail@sergioramos.me>

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
    documentation files (the "Software"), to deal in the Software without restriction, including without limitation the 
    rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit 
    persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the 
    Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
    WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
    OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.