var date = new Date();
var dHours = date.getHours();
var doc_head = document.head;
var link_style = document.createElement("link");
link_style.setAttribute("rel","stylesheet");
link_style.setAttribute("type","text/css");
if (dHours > 21 || dHours < 6 ){
    link_style.setAttribute("href","./css/night.css");
}else{
	link_style.setAttribute("href","./css/day.css");
}
doc_head.appendChild(link_style);