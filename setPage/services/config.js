
define([], function(){
/********全局配置参数**********/
	
	var Map = function(){
		this.container = new Object();
	}
	Map.prototype.put = function(key, value){
		this.container[key] = value;
	}
	Map.prototype.get = function(key){
		var value = key.toLowerCase();
		return this.container[value];
	}
	Map.prototype.keySet = function(){
		var keyset = new Array();
		var count = 0;
		for(var key in this.container){
			if(key == 'extend'){
				continue;
			}
			keyset[count] = key;
			count ++;
		}
		return keyset;
	}
	Map.prototype.size = function(){
		var count = 0;
		for(var key in this.container){
			if(key == 'extend'){
				continue;
			}
			count ++;
		}
		return count;
	}
	Map.prototype.remove = function(key){
		delete this.container[key];
	}
	Map.prototype.toString = function(){
		var str = "";
		for(var i=0, keys=this.keySet(), len=keys.length; i<len; i++){
			str = str + keys[i] + "=" + this.container[keys[i]] + ";\n";
		}
		return str;
	};
	var map=new Map();
	map.put(".png", "image/png");
	map.put(".gif", "image/gif");
	map.put(".jpg", "image/jpeg");
	map.put(".jpeg", "image/jpeg");
	map.put(".bmp", "image/bmp");
	map.put(".wbmp", "image/wbmp");
	//audio mime
	map.put(".mp3", "audio/mp3");
	map.put(".wav", "audio/wav");
	map.put(".ogg", "audio/x-ogg");
	map.put(".mid", "audio/mid");
	map.put(".midi", "audio/midi");
	map.put(".wma", "audio/wma");
	map.put(".aac", "audio/aac");
	map.put(".ra", "audio/ra");
	map.put(".amr", "audio/amr");
	map.put(".au", "audio/au");
	map.put(".aiff", "audio/aiff");
	map.put(".ogm", "audio/ogm");
	map.put(".m4a", "audio/m4a");
	map.put(".f4a", "audio/f4a");
	map.put(".flac", "audio/flac");
	map.put(".ape", "audio/x-ape");
	//video mime
	map.put(".mpeg", "video/mpeg");
	map.put(".rm", "video/rm");
	map.put(".rmvb", "video/rmvb");
	map.put(".avi", "video/avi");
	map.put(".wmv", "video/wmv");
	map.put(".mp4", "video/mp4");
	map.put(".3gp", "video/3gp");
	map.put(".m4v", "video/m4v");
	map.put(".flv", "video/flv");
	map.put(".fla", "video/fla");
	map.put(".f4v", "video/f4v");
	map.put(".mov", "video/mov");
	map.put(".mpg", "video/mpg");
	map.put(".asf", "video/asf");
	map.put(".rv", "video/rv");
	map.put(".mkv", "video/x-matroska");
	//package mime
	map.put(".jar", "application/java-archive");
	map.put(".jad", "text/vnd.sun.j2me.app-descriptor");
	//web browser mime
	map.put(".htm", "text/html");
	map.put(".html", "text/html");
	map.put(".php", "text/php");
	//text mime
	map.put(".txt", "text/plain");
	map.put(".csv", "text/csv");
	map.put(".xml", "text/xml");
	//contacts mime
	map.put(".vcf", "contacts/vcf");
	//android specific
	map.put(".apk", "application/vnd.android.package-archive");
	map.put(".lca", "application/vnd.android.package-archive");
	//office mime
	map.put(".doc", "application/msword");
	map.put(".docx", "application/msword");
	map.put(".ppt", "application/mspowerpointer");
	map.put(".pptx", "application/mspowerpointer");
	map.put(".xls", "application/msexcel");
	map.put(".xlsx", "application/msexcel");
	//ebook
	map.put(".pdf", "application/pdf");
	map.put(".epub", "application/epub+zip");
	//compress
	map.put(".zip", "compressor/zip");
	map.put(".rar", "compressor/rar");
	map.put(".gz", "application/gzip");
	//calendar
	map.put(".ics", "ics/calendar");
	//certificate
	map.put(".p12", "application/x-pkcs12");
	map.put(".cer", "application/x-x509-ca-cert");
	map.put(".crt", "application/x-x509-ca-cert");
	
	var musicType = {
			'.mp3': true,	
			'.wav': true,	
			'.x-ogg': true,	
			'.mid': true,	
			'.midi': true,	
			'.wma': true,	
			'.aac': true,	
			'.ra': true,	
			'.amr': true,	
			'.au': true,	
			'.aiff': true,	
			'.ogm': true,	
			'.m4a': true,	
			'.f4a': true,	
			'.flac': true,	
			'.ape': true	
	}
	
	var vMap = new Map();
	vMap.put(".mpeg", "video/mpeg");
	vMap.put(".rm", "video/rm");
	vMap.put(".rmvb", "video/rmvb");
	vMap.put(".avi", "video/avi");
	vMap.put(".wmv", "video/wmv");
	vMap.put(".mp4", "video/mp4");
	vMap.put(".3gp", "video/3gp");
	vMap.put(".m4v", "video/m4v");
	vMap.put(".flv", "video/flv");
	vMap.put(".fla", "video/fla");
	vMap.put(".f4v", "video/f4v");
	vMap.put(".mov", "video/mov");
	vMap.put(".MOV", "video/MOV");
	vMap.put(".mpg", "video/mpg");
	vMap.put(".asf", "video/asf");
	vMap.put(".rv", "video/rv");
	vMap.put(".mkv", "video/x-matroska");
	//console.log("vMap:" , vMap)
	
	var Config = {
			Runtime:{
				imei: "unknow",
				isDirect: false,											// 记录当前模块、当前操作(home/imgModule/musicModule/docModule)
				isDirectChannel:false,
				directChannelURL:undefined,
				curOperation: 'show',
				channelURL: '',
				connect:false,
				current:"",
				channelstatus: "channel未连接",
				fileType: 'home',
				subModule: 'sms',
				uploadType:"image",
				channelV: "weline",
				isWepai: false
			},
			Config:{
				minWidth: '862',
				minHeight: '650',
				version: '1.0',
			
				directUpload:null
			},
			imgHeight:150,
			marginTop:81,
			Module:{},
			map : map,
			extMap : Map,
			limitSize:10*1024*1024,
			downLoad:{},
			lang:'',
			loadBase64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAMSURBVBhXY3jy5AkABVwCrcUBMd4AAAAASUVORK5CYII=",
			music:musicType,
			block:null,
			vMap:vMap,
			uploadpath:""
	}
	return Config;
});