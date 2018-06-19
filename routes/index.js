var express = require('express')
var router = express.Router()
var parse = require('url-parse')
var request = require('request')

var url = require('url');
var fs = require('fs');
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
  playlist={}
  let vid = url.query.v

  var delay = function(s){
    return new Promise(function(resolve,reject){ setTimeout(resolve,s) })
  }
  delay()
  .then(function(){
    console.log('1')
    fs.readFile( filepath , 'utf8', function(err, buffer){ playlist = JSON.parse(buffer)  }) 
    return delay(2000)
  })
  .then(function(){
    console.log('2')
    console.log('oplaylist')
    console.log(playlist)
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
      items.forEach(element => {
        videoitem.title = element.snippet.title
        videoitem.image = element.snippet.thumbnails.default.url
        videoitem.vid = vid
      });
      playlist.title.push(videoitem.title)
      playlist.preimg.push(videoitem.image)
      playlist.videoid.push(videoitem.vid)
    }) 
    return  delay(2000)
  })
  .then(function(){
    console.log('3')
    let vtimequery = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&key=AIzaSyBtEa9HR713jZlCOh4xHD74bKxKqCavOhE&id='
    vtimequery += vid
    request({
      url: vtimequery,
      mathod: "GET"
    }, 
    (e, r, b)=>{
      if( e || !b ){ return }
      console.log(playlist)
      let resjson = JSON.parse(b)
      let timestring = resjson.items[0].contentDetails.duration
      divide = timestring.split(/PT|M|S/)
      timestring = [divide[1], divide[2]]
      playlist.videotime.push(timestring)
    }) 
    return  delay(2000)
  })
  .then(function(){
    console.log('4')
    playlist.ctime = new Date()
    if(playlist.btime=="" )playlist.btime = playlist.ctime
    playlist.novideo = false
    fs.writeFile( filepath , JSON.stringify(playlist), 'utf8')
    console.log('fplaylist')
    console.log(playlist)
    res.json(playlist)
  })
  .catch((e)=>{
    console.log(e)
  })


//=======================================================================================================================
  function funct1(){
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
      playlist.title.push(videoitem.title)
      playlist.preimg.push(videoitem.image)
      playlist.videoid.push(videoitem.vid)
    })
  }

//=======================================================================================================================
  function funct2(){
    let vtimequery = 'https://www.googleapis.com/youtube/v3/videos?part=contentDetails&key=AIzaSyBtEa9HR713jZlCOh4xHD74bKxKqCavOhE&id='
    vtimequery += vid
    request({
      url: vtimequery,
      mathod: "GET"
    }, 
    (e, r, b)=>{
      if( e || !b ){ return }
      let resjson = JSON.parse(b)
      let timestring = resjson.items[0].contentDetails.duration
      playlist.videotime.push(timestring)
      console.log(timestring)
    })
  }


  // playlist.videotime = new Date()
  // playlist.novideo = false
  // fs.writeFile( filepath , JSON.stringify(playlist), 'utf8')
  // res.json(videoitem)

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

