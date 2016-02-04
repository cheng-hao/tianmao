//1获取类名函数
//IE8不兼容解决方法
function getclass(classname,obj){
		var obj=obj||document;
		if(obj.getElementsByClassName){
			return obj.getElementsByClassName(classname) 
		}else{
			var all=obj.getElementsByTagName("*");
			var arr=[];
			for(var i=0;i<all.length;i++){
				if(cheakrel(all[i].className,classname)){
					arr.push(all[i])	
				}
			}
			return arr;
		}
	
	function cheakrel(str,val){
		var newarr=str.split(" ");
		for(var j=0;j<newarr.length;j++){
			if(newarr[j]==classname){
				return true;
			}
		}
		return false;
	}
}
//	
//obj 哪个对象用这个函数
//val接收第二个参数，表示设置一个文本
function gettext(obj,val){
	if(val==undefined){//如果是未定义表示只有一个参数
		if(obj.innerText){//判断是不是ie8浏览器
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}else{
		if(obj.innerText||obj.innerText==""){
			obj.innerText=val;
		}else{
			obj.textContent=val;
		}
	}
}
/*var aa=getclass("aa")[0];
	var bb=getclass("bb")[0];
	var btn=document.getElementsByName("btn")[0];
	btn.onclick=function(){
		gettext(bb,gettext(aa))
	}*/
	

//3.获取样式
//obj:要获取的对象  attr：要获取的属性
/*function getstyle(obj,attr){
	if(obj.currentStyle.attr){//判断是不是ie8
		return obj.currentStyle[attr];
	}else{//否则是w3c浏览器
		return getComputedStyle(obj,null)[attr];
	}
}*/
function getstyle(obj,attr){
     if(obj.currentStyle){//判断ie8是否可行
        return obj.currentStyle[attr];
        }else{//是w3c浏览器
        return getComputedStyle(obj,null)[attr];
}
}

//4.获取类名，id名，标签名
function $(select,obj){
		var obj=obj||document
		if(typeof select=="string"){
			select.replace(/^\s*|\s*$/g,"")//去掉字符串前后的空格用空字符串替换
			if(select.charAt(0)=="."){
				return getclass(select.slice(1),obj)
			}else if(select.charAt(0)=="#"){
				return obj.getElementById(select.slice(1))
			}else if(/^[a-z|1-6]{1,10}$/g.test(select)){
				return obj.getElementsByTagName(select)
			}
		}else if(typeof select=="function"){
			window.onload=function(){
				select();
			}
		}
	}

	//5.获取元素子节点的兼容函数
	//原理：先获取所有儿子
	function getChilds(parent,b){//传入父元素
		var type=type||"a"
		var childs=parent.childNodes//所有儿子
		var arr=[];
		for(var i=0;i<childs.length;i++){
			if(type=="a"){
				if(childs[i].nodeType==1){
				arr.push(childs[i]);
			}
			}else if(type=="b"){
				if(childs[i].nodeType==1||(
            childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,""))){
            arr.push(childs[i]);
        }
	}
	}
	return arr
}

//6.获得第一个节点
function getfirst(parent){
	return getChilds(parent)[0];
}
//7.获得最后一个子节点
function getlast(parent){
	return getChilds(parent)[getChilds(parent).length-1]
}
//8.获得一个指定节点
function getnum(parent,num){
	return getChilds(parent)[num]
}
//9.获得下一个兄弟节点
function getnext(obj){
	var next=obj.nextSibling;
	if(next==null){
			return false
		}
	while(next.nodeType==3||next.nodeType==8){
		next=next.nextSibling;
		if(next==null){
			return false
		}
	}
	return next;
}
//10.获取上一个兄弟节点
function getup(obj){
	var up=obj.previousSibling;
	while(up.nodeType==3||up.nodeType==8){
		up=up.previousSibling;
		if(up==null){
			return false
		}
	}
	return up;
}
//11插入到某个对象之后
//对象.insertBefore(obj1,obj2)obj1:要插入的对象obj2:哪个对象之后
//插入到下一个对象之前
//重点  给对象的原型添加此方法
//原理：找到第二个参数的下一个兄弟节点，将第一个参数插入到此兄弟节点之前（插入到下一个对象之前）
Object.prototype.insertAfter=function(obj1,obj2){
	var next=getnext(obj2);
	if(next){
		this.insertBefore(obj1,next);
	}else{
		this.appendChild(obj1);
	}
}
//12.方法（一）获取滚动条与页面顶部距离的  
//var obj=document.documentElement.scrollTop?document.documentElement:document.body;
//var scrollT=obj.scrollTop;
//方法（二）
//var scrollT=document.documentElement.scrollTop||document.body.scrollTop
// 兼容函数
function getscrollt(){
	var scrollT=document.documentElement.scrollTop||document.body.scrollTop;
	return scrollT
}
//var scrollT=getscrollt
//document.title=scrollT;
//13.同一个元素添加多个事件的兼容函数
//obj:给哪个对象添加
//ev:什么事件
//fun:事件处理程序
function addEvent(obj,ev,fun){
	if(obj.addEventListener){
		return obj.addEventListener(ev,function(){fun.call(obj)},false)
	}else{
		return obj.attachEvent("on"+ev,function(){
			fun.call(obj);
		});//在ie8中，this不指当前对象，指window
	}
}
//同一个元素删除事件的兼容函数
function removeEvent(obj,ev,fun){
	if(obj.removeEventListener){
		return obj.removeEventListener(ev,function(){fun.call(obj)},false)
	}else{
		return obj.detachEvent("on"+ev,function(){
			fun.call(obj);
		});//在ie8中，this不指当前对象，指window
	}
}

//获取浏览器宽高
function getCW(){
	return document.documentElement.clientWidth;
}
function getCH(){
	return document.documentElement.clientHeight;
}
//拖拽效果
function drag(obj){
	
}

// 给对象添加滚轮事件
//obj:哪个对象添加滚轮事件
//upfun：处理滚轮向上的函数
//downfun：处理滚轮向下的函数
	function mouseWheel(obj,upfun,downfun){
		if(obj.attachEvent){
			obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
			}else if(obj.addEventListener){
			obj.addEventListener("mousewheel",scrollFn,false);
			//chrome,safari -webkit-
			obj.addEventListener("DOMMouseScroll",scrollFn,false);
			//firefox -moz-
			}
			function scrollFn(e){
				var ev=e||window.event;
				if(ev.preventDefault){ev.preventDefault(); //阻止默认浏览器动作(W3C)
				}else{ev.returnValue = false;}//IE中阻止函数器默认动作的
				var num=ev.detail||ev.wheelDelta;
				if(num==-3||num==120){
					if(upfun){
						upfun()
					}
				}
				if(num==3||num==-120){
					if(downfun){
						downfun()
					}
				}
			}
	}
	//var box=$(".box")[0];
	//mouseWheel(box,function(){box.innerHTML="向上"},function(){box.innerHTML="向下"})
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
//阻止事件流的兼容函数
function zzsjl(obj){
		obj.onclick=function(e){
		var ev=e||window.event;
		if(ev.stopPropagation){
			return ev.stopPropagation();
		}else{
			return ev.cancelBubble=true;
		}
	}
}
