export default {
	setThis (self) {
		this.vm = self;
	},

	firebug (el) {
		var self = this.vm ;
		self.list.push(el)
	},

	regBus (bus) {
		bus.on("firebug" , this.firebug.bind(this))
	}
}