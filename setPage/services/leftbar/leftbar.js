export default {
	
	setThis (self) {
		this.vm = self;
	},
	
	onShowLeftbar () {
		let self = this.vm;
		
		self.leftState = "fadeInLeftbar";
	},
	
	onHideLeftbar () {
		
	},
	
	regBus (bus) {
		bus.on("showLeftbar" , this.onShowLeftbar.bind(this));
		bus.on("hideLeftbar" , this.onHideLeftbar.bind(this))
	}
}