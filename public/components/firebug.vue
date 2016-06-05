/**
	date : 2016-6-4
	author : sailing
	fun : 调试信息
***/

<style>
.firebug {
	background:green;
	width:100%;
	height:200px;
	overflow-y:scroll;
	left:0;
	top:0;
	color:#fff;
	z-index:2000;
	position:absolute;
}
</style>

<template>
	<div class="firebug" v-show='false' v-on:click="dbclick()">
		<p v-for="el in list">
			<span>{{el.type}}:</span>
			<span>{{el.data}}</span>
		</p>
	</div>
</template>

<script>
import firebug from "../services/firebug"
export default {
	data () {
		return {
			list:[]
		}
	},

	methods : {
		dbclick () {
	
			this.list = [];
		}
	},

	ready () {
		firebug.setThis.call(firebug, this);
	},

	
	initBus (bus) {
	    firebug.regBus(bus);
	}

}
</script>