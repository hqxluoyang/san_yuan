	/*
	 * author hqx
	 * 
	 */
	define(["./tools", "./config" ], function(tools , Config){
		
	 var upload = function(){
		 this.progress=[];
		 this.files=[];
		 this.succ={};
		 this.length=0;
		 this.imgQueue=[];
		 this.obj = '';
		 this.flag = true; //终止上传其余
		// this.data=[];
	 }
	 
	 upload.prototype.setIndex = function(files){
		 
		 for(var i=0 ; i<files.length ; i++){
			 files[i].index=i;
		 }
		 this.files = files;
	 }
	 
	 upload.prototype.uploadDrag = function(files , type){
		 this.setIndex(files); //处理上传序列,
		 this.files = files;
	 }
	 
	 upload.prototype.sendFile = function(files , savePath){
		 
		 for(var i=0 ; i<files.length ; i++){
			 var fpush = {
					 upId:tools.guidGenerator() + "/" + files[i].name
			 }
			
			//console.log("fpush:" , fpush["upId"])
			
			files[i]["fpush"] = fpush;
			var m={};
			
			if(savePath==""){
				//object.noSavePath[fpush["upId"]] = true;
			}
			
			
			m.type="sendFile";
			m.data = {"fileType":"image", "path":fpush['upId'] , "savePath":savePath , "size":files[i]["size"]};
			tools.sendMsgToChannel(m);
		 }
	 }
	 
	 upload.prototype.uploadImage = function(files , obj , savePath){
		 this.setIndex(files); //处理上传序列,
		 
		 var index = savePath.indexOf("/cutimage/");
			if(index >=0){
				savePath = tools.cutImage(savePath);
			}
		 
		 this.sendFile(files , savePath);
		 
		 that = this;
		 that.length = files.length;
		 that.imgOk = true;
		 that.obj = obj;
		 that.id = tools.guidGenerator();
		 var i=0;
	//	that.aysncUploadImg(obj);
		 var addpic = function(){
			 if(i>=that.files.length) return;
			 
			 setTimeout(function(){
				 if(that.imgOk){
					 that.imgOk = false;
					 that.loadImg(obj , files[i] , savePath);
					 i++;
				 }
				 if(that.flag) addpic();
				 
			 } , 100)
		 }
		
		 addpic();
	 }

	 
	
	 upload.cropBase64 = function(img , w , h){
		 var ctx = document.getElementById("imgCropCanvas").getContext('2d');
		 var canvas = document.getElementById("imgCropCanvas");
		 var canvasW 
		 var canvasH
		 if(w/h > 1){
			 canvasH  = 180;
			 canvasW = w/h * canvasH
		 }else{
			 canvasW  = 180;
			 canvasH = h/w * canvasW
		 }
		
		 
		 canvas.width = canvasW;
		 canvas.height = canvasH;
		 ctx.drawImage(img, 0, 0, canvasW, canvasH)
		 var newData = document.getElementById("imgCropCanvas").toDataURL("image/png");
 
		 return {
			 data: newData,
			 w: canvasW,
			 h: canvasH
		 };
		 
	 }
	 
	 
	 upload.prototype.loadImg = function(object , files , savePath){
		 var that = this;
		 var reader = new FileReader();
		 reader.readAsDataURL(files);
		 reader.onload = function(){
			var tProgress={};
			var dataUrl ={};
	
			var fpush = files["fpush"];
			//console.log(" 1 fpush:" , fpush)
			var setParam = function(){
				  	
		    	  	object.setImgWidth();
		    	  	var par = $("#imgModule_file_list .icon_list_item")[0];
		     		var progress=tools.createEl(par , "progress" , "progress" , "progress_" + fpush["upId"]);
		     		tools.createEl(par , "DIV" , "progressShade" , fpush["upId"]);
		     		progress.value = 0;
				 	progress.max = 100;
				 	
				 	tools.setPseudoEl("progress" , "background:#f44336" ,"background:#ffb8b3")
				 	
		     		tProgress.el = progress;
					tProgress.index = 0;
					that.progress.push(tProgress);
					
					that.send(files , tProgress ,fpush['upId']); 
					
				};
				
				var img = new Image();
					img.src = this.result;
					img.onload = function(){
						if(!that.flag) return;
						dataUrl = upload.cropBase64(img , this.width , this.height);		
						//setParam();
						that.imgOk = true;
	//					delete img;
					}
				
						
		}
	 };
	 
	 upload.prototype.sendMsg = function(type , path){
		 const m = {
				 type :"sendFile",
				 data :{
					 fileType : type,
					 path:path
				 }
		 }
		 tools.sendMsgToChannel(m);
	 };
	 
	 upload.prototype.uploadFile = function(files , vm , savePath){
		 for(var i=0 ; i<files.length ; i++){
			 const size = ((files[i]['size']/1024)/1024).toFixed(2) + "MB"
			 const list = {
					 w:0,
					 name:files[i].name,
					 size : size
			 }
			 
			 var fpush = {
					 upId:tools.guidGenerator() + "/" + files[i].name
			 }
			 this.sendMsg("image" , fpush['upId']);
			 vm.recordList.splice(0 , 0 , list)
			 const el=  vm.recordList[0];
			 this.getImage(files[i] , vm);
			 this.sendData(files[i] , el , fpush['upId'])
		 }
	 }
	 /*
	 upload.prototype.getImage = function(files){
		 var reader = new FileReader();
		 reader.readAsDataURL(files);
		 reader.onload = function(){
			 var img = new Image();
				img.src = this.result;
				img.onload = function(){
					if(!that.flag) return;
					var dataUrl = upload.cropBase64(img , this.width , this.height);		
					//setParam();
					delete img;
				}
		 }
	 }
	 */
	 upload.prototype.getImage = function(files , vm){
		 var reader = new FileReader();
		 reader.readAsDataURL(files);
		 
		 reader.onload = function(){
			 var img = new Image();
			 img.src = this.result;
			 img.onload = function(){
				 var dataUrl = upload.cropBase64(img , this.width , this.height);	
				 console.log("dataUrl:" , dataUrl.data)
				 vm.base64.splice(0,0, dataUrl.data)
			 }
		 }
	 }
	 upload.prototype.uploadComplete = function(){

		var that = this.upload ;
		if(that.scope.obj && that.scope.length){
			that.scope.nextOK = true;
			that.scope.obj.leftLen--;
			that.scope.length--;
			if(that.scope.obj.totalLen)that.scope.obj.totalLen--;
		}

		if(that.pro.el){
			that.pro.el.style.width = "0px";
		}
		
	 }
	 
	 upload.prototype.uploadFailed = function(){
		
	 }
	 
	 upload.prototype.uploadProgress = function(evt,pro){
		 if (evt.lengthComputable) {
	        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
	        var that = this;
	        console.log("upload *******************" , percentComplete)
	        this.pro.w = percentComplete.toString() + "%";
	     }
	 };
	 
	 upload.prototype.uploadCanceled = function(){
		
	 }
	 
	 
	 
	 upload.prototype.sendData = function(files , pro , path){
		
		 var fd = new FormData();
		 var imei = tools.getSessionId();
		 
		 if(imei){
			 imei = imei.substring(0,7);
		 }else{
			 imei='';
		 }
		//console.log("files:" , files["size"])
		 fd.append("size",files["size"]);
		 fd.append("path",path);
		 fd.append("imei",imei);
		 fd.append("mime",Config.map.get(files.name.substring(files.name.lastIndexOf("."))));
		 
		 if(files["base64"]){
			 fd.append("base64file",files["data"]);
		 }else{
			 fd.append("filename",files);
		 }
		 
		 var that = this;
		
		 var xhr = new XMLHttpRequest();
		 var url = Config.Config.baseUrl +"upload";
		 if(Config.Config.directUpload){
			 url = Config.Config.directUpload;
		 }
		 console.log("upload file :" , files , pro , path , Config.Config.directUpload , url)
		 xhr.upload.addEventListener("progress", this.uploadProgress, false);
		 xhr.addEventListener("load", this.uploadComplete, false);
		 xhr.addEventListener("error", this.uploadFailed, false);
		 xhr.addEventListener("abort", this.uploadCanceled, false);
		 setTimeout(function(){
			 xhr.open("POST", url);
		     xhr.upload.pro = pro;
		     xhr.upload.scope = that;
		     xhr.send(fd);
		 } , 500)
		 
		 };
		
		 return upload
		
	});