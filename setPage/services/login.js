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
		this.vm.imgsrc = data.qrcodeurl
	},
	
	login () {
		this.vm.login = false
	},
	
	phoneDisconnected () {
		this.vm.login = true;
		window.location.href= Config.Config.baseUrl + "webclient?action=logout&t=" + new Date().getTime();
	},

	regBus (bus) {
		bus.on("qrcode" , this.qrcodeurl.bind(this))
		bus.on("login" , this.login.bind(this))
		bus.on("phoneDisconnected" , this.phoneDisconnected.bind(this))
	}
}