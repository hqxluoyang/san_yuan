
define([],
function(){
	
	var picWall = {
		sub:function(value1 , value2){
		        if(value1 == "") value1="0";
		         if(value2 == "") value2="0";
		         var temp1 = 0;
		         var temp2 = 0;
		         try{
		         value1=value1.toString();value2=value2.toString();
		         if(value1.indexOf(".") != -1)
		          temp1 = value1.length - value1.indexOf(".")-1;
		         if(value2.indexOf(".") != -1)
		          temp2 = value2.length - value2.indexOf(".")-1;
		         
		         var temp=0;
		         
		         if(temp1 > temp2)
		         temp = (parseFloat(value1) - parseFloat(value2)).toFixed(temp1);
		         else
		           temp = (parseFloat(value1)- parseFloat(value2)).toFixed(temp2);
		         
		         return parseFloat(temp);
		         }catch(e){return 0}
		    },
		getObjectArr:function(obj ,el){
			var arr=[];
			for(var i=0 ; i<obj.length;i++){
				arr.push(obj[i].el);
			}
			return arr;
		},
		getContainerWidth:function(){
			return parseInt($("#imgModule_file_list .jspContainer").get(0).style.height)
		},
		setImgWidth:function(containerWidth , arr){
			//if(containerWidth < 500) containerWidth =500;
			var result =  this.showImages(containerWidth, arr);
			var rows = result.rows ;
			var tmp = [];
			var rowLen=[];
			for(var t=0 ; t<rows.length ; t++){
				for(var j=0 ; j<rows[t].length ; j++){
					tmp.push(rows[t][j]);
				}
				rowLen.push(rows[t].length);
			}
			result.rows = tmp;
			result.rowLen = rowLen;
			return result;
			
		},
		showImages:function(containerWidth , realItems){
			var items = realItems,marginL=[];
			// calculate rows of images which each row fitting into
			// the specified windowWidth.
			//console.log("arr:" , realItems)
			var t={};
			var rows = [];
			while(items.length > 0) {
				rows.push(this.buildImageRow(containerWidth, items , marginL));
			}
			//console.log("rows:" , rows);
			t.rows = rows;
			t.marginL=marginL;
            return t;

		},
		
		buildImageRow:function(maxwidth, items , marginL){
			var row = [], len = 0;
			
			// each image a has a 3px margin, i.e. it takes 6px additional space
			var marginsOfImage = 1;

			// Build a row of images until longer than maxwidth
			
			while(items.length > 0 && len < maxwidth) {
				var item = items.shift();
				//alert(items[0])
				row.push(item);
				len += (item + marginsOfImage);
			}
			var delta = this.sub(len , maxwidth);

			// if the line is too long, make images smaller
			if(row.length > 0 && delta > 0) {

				// calculate the distribution to each image in the row
				var cutoff = this.calculateCutOff(len, delta, row);

				for(var i in row) {
					var pixelsToRemove = cutoff[i];
					item = row[i];
                    marginL.push(-Math.floor(pixelsToRemove / 2))
					row[i]=this.sub(row[i] , pixelsToRemove);
				}
			} else {
				for(var i in row) {
					//item = row[i];
					 marginL.push(0)
					//item.vx = 0;
					//item.vwidth = item.twidth;
				}
			}

			return row;
		},
		
		calculateCutOff:function(len, delta, items){
			// resulting distribution
			var cutoff = [];
			var cutsum = 0;

			// distribute the delta based on the proportion of
			// thumbnail size to length of all thumbnails.
			for(var i in items) {
				var item = items[i];
				var fractOfLen = item / len;
				cutoff[i] = Math.floor(fractOfLen * delta);
				cutsum += cutoff[i];
			}

			// still more pixel to distribute because of decimal
			// fractions that were omitted.
			var stillToCutOff = delta - cutsum;
			while(stillToCutOff > 0) {
				for(i in cutoff) {
					// distribute pixels evenly until done
					cutoff[i]++;
					stillToCutOff--;
					if (stillToCutOff <= 0) break;
				}
			}
			return cutoff
		}
		
	}
	return picWall;
});