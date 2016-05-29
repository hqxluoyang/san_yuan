define(["./picWall" , "../tools" , "../config"], function(picWall , tools , Config){
	var Album = function (title, startIndex) {
		this.title = title;
		this.start = startIndex;
		this.end = startIndex-1;
		this.$loadIndex = 0;
		this.widths = [];
		this.height = [];
		this.marginTops = [];
		this.marginLefts = [];
		this.srcs = [];
		this.$src = [];
		this.css=[];
		this.firstL=30;
		this.oritations = [];
		this.$imageWidth = [];
		this.cssAnim = [];
		this.visible = true;
		
	};

	Album.prototype.add = function(image) {
		var result = this.getImageWidth(image);
		
		this.$imageWidth.push(Math.floor(result.imageWidth));
		this.height.push(result.imageHeight);
		this.marginTops.push(result.marginTop);
		this.$src.push(Config.loadBase64);
		this.oritations.push(image.oritation);
		this.end = this.end + 1;
	};
	
	Album.prototype.addHead = function(i , image) {
		var result = this.getImageWidth(image);
		this.$imageWidth.splice(i,1,Math.floor(result.imageWidth));
		this.height.splice(i,1,result.imageHeight);
		this.marginTops.splice(i,1,result.marginTop);
		this.oritations.splice(i,1,image.oritation);
	};
	/**删除照片元素***/
	Album.del = function(albums , index){
		var flag = false;
		var flagStart = false;    //删除元素之后第一次开始不减1;
		var indexEl=0;
		albums[0].$loadIndex--;
		for(var i = 0; i < albums.length; i++){
			var album = albums[i];
			if(index >= album.start && index <= album.end){
				indexEl = index - album.start;
				album.srcs.splice(indexEl , 1);
				album.height.splice(indexEl , 1);
				
				album.oritations.splice(indexEl , 1);
				album.$imageWidth.splice(indexEl , 1);
				album.marginTops.splice(indexEl , 1);
				album.$src.splice(indexEl , 1);
				
				flag=true;
			}
			if(flag){
				if(flagStart){
					album.start--;
				}
				flagStart = true;
				album.end--;
				
			}
		}
	};
	
	Album.prototype.getImageWidth = function(image){
		var result={
				imageWidth:0 ,
				marginTop:0,
				imgeHeight:0
				
		};
		
		
		if(image.twidth == undefined) image["twidth"] = image["width"];
		if(image.theight == undefined) image["theight"] = image["height"];
		
		if(image.twidth/image.theight < 1){
			result.imageWidth = Config.imgHeight;
			result.imageHeight = image.theight/image.twidth * Config.imgHeight;
			result.marginTop = (Config.imgHeight -result.imageHeight)/2 ;
			//console.log("result:" , result , image)
		}else{
			result.imageWidth = image.twidth/image.theight * Config.imgHeight;
			result.marginTop=0;
			result.imageHeight = Config.imgHeight;
		}
		return result;		
	};
	
	
	Album.sortTga = function(files){
		
		for(var i=0 ; i<files.length ; i++){
			if(files[i].tag==""){
				files[i]["tagS"] = 1000;
			}else{
				files[i]["tagS"] = (files[i]["tag"].split("_"))[0];
			}
				
		}
		
		
		files.sort(function(a, b){
			if(a["tagS"]>b["tagS"]){
				return 1;
			}else{
				return -1;
			}
		});
		
	};
	
	Album.createAlbums = function(files , timeApp , language){
		var title=0;
		
		var album;
		var albums = [];
		//console.log("timeApp:" , timeApp)
		
		if(timeApp != "time"){
			Album.sortTga(files);
		}
		
		
		for(var i = 0; i < files.length; i++){
				if(timeApp == "time"){
					title = files[i].date.slice(0,10);
					
				}else{
					title = files[i]["tag"] || language["changeLang"]["myPic"];
					
					if(title){
						var temp = title.split("_");
						title = temp[1] || title;	
					}
					
				}
			   
				if(!album || album.title != title){
					album = new Album(title, i);
					albums.push(album);
					
				}
				album.add(files[i]);
				
		}
				
			if(!files || files.length<=0){
				//tempT ? newtitle = tempT : newtitle = title ;
				album = new Album(0, i);
				albums.push(album);
			}
		
		return albums;
	};

	Album.updateSrc = function(albums, index, src){
		for(var i = 0; i < albums.length; i++){
			var album = albums[i];
			//const newArr = [];
			if(index >= album.start && index <= album.end){
				try{
					//album.srcs.splice(index - album.start , 1 , src);
					album.srcs.$set(index - album.start, src);
					
				//	newArr.splice(index - album.start , 1 , src);
					
				}catch(e){
					  //album.srcs[index - album.start] = src;
				}
				//album.srcs.splice(index - album.start , 1 , src);
				/*if(album.srcs.set){
					album.srcs.set(index - album.start, src);
				}else{
					album.srcs[index - album.start] = src;
					
				}
				*/
			}
			
		//	album.srcs = newArr;
			
		}
	}
	
	Album.getSrc = function(albums , index){
		for(var i = 0; i < albums.length; i++){
			var album = albums[i];
			if(index >= album.start && index <= album.end){
				if(album.srcs.set){
					
					return album.srcs[index - album.start];
				}else{
					return album.srcs[index - album.start];
					
				}
			}
		}
	}
	Album.adjustWidth = function(albums, containerWidth){
		var widthAndMagin;
		var line = (tools.getPageHeight() - 135)/Config.imgHeight;
		var allLength = 0;
		var flag=true;
		if(!albums) return;
		for(var i = 0; i < albums.length; i++){
			var album = albums[i];
			widthAndMagin = picWall.setImgWidth(containerWidth , album.$imageWidth.slice());
			album.widths = widthAndMagin.rows;
			album.marginLefts = widthAndMagin.marginL;
			if(flag){
				if(widthAndMagin.rowLen.length>line){
					flag = false;
					for(var k=0 ; k<line ; k++ ){
						allLength = allLength + widthAndMagin.rowLen[k];
					}
					albums.firstL = allLength;
				}else{
					/*
					for(var k=0 ; k<widthAndMagin.rowLen.length ; k++ ){
						allLength = allLength + widthAndMagin.rowLen[k];
					}
					*/
				}
			}
			
		}
		
	}
	/*
	Album.getHeight = function(albums , width,){
		var height = tools.getPageHeight() - 135;
		var l=0;
		var picwidth=0;
		for(var i=0 ; i<albums.length;i++){
			for(var j=0 ; j<albums[i].widths.length;j++){
				picwidth=picwidth+albums[i].widths[j];
				if(width<picwidth){
					l++;
				}else{
					t
				}
			}
		//	if(i*180 >height) return l;
			
		}
	}
	*/
	Album.loadNextPage = function (albums , flag){
		if(!albums || albums.length === 0) return;
		var pageSize = 30;
		if(flag && albums.firstL){
			pageSize = albums.firstL;
		} 
		//console.log("pageSize:" , pageSize);
		if(pageSize < 30) pageSize = 30;
		var start = albums[0].$loadIndex;
		if(start == undefined) return;
	//	console.log("loadIndex:" , albums[0].$loadIndex)
		var end = Math.min(start + pageSize, albums[albums.length - 1].end + 1);
	    	
		albums[0].$loadIndex = end;
		//console.log(start , end , albums[albums.length - 1].end , pageSize)
		
		Album.pushSrc(albums , start , end);
		/*
		for(var i = start; i < end; i++){
			//console.log("start i:" , i)
			Album.pushToSrc(albums, i);
		}
		*/
		
		//console.log("return start end:" , start , end)
		return {start:start , end:end};
	}
	
	Album.pushSrc = function(albums , start , end){
		
		var newArr=[];
		var index=0;
	//	console.log("albums:" , albums)
		if(!albums) return;
		for(var j=0 ; j<end-start ; j++){
			for(var i = 0; i < albums.length; i++){
				var album = albums[i];
				index = start + j;
				
				newArr[i]==undefined ? newArr[i]=[] : "";
				if(index >= album.start && index <= album.end){
					var tmpIndex = index - album.start
					//console.log("tmpIndex: setSrc:" , tmpIndex , index);
					newArr[i].push(album.$src[tmpIndex]);
					break;
					//album.srcs.push(album.$src[tmpIndex]);
				}
			}		
		}
		
		//console.log("newArr:" , newArr)
		
		for(var i=0 ; i<albums.length ; i++){
			if(newArr[i]){
				
				for(var j=0 ;j<newArr[i].length ; j++){
					//albums[i].srcs.push(newArr[i][j])
					//albums[i].srcs.$set(j , newArr[i][j])
				}
				//albums[i].srcs.pushArray(newArr[i]);
			}
		}
		
	}
	
	
	Album.pushToSrc = function(albums, index){
		for(var i = 0; i < albums.length; i++){
			var album = albums[i];
			if(index >= album.start && index <= album.end){
				var tmpIndex = index - album.start
				//console.log("tmpIndex: setSrc:" , tmpIndex , index);
				//album.srcs.push(album.$src[tmpIndex]);
				album.srcs.$set(tmpIndex , album.$src[tmpIndex])
			}
		}		
	}
	
	Album.find = function(albums , index){
		for(var i = 0; i < albums.length; i++){
			var album = albums[i];
			if(index >= album.start && index <= album.end){
				return album;
			}
		}	
	};
	
	return Album;
});