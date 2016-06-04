export default {
	
	getPageHeight () {
		
		return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	
	},

	getPageWidth (){
	
		return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	
	},

	setCookie (name , value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	},

	getCookie (name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	}
}