import tools from './tools.js'

export default {
	downPath:{},
	
	sendMsgServer (path) {
		var m = {};
		m.type = "requestFile";
		m.download = 1;
		m.data=[path];
		tools.sendMsgToChannel(m);
	},
	
	downloadFile (url) {
		var explorer = window.navigator.userAgent ;
		if(explorer.indexOf("Chrome") >= 0){
			
			var adownLoda = document.createElement("a");
			adownLoda.href = url+"?download=1";
			adownLoda.download = url+"?download=1";
			document.body.appendChild(adownLoda);
			adownLoda.click();
			$(adownLoda).remove();
			
		}else{
			
			var iframe = document.createElement('iframe');
			iframe.src = url+"?download=1";
			document.body.appendChild(iframe);
			iframe.onload = function(){
				var that=this;
				setTimeout(function(){
					$(that).remove();
				} , 10000);
				
			}	
		}
	}
	
}