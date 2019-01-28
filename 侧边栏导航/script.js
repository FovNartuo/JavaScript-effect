(function(){
    var Sidebar = function(eId,closeBarId){
        this.state = "opend";
        this.el = document.getElementById(eId || "sidebar");
        this.closeBarEl = document.getElementById(closeBarId || "closebar");
        var self = this;
        this.el.addEventListener("click",function(event){
            if(event.target !== self.el){
                self.triggerSwitch();
            }
        })
    };
    Sidebar.prototype.close = function(){
        console.log("关闭了sidebar");
        this.state = "opend";
    };
    Sidebar.prototype.open = function(){
        console.log("打开了sidebar");
        this.state = "closed";
    };
    Sidebar.prototype.triggerSwitch = function(){
        if(this.state === "opend"){
            this.close();
        }else{
            this.open();
        }
    };
    var sidebar = new Sidebar();

})();
