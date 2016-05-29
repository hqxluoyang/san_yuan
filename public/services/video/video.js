import tools from  '../tools'
import Config from '../config.js'
import mvd from '../mvd.js'

export default {

	setThis (self) {
		this.vm = self;
		this.current = "/video";
	},
	
	getVideoList () {
		$.getJSON("list",function(result){
    		 
    	});
	},
	
	
	containerHeight () {
		const self = this.vm
		tools.setContainer(Config.marginTop , self);
	},
	
	onFileurl (data) {
		if(!this.hash){
			this.hash = {}
			return;
		}
		var i =  this.hash[data.path];
		
		if(i != undefined){
			delete this.hash[data.path];
			this.vm.imgPng.$set(i , data.url);
		}
	},
	
	setImgList (files) {
		this.hash = {};
		var path = [];
		for(var i=0 ; i< files.length ; i++){
			path[i] = files[i].posterpath;
			this.hash[files[i].posterpath] = i;
		}
		
		var m ={};
		m.type="requestFile";
		m.data = path;
		tools.sendMsgToChannel(m);
	},
	
	setName (files) {
		const arr=[];
		for(var i=0 ; i< files.length ; i++){
			let path = files[i]['path'];
			let str = path.substring(path.lastIndexOf('/')+ 1 , path.lastIndexOf('.'));
			arr.push(str);
		}
		this.vm.videoName = arr;
	},
	
	setSize (files){
		for(var i=0 ;i<files.length ; i++){
			let size = files[i].size;
			files[i]['size'] = ((size/1024)/1024).toFixed(2) + "MB"
		}
	},
	
	loadList (files) {
		let self = this.vm;
		
		this.files = files;
		
		this.setName(files);
		this.setSize(files);
		self.videoList = files;
		this.setImgList(files);
		
	},
	
	videoList (data) {
		if(data.fileType == 'video'){
			this.loadList(data.files)
			tools.closeLoading(this.vm.show);
		}
	},
	
	playStart (obj) {
		Config.Runtime.eventBus.emit("playVideo" , {path:obj['path']});
	},
	
	setSelect (index) {
		mvd.setSelect(this.vm.selectCss , index)
	},
	
	onDownLoad (clearData) {
		if(Config.Runtime.current != this.current) return
		mvd.DL(this.vm , this.files , clearData);
	},
	
	onRouter (r) {
		if(r.path != '/video') return;
		mvd.routeChangeS(r.path , this.vm);
	},
	
	regBus (bus) {

		bus.on("fileList" , this.videoList.bind(this))
		bus.on("fileurl", this.onFileurl.bind(this));
		bus.on("downLoad" , this.onDownLoad.bind(this))
		bus.on("router" , this.onRouter.bind(this))
	}
}