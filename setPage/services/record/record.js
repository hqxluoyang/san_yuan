import tools from  '../tools'
import Config from '../config.js'
import upload from '../upload.js'

export default {

	setThis (self) {
		this.vm = self;
		this.current="/music";
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
		if(r.path != '/record') return;
	//	mvd.routeChangeS(r.path , this.vm);
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
	
	upload (files) {
		
		const up =  new upload();
		up.uploadFile(files.data , this.vm , "carme")
	},
	
	regBus (bus) {
		bus.on("upload" , this.upload.bind(this))
		bus.on("router" , this.onRouter.bind(this))
	}
}