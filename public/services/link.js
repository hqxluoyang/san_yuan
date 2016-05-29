export default {
	
	setThis (self) {
		this.vm = self;
	},
	
	onRouter (r) {
		const self = this.vm;
		if(!self) return;
		const router = ["/xender" , "/app" , "/image" , "/music" , "/video" , "/record"]
		for(var i=0 ;i<router.length;i++){
			if(r.path == router[i])break
		}
		
		self.lineLeft = 55 * i;
	},
	
	regBus (bus) {
		bus.on("router" , this.onRouter.bind(this))
	}
}