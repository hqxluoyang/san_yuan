<style>
	.statusText {
		position:relative;
		height: 40px;
		text-align:center;
		line-height:40px;
		width:100%;
		background:#e6e6e6;
	}
</style>

<template>
<div class="statusText">
	{{statusText}}
</div>
</template>

<script>

import status from '../services/status'

export default {

	data () {
		return {
			statusText:"机房"
		}
	},

	init () {

	},

	ready () {
		status.setThis.call(status, this);
	},

	initBus (bus) {
	    status.regBus(bus);
	},

	components : {}
}
</script>