import tools from '../tools.js'
import download from '../download.js'
import Config from '../config.js'
import mvd from '../mvd.js'

export default {

	setThis (self) {
		this.vm = self;
		this.current = "/app";
	},

	
	getApkList () {
		var m = {};
		m.type = 'requestAPPList';
		m.data = 'app';
		tools.sendMsgToChannel(m);
	},
	
	containerHeight () {
		const self = this.vm
		tools.setContainer(Config.marginTop , self);
	},
	
	setApkWidth () {
		 const w = (tools.getPageWidth() - 5*10)/4;
		 const self = this.vm;
		 self.appw = w;
	},
	
	loadApp (files) {
		this.files = files ;
		this.hash = {};
		var path = [];
		for(var i=0 ; i< files.length ; i++){
			path[i] = files[i].icon;
			this.hash[files[i].icon] = i;
		}
		
		var m ={};
		m.type="requestFile";
		m.data = path;
		tools.sendMsgToChannel(m);
		
	},
	
	setChecked (index) {
		let self = this.vm;
		if(self.checked[index]){
			self.checked.$set(index  , "");
		}else{
			self.checked.$set(index  , "checkedApp");
		}
	},
	
	arrFindVal (arr) {
		var len = 0;
		for(var i=0 ; i<arr.length ; i++){
			if(arr[i]) len++;
		}
		
		return len;
	},
	
	showDow () {
		let self = this.vm ;
		let len = this.arrFindVal(self.checked);
		if(len > 0){
			Config.Runtime.eventBus.emit("showDown" , {len : len});
		}else{
			Config.Runtime.eventBus.emit("hideDown");
		}
	},
	
	getDownPath (index) {
		let self = this.vm ;
		console.log(self.applist[index].path , self.applist[index] , index)
		return self.applist[index].path ;
		
	},
	
	onDownLoad (clearData) {
		let self = this.vm;
		
		if(!self) return ;
		if(Config.Runtime.current != this.current) return
		
		if(clearData) {
			self.checked = [];
			return
		}
		const ddata = [];
		for(var i=0 ; i < self.checked.length ; i++){
			if(self.checked[i]){
				ddata.push(this.getDownPath(i))
			}
		}
		
		if(ddata.length <= 0) return
		download.download({
			data:ddata
		})
		self.checked = [];
	},
	
	download (obj , index) {
		let self = this.vm;
		
		this.setChecked(index);
		this.showDow();
	},
	
	apkList (data) {
		if(!this.vm) return
		if(data.fileType == 'app'){
			this.loadApp(data.files);
			this.vm.applist = data.files
			tools.closeLoading(this.vm.show);
		}
	},
	
	onFileurl (data) {
		var self = this.vm ;
		if(!self || data.url === undefined) return;
		var appIconPath = this.hash ? this.hash[data.path] : this.hash={};
		
		if(appIconPath != undefined){
			//self.imgPng.splice(appIconPath, 1, data.url);
			self.imgPng.$set(appIconPath , data.url);
			delete this.hash[data.path];
			
		}
		
	},
	
	onRouter (r) {
		if(r.path != '/app') return;
		mvd.routeChangeS(r.path , this.vm);
	},
	
	regBus (bus) {
		bus.on("appList" , this.apkList.bind(this))
		bus.on("fileurl", this.onFileurl.bind(this));
		bus.on("downLoad" , this.onDownLoad.bind(this));
		bus.on("router" , this.onRouter.bind(this))
	}
}