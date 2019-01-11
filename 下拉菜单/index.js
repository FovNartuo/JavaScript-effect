//控制li元素的display值
function displaySubMenu(li) {
 
    var subMenu = li.getElementsByTagName("ul")[1];
 
    subMenu.style.display = "block";
 
}
 
function hideSubMenu(li) {
 
    var subMenu = li.getElementsByTagName("ul")[1];
 
    subMenu.style.display = "none";
  
}
