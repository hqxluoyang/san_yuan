
import download from './download.js'
import Config from './config.js'

export default {
	getDown (self , files , cssObj) {
		const arrPath = [];
		for(var  i=0 ; i<cssObj.data.length ; i++){
			if(cssObj.data[i]){
				arrPath.push(files[i]['path']);
			}
		}
		return arrPath
	},
	
	clearSelect (cssObj) {
		for(var i=0 ; i<cssObj.data.length ; i++){
			cssObj.data.$set(i , "");
		}
	},
	
	DL (vm , files , data) {
		if(!vm) return;
		var cssObj = vm.selectCss;
		
		if(data){
			this.clearSelect(cssObj);
			return;
		}
		const arr = this.getDown(vm , files , cssObj);
		download.download({
			data:arr
		})
		this.clearSelect(cssObj);
	},
	
	setSelect (cssObj , index) {

		if(cssObj.data[index]){
			cssObj.data.$set(index , "");
		}else{
			cssObj.data.$set(index , "selectCheck");
		}
		const len= this.getSeletcState(cssObj)
		if(len > 0){
			Config.Runtime.eventBus.emit("showDown" , {len:len});
		}else{
			Config.Runtime.eventBus.emit("hideDown");
		}
		
	},
	
	getSeletcState (cssObj) {
		var len = 0;
		for(var i=0 ;i<cssObj.data.length;i++){
			if(cssObj.data[i]){
				len++;
			}
		}
		return len;
	},
	
	/***router切换时css样式操作********/
	
	getLength (arrcss) {
		var  len = 0;
		for(var i=0 ; i< arrcss.length ; i++){
			if(arrcss[i]) len++
		}
		
		return len;
	},
	
	setVideo (vm) {
		const len = this.getLength(vm.selectCss.data);
		this.setDownStyle(len);
	},
	
	setMusic (vm) {
		const len = this.getLength(vm.selectCss.data);
		this.setDownStyle(len);
	},
	
	setApp (vm) {
		const len = this.getLength(vm.checked);
		this.setDownStyle(len);
	},
	
	setImage (vm) {
		const Albums = vm.Albums;
		var  Len = 0;
		for(var i=0 ;i<Albums.length ; i++){
			var length = this.getLength(Albums[i].css);
			Len = Len + length;
		}
		this.setDownStyle(Len);
	},
	
	setDownStyle (len) {
		console.log("setDownStyle:" , len);
		if(len > 0){
			Config.Runtime.eventBus.emit("showDown" , {len:len});
		}else{
			Config.Runtime.eventBus.emit("hideDown");
		}
	},
	
	routeChangeS (path , vm) {
		
		console.log("succ router:" , path , vm)
		
		if(!vm){
			Config.Runtime.eventBus.emit("hideDown");
			return
		}
		
		switch (path){
			case "/app":
				this.setApp(vm);
				break;
			case "/xender":
				Config.Runtime.eventBus.emit("hideDown");
				break;
			case "/image":
				this.setImage(vm);
				break;
			case "/video":
				this.setVideo(vm);
				break;
			case "/music":
				this.setMusic(vm);
				break;
			
		} 
	}
}