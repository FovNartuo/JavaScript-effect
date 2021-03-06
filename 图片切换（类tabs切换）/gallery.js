// 修改图片显示路径
function showPic(whichpic){
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    placeholder.setAttribute("src",source);

    var text=whichpic.getAttribute("title");
    var description=document.getElementById("description");
    description.firstChild.nodeValue=text;
}

//点击事件处理
function prepareGallery(){
    if(!document.getElementById)    return false;
    if(!document.getElementsByTagName)  return false;
    if(!document.getElementById("imagegallery"))    return false;
    var gallery=document.getElementById("imagegallery");
    var links=document.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick=function(){
            showPic(this);
            return false;
        }
    }
}

//预加载
function addLoadEvent(func){
    var oldonload=window.onload;
    if(typeof window.onload != "function"){
        window.onload=func;
    }else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}
addLoadEvent(prepareGallery);

























