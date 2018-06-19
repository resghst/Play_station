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
  $(".form-control")[0].value = ""
  if( playlist.novideo ){
    playlist.currentposit++
    let ctime = moment(playlist.ctime)
    let btime = moment(playlist.btime)
    let p = playlist.currentposit
    let v = playlist.videotime[p]
    let t = parseInt(v[0])*60 + parseInt(v[1])
    duration = moment.duration(btime.diff(ctime))
    t = t-duration._milliseconds/1000
    if( t<0 ) t = 0
    let playobj={
      'videoId': playlist.videoid[playlist.currentposit],
      'startSeconds': t
    }
		player.cueVideoById(playobj)
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

