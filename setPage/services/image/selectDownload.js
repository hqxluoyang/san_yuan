import Config from '../config.js'

export default {
	getCssState (Albums) {
		if(!Albums) return null
		var len = 0;
		for(var i=0 ; i < Albums.length;i++){
			for(var j=0 ; j< Albums[i].css.length ; j++){
				if(Albums[i].css[j]) len++
			}
		}
		
		return len ;
	},
	
	getDownPath (Albums , files) {
		const arr=[];
		if(!Albums) return null
		
		for(var i=0 ; i < Albums.length;i++){
			for(var j=0 ; j< Albums[i].css.length ; j++){
				if(Albums[i].css[j]){
					let index = Albums[i].start + j ;
					arr.push(files[index].filepath);
				}
			}
		}
		
		return arr;
	},
	
	setCssSelect (albums) {
		const len= this.getCssState(albums)
		if(len > 0){
			Config.Runtime.eventBus.emit("showDown" , {len : len})
		}else{
			Config.Runtime.eventBus.emit("hideDown")
		}
	},
	
	clearCss (Albums) {
		if(!Albums) return null
		
		for(var i=0 ;i<Albums.length ; i++){
			Albums[i].css=[];
		}
	},
	
	download (Albums , files , data) {
		
		if(data){
			this.clearCss(Albums);
			return;
		}
		
		const arrPath= this.getDownPath(Albums , files)
		Config.Runtime.eventBus.emit("DL" , {data:arrPath});
		this.clearCss(Albums);
	}
}