var creatlistObj = (id, musicname)=>{
	let title = ''
	if(musicname != undefined){
		if( musicname.length>13 ){
			for(let i = 0; i<=13;i++) title+=musicname[i]
			if(musicname.length>13) title+='...'
		}
		else if( musicname.length<13 ) title= musicname
	}
	return '<tr> <th scope="row" class="idcount">'+ id +
	'</th> <td class="musicname">' + title +'</td> <td class="cancel"> <button type="button" aria-label="Close" class="close" id="listclose"><span aria-hidden="true">×</span></button></td></tr>'
}

var updatelist = (playlist)=>{
	$('tbody tr').remove()
	$('tbody').each(()=>{
		let data = playlist.title
		let pos = playlist.currentposit
		let len = data.length
		let i = 0
		for(j = pos; j<len ;j++) $('tbody').append(creatlistObj(i++,data[j])) 
	})
}

var del =()=>{
	$('tbody').find('#listclose').each(function(){
		var self = this 
		$(self).click(()=>{
			var selecttarget = $(self).closest('tr')
			var id = selecttarget.find('.idcount').text()
			console.log("remove id : " + id)
			selecttarget.remove()
		})
	})
}

setInterval(()=>{ del() }, 2000)
