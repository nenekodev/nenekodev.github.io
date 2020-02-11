jQuery(function($){
	$(document).ready(function(){
		if(document.body.clientWidth>=992){
			$('#foot').stickUp();
		}
	});
	$(window).resize(function(){
		if(document.body.clientWidth>=992){
			$('#foot').stickUp();
		}else{
			$('#foot').removeClass('stuckMenu');
			$('#foot').removeClass('isStuck');
			$('#foot').css({"position":'','top':''});
		}
	});
});

function GetQueryString(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
	if(r!=null)return  unescape(r[2]); return null;
}
var currentArti = GetQueryString("arti");
var currentLang = GetQueryString("lang");

