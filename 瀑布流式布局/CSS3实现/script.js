// css3实现瀑布流式布局，但它的随着滚轮加载图片的功能还是需要JS实现

window.onload = function(){
    // 瀑布流第二个效果，随着滚轮往下滚动，图片不断加载
    window.onscroll = function(){
        // 判断滚动条范围来确定何时加载
        if(checkScrollSlide){
            var oParent = document.getElementById("main");
            // 将数据块渲染到当前页面的尾部
            for(var i=0; i<dataInt.data.length; i++){
                // 新加载的图片放在哪里,得先有一个div盒子,pic盒子,才能存放新加载的图片
                var oBox = document.createElement("div");   // 创建一个div元素
                oBox.className = "box";     // 该div元素的class为box
                oParent.appendChild(oBox);  // 将子元素插入到父元素的最后
                // 创建pic盒子
                oPic = document.createElement("div");
                oPic.className = "pic";
                oBox.appendChild(oPic);
                // 创建img元素
                var oImg = document.createElement("img");
                oImg.src = "images/" + dataInt.data[i].src;
                oPic.appendChild(oImg);
            };
        }
    }
}
var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"}]};

// 检测是否具备了滚条加载数据块的条件，以可视窗口最后一个图片出现一半为准
function checkScrollSlide(){
    var oParent = document.getElementById("main");
    // 获取main下所有的box元素
    var oBoxs = getByClass(oParent,"box");
    // 最后出现的图片距离整个页面的距离+该图片高度的一半
    var lastBoxHeight = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    // 相对于最后一个图片，整个页面滚动的距离,这等于页面相对于浏览器可视窗口滚走的距离+可是窗口的高度
    // 页面滚走距离,存在标准模式与混杂模式
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 浏览器可视窗口高度
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return(lastBoxHeight<scrollTop+height)?true:false;
}