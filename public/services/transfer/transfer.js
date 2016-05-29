import tools from  '../tools'
import Config from '../config.js'

export default {

	setThis (self) {
		this.vm = self;
		this.current = "/transfer";
	},
	
	onTransferShow (data) {
		console.log("transfer ********************:" , data)
		if(data.show){
			this.vm.inOut = 'fadeInTransfer';
		}else{
			this.vm.inOut = 'fadeOutTransfer';
		}
	},

	regBus (bus) {

		//bus.on("transferShow" , this.onTransferShow.bind(this))
	
	}
}