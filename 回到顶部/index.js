// 思路：
// 1、页面加载完毕后读取JS
// 2、获取回到顶部所在的的标签
// 3、绑定点击事件
// 4、点击按钮回到顶部，就需要获取当前位置距离顶部的距离scrollTop
// 5、设置scrollTop数值，做自减可以不断往上滚动
// 6、但所需要的效果是自动回到顶部，这就用到了动画效果，设置定时器setInterval()函数
// 7、如果距离顶部距离为0，则清除定时器clearInterval()
// 8、所需要的效果是从快到慢的速度回到顶部，第5步不做自减而是减去对距离顶部的距离做除法运算所得值
// 9、做除法带来的问题就是无法整除时就无法得到距离顶部距离为0，也就是无法真正回到顶部
// 10、回到顶部过程中点击页面触发暂停，用到onscroll事件
// 11、滚动到第二屏时才显示“回到顶部”功能，就需要获取可视区高度用到clientHeight


window.onload=function(){                                           //1
    var btn=document.getElementById("btn");                         //2
    var clientHeight=document.documentElement.clientHeight;         //11
    var timer=null;                                                 //6
    var istop=true;                                                 //10
    window.onscroll=function(){                                     //10
        var dtop=document.documentElement.scrollTop;                //11
        if(dtop >= clientHeight){
            btn.style.display="block";
        }else{
            btn.style.display="none";
        }
        if(!istop){                                                 //10
            clearInterval(timer);
        }
        istop=false;
    }
    btn.onclick=function(){                                         //3
        timer=setInterval(function(){                               //6
            var dtop=document.documentElement.scrollTop;            //4
            var speed=Math.floor(-dtop/10);                         //8
            document.documentElement.scrollTop = dtop+speed;        //5、document.documentElement.scrollTop -= dtop;
                                                                    //9
            istop=true;                                             //10
            if(dtop==0){                                            //7
                clearInterval(timer);
            }
        },30)   
    }
}