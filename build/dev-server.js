var axios = require('axios')

require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var apiRouter = express.Router()

apiRouter.get('/bookCityInfo', function (req, res) {
  axios.get('http://dushu.xiaomi.com/hs/v3/channel/418').then((data) => {
    res.json(data.data)
  })
})

apiRouter.get('/getCommendBook', function (req, res) {
  axios.get('http://api.zhuishushenqi.com/ranking/54d42d92321052167dfb75e3').then((data) => {
    res.json(data.data.ranking.books)
  })
})

apiRouter.get('/shelfInfo', function (req, res) {
  axios.get('http://dushu.xiaomi.com/store/v0/fiction/id_list', {
    params: {
      ids: req.query.ids,
      owner: req.query.owner
    }
  }).then((data) => {
    res.json(data.data)
  })
})

apiRouter.get('/getBookInfo/:book_id', function (req, res) {
  axios.get('http://api.zhuishushenqi.com/book/' + req.params.book_id).then((data) => {
    res.json(data.data)
  })
})

apiRouter.get('/getBookSource/:book_id', function (req, res) {
  axios.get('http://api.zhuishushenqi.com/toc', {
    params: {
      view: 'summary',
      book: req.params.book_id
    }
  }).then((data) => {
    res.json(data.data)
  })
})

apiRouter.get('/getChapter/:book_source_id', function (req, res) {
  axios.get('http://api.zhuishushenqi.com/toc/' + req.params.book_source_id, {
    params: {
      view: 'chapters'
    }
  }).then((data) => {
    res.json(data.data.chapters)
  })
})

apiRouter.get('/getChapterContent', function (req, res) {
  axios.get('http://chapter2.zhuishushenqi.com/chapter/' + req.query.link).then((data) => {
    res.json(data.data)
  })
})

apiRouter.get('/getCategory',function(req,res){
  axios.get('http://api.zhuishushenqi.com/cats/lv2/statistics').then((data)=>{
    res.json(data.data)
  })
})

apiRouter.get('/getCategoryDetail',function(req,res){
  axios.get('http://35.189.165.140:3000/cats/lv2').then((data)=>{
    res.json(data.data)
  })
})

apiRouter.get('/getCategoryBookInfo', function (req, res) {
  axios.get('https://api.zhuishushenqi.com/book/by-categories', {
    params: {
      gender: req.query.gender,
      type: req.query.type,
      major: req.query.major,
      minor: req.query.minor,
      start: req.query.start,
      limit: req.query.limit
    }
  }).then((data) => {
    res.json(data.data)
  })
})

apiRouter.get('/getSearchData',function(req,res){
  axios.get('http://api05iye5.zhuishushenqi.com/book/auto-complete',{
    params:{
      query : req.query.query
    }
  }).then((data)=>{
    res.json(data.data)
  })
})

apiRouter.get('/getSearchBookList',function(req,res){
  axios.get('http://api05iye5.zhuishushenqi.com/book/fuzzy-search',{
    params:{
      query : req.query.query
    }
  }).then((data)=>{
    res.json(data.data)
  })
})

app.use('/api', apiRouter)




var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
