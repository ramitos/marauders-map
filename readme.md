# marauders map

## usage

###### random process

```js
var reveal = require('marauders-map').reveal,
    http = require('http')

var address = http.createServer(function (req, res) {
  res.end('hello from web')
}).listen().address()

reveal({
  name: 'web', //name of the service
  domain: 'lvh.me', //only accepts requests for the domain 'lvh.me'
  subdomain: 'www', //only accepts requests for the subdomain 'www'
  port: address.port,
  routes: {
    '/:method/:number': [], //accepts all methods for this route
    '/:method': ['put'] //only accepts PUT methods for this route
  }
})
```

###### main process

```js
var seek = require('marauders-map').map(),
    proxy = require('http-proxy'),
    request = require('request')

proxy.createServer(function (req, res, proxy) {
  var node = seek(req)

  proxy.proxyRequest(req, res, {
    host: 'localhost',
    port: node.port
  })
}).listen(1337)

request('http://www.lvh.me:1337/get/5', function (e, res, body) {
  assert(body === 'hello from web')
})
```

*[lvh.me](http://lvh.me) is a domain that points to your local virtual host. nslookup for [lvh.me](http://lvh.me) shows the address as 127.0.0.1* ([http://pivotallabs.com](http://pivotallabs.com/users/apeng/blog/articles/1891-standup-10-14-11-lvh-me))

*[node-proxy](https://github.com/nodejitsu/node-http-proxy) is a full-featured http proxy for node.js*

## install
```bash
npm install marauders-map
```

## test
```bash
npm test
```

## todo

 * improve documentation
 * write examples

## api

### map(port)

```js
var map = require('marauders-map').map(4546)
```

Returns a function to seek nodes

### reveal(node)

Node parameters:
 * `name` **required**
 * `port` *optional*
 * `domain` *optional*
 * `subdomain` *optional*
 * `routes` *optional*

### seek(http request)

Return a `node` if finds one

## interoperability

### [turnout](https://github.com/ramitos/turnout)

Only `turnout >= 0.0.5`

```js
var reveal = require('marauders-map').reveal,
    router = require('turnout')(),
    require('http')

var address = http.createServer(function (req, res) {
  router(req, res, function () {
    res.statusCode = 404
    res.end()
  })
}).listen().address()

router.post('/todo/:id', function (req, res, params, query) {})

router.put('/todo/:id/:state', function (req, res, params, query) {})

reveal({
  name: 'todo',
  port: address.port,
  routes: router.routes()
})
```

Even better, with [blage](https://github.com/ramitos/blage)

```js
var reveal = require('marauders-map').reveal,
    router = require('turnout')(),
    blage = require('blage'),
    require('http')

var address = http.createServer(blage(router)).listen().address()

router.post('/todo/:id', function (req, res, params, query) {})
router.put('/todo/:id/:state', function (req, res, params, query) {})

reveal({
  name: 'todo',
  port: address.port,
  routes: router.routes()
})
```

## examples

```json
[
  {
    "name": "a",
    "subdomain": "zmeyyjxusi",
    "port": 8147
  },
  {
    "name": "c",
    "subdomain": "zmeyyjxusi",
    "port": 6078,
    "routes": {
      "/:method/:number": [],
      "/:method": ["put"]
    }
  },
  {
    "name": "d",
    "port": 5237,
    "routes": {
      "/:method/:number": ["get", "post", "delete"],
      "/:method": ["put"]
    }
  },
  {
    "name": "e",
    "port": 3617,
    "routes": {
      "/": []
    }
  },
  {
    "name": "f",
    "port": 9508
  },
  {
    "name": "g",
    "domain": "llvm.me",
    "subdomain": "zmeyyjxusi",
    "port": 81471
  },
  {
    "name": "h",
    "domain": "llvm.me",
    "subdomain": "zmeyyjxusi",
    "port": 80471,
    "routes": {
      "/:method/:number": ["get", "post", "delete"],
      "/:method": ["put"]
    }
  },
  {
    "name": "l",
    "domain": "llvm.me",
    "port": 95081
  }
]
```

## license
MIT