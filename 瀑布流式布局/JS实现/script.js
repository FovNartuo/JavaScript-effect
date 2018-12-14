window.onload=function(){
    // 1瀑布流布局是相对于每一个box元素布局的,可以封装成一个函数,可想而知这个函数接受两个参数:从哪来的元素(它的父元素),作用的元素
    waterfall("main","box");    //瀑布流布局
    // 37模拟后台数据块(JSON)
    var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"}]};

    // 24瀑布流第二个效果，随着滚轮往下滚动，图片不断加载
    window.onscroll = function(){
        // 25判断滚动条范围来确定何时加载
        if(checkScrollSlide){
            var oParent = document.getElementById("main");
            // 31将数据块渲染到当前页面的尾部
            for(var i=0; i<dataInt.data.length; i++){
                // 32新加载的图片放在哪里,得先有一个div盒子,pic盒子,才能存放新加载的图片
                var oBox = document.createElement("div");   // 33创建一个div元素
                oBox.className = "box";     // 34该div元素的class为box
                oParent.appendChild(oBox);  // 35将子元素插入到父元素的最后
                // 36创建pic盒子
                oPic = document.createElement("div");
                oPic.className = "pic";
                oBox.appendChild(oPic);
                // 38创建img元素
                var oImg = document.createElement("img");
                oImg.src = "images/" + dataInt.data[i].src;
                oPic.appendChild(oImg);
            };
            // 39以上完成了新加载的图片放在页面上,但没有进行瀑布流布局,调用waterfall函数来确定新加载图片该插入的位置
            waterfall("main","box");
        }
    }
}

//2瀑布流布局函数
function waterfall(parent,box){
    // 3获取到父元素
    var oParent = document.getElementById("main");
    // 4将main下所有class为box元素取出,将这样的功能封装成一个函数,可想而知它接受两个参数:从哪来的元素(它的父元素),作用的元素
    var oBoxs = getByClass(oParent,box);
    //9已经得到了所有的box元素,那么下面就该考虑如何排列显示这些元素
    //10计算整个页面要显示的列数(页面宽度/每个图片的宽度)
    var oBoxWidth = oBoxs[0].offsetWidth;   //11每个box元素的宽度
    var pageWidth = document.documentElement.clientWidth;   //12页面的总宽度
    var cols = Math.floor(pageWidth/oBoxWidth);     //13页面可以显示的图片列数
    // 14确定了列数,但在改变浏览器大小时,列数会改变,因为没有确定main的宽度
    // 15设置main的宽度,并居中
    oParent.style.cssText="width:"+oBoxWidth*cols+"px;margin:0 auto;";
    // 16瀑布流用给每张图片的元素进行绝对定位实现，那就需要top/left值，下面获取高度值（top值）
    //   实现瀑布流布局需要每张图片和第一行图片排列在一起,这样就需要获取第一行图片高度的最低值
    // 17存放每一列高度的数组
    var heightArr=[];
    for(var i=0; i<oBoxs.length; i++){  
        if(i<cols){     // 18第一个行图片的高度先存储到数组中
            heightArr.push(oBoxs[i].offsetHeight)
        }else{
            // 19计算一行图片中最低的高度值(Math.min方法只能作用一组数据,不能用于数组),apply改变方法中的this指向了数组
            var minHeight = Math.min.apply(null,heightArr);
            // 20获取一行图片高度最低值的索引值
            var index = getMinIndex(heightArr,minHeight);
            // 21找到高度最低的图片位置，就可以计算当前图片距离网页右边距（x轴距离）
            var distLeft = oBoxWidth*index;
            // 22瀑布流布局图片需要绝对定位，就需要top值，left值
            oBoxs[i].style.position ="absolute";
            oBoxs[i].style.top = minHeight+"px";
            oBoxs[i].style.left = distLeft+"px";
            // 23此刻数组中存储的高度值不变，最小值永远都是那个，需要在加载之后改变最低值的元素
            heightArr[index] += oBoxs[i].offsetHeight;
        }
    }
}

// 5从父元素获取它的所有class为box的子元素的函数
function getByClass(parent,clsName){
    var boxArray = new Array(),     //6用来存储获取到的所有class为box的元素
        oElement = parent.getElementsByTagName("*");    //7获取父元素下所有的子元素
    for(var i=0; i<oElement.length; i++){       //8循环遍历判断获取到class为box的子元素
        if(oElement[i].className == clsName){
            boxArray.push(oElement[i]);
        }
    }
    return boxArray;
}

// 21获取高度最低值的索引值封装成函数,它接受两个参数:需要查找的数组,目标元素
function getMinIndex(arr,val){
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}

// 26 检测是否具备了滚条加载数据块的条件，以可视窗口最后一个图片出现一半为准
function checkScrollSlide(){
    var oParent = document.getElementById("main");
    // 获取main下所有的box元素
    var oBoxs = getByClass(oParent,"box");
    // 27最后出现的图片距离整个页面的距离+该图片高度的一半
    var lastBoxHeight = oBoxs[oBoxs.length-1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    // 28相对于最后一个图片，整个页面滚动的距离,这等于页面相对于浏览器可视窗口滚走的距离+可是窗口的高度
    // 29页面滚走距离,存在标准模式与混杂模式
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 30浏览器可视窗口高度
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return(lastBoxHeight<scrollTop+height)?true:false;
}