import ts from "./ts"
import Config from './config'

export default {
	
	setThis (self) {
		this.vm = self;
	},

	setWidth () {
		const self = this.vm ;
		const len = self.list.length ;
		var width = ts.getPageWidth();
		self.width = width/len ;
		//console.log("width:" , width)
	},
	
	
	onRouter (r) {
		const self = this.vm;
		const navArray = Config.nav ;
		if(!self) return;

		for(var i=0 ;i<navArray.length;i++){
			if(r.path == navArray[i])break
		}

		self.lineLeft = self.width * i;

	},
	
	regBus (bus) {

		bus.on("router" , this.onRouter.bind(this))
	}
}