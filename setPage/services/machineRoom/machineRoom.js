/**
	date : 2016-5-29
	author : sailing
	fun :机房
**/

export default {
	setThis (self) {
		this.vm = self;
	},

	getRoomList () {
		/*$.ajax({
			 type: "GET",
			 url: "http://demo.3ddcim.com/room/list_as_json/?_dc=1464530837811&page=1&start=0&limit=50", 
			 dataType: "jsonp",
			 jsonp: "success_jsonpCallback",   
			 success: function (result) {    
			 alert(result.Success);    
			 alert(result.Content);                                
			 },
			 error: function (result, status) {
			    //处理错误
			    alert("ddddd")
			 }
		});
*/
		$.ajax({    
		   url:'http://demo.3ddcim.com/room/list_as_json/?_dc=1464530837811&page=1&start=0&limit=50',    
		   data:{rel:13},    
		   dataType:"jsonp",    
		   jsonp:"callback",    
		   jsonpCallback:"success_jsonp",    
		   timeout:3000,    
		   dataFilter:function(json){    
		       console.log("jsonp.filter:"+json);    
		       return json;    
		   },    
		   success:function(json,textStatus){    
		       console.log("jsonp.success:"+json.name);    
		   },    
		   error:function(XMLHttpRequest,textStatus,errorThrown){    
		       console.log("jsonp.error:"+textStatus);    
		   }    
		});    
		
		/*
		 $.get("http://demo.3ddcim.com/room/list_as_json/?page=1&start=0&limit=50",function(data,status){
    			//alert("Data: " + data + "\nStatus: " + status);
    			console.log("data : " , data , status)
  			});
		
		$.ajax({
             url:'http://demo.3ddcim.com/room/list_as_json/?_dc=1464530837811&page=1&start=0&limit=50',
             dataType:"jsonp",
             jsonp:"jsonpcallback",
             success:function(data){
                 console.log("data :" , data)
             }
        });

		$.ajax({
             type : "get",
             async:false,
             url : "http://demo.3ddcim.com/room/list_as_json/?page=1&start=0&limit=50",
             dataType : "jsonp",
             jsonp: "callbackparam",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
             jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
             success : function(json){
                 alert(json);
                 alert(json[0].name);
             },
             error:function(data){
             	 console.log("data error:" , data)
                 alert('fail');
             }
         });

		*/



	}
}