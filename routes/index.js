var express = require('express')
var router = express.Router()
var parse = require('url-parse')
var request = require('request')

var http = require("http").Server(express)
var url = require('url');
var fs = require('fs');
var io = require('socket.io')(http) // 加入 Socket.IO
let filepath  = './playlist/playlist.json'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/requestsong', function(req, res, next){
  console.log("get  /requestsong")
  querydata =  JSON.parse(req.query.query)
  url = parse(querydata.url, true)
  console.log(url.query.v)
  let vid = url.query.v
  let qurl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyBtEa9HR713jZlCOh4xHD74bKxKqCavOhE&id='
  qurl += vid
  request({
    url: qurl,
    mathod: "GET"
  }, 
  (e, r, b)=>{
    if( e || !b ){ return }
    let resjson = JSON.parse(b)
    let items = resjson.items
    let videoitem={}
    let playlist ={}
    items.forEach(element => {
      videoitem.title = element.snippet.title
      videoitem.image = element.snippet.thumbnails.default.url
      videoitem.vid = vid
    });
    fs.readFile( filepath , 'utf8', function(err, buffer){  
      playlist = JSON.parse(buffer)
      playlist.title.push(videoitem.title)
      playlist.preimg.push(videoitem.image)
      playlist.videoid.push(videoitem.vid)
      playlist.videotime = new Date()
      playlist.novideo = false
      fs.writeFile( filepath , JSON.stringify(playlist), 'utf8')
    }) 
    res.json(videoitem)
  })

})

router.get('/requestsonglist', function(req, res, next){
  
})

router.get('/urlParser', function(req, res, next) {
  querydata =  JSON.parse(req.query.query)
  url = parse(querydata.url, true)
  console.log(url.query.v)
  res.json(url.query.v)
})

module.exports = router;

