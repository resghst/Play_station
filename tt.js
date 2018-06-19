var fs = require("fs");
var fileName = "./playlist/playlist.json";

fs.exists(filepath, function(exists) {
  if (exists) {
    fs.stat(filepath, function(error, stats) {
      fs.open(filepath, "w+", function(error, fd) {
        var buffer = new Buffer(stats.size)
        fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
          var data = buffer.toString("utf8", 0, buffer.length)
          initplaylist = JSON.parse(data)
          console.log(initplaylist)
          fs.close(fd)
        })
      })
    })
  }
})