function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,false)[attr];
    }
}

// 修改attr,iTarget为json
function startMove(obj,json,fun){
    var flage=true;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        // 循环json中每个对值进行运动
        for(var attr in json){
            // 取当前值
            var icur=0;
            if(attr == "opacity"){
                icur=parseFloat(getStyle(obj,attr))*100;
            }else{
                icur=parseInt(getStyle(obj,attr));
            }
            // 计算速度
            var speed=(json[attr]-icur)/8;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            // 检测停止
            if(icur != json[attr]){
                flage=false;
            }
            if(attr == "opacity"){
                obj.style.filter="alpha(opacity=)"+(icur+speed)+")";
                obj.style.opacity=(icur+speed)/100;
            }else{
                obj.style[attr] = icur+speed+"px";
            }
            if(flage){
                clearInterval(obj.timer);
                if(fun){
                    fun();
                }
            }    
        }
    },30)
}