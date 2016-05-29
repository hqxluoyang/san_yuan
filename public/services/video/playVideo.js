import tools from '../tools.js'

export default {
	onPlayVideo (obj) {
        this.hashList = {};
		this.hashList[obj.path] = 1;
		
		var m ={};
		m.type="requestFile";
		m.data = [obj.path];
		tools.sendMsgToChannel(m);
	},
	
	onFileurl (data) {
		if(!this.hashList) return
		var i = this.hashList[data.path];
		if(i == 1){
			delete this.hashList[data.path];
			this.playV(data.url);
		}
	},
	
	playV (url) {
		let self = this.vm;
		self.videoSrc = url;
		self.visible= true;
	},
	
	hideVideo () {
		let self = this.vm;
		self.videoSrc = '';
		self.visible = false;
	},
	
	setThis (self) {
		this.vm = self;
	},
	
	regBus (bus) {
		bus.on('playVideo' , this.onPlayVideo.bind(this))
		bus.on("hideVideo" , this.hideVideo.bind(this))
		bus.on("fileurl", this.onFileurl.bind(this));
	}
}