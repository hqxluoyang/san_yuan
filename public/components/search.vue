/**
	date : 2016-5-29
	author : sailing
	fun : search窗口
	<span class="searchBnt"></span>
            	<input class='' type="search" placeholder="测试搜索" autosave="aoa.org.cn" result="8">
            	<span class='scan'>df</span>
**/

<style>
.all_search {
	height:30px;
	line-height:30px;
	position:absolute;
	text-align:center;
	width:100%;
	top:5px;
	left:0;

}

.all_search .pImg{

	height:30px;
	margin-left:30px;
	margin-right:30px;
}

.all_search .pImg ul{
	background:#fff;
	width:245px;
	left:50%;
	position:absolute;
	border-radius:26px;
	margin-left:-122px;
}

.all_search .pImg li{
	display:inline;
}

.all_search .pImg .head{
	width:30px;
	height:30px;
	margin-left:-26px;
	margin-top:4px;
	position:absolute;
}

.all_search .pImg input{
	width:180px;
	margin-left:2px;
	border:0;
}

.all_search .centerSearchBody{
	width:100%;

}

.all_search .peopleImg {
	background:#888;
	display:inline;
	width:30px;
	position:absolute;
	margin-left:9px;
	height:30px;
}


</style>

<template>
	<div class="all_search" v-show="showHide">
		<div class="pImg">
			<ul>
				<li v-on:click="searchStart()" class="head"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
    				<path fill="#ccc" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
				</svg></li>
				<li style="margin:0 ;padding:0"><input v-model="searchValue" type="search" placeholder="搜索" /></li>
				<li style="position:absolute;margin-top:5px;">
					<svg style="width:24px;height:24px" viewBox="0 0 24 24">
					    <path fill="#ccc" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
					</svg>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import search from '../services/search'
export default {
	
	data () {
		return {
			showHide : false,
			searchValue :''
		}
	},

	init () {

	},

	methods : {
		searchStart () {
			search.searchStart();
		}
	},

	ready () {
		search.setThis.call(search, this);
	},

	initBus (bus) {
      	search.regBus(bus);
  	},
		

}
</script>