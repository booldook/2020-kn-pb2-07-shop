function onEnter() {
	$(this).find(".sub-wrap").css("display", "flex");
}
function onLeave() {
	$(this).find(".sub-wrap").css("display", "none");
}

/** Main Navi 생성 **********************/
$.get('../json/navi.json', onNaviLoad);
function onNaviLoad(r) {
	console.log(r.navs);
	var html = '';
	for(var i in r.navs) {
		html  = '<div class="navi '+r.navs[i].class+'">';
		html += '<div class="title">'+r.navs[i].title+' <i class="fa fa-angle-down"></i>';
		if(r.navs[i].icon != '') {
			html += '<div class="icon red">'+r.navs[i].icon;
			html += '<i class="fas fa-caret-right"></i>';
			html += '</div>';
		} 
		html += '</div>';
		html += '<div class="sub-wrap">';
		if(i == 0) {
			for(var j in r.navs[i].subs) {
				html += '<div class="sub">';
				html += '<div class="title">'+r.navs[i].subs[j].title+'</div>';
				html += '<div class="cont-img"><img src="'+r.navs[i].subs[j].src+'" class="w-100"></div>';
				html += '</div>';
			}
		}
		else if(i == 1) {
			html += '<div class="wrapper">';
			html += '	<div class="lt">';
			html += '		<div class="subs">';
			for(var j in r.navs[i].subs) {
				html += '			<div class="sub">';
				html += '				<div class="title">'+r.navs[i].subs[j].title+'</div>';
				for(var k in r.navs[i].subs[j].subs) {
					html += '			<div class="name">'+r.navs[i].subs[j].subs[k].title+'</div>';
				}
				html += '			</div>';
			}
			html += '		</div>';
			html += '		<div class="infos">';
			html += '		</div>';
			html += '	</div>';
			html += '	<div class="rt">';
			html += '	</div>';
			html += '<div>';
		}
		html += '</div>';	// .sub-wrap
		html += '</div>'; // .navi
		console.log(html);
		$(".navi-wrap").append(html);
	}
	$(".navi-wrap > .navi").mouseenter(onEnter);
	$(".navi-wrap > .navi").mouseleave(onLeave);
}
/*
<div class="navi">
	<span class="title">HOME <i class="fa fa-angle-down"></i></span>
	<div class="sub-wrap">
		<div class="sub">
			<div class="title">1. HOME DEFAULT</div>
			<div class="cont-img"><img src="../img/default.jpg" alt="그림" class="w-100"></div>
		</div>
	</div>
</div>
*/