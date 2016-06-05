/**
	date : 2016-6-5
	author : sailing
	fun : nav 图标选择
**/

<template>
	<template v-if="data == '/machineRoom'">
	
  		<svg  style="width:32px;height:32px" viewBox="0 0 24 24"><path fill={{color}} 	d="M8,20H5V12H2L12,3L22,12H19V20H12V14H8V20M14,14V17H17V14H14Z" />
		</svg>
	
	</template>

	<template v-if="data == '/equipmentCabinet'">
	
  		<svg style="width:32px;height:32px" viewBox="0 0 24 24">
    	<path fill={{color}}  d="M6,22H18L12,16M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H7V17H3V5H21V17H17V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z" />
		</svg>
	
	</template>

	<template v-if="data == '/InstabusEIB'">
	
  		<svg style="width:32px;height:32px" viewBox="0 0 24 24">
		    <path fill={{color}}  d="M18,19H6V17.6C6,15.6 10,14.5 12,14.5C14,14.5 18,15.6 18,17.6M12,7A3,3 0 0,1 15,10A3,3 0 0,1 12,13A3,3 0 0,1 9,10A3,3 0 0,1 12,7M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
		</svg>
	
	</template>

	<template v-if="data == '/verify'">
	
  		<svg style="width:32px;height:32px" viewBox="0 0 24 24">
    	<path fill={{color}} d="M6,22H18L12,16M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H7V17H3V5H21V17H17V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z" />
		</svg>
	
	</template>

	<template v-if="data == '/setting'">
	
  		<svg style="width:32px;height:32px" viewBox="0 0 24 24">
    	<path fill={{color}}  d="M6,22H18L12,16M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H7V17H3V5H21V17H17V19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3Z" />
		</svg>
	
	</template>

</template>

<script>
export default {
	props : {
		data : String ,
		color : String
	}
}
</script>