var date = new Date();
var dHours = date.getHours();
var doc_head = document.head;
var link_style = document.createElement("link");
link_style.setAttribute("rel","stylesheet");
link_style.setAttribute("type","text/css");

if ((dHours > 21 || dHours < 6)&& sessionStorage.inverse == 0){
	var isNight = 1;
}else if ((dHours > 21 || dHours < 6)&& sessionStorage.inverse == 1){
	var isNight = 0;
}else if ((dHours <= 21 && dHours >= 6)&& sessionStorage.inverse == 0){
	var isNight = 0;
}else{
	var isNight = 1;
}

function changeTheme(){
	if (isNight){
		day();
		isNight = 0;
		sessionStorage.inverse = 1;
	}else{
		night();
		isNight = 1;
		sessionStorage.inverse = 0;
	}
}

if (isNight){
	night();
}else{
	day();
}

function night(){
	link_style.setAttribute("href","./css/night.css");
}
function day(){
	link_style.setAttribute("href","./css/day.css");
}
doc_head.appendChild(link_style);


