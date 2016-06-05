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

	setStyle (path) {
		const self = this.vm ;
		for(var i =0 ; i<self.list.length ; i++){
			if(path == self.list[i]['path']){
				self.list[i]['color'] = '#000';
			}else{
				self.list[i]['color'] = '#868686';
			}
		}
	},

	onRouter (r) {
		const self = this.vm;
		const navArray = Config.nav ;
		if(!self) return;
		this.setStyle(r.path)
		for(var i=0 ;i<navArray.length;i++){
			if(r.path == navArray[i]) break
		}

		self.lineLeft = self.width * i;

	},
	
	regBus (bus) {

		bus.on("router" , this.onRouter.bind(this))
	}
}