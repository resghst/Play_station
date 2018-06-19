var socket = io.connect('ws://localhost:3001')

socket.on('date', function(updateplaylist) {
  console.log("socket")
  console.log(updateplaylist)
  playlist = updateplaylist
  socketflag = true
  updatelist(playlist)
	if(!initflag && socketflag && playerflag) initvideo()
},1000);