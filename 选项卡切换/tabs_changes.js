window.onload=function(){
	var Tab = document.getElementById("tabs");
	var li = document.getElementsByTagName("li");
	var div = Tab.getElementsByTagName("div");			//Tabs.get...是为了定义className作用对象id为tabs下的所有文本div
	
	for(var i=0; i<li.length; i++){						//遍历所有选项卡标题,获取所有i编号的元素
		li[i].index = i;  								//定义一个index属性对li进行编号
		li[i].onclick = function(){						//再注册一个点击事件，当点击的时候所有标签都恢复最初状态
			for(var i=0; i<li.length; i++){				//这步是相对于未被点击部分的样式
				li[i].className = "";
				div[i].className = "hide";
			}											//以下是对选项卡标题和相应的内容一一匹配
			this.className = "on";						//对点击事件添加相应的属性
			div[this.index].className = "";				//通过之前的index编号绑定的指定div
		}
	}
}