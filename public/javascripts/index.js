$( document ).ready(function() {
	$(window).on('resize',listensize);
	$('.input-group-text').on('click',()=>{
		playlist.addvideo($(".form-control")[0].value);
    $(".form-control")[0].value = "";
    if( playlist.novideo){
      player.cueVideoById(playlist.data[playlist.currentposit]);
      player.playVideo();
      playlist.novideo = false;
      // console.log(playlist)
    }
  }); 
});

let show = ()=>{
  let status = player.getPlayerState();
	if( status==-1 || status==0 ){
		console.log('the list is null')
    $("#banner").css({"z-index": 0});
  }
  else $("#banner").css({"z-index": -1});
};
setInterval(()=>{ show(); }, 1000);