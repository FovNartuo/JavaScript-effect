(function(){

    var Menubar = function(){
        this.el = document.querySelector("#sidebar ul");
        this.state = "allClosed";   //hasOpened
        this.el.addEventListener("click",function(e){
            //阻止冒泡
            e.stopPropagation();            
        });
        var self = this;
        this.currentOpenedMenuContent = null;
        this.menuList = document.querySelectorAll("#sidebar ul > li");
        for(var i=0; i<this.menuList.length; i++){
            this.menuList[i].addEventListener("click",function(e){
                var menuContentEl = document.getElementById(e.currentTarget.id + "-content");
                // console.log(menuContentEl);
                if(self.state === "allClosed"){
                    console.log("打开了"+menuContentEl.id);
                    self.state = "hasOpened";
                    self.currentOpenedMenuContent = menuContentEl;
                }else{
                    console.log("关闭了"+self.currentOpenedMenuContent.id);
                    console.log("打开了"+menuContentEl.id);
                    self.state = "hasOpened";
                    self.currentOpenedMenuContent = menuContentEl;
                }
            })
        }
    }

    var Sidebar = function(eId,closeBarId){
        this.state = "opend";
        this.el = document.getElementById(eId || "sidebar");
        this.closeBarEl = document.getElementById(closeBarId || "closebar");
        var self = this;
        this.menubar = new Menubar();
        this.el.addEventListener("click",function(event){
            if(event.target !== self.el){
                self.triggerSwitch();
            }
        })
    };
    Sidebar.prototype.close = function(){
        // console.log("关闭了sidebar");
        this.el.className = "sidebar-move-left";
        this.closeBarEl.className = "closeBar-move-right";
        this.state = "closed";
    };
    Sidebar.prototype.open = function(){
        // console.log("打开了sidebar");
        this.state = "opend";
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
