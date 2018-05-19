// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
var width = $( '.video' ).width();
var height = width*390/640;
$("#banner").css({"width": width, "height": height});
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: height,
		width: width,
		videoId: '',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo(); 
	player.setVolume(50)
}
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
		// setTimeout(stopVideo, 0);
		// done = true;
	}
	if( event.data == YT.PlayerState.ENDED ){
		if(playlist.currentposit == playlist.data.length)  playlist.novideo = true; 
		else playlist.novideo = false;
		if(!playlist.novideo){
			player.cueVideoById(playlist.data[playlist.currentposit++])
			player.playVideo();
			updatelist(playlist)
		}
		// console.log(playlist)
	}
	if( player.getPlayerState() == -1 ){
		// if(playlist.currentposit!=0) playlist.currentposit--;
		// playlist.novideo = true;
	}
}

let listensize = ()=>{
	width = $( '.video' ).width();
	height = width * 0.61;
	player.setSize(width,height);
	$("#banner").css({"width": width, "height": height});
}
let loadByID = (id)=>  player.loadVideoById(id) ;
let stopVideo = ()=> player.stopVideo();