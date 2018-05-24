$( document ).ready(function() {
  $(".form-control")[0].value = "https://www.youtube.com/watch?v=X3IVZgSVA1M"
	$(window).on('resize',listensize)
	$('.submusic').on('click',()=>{
    var videoquery = {
      "path": "/requestsong",
      "method": "get",
      "data": { "url": $(".form-control")[0].value }
    }
    ajaxfun( videoquery, playfun)
  })
  setInterval(()=>show(), 1000)

})

function playfun(id){
  playlist.push(id.vid)
  $(".form-control")[0].value = ""
  if( playlist.novideo ){
    player.cueVideoById(playlist.data[playlist.currentposit++])
    player.playVideo()
    playlist.novideo = false
  }
  updatelist(playlist)
}

let show = ()=>{
  let status = player.getPlayerState()
	if( status==-1 || status==0 ){
    $("#banner").css({"z-index": 0})
    $('#player').hide()
  }
  else {
    $("#banner").css({"z-index": -1})
    $('#player').show()
  }
}

