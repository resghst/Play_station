var socket = io.connect('ws://localhost:3001')

socket.on('date', function(updateplaylist) {
  console.log(updateplaylist)
  playlist = updateplaylist
  updatelist(playlist)
},1000);