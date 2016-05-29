/*
 * author michael wang
 * 2014.05.29
 */
define(['./config'], 
	function(Config){
	var Tools = {
		xmlhttp:null,
		
		init:function(){
			Tools.getPageSize();
		},
		sendMsgToChannel: function(s){
			
			var msg = JSON.stringify(s);
			if(!Config.Runtime.isDirect && s.type === "requestFile" && !s.download){
				var data = s.data;
				var path;
				var url;
				var xhr;
				for(var i = 0; i < data.length; i++){
					path = data[i];
					url = Config.Config.baseUrl + "respImage/" + Config.Runtime.imei + path.split('/').map(function(s){return encodeURIComponent(s)}).join('/');
					xhr = new XMLHttpRequest();
					xhr.open("GET", url);
					xhr.setRequestHeader("Y-Action", "requestFile");
					xhr.onreadystatechange = function(xmlhttp, filepath, fileurl){
							return function(){
								
									//chrome from cahce
									//console.log("chrome load ajax result from cache.readyState: " + xmlhttp.readyState + " status: " +  xmlhttp.status + "statu text" + xmlhttp.statusText + " path: " + filepath + " url: " + fileurl)
									if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
										setTimeout(function(){
											var msg = {"type":"fileurl","data":{"path":filepath, "url":fileurl}};
											Config.Runtime.eventBus.emit(msg.type, msg.data);
											debug.clogs(JSON.stringify(msg), "blue", "blue");}, 0
										)
									}
						};
						}(xhr, path, url);					
					
					xhr.send();
				}
			}else if(Config.Runtime.isDirect && s.type === "requestFile") {
				var paths = s.data;
				var path;
				var url;
				var xhr;
				var baseURL
				if(Config.Runtime.isDirectChannel)
					baseURL = Config.Runtime.directChannelURL.replace(/channel.*/, '');
				else
					baseURL = services.baseurl;
//				var msg = {};
//				msg.type = 'fileurl';
				
				var data = {};
				for(var i = 0; i < paths.length; i++){
					path = paths[i];
					url = baseURL + "static" + path.split('/').map(function(s){return encodeURIComponent(s)}).join('/');
					data.path = path;
					data.url = url;
				//	console.log(data.url)
					var callback = (function(d){
						var data = {};
						data.path = d.path;
						data.url = d.url;
						return function(){
							Config.Runtime.eventBus.emit('fileurl',data);
						}
					})(data);
					
					setTimeout(callback,0);
				}
				
			}else{
				var channelURL = Config.Runtime.isDirectChannel ? Config.Runtime.directChannelURL:Config.Runtime.channelURL;
				Config.Runtime.eventBus.emit('postMessage',msg);
			}
		},
		checkload: function(){
			var self = Tools;
			if(self.ifr.contentWindow.document.readyState == "complete"){
				self.ifr.contentWindow.document.execCommand("SaveAs");
				clearInterval(self.timer);
				document.body.removeChild(self.ifr);
			}
			
		},
		imgAnim:function(){
			
		},
		
		getCookie: function(cname){
			 var name = cname + "=";
			    var ca = document.cookie.split(';');
			    for(var i=0; i<ca.length; i++) {
			        var c = ca[i];
			        while (c.charAt(0)==' ') c = c.substring(1);
			        if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
			    }
			    return "";
		},
		rotateImgRightLeft: function(flag , elClass){
			switch(elClass){
				case "classRotate0":
					flag ? elClass="classRotateBig270" : elClass="classRotateBig90";
					break;
				case "classRotateBig90":
					flag ? elClass="classRotate0" : elClass="classRotate180";
					break;
				case "classRotate180":
					flag ? elClass="classRotateBig90" : elClass="classRotateBig270";
					break;
				case "classRotateBig270":
					flag ? elClass="classRotate180" : elClass="classRotate0";
					break;
				default:
					break;
			}
			return elClass;
			
		},
		
		encodeMyUri:function(url){
			if(url.indexOf("?") != -1){
				url += "&random=" + (Math.random() + "").replace(",","");
			}else{
				url += "?random=" + (Math.random() + "").replace(",", "");
			}
			return encodeURI(url);
		},
		setTimeStamp:function(url){
			if(url.indexOf("?") != -1){
				url += "&random=" + (new Date().getTime()); 
			}else{
				url += "?random=" + (new Date().getTime());
			}
			return url;
		},
		encodePath:function(path){
			var p = "";
			var arrPath = path.split('@');
			if (path.indexOf("@") != -1) {
				for(i=0; i<arrPath.length-1; i++){
					p += encodeURIComponent(arrPath[i])+'@';
				}
			}else{
				p = encodeURIComponent(path);
			}
			return p;
		},
		/**
		 * sort()方法的比较方法，对象数组升序排列。 
		 */
		
	    stringToJson:function(str){
	    	return eval("(" + str + ")");
	    },
	    stringToJson2:function(str){
	    	var j = (new Function("return " + str))();
	    	return j;
	    },
	    /* 使用JSON.parse需严格遵守JSON规范，如属性都需用引号引起来 , 不能处理复杂的json结构  */
	    stringToJson3:function(str){
	    	return JSON.parse(str);
	    },
	    /* 使用JSON.parse需严格遵守JSON规范，如属性都需用引号引起来 , 不能处理复杂的json结构
	     * chrome中，JSON.parse的第一个参数只能是字符串，不能是对象（包括new String方式也不支持） 
		 * 再回到上面给Object.prototype添加一个解析json的方法，如果要兼容所有浏览器，可以这么写：
	     */
	    stringToJson4:function(str){
	    	Object.prototype.parseJSON = function(){ 
	    		return JSON.parse(str.toString()); 
			};
	    	return str.parseJSON();
	    },
	    parseJson:function(str){
//	    	console.log("str typeof = " + typeof str);
	    	if(str !== "string"){
	    		str = str.toString();
	    	}
	    	if(window.JSON){
    			return JSON.parse(str);
    		}else{
    			return (new Function("return " + str))();
    		}
	    },
	    
	    Ajax:{
				send:function(type , url , callBack){
					$.ajax({
						type: type,
						url: url,
						success: callBack
	
						})
				}
			},
	    /* getElementsByClassName */
			
		guidGenerator: function(){
				var s4 = function(){
					return(((1+Math.random())*0x10000)|0).toString(16).substring(1);
				}
				return(s4() + s4() +"-" + s4() +"-" + s4() +"-" + s4() +"-" + s4() +"-" + s4()  + s4()  )
			},
		
		getSessionId:function(){
			var c_name = 'JSESSIONID';
			if(document.cookie.length>0){
				var c_start = document.cookie.indexOf(c_name + "=");
				if(c_start != -1){
					c_start = c_start + c_name.length +1;
					var c_end = document.cookie.indexOf(";", c_start);
					if(c_end == -1){
						c_end = document.cookie.length;
					}
					return unescape(document.cookie.substring(c_start, c_end));
				}
			}
		},
		encodeFullUrl: function(url){
			return encodeURI(url);
		},
		encodeUrl: function(url, p){
			return url+encodeURIComponent(p);
		},
		getPageHeight: function(){
			return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		},
		getPageWidth: function(){
			return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		},
		
		getPosition: function(obj){
			var pos = [];
			pos.push((Tools.getPageWidth() - obj.wid) / 2);
			if(Tools.getPageHeight() - obj.hei < 0){
				pos.push(10);
			}else{
				pos.push((Tools.getPageHeight() - obj.hei) / 2);
			}
			return pos;
		},
		getDateTime: function(){
			var d = new Date();
			return d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
		},
		getTime: function(){
			var d = new Date();
			return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds();
		},
		
		getStoragePercent: function(num, total){
			return Math.round(num / total * 10000) / 100.00  + "%";
		},
		
		cutImage: function(path){
			var p = path;
		
			var s1= p.substr(0 , p.indexOf('/cutimage/'));
			var s2 =  p.substr(p.indexOf('/cutimage/')+9);
			
			var str = s1 + s2;
			return str;
		},
		/**************移动方法*******************/
		setContainer: function(height , self){
			var h = this.getPageHeight() - height ;
			self.h = h;
		},
		
		closeLoading : function(self){
			if(self){
				self.load = false
			}
		}
		
	};
	
	return Tools;
})