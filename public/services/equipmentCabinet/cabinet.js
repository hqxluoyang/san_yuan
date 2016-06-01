/***
	date : 2016-6-1
	author : sailing
	fun : 主要显示机柜列表
***/

import Config from '../config'

export default {

	setThis (self) {
		this.vm = self;
	},

	gotoCabinet (el) {
		console.log("Config.Runtime.eventBus :" , Config.Runtime.eventBus )
		Config.Runtime.eventBus.emit("showCabinet" , {el:el})
	},

	onRouter (r) {

	},

	regBus (bus) {

		bus.on("router" , this.onRouter.bind(this))
	}
}