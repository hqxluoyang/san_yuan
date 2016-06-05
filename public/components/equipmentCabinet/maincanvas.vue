/**
	date : 2016-6-2
	author : sailing
	fun : "机箱办卡接口图"
**/

<style>
.maincanvas{
	width:100%;
	margin-top:10px;
	background:green;
	position:relative;
}

.maincanvas .contain{
	background:red;
	margin:0 auto;
	height:100%;
	margin-left:10px;
	margin-right:10px;
	position:relative;
}

.maincanvas .contain .mycanvas{
	position:absolute;
	width:332px;
	background:yellow;
	height:100px;
	overflow:hidden;
	left:10px;
	top:10px;
	
}

.maincanvas .contain .mycanvas .moveFlag{
	position:absolute;
	left:100px;
	top:50px;
	width:50px;
	height:10px;
	background:red;
}
</style>

<template>
	<div class="maincanvas" v-bind:style="{height:height + 'px'}">
		<div class="contain">
			<div class="mycanvas" v-on:touchStart="touchStart($event)" v-on:style="{width:canvasW + 'px' , height:canvasH + 'px'}" v-touch:pan="gesturechange($event)" v-touch:pinch="pinchChange($event)">
				<img src="http://7xsyx5.com1.z0.glb.clouddn.com/img_f140b0c3-c534a092.png" width="100%" 
				height:100%/>

				<div class="moveFlag" v-on:click = "clickFlag()">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import maincanvas from "../../services/equipmentCabinet/maincanvas"
import Config from '../../services/config'
export default {
	data () {
		return {
			height:400,
			canvasW:332,
			canvasH:100
		}
	},

	ready () {
		maincanvas.setThis.call(maincanvas, this);
		maincanvas.setHeight();
	},

	methods : {
		gesturechange (e) {
		//	e.stopPropagation()
		var data = "x=" + e.deltaX + "y=" + e.deltaY
			Config.eventBus.emit("firebug" , {type:"pan" , data:data})
		},
		
		clickFlag () {
			alert("ui")
		},

		touchStart (e) {
			var data = "x=" + e.pageX + "y=" + e.pageY;
			Config.eventBus.emit("firebug" , {type:"touch" , data:data})
		},

		pinchChange (e) {
			var data = "x=" + e.deltaX + "y=" + e.deltaY;

			Config.eventBus.emit("firebug" , {type:"pinch" , data:data})
		}
	}


}
</script>