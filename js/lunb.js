window.onload=function(){
	//选项卡
	var word=getclass("words")
	var conbox=getclass("dapai-img")
	for(var i=0;i<word.length;i++){
		word[i].index=i;
		word[i].onclick=function(){
			for(var j=0;j<conbox.length;j++){
				conbox[j].style.display="none";
				word[j].style.fontWeight="normal";
				word[j].style.textDecoration="none";
			}
			conbox[this.index].style.display="block";
			this.style.fontWeight="bold";
			this.style.textDecoration="underline";
		}
	}
	//桃心
	var box=getclass("tu");
	var xin=getclass("xin");
	    for(var i=0;i<box.length;i++){
		   box[i].index=i;
		   box[i].onmouseover=function(){
		   xin[this.index].style.display="block";
	       }
	       box[i].onmouseout=function(){
		   xin[this.index].style.display="none";	
	       }
        }
	//输入框
var text=$(".shuruk")[0];
text.onfocus=function(){
	this.style.color="#222";
	if(this.value=="施华洛世奇华丽入驻,璀璨好礼疯狂送"){
		this.value="";
	}
}
text.onblur=function(){
	if(this.value==""){
		this.value="施华洛世奇华丽入驻,璀璨好礼疯狂送"
	}else{
		this.value="施华洛世奇华丽入驻,璀璨好礼疯狂送"
	}
}
var text2=$(".searchk")[0];
text2.onfocus=function(){
  this.style.color="#222";
  if(this.value=="施华洛世奇华丽入驻，璀璨好礼疯狂送"){
    this.value="";
  }
}
text2.onblur=function(){
  if(this.value==""){
    this.value="施华洛世奇华丽入驻，璀璨好礼疯狂送"
  }else{
    this.value="施华洛世奇华丽入驻，璀璨好礼疯狂送"
  }
}
//大轮播图
		var images=$(".images2");
		var bts=$(".bts");
		var num=1;
		var bottom=$("#nav-bottom")
		var arr1=["#ed402f","#dadada","#ed402f","#dadada","yellow","#dadada"]
		function move(){
			if(num==6){
				num=0
			}
			for(var i=0;i<images.length;i++){
				images[i].style.zIndex=2;
				bts[i].style.background="#000";
				bts[i].style.color="#fff";
			}
			images[num].style.zIndex=3;
			bottom.style.background=arr1[num];
			bts[num].style.background="#fff";
			bts[num].style.color="#000";
			num++;
		}
		var t=setInterval(move,2000)
		for(var i=0;i<bts.length;i++){
      		bts[i].index=i;
      		bts[i].onmouseover=function(){
      			clearInterval(t);
      			for(var j=0;j<bts.length;j++){
      				images[j].style.zIndex=2;
                    bts[j].style.background="#000";
                    bts[j].style.color="#fff";
      			}
      			images[this.index].style.zIndex=3;
      			bts[this.index].style.background="#fff";
      			bts[this.index].style.color="#000";
      			bottom.style.background=arr1[this.index];
      		}
      		bts[i].onmouseout=function(){
      			t=setInterval(move,2000);
      			num=this.index+1;
      		}
      	}
    //楼层轮播
for(var i=0;i<12;i++){
    lunbo(i)
   }
function lunbo(b){
      	var imgbox=$(".bigimgbox")[b];
        var imgz=$(".imgbox");
        var btn1=$(".btns1")[b];
        var btn2=$(".btns2")[b];
        //alert(imgz.length)
		  function moveleft(){
			var first=getfirst(imgbox);
			var last=getlast(imgbox);
			imgbox.insertAfter(first,last);
      //for(var i=0;i<imgz.length;i++){}
			animate(imgz,{left:-131},800,Tween.Linear,function(){imgbox.appendChild(first);
				imgbox.style.left=0;})
		}
		function moveright(){
		var first=getfirst(imgbox);
       var last=getlast(imgbox);
       last.style.left=-131+"px";
       imgbox.insertBefore(last,first);
       animate(imgbox,{left:400},800,Tween.Linear);
	}
	btn1.onmouseover=btn2.onmouseover=function(){
		clearInterval(t);
	}
	btn1.onclick=function(){
         moveright();
	}
	btn2.onclick=function(){
         moveleft();
	}
	btn1.onmouseout=btn2.onmouseout=function(){
		t=setInterval(moveleft,2000);
	}
      	}

//楼层跳转
var search=$(".search")[0];
var floors=$(".aaa");
var jump=$(".jumpp")[0];
var btnn=$("li",jump);
var ch=document.documentElement.clientHeight;
//按钮控制滚动条
        for(var i=0;i<btnn.length;i++){
        	btnn[i].index=i;
        	btnn[i].onclick=function(){
            var obj=document.documentElement.scrollTop?document.documentElement:document.body;
            animate(obj,{scrollTop:floors[this.index].offsetTop},300,Tween.Linear);
        	}
        }
     	window.onscroll=function(){
     		//搜索框的显示与隐藏
     		var flag=true;
			  var flag1=true;
     		var scrollT=getscrollt();
     		if(scrollT>=300){
     			if(flag){
     				animate(search,{top:0},400);
     				flag=false;
     				flag1=true;
     			}     			
     		}else{
                if(flag1){
                	animate(search,{top:-50});
                	flag1=false;
                	flag=true;
                }	   			
     		}
     		//楼层跳转
	        if(scrollT>=280){
	        	jump.style.display="block";
	        }else{
	        	jump.style.display="none";
	        }
		//滚动条控制按钮
            for(var i=0;i<floors.length;i++){
            	floors[i].t=floors[i].offsetTop;
            	if(floors[i].t<scrollT+ch/2){//如果scrollTop大于当前楼层的top
            		for(var j=0;j<btnn.length;j++){
            			btnn[j].style.background="#666";
            		}
            		btnn[i].style.background="red";
            	}
            	
            }
     	}
//下拉菜单
      var yiji=$(".yiji1");
      var erji=$(".erji");
      for(var i=0;i<yiji.length;i++){
        yiji[i].index=i;
        hover(yiji[i],function(){
          var lis=$("li",erji[this.index]);//找当前二级菜单下的li;
          var h=lis[0].offsetHeight;
          erji[this.index].style.height=0+"px";
          animate(erji[this.index],{height:lis.length*h},600,Tween.Linear);
        },function(){
          animate(erji[this.index],{height:0},600,Tween.Linear);
        })
      }
/*//按需加载
      var floors=$(".ccc");
      var ch=document.documentElement.clientHeight;//浏览器高度
      window.onscroll=function(){
        var scrollT=getscrollt();//滚动条距离顶部的距离
        //alert(floor[0].offsetTop)
        for(var i=0;i<floors.length;i++){
        if(floors[i].offsetTop<scrollT+ch){//当前楼层到顶部的高度如果小于页面内容超出浏览器的距离+浏览器的距离时
                var imgs=$("img",floors[i]);//获取当前楼层的所有图片
                for(var j=0;j<imgs.length;j++){//遍历图片
                  imgs[j].src=imgs[j].getAttribute("cc");//把每一个图片的aa属性的值赋值给src属性即可
                }
                //alert(imgs.length)
        }
      }
      }*/
      //图片左移
      function zuoyi(s){
        var rightimg=$(".rightimg")[s];
        var imgyi=$("img",rightimg);
      for(var i=0;i<imgyi.length;i++){
          imgyi[i].index=i;
          imgyi[i].onmouseover=function(){
          imgyi[this.index].style.cssText="position:relative;left:-2px;box-shadow:1px 5px 0px rgba(0,0,0,0.1);"
        }
        imgyi[i].onmouseout=function(){
          imgyi[this.index].style.cssText="position:relative;left:0px;box-shadow:1px 0px 0px rgba(0,0,0,0.1);"
        }
    }
  } 
  for(var j=0;j<12;j++){
          zuoyi(j)
        }

//侧栏
var celan=$(".celan")[0];
var spann=$("span",celan);
var as=$(".as");
for(var i=0;i<as.length;i++){
  as[i].index=i;
  as[i].onmouseover=function(){
      spann[this.index].style.display="block";
      //animate(spann[this.index],{left:180},600,Tween.Linear)
  }
  as[i].onmouseout=function(){
    spann[this.index].style.display="none";
  }
}
//导航二级
var bottomleft=$(".bottom-left")[0];
var lii=$("li",bottomleft);
var submenu=$(".submenu");

for(var i=0;i<lii.length;i++){
  lii[i].index=i;
  lii[i].onmouseover=function(){
    submenu[this.index].style.display="block"
  }
  lii[i].onmouseout=function(){
    submenu[this.index].style.display="none"
  }
}

}