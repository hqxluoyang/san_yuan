/**
	date : 2016-6-5
	author : sailing
	fun : 查找
**/

import Config from './config'

export default {
	setThis (self) {
		this.vm = self;
	},

	onRouter (r) {
		const self = this.vm;
		if(!self) return ;
		if(r.path == '/machineRoom' || r.path == '/equipmentCabinet'){
			self.showHide = true ;
		}else{
			self.showHide = false ;
		}
	},

	searchStart () {
		const self = this.vm ;
		
		if(!self) return ;

		if(!self.searchValue){
			alert("请填写查询字段")
			return ;
		}
 
		Config.eventBus.emit("search" , {value : self.searchValue})
	},

	regBus (bus) {

		bus.on("router" , this.onRouter.bind(this))
	}
}