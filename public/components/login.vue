<style>
.login{
	background:#fff;
	position:absolute;
	left:0;
	width:100%;
	height:100%;
  z-index : 1000;
	text-align:center;
	z-index:200;
	top:0;

}

.login .loginPanel {

  height:250px;
  margin: 0 auto;
  position:relaitve;
  margin-left:60px;
  margin-right:60px;
}

.login .titleText {
  height:80px;
  line-height:80px;
  margin-top:150px;
  font-size:22px;
  position : relative;
}

.login .loginPanel .loginCon{
  background:green;
  height:200px;
  width:100%;
  position:relative;
 

}

.login .loginPanel .loginCon .lline {
  height:50px;
  line-height:50px;
  
  margin-top:5px;
  border-bottom: 1px solid #ccc;
  position:relative;
}

.lline.llineBnt {
  height:50px;
  line-height:50px;
  margin-top:5px;
  border-bottom: 0px solid #ccc;
  position:relative;
}


.login .loginPanel .loginCon .llineBnt .loginBnt{
  height:40px;
  background:yellow;
  width:100%;
  line-height:40px;
  display:inline-block;
  background:#21D6F3;
  border-radius:5px;
}

.login .loginPanel .loginCon input {
  border:0;
  height:35px;
}

</style>

<template>
  <div v-show="!login" class='login'>
     <p class="titleText">三维数据中心综合管理系统</p>
     <div class="loginPanel">
        <div class="loginCon">
          <p class="lline"><input /></p>
          <p class="lline"><input /></p>
          <p class="lline">fff</p>
          <p class="lline llineBnt">
            <span class="loginBnt" v-on:click="lgogin($event)">登陆</span>
          </p>
        </div>
     </div>
  </div>
</template>

<script>

import loginSer from '../services/login.js'

export default {
   
  data () {
  	return {
  		login:true,
      username:'',
      password:''
  	}
  },

  methods: {
      lgogin () {
       //loginSer.login();
       this.login = true;
      },
        
  },
  
  ready () {
  	 loginSer.setThis.call(loginSer, this);
  },
  
  initBus (bus) {
      loginSer.regBus(bus);
  },

  components:{}

}
</script>