/**
	date :2016-5-28
	author : sailing
	fun : 机房管理住模块
**/

<style>
.machineRome{
	width:100%;
	height:100%;
	
}

.machineRome .romContainer {
	padding:10px;
	height:100%;
	overflow-y: scroll;
}

.machineRome .romContainer .romLine {
	height:60px;
	
	border-bottom:1px solid #ccc ;
}

.machineRome .romContainer .romLine li{
	width:100%;
	height:30px;
	line-height:30px;
}

.machineRome .romContainer .romLine .liname{
	width:100%;
	height:30px;
	line-height:30px;
}

.machineRome .romContainer .romLine .liMessage{
	width:100%;
	height:20px;
	line-height:20px;
	color:#ccc;
	font-size:12px;
}

</style>

<template>
	<div class="machineRome">
		<div class="romContainer">
			<div class="romLine" v-for = "rom in romList">
				<ul>
					<li class="liname">{{rom.name}}</li>
					<li class="liMessage">{{rom.message}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

import machineRoom from '../../services/machineRoom/machineRoom'

export default {
	data () {
		return {
			romList:[{
				name:"机房一楼",
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
		machineRoom.setThis.call(machineRoom, this);
		machineRoom.getRoomList();
	},

	components : {}
}
</script>