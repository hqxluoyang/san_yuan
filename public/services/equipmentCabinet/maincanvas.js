/**
	date : 2016-6-4
	author : sailing
	fun : 板卡放大缩小，移动管理
**/

import tools from "../tools"

export default {

	setThis (self) {
		this.vm = self;
	},
	
	setHeight () {
		var self = this.vm ;
		var h = tools.getPageHeight();
		self.height = h - 280 - 35 ;
	}
}