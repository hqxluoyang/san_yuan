/**
	date : 2016-5-29
	author : sailing
	fun : 机柜图设置
**/

<style>

.cabinet {
	width : 100%;
	height:100%;
	position:absolute;
	left:0;
	top:0;
	background:red;
	z-index:1000;
}

.cabinet .cabinetKa {
	height : 100%;
	padding : 10px;

}

</style>

<template>
	<div v-show="cabinet" class="cabinet">
		<div class="cabinetKa">

		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
			cabinet : false
		}
	},

	init () {

	},

	ready () {

	},

	components : {}
}

</script>

