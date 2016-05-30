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

.login .loginPanel .loginCon .lline.llineBnt {
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
  border-top:0;
  border-right:0;
  border-bottom:0;
  border-left:1px solid #ccc;
  height:25px;
}

</style>

<template>
  <div v-show="!login" class='login'>
     <p class="titleText">闪传注册</p>
     <div class="loginPanel">
        <div class="loginCon">
          <p class="lline"><input /></p>
          <p class="lline"><input /></p>
         
          <p class="llineBnt lline">
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
  		login:false,
      username:'',
      password:''
  	}
  },

  methods: {
      lgogin () {
       //loginSer.login();
      // this.login = true;
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