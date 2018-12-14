function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}

function startMove(obj,attr,iTarget,fun){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        // 取当前值
        var icur=0;
        if(attr == "opacity"){
            icur=parseFloat(getStyle(obj,attr))*100;
        }else{
            icur=parseInt(getStyle(obj,attr));
        }
        // 计算速度
        var speed=(iTarget-icur)/8;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);
        // 检测停止
        if(icur == iTarget){
            clearInterval(obj.timer);
            if(fun){        //当存在第四个参数fun时，调用这个fun函数
                fun();
            }
        }else{

            if(attr == "opacity"){
                obj.style.filter="alpha(opacity=)"+(icur+speed)+")";
                obj.style.opacity=(icur+speed)/100;
            }else{
                obj.style[attr] = icur+speed+"px";
            }
            
        }
    },30)
}