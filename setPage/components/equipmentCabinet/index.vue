<style>
.equipmentCabinet {
	height:100%;
	width:100%;
	position:relative;
	overflow-y: scroll;
}

.equipmentCabinet .equContainer {
	padding:10px;
	height:100%;
	overflow-y: scroll;
}

.equipmentCabinet .equContainer .equipment {
	height:60px;
	
	border-bottom:1px solid #ccc ;
}

.equipmentCabinet .equContainer .equipment li{
	width:100%;
	height:30px;
	line-height:30px;
}

.equipmentCabinet .equContainer .equipment .liname{
	width:100%;
	height:30px;
	line-height:30px;
}

.equipmentCabinet .equContainer .equipment .liMessage{
	width:100%;
	height:20px;
	line-height:20px;
	color:#ccc;
	font-size:12px;
}
</style>

<template>
	<div class="equipmentCabinet">

		<div class="equContainer">
			<div class="equipment" v-for = "equipment in equipmentList">
				<ul>
					<li class="liname">{{equipment.name}}</li>
					<li class="liMessage">{{equipment.message}}</li>
				</ul>
			</div>
		</div>

	</div>

	<cabinet></cabinet>
</template>

<script>

import cabinet from './cabinetDiagram.vue'

export default {
	
	data () {
		return {
			equipmentList:[{
				name : '设备1',
				message : 'message'
			},{
				name : '设备2',
				message : 'message'
			},{
				name : '设备2t',
				message : 'messagedfdf'
			}]
		}
	},

	init () {
		
	},

	ready () {

	},

	components : {cabinet}
}
</script>