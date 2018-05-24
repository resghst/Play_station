var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  let filepath  = './playlist/playlist.json'
  let initplaylist ={
    "title": [],
    "preimg": [],
    "videoid": [],
    'currentposit': 0,
    'novideo': true,
    'videotime': new Date(),
    'push': (id)=> playlist.data.push(id),
    'deletevideo': (id)=>	playlist.data.push(id)
  }
  fs.readFile( filepath , 'utf8', function (err, buffer) { 
    buffer = JSON.parse(buffer)
    if(Object.keys(buffer).length === 0) fs.writeFile( filepath , JSON.stringify(initplaylist), 'utf8')
  })
  io.on('connection', function(socket) {
    setInterval(function() {
      fs.readFile( filepath , 'utf8', function(err, buffer){  initplaylist = JSON.parse(buffer) })
      socket.emit('date', initplaylist);
    }, 3000);
  })
  socket.on("disconnect", () => {
    console.log("a user go out");
  });

});
server.listen(3001);

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
