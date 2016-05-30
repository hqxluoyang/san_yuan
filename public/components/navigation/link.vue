/**
	<a class="acolor" v-link="{ path: '/machineRoom' }">1</a>
  	  <a class="acolor" v-link="{ path: '/equipmentCabinet' }">2</a>
  	  <a class="acolor" v-link="{ path: '/InstabusEIB' }">3</a>
  	  <a class="acolor" v-link="{ path: '/verify' }">4</a>
**/


<style>
.topLink{
	position:absolute;
	left:0;
	width:100%;
	height:50px;
	background:#F3F3F3;
	border-top:1px solid #ccc ;
	bottom:0;
}

.acolor{
	color:#B7B7B7;
	font-size:15px;
	width:80px;
	background:green;
	display:inline-block;
	text-align:center;
	line-height:40px;
	margin-left:0px;
}

.linkContai{
	overflow:hidden;
}

 .acolor.v-link-active{
 	color:#fff;
 }
 
 .bottomLine{
 	width:50px;
 	background:yellow;
 	position:absolute;
 	left:0px;
 	top:30px;
 	height:2px;
 	transition:left 0.5s;
	-moz-transition:left 0.5s; /* Firefox 4 */
	-webkit-transition:left 0.5s; /* Safari and Chrome */
	-o-transition:left 0.5s; /* Opera */
 }

 .Container{
 	background:red;
 	margin-left:100px;
 	position:absolute;
 	top:0px;
 	width:100px;
 	height:100px;
 }
</style>

<template>
  	<div class='topLink'>
  	  
      <p v-bind:style="{left:lineLeft + 'px'}"></p>
    </div>
</template>

<script>
import Container from '../../services/Container.js'
import link from '../../services/link.js'
export default {
  	  data () {
  	  	return {
  	  		lineLeft:0
  	  	}
  	  },
  	  
	  methods:{
	  	touchEnd (e) {
	  		Container.touchEnd(this.$route.path , e);
	  	},
	  	
	  	touchStart (e) {
	  		//e.preventDefault();
	  		Container.touchStart(e);
	  	},
	  	
	  	touchMove (e) {
	  		Container.touchMove(e);
	  	},
	  	
	  	touchcancel (e) {
	  		console.log("touch cancel");
	  	} 
	 },
	  
	 ready () {
        link.setThis.call(link, this);
   	 }
}
</script>