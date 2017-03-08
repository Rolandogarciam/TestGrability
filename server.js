const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const compression = require('compression')
const serialize = require('serialize-javascript')
const resolve = file => path.resolve(__dirname, file)

const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

const app = express()

 /* serves main page */
 app.get("/", function(req, res) {
    res.sendfile('index.html')
 });

 /* serves all the static files */
 app.get(/^(.+)$/, function(req, res){ 
     console.log('static file request : ' + req.params);
     res.sendfile( __dirname + req.params[0]); 
 });

app.use(compression({ threshold: 0 }))
app.use(favicon('./static/img/grability-logo.png'))

app.get('*', (req, res) => {

  res.setHeader("Content-Type", "text/html")
  res.setHeader("Server", serverInfo)

  var s = Date.now()
  const context = { url: req.url }
  const renderStream = renderer.renderToStream(context)
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})