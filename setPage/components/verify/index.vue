/**
	date :2016-5-28
	author : sailing
	fun : 机房管理住模块
**/

<style>
.machineVerify{
	width:100%;
	height:100%;
	
}

.machineVerify .verifyContainer {
	padding:10px;
	height:100%;
	overflow-y: scroll;
}

.machineVerify .verifyContainer .verifyLine {
	height:60px;
	
	border-bottom:1px solid #ccc ;
}

.machineVerify .verifyContainer .verifyLine li{
	width:100%;
	height:30px;
	line-height:30px;
}

.machineVerify .verifyContainer .verifyLine .liname{
	width:100%;
	height:30px;
	line-height:30px;
}

.machineVerify .verifyContainer .verifyLine .liMessage{
	width:100%;
	height:20px;
	line-height:20px;
	color:#ccc;
	font-size:12px;
}

</style>

<template>
	<div class="machineVerify">
		<div class="verifyContainer">
			<div class="verifyLine" v-for = "rom in romList">
				<ul>
					<li class="liname">{{rom.name}}</li>
					<li class="liMessage">{{rom.message}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			romList:[{
				name:"机房3楼",
				message : "信息机房"
			},{
				name:"调度机房",
				message : "通信机房"
			},{
				name:"调度机房",
				message : "通信机房"
			},{
				name:"调度机房",
				message : "通信机房"
			},{
				name:"调度机房",
				message : "通信机房"
			},{
				name:"调度机房",
				message : "通信机房"
			},{
				name:"调度机房",
				message : "通信机房"
			},{
				name:"调度机房",
				message : "通信机房"
			},{
				name:"调度机房",
				message : "通信机房"
			},{
				name:"调度机房",
				message : "通信机房"
			},{
				name:"调度机房",
				message : "通信机房"
			},{
				name:"调度机房",
				message : "通信机房"
			}]
		}
	},

	init () {

	},

	ready () {

	},

	components : {}
}
</script>