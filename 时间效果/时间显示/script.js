window.onload=function(){
    showTime();
}

function checkTime(i){
    if(i<10){
        i="0"+i;
    }
    return i;
}

function showTime(){
    var time = document.getElementById("time");
    var myDate = new Date();
    // 获取年份
    var year = myDate.getFullYear();
    // 获取月份，所的值比实际值少1
    var month = myDate.getMonth()+1;
    // 获取日期数
    var day = myDate.getDate();
    // 定义一周星期数
    var weekday = new Array(7);
    weekday[0]="星期日 ";
    weekday[1]="星期一 ";
    weekday[2]="星期二 ";
    weekday[3]="星期三 ";
    weekday[4]="星期四 ";
    weekday[5]="星期五 ";
    weekday[6]="星期六 ";
    // 获取周几数
    var d = myDate.getDay();

    var hour = myDate.getHours();
    var minutes = myDate.getMinutes(); 
    var second = myDate.getSeconds();

    time.innerHTML = year+"年"+month+"月"+day+"日"+weekday[d]+"<br/>"+hour+":"+checkTime(minutes)+":"+checkTime(second);

    setTimeout(showTime,500);
}
