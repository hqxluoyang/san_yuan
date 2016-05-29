import tools from  '../tools'
import Config from '../config.js'
import download from '../download.js'
import mvd from '../mvd.js'
import scroll from '../scroll.js'

export default {

	setThis (self) {
		this.vm = self;
		this.current="/music";
	},
	
	getMusicList () {
		var m = {};
		m.type = 'requestFileList';
		m.data = 'music';
		tools.sendMsgToChannel(m);
	},
	
	containerHeight () {
		const self = this.vm
		//self.h = 500
		tools.setContainer(Config.marginTop , self);
	},
	
	onFileurl (data) {
	
	},
	
	setSize (files) {
		for(var i=0 ;i<files.length ; i++){
			let size = files[i].size;
			files[i]['size'] = ((size/1024)/1024).toFixed(2) + "MB"
		}
	},
	
	loadList (files) {
		
		let self = this.vm;
		this.files = files;
		//this.setSize(files);
		this.currentLen = 0;
		this.setMusicDiv();
		//self.musicList = files;
		
	},
	
	setSelect (index) {
		mvd.setSelect(this.vm.selectCss , index)
	},
	
	musicList (data) {
		if(data.fileType == 'music'){
			this.loadList(data.files);
			tools.closeLoading(this.vm.show);
		}
	},
	
	onDownLoad (clearData) {
		if(Config.Runtime.current != this.current) return
		mvd.DL(this.vm , this.files , clearData);
	},
	
	onRouter (r) {
		if(r.path != '/music') return;
		mvd.routeChangeS(r.path , this.vm);
	},
	
	setMusicDiv () {
        
		var data = this.getData(this.files);
		
		if(data.length > 0)
		this.loadMusicPart(data);
	},
	
	loadMusicPart (data) {
		let self = this.vm;
	//	console.log("music data:" , data)
		this.setSize(data);
		var data = self.musicList.concat(data);
		self.musicList=data;
	},
	
	getData (files) {
		const currentLen = this.currentLen;
		var arr = files.slice(currentLen , currentLen + 30);
		this.currentLen = currentLen + arr.length;
		return arr;
	},
	
	scrollAddMusic (id) {
		scroll.bottomEvent(id , this.setMusicDiv.bind(this))
	},

	textedit (data) {
		var self = this.vm;
		if(self){
			self.text = data.code
			document.getElementById("phonePanel").innerHTML = data.code
			console.log("data:" , data)
		}
	},

	getTemplate () {
		$.ajax({
	        	type:"GET",
	        	url:"template",
	        	dataType:'String',
	        	success:function(msg){
	        		console.log("getMsg:" , msg)
	        		document.getElementById("phonePanel").innerHTML = msg.responseText;
	        	},
	        	error:function(err){
	        		console.log("err:" , err.responseText)
	        		document.getElementById("phonePanel").innerHTML = err.responseText;
	        	},
	        	complete:function(d,textStatus,error){
	        		console.log("complete")
	        	}
	        })
	},
	
	regBus (bus) {

		bus.on("fileList" , this.musicList.bind(this))
		bus.on("fileurl", this.onFileurl.bind(this));
		bus.on("downLoad" , this.onDownLoad.bind(this))
		bus.on("router" , this.onRouter.bind(this))
		bus.on("textedit" , this.textedit.bind(this))
	}
}