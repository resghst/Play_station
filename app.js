var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var moment = require('moment');
var _ = require('lodash')

var index = require('./routes/index');
var users = require('./routes/users');

let filepath  = './playlist/playlist.json'
var app = express();
var ctime = new Date()

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  // let filepath  = './playlist/playlist.json'
  let initplaylist ={
    "title": [],
    "preimg": [],
    "videoid": [],
    "videotime": [],
    "currentposit": 0,
    "novideo": false,
    "ctime": "2018-05-24T14:44:28.092Z",
    "btime": ""
  }
  fs.readFile( filepath , 'utf8', function (err, buffer) { 
    if(Object.keys(buffer).length === 0) fs.writeFile( filepath , JSON.stringify(initplaylist), 'utf8')
  })
  io.on('connection', function(socket) {
    setInterval(function() {
      // fs.readFileSync( filepath , 'utf8', function(err, buffer){  initplaylist = JSON.parse(buffer) })
      fs.exists(filepath, function(exists) {
        if (exists){ 
          fs.stat(filepath, function(error, stats) {
            fs.open(filepath, "r", function(error, fd) {
              var buffer = new Buffer(stats.size)
              fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
                var data = buffer.toString("utf8", 0, buffer.length)
                let initplaylist = JSON.parse(data)
                socket.emit('date', initplaylist);
                fs.close(fd)
              })
            })
          })
        }
      })
    }, 3000);
  })
  socket.on("disconnect", () => {
    console.log("a user go out");
  });

});
server.listen(3001);

setInterval(function() {
  fs.readFile( filepath , 'utf8', function (err, buffer) { 
    initplaylist = JSON.parse(buffer)
    var videotime = initplaylist.videotime
    var currentposit = initplaylist.currentposit
    var ctime = moment(new Date())
    var btime = moment(initplaylist.btime)
    let testvalue = videotime.length-1-currentposit
    
    console.log('testvalue\t'+testvalue)
    console.log(btime.format())
    let p = currentposit
    let v = videotime[p]
    let t = parseInt(v[0])*60 + parseInt(v[1])
    console.log("t="+t)
    var duration = moment.duration(btime.diff(ctime))
    let ool= t-duration._milliseconds/1000
    console.log("in video "+currentposit+"  time is " + ool)
    console.log(initplaylist)

    if( testvalue >= 2){
      nowduration = moment.duration({
        minutes: videotime[currentposit+1][0],
        second: videotime[currentposit+1][1]
      })
      nextduration = moment.duration({
        minutes: videotime[currentposit+2][0],
        second: videotime[currentposit+2][1]
      })
      if( moment(ctime).isAfter(btime.subtract(1,'second')) ){
        console.log('swap ==!!!== ')
        console.log(btime)
        initplaylist.btime = btime.add(nowduration)
        console.log(initplaylist.btime)
        initplaylist.currentposit++
        timecount =  _.cloneDeep(ctime)
        initplaylist.nbtime = timecount.add(nextduration)
      }
    }
    // else if( testvalue == 1){
    //   nowduration = moment.duration({
    //     minutes: videotime[currentposit+1][0],
    //     second: videotime[currentposit+1][1]+1
    //   })
    //   if( moment(ctime).isAfter(btime.subtract(1,'second')) ){
    //     console.log('before\t'+initplaylist.btime)
    //     initplaylist.btime = btime.add(nowduration)
    //     console.log('after\t'+initplaylist.btime)
    //     initplaylist.currentposit++
    //     timecount = ctime
    //     // initplaylist.nbtime = ""//timecount.add(nowduration)
    //   }
    // }
    initplaylist.ctime = ctime
    fs.writeFile( filepath , JSON.stringify(initplaylist), 'utf8')
  })
}, 2000)



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
