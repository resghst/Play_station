var express = require('express')
var router = express.Router()
var parse = require('url-parse')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/urlParser', function(req, res, next) {
  querydata =  JSON.parse(req.query.query)
  url = parse(querydata.url, true)
  console.log(url.query.v)
  res.json(url.query.v)
})

module.exports = router;
