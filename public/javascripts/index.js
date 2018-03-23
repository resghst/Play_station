$( document ).ready(function() {
	$(window).on('resize',listensize);
	$('.submusic').on('click',()=>{
		playlist.addvideo($(".form-control")[0].value);
    $(".form-control")[0].value = "";
    if( playlist.novideo){
      player.cueVideoById(playlist.data[playlist.currentposit]);
      player.playVideo();
      playlist.novideo = false;
      // console.log(playlist)
    }
  }); 

	$('.addmusic').on('click',()=>{
    $('#aa').on('shown.bs.modal',()=>{
      // $('#myInput').trigger('focus')
    })
  })
  
  $('.modal-header .close').on('click', ()=>{
    $('#addLabel').on('hidden.bs.modal',()=>{
      // $('#addLabel').modal('hide')
    })

  })

});

let show = ()=>{
  let status = player.getPlayerState();
	if( status==-1 || status==0 ){
		console.log('the list is null')
    $("#banner").css({"z-index": 0});
    $('#player').hide();
  }
  else {
    $("#banner").css({"z-index": -1});
    $('#player').show();
  }
};
setInterval(()=>{ show(); }, 1000);