/***
	date : 2016-6-2
	author : sailing
	fun : 接口
***/

export default {

	setThis (self) {
		this.vm = self;
		this.path = "/equipmentCabinet"
	},

	showCabinet (el) {
		const self = this.vm ;
		if(self){
			self.cabinet = true;
		}
	},

	onShow () {
		var self = this.vm ;
		if(self){
			self.flag = true;
		}
	},

	onRouter (r) {

	},

	regBus (bus) {

		bus.on("router" , this.onRouter.bind(this))
		bus.on("portfigure" , this.onShow.bind(this))
	}
}