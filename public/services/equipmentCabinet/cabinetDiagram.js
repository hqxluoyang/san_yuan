/***
	date : 2016-6-1
	author : sailing
	fun : 显示具体机柜
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

	onRouter (r) {

	},

	regBus (bus) {

		bus.on("router" , this.onRouter.bind(this))
		bus.on("showCabinet" , this.showCabinet.bind(this))
	}
}