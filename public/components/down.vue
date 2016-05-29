<style>
	.downPanel{
		background:#fff;
		position:absolute;
		left:0;
		width:100%;
		height:40px;
		text-align:center;
		line-height:40px;
		bottom:0;
		z-index:3000;
		overflow:hidden;
	    box-shadow: 0px 3px 8px #888888;
	}
	
	.bntcancel{
		width:100px;
		display:inline-block;
		border-radius:6px;
		height:30px;
		line-height:30px;
		background:#efefef;
	}
	
	.bntsure{
		width:100px;
		display:inline-block;
		margin-left:20px;
		background:#536dfe;
		color:#fff;
		line-height:30px;
		height:30px;
		border-radius:4px;
	}
	
	.dlen{
		width:50px;
		display:inline-block;
		margin-left:10px;
		line-height:30px;
		height:30px;
		border-radius:6px;
	}
	
	.panelIn {
		-webkit-animation-name: track-in;
		-webkit-animation-duration: 0.5s;
		-webkit-animation-iteration-count: none;
	}
	
	.panelOut {
		-webkit-animation-name: track-out;
		-webkit-animation-duration: 0.5s;
		-webkit-animation-iteration-count: no;
	}
	
	@-webkit-keyframes track-in {
		0% {
		height:0;
		}
		25% {
		height:10px;
		}
		50% {
		height:20px;
		}
		75% {
		height:30px;
		
		}
		100% {
		height:50px;
		}
	}
	
	@-webkit-keyframes track-out {
		0% {
		height:50px;
		}
		25% {
		height:40px;
		}
		50% {
		height:30px;
		}
		75% {
		height:20px;
		
		}
		100% {
		height:0;
		}
	}
	
	.fadeOut {
	    position:absolute;
	   	height:0px;
	   	opacity:1;
		transition:height 0.5s;
		-moz-transition:height 0.5s; /* Firefox 4 */
		-webkit-transition:height 0.5s; /* Safari and Chrome */
		-o-transition:height 0.5s; /* Opera */
	}
	
	.fadeIn {
	    position:absolute;
	   	height:40px;
	   	opacity:1;
		transition:height 0.5s;
		-moz-transition:height 0.5s; /* Firefox 4 */
		-webkit-transition:height 0.5s; /* Safari and Chrome */
		-o-transition:height 0.5s; /* Opera */
	}
	
	</style>
	
	<template>
	  <div class="downPanel" v-bind:class="movecss">
	  	<p class="bntcancel" v-on:click="cancel()">取消</p>
	  	<p class="bntsure" v-on:click="sure()">下载 ({{Len}})</p>
	  </div>
	</template>
	
	<script>
	
	import down from '../services/down.js'
	import Config from '../services/config.js'
	
	export default {
	   
	   data () {
	   	  return {
	   	  	downPanel:true,
	   	  	movecss:"fadeOut",
	   	  	Len:1
	   	  }
	   },
	   
	   methods: {
	   	  cancel () {
	   	  	this.movecss = "fadeOut"
	   	  	Config.Runtime.eventBus.emit("downLoad" ,{cancel:true});
	   	  },
	   	  
	   	  sure () {
	   	  	this.movecss = "fadeOut"
	   	  	Config.Runtime.eventBus.emit("downLoad");
	   	  }
	   },
	   
	   ready () {
	      down.setThis.call(down, this);
	   },
	   
	   initBus (bus) {
	      down.regBus(bus);
	  },
	  
	  components:{down}
	}
	</script>