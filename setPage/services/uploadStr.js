import tools from './tools'

export default {
	upload (files , name) {
		 var fd = new FormData();
		 var imei = tools.getSessionId();
		 
		 if(imei){
			 imei = imei.substring(0,7);
		 }else{
			 imei='';
		 }
		// console.log("files:" , files)
		// fd.append("size",files["size"]);
		// fd.append("path",path);
		 fd.append("imei",imei);
		// fd.append("mime",Config.map.get(files.name.substring(files.name.lastIndexOf("."))));
		/* 
		 if(files["base64"]){
			 fd.append("base64file",files["data"]);
		 }else{
			 fd.append("filename",files);
		 }
		 */
		 fd.append("filename",files);
		 fd.append("templeName",name);
		 var that = this;
		 
		 var xhr = new XMLHttpRequest();
		 /*
		 var url = Config.Config.baseUrl +"upload";
		 if(Config.Config.directUpload){
			 url = Config.Config.directUpload;
		 }
		 */

		 
		 xhr.upload.addEventListener("progress", this.uploadProgress, false);
		// xhr.addEventListener("load", this.uploadComplete, false);
		// xhr.addEventListener("error", this.uploadFailed, false);
		// xhr.addEventListener("abort", this.uploadCanceled, false);
		var url = window.href;
		 setTimeout(function(){
			 xhr.open("POST", "upload");
		    // xhr.upload.pro = pro;
		     xhr.upload.scope = that;
		     xhr.send(fd);
		 } , 500)
		 
	},

	uploadProgress () {
		console.log("upload progress")
	}
}