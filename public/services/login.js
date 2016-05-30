import tools from './tools.js'
import Config from './config.js'

export default {

	setThis (self) {
		this.vm = self;
		console.log("login out:", this)
	},

	getVm () {
		if(this.vm){
			return true
		}else{
			return false
		}
	},

	execFun (callback) {
		const self = this;
		return function () {
			console.log("recve:" , self)
            if(self.getVm){
				callback.call(self , arguments);
			}
			
		}
	},

	qrcodeurl (data) {
		
	},
	
	login (d) {
		var d = {
			username:'admin',
			password:'1qaz3EDC'
		}
		$.ajax({
			type : "POST",
			url : "http://demo.3ddcim.com/user/login/",
			data :d ,
			success : function(){
				alert("dfdf")	
			},
			dataType:'text' 
		})
	},
	
	phoneDisconnected () {
		this.vm.login = true;
		window.location.href= Config.Config.baseUrl + "webclient?action=logout&t=" + new Date().getTime();
	},

	regBus (bus) {
		
	}
}