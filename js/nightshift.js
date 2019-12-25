var doc_head = document.head;

if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
    console.log('Dark mode is supported');

	document.getElementById('changeTheme').style.display="none";

    var link_style1 = document.createElement("link");
	link_style1.setAttribute("rel","stylesheet");
	link_style1.setAttribute("type","text/css");
	link_style1.setAttribute("href","./css/night.css");
    link_style1.setAttribute("media","(prefers-color-scheme: dark)");
	doc_head.appendChild(link_style1);

	var link_style2 = document.createElement("link");
	link_style2.setAttribute("rel","stylesheet");
	link_style2.setAttribute("type","text/css");
    link_style2.setAttribute("href","./css/day.css");
    link_style2.setAttribute("media","(prefers-color-scheme: no-preference), (prefers-color-scheme: light)");
    doc_head.appendChild(link_style2);

}else{
	document.getElementById('changeTheme').style.display="";

	var date = new Date();
	var dHours = date.getHours();
	var link_style = document.createElement("link");
	link_style.setAttribute("rel","stylesheet");
	link_style.setAttribute("type","text/css");

	if (sessionStorage.inverse != 1 && sessionStorage.inverse != 0){
		sessionStorage.inverse = 0;
	}

	if (dHours > 21 || dHours < 6){
		if (sessionStorage.inverse == 1){
			var isNight = 0;
		}else{
			var isNight = 1;
		}
	}else{
		if (sessionStorage.inverse == 1){
			var isNight = 1;
		}else{
			var isNight = 0;
		}	
	}

	function changeTheme(){
		if (isNight){
			day();
			isNight = 0;
			sessionStorage.inverse = 1 - sessionStorage.inverse;
		}else{
			night();
			isNight = 1;
			sessionStorage.inverse = 1 - sessionStorage.inverse;
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
}
