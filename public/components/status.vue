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
export default {

	data () {
		return {
			statusText:"机房"
		}
	},

	init () {

	},

	ready () {

	},

	components : {}
}
</script>