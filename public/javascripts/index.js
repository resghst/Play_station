$( document ).ready(function() {
	$(window).on('resize',listensize)
	$('.submusic').on('click',()=>{
    var videoquery = {
      "path": "/urlParser",
      "method": "get",
      "data": {
        "url": $(".form-control")[0].value
      }
    }
    ajaxfun( videoquery, playfun)
  })

})

let playfun =  (id)=>{
  console.log(id)
  playlist.push(id)
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
setInterval(()=>{ show() }, 1000)