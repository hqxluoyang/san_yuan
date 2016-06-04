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
	width:100px;
	background:yellow;
	height:50px;
	left:0px;
	top:0px;
	
}
</style>

<template>
	<div class="maincanvas" v-bind:style="{height:height + 'px'}">
		<div class="contain">
			<div class="mycanvas" v-on:gesturechange="gesturechange()">hihid</div>
		</div>
	</div>
</template>

<script>
import maincanvas from "../../services/equipmentCabinet/maincanvas"
export default {
	data () {
		return {
			height:400
		}
	},

	ready () {
		maincanvas.setThis.call(maincanvas, this);
		maincanvas.setHeight();
	},

	methods : {
		gesturechange () {
			alert("ki")
		}
	}


}
</script>