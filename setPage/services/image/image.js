import tools from '../tools.js'
import Album from './album.js'
import scroll from '../scroll.js'
import selectDownload from './selectDownload.js'
import Config from '../config.js'
import mvd from '../mvd.js'

export default {

	setThis (self) {
		this.vm = self;
		this.current = "/image";
	},
	
	getImageList () {
		var m = {};
		m.type = 'requestFileList';
		m.data = 'image';
		tools.sendMsgToChannel(m);
	},
	
	loadList (files) {
		if(files == undefined) return;
		const self = this.vm ;
		files.sort(function(o1,o2){
			if(o1.date_added === o2.date_added){
				return 0;
			}else if(o1.date_added > o2.date_added){
				return -1;
			}else{
				return 1;
			}
			
		});
		this.thum_img_hash = {};
		const albums = Album.createAlbums(files , "time" , "lan");
		Album.adjustWidth(albums, $("#imgtemplate").width());
		this.albums = albums ;
	
		var range = Album.loadNextPage(albums , true);
		var count = range.end - range.start;
		var data = this.getData(range.start , count , files , "thumbpath");
		
		if(data.length<=0){
			return;
		};
		
		this.files = files;
		this.loadImgPart(data);
		self.Albums = albums;
	},
	
	getData (start , end , files , el) {
		
    	var data=[];
		var j;
		var thumbpath;
		var url;
	
    	if(end > files.length) end =files.length;
    	for(var i=start ; i< start + end ; i++){
    		
			if(files[i]){
				this.thum_img_hash[files[i]["thumbpath"]] = i;
				data.push(files[i]["thumbpath"]);
			}
    	}
    	
    	return data;
	},
	
	loadImgPart (data) {
		var m={};
		m.type = "requestFile";
		m.data =data;
		tools.sendMsgToChannel(m);
	},
	
	containerHeight () {
		const self = this.vm
	    tools.setContainer(Config.marginTop , self);
	},
	
	onFileurl (data) {
		//console.log("this.thum_img_hash" ,  this.thum_img_hash)
		var i =this.thum_img_hash ? this.thum_img_hash[data.path] : this.thum_img_hash;
		
		if(i != undefined){
			console.log("imageurl:" , data)
			delete this.thum_img_hash[data.path];
			Album.updateSrc(this.vm.Albums, i , data.url);
		}
	},
	
	imageFileList (data) {
		if(data.fileType == 'image'){
			this.loadList(data.files)
			tools.closeLoading(this.vm.show);
		}
	},
	
	setImgDiv () {
		const range = Album.loadNextPage(this.vm.Albums , this.$pagenation);
		
		if(!range) return;
		
		var count = range.end - range.start;
		var data=this.getData(range.start , count , this.files);
		if(data.length > 0)
		this.loadImgPart(data);
	},
	
	scrollAddImage (id) {
		scroll.bottomEvent(id , this.setImgDiv.bind(this))
	},
	
	onSelectImage () {
		selectDownload.setCssSelect(this.albums)
	},
	
	onDownLoad (data) {
		if(Config.Runtime.current != this.current) return
		selectDownload.download(this.albums , this.files , data);
	},
	
	onRouter (r) {
		if(r.path != '/image') return;
		mvd.routeChangeS(r.path , this.vm);
	},

	regBus (bus) {
		bus.on("fileList" , this.imageFileList.bind(this))
		bus.on("fileurl", this.onFileurl.bind(this));
		bus.on("selectImage" , this.onSelectImage.bind(this))
		bus.on("downLoad" , this.onDownLoad.bind(this))
		bus.on("router" , this.onRouter.bind(this))
	}
}