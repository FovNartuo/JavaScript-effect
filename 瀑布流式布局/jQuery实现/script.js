$(window).on("load",function(){
    // 静态布局
    waterfall();
    // 模拟后台数据块(JSON)
    var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"}]};
    // 滚条滚动事件
    $(window).on("scroll",function(){
        // 判断滚条滚动到什么时候开始加载新图片
        if(checkScrollSlide){
            // 具备加载数据块的条件之后，遍历模拟的后台数据块，依次加载每个数据
            $.each(dataInt.data,function(key,value){
                // 创建div元素设置class为box，添加到父元素main之后
                var oBox = $("<div>").addClass("box").appendTo($("#main"));
                // 创建div元素设置class为pic，添加到父元素box之后
                var oPic = $("<div>").addClass("pic").appendTo($(oBox));
                // 添加img元素，设定它的src属性。$(value).attr("src")确定src属性的值。value必须加$符，将JS原生对象转化成jQuery对象
                var oImg = $("<img>").attr("src","images/"+$(value).attr("src")).appendTo($(oPic));
            })
            waterfall();
        }
    })
})

function waterfall(){
    // 选取父元素main中一级div元素
    var boxs = $("#main>div");
    // 每一张图片的宽度，eq(0)选择第一张图片，因为都是等宽的。outerWidth()方法返回第一个匹配元素的外部宽度，因为定义样式时有设置了padding值。
    var colsWidth = boxs.eq(0).outerWidth();
    // 整个页面一行可以排列图片的列数，单位像素只接受整数。列数 = 页面宽度 / 每张图片的宽度。
    var cols = Math.floor($(window).width()/colsWidth);
    // 有了图片的列数和每张图片的宽度，据此可以设置页面的宽度，这样能够保持在改变浏览器大小时不会改变一行图片的排列。同时设置页面居中显示。
    $("#main").width(colsWidth*cols).css("margin","0 auto");

    // 下面确定第二行开始的图片该插入的位置
    // 定义一个数组用来存放每一列的高度
    var heightArr = [];
    // each()方法遍历每一个元素，接受两个参数，index：选择器的 index 位置；value：当前的元素
    boxs.each(function(index,value){
        // height变量存放每一张图片的高度
        var height = boxs.eq(index).outerHeight();
        if(index < cols){       // 第一行图片高度存入数组
            heightArr[index] = height;
        }else{
            // 寻找数组中高度值最小的元素
            var minHeight = Math.min.apply(null,heightArr);
            // $.inArray()函数用于在数组中查找指定值，并返回它的索引值。寻找高度值最小的元素位置。
            var minHeightIndex = $.inArray(minHeight,heightArr);
            // 有了高度最小值也就是top值，还有了高度值最小的元素位置，可以计算出该元素距离页面左边界的距离，也就是left值，因此可以设定第二行开始待插入图片的位置
            $(value).css({      //value必须加$符，将DOM对象转化成jQuery对象，才可以使用jQuery的css方法
                "position":"absolute",
                "top":minHeight+"px",
                "left":minHeightIndex*colsWidth+"px"
            });
            // 更新数组中高度最小值
            heightArr[minHeightIndex] += boxs.eq(index).outerHeight();
        }
    })
}
// 检测是否具备了滚条加载数据块的条件，以可视窗口最后一个图片出现了一半为准
function checkScrollSlide(){
    // 获取最后一个出现的图片
    var lastBox = $("#main>div").last();
    // 比较两个高度值，第一个是最后出现图片相对页面上边界距离+该图片自己身高度一半
    var lastBoxdist = lastBox.offset().top+Math.floor(lastBox.outerHeight()/2);
    // 第二个是页面相对于浏览器可视窗口滚走的距离，
    var scrollTop = $(window).scrollTop();
    // 加上可视窗口的高度
    var documentHeight = $(window).height();
    // 两个高度值比较，第一个小于第二个时条件具备了
    return (lastBoxdist < scrollTop+documentHeight)?true:false;
}