import sendDown from './sendDown.js'
import tools from './tools.js'

export default {
	download (path) {
		const data = [];
		if(!path.data) return ;
		
		if(path.data.length==0) return ;
		for(var i=0 ; i< path['data'].length ; i++){
			var index = path['data'][i].indexOf("/cutimage/");
			
			if(index >=0){
				data.push(tools.cutImage(path['data'][i]));
			}else{
				data.push(path['data'][i]);
			}
			
		}
		
		for(var i=0 ; i<data.length ; i++){
			sendDown.downPath[data[i]] = true;
			sendDown.sendMsgServer(data[i]);
		}
		
	},
	
	onFileUrl (data) {
		var flag = sendDown.downPath ? sendDown.downPath[data.path] : sendDown.downPath={};
		if(flag){
			delete sendDown.downPath[data.path];
			
			if(data.url == 10000){
			}else if(data.url == 10001){
			}else{
				sendDown.downloadFile(data.url);
			}
		}
	},
	
	initBus (bus) {
		bus.on("fileurl", this.onFileUrl.bind(this));
		bus.on("zipFileurl", this.onFileUrl.bind(this));
		bus.on("DL" , this.download.bind(this))
	}
}