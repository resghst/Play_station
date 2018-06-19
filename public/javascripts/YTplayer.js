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
	console.log("player on ready")
	playerflag = true
	if(!initflag && socketflag && playerflag) initvideo()
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
		// && playlist.currentposit != playlist.videoid.length-1 ){
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
		console.log(playobj)
		player.cueVideoById(playobj)
		player.playVideo();
		updatelist(playlist)
	}
	if( event.data == YT.PlayerState.unstarted  ){
	// && playlist.currentposit != playlist.videoid.length-1){
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
		console.log(playobj)
		player.cueVideoById(playobj)
		player.playVideo();
		updatelist(playlist)
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

function playingmoniter(player){
	if( player.getPlayerState() == -1){
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
		console.log(playobj)
		player.cueVideoById(playobj)
		player.playVideo();
		updatelist(playlist)
	}
}

function initvideo(){
	console.log('initvideo')
	console.log(socketflag + "\t" + playerflag + "\t" + initflag)
	initflag=true
	let ctime = moment(playlist.ctime)
	let btime = moment(playlist.btime)
	let p = playlist.currentposit
	let v = playlist.videotime[p]
	let t = parseInt(v[0])*60 + parseInt(v[1])
	duration = moment.duration(btime.diff(ctime))
	t = t-duration._milliseconds/1000
	if( t<0 ) t = 0
	// let btime = playlist.btime.split(/:| /)
	// basetime = parseInt(btime[5])*60 + parseInt(btime[6])
	// ntime = new Date().toString().split(/:| /)
	// nowtime = parseInt(ntime[5])*60 + parseInt(ntime[6])
	let playobj={
		'videoId': playlist.videoid[playlist.currentposit],
		'startSeconds': t
	}
	console.log(playobj)
	player.cueVideoById(playobj)
	player.playVideo()
	// event.target.playVideo(); 
	player.setVolume(50)
}

setInterval(()=> playingmoniter(player), 1000)