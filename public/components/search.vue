/**
	date : 2016-5-29
	author : sailing
	fun : search窗口
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

.all_search .centerSearchBody{
	width:100%;

}

.all_search .peopleImg {
	background:#888;
	display:inline-block;
	width:30px;
	position:absolute;
	margin-left:9px;
	height:30px;
}

.all_search .searchBody{
	background:#fff;
	margin-left:40px;
	margin-right:30px;
	display:inline-block;
	line-height:30px;
	border-radius:21px;
}

.all_search .searchBody .searchBnt{
	display:inline-block;
	width:30px;
	height:30px;
	margin-left:13px;
	background:#456;
}
.all_search .searchBody .scan{
	display:inline-block;
	width:30px;
	height:30px;
	background:#456;
}
</style>

<template>
	<div class="all_search" v-show=false>
		
			<span  class="peopleImg">
            </span>
            <div class='searchBody'>
            	<span class="searchBnt"></span>
            	<input class='' type="search" placeholder="测试搜索" autosave="aoa.org.cn" result="8">
            	<span class='scan'>df</span>
            </div>
            
	
		
	</div>
</template>

<script>
export default {
	init () {

	},

	ready () {
		
	}
}
</script>