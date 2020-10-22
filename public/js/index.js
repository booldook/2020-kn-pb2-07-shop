function onEnter() {
	$(this).find(".sub-wrap").css("display", "flex");
}

function onLeave() {
	$(this).find(".sub-wrap").css("display", "none");
}

function onColorClick() {
	$(this).addClass("active").siblings().removeClass("active");
	var $imgCase = $(this).parent().prev().find(".img-case");
	$imgCase.stop().fadeOut(100);
	$imgCase.eq($(this).index()).stop().delay(100).fadeIn(100);
}

var subNow = 0;
var subLast = 3;

function onSubPrevClick() {
	if (subNow == 0) {
		subNow = subLast - 1;
		$(".sub-slide .wrap").css("left", -subLast * 100 + "%");
	} else subNow--;
	subAni();
}

function onSubNextClick() {
	if (subNow < subLast) subNow++;
	subAni();
}

function subAni() {
	$(".sub-slide .wrap").stop().animate({
		"left": -100 * subNow + "%"
	}, 500, function () {
		if (subNow == subLast) {
			subNow = 0;
			$(".sub-slide .wrap").css("left", 0);
		}
	});
}

function columnMaker(data) {
	var html = '';
	html += '<div class="subs">';
	for (var i in data) {
		html += '<div class="sub">';
		html += '<div class="title">' + data[i].title + '</div>';
		for (var j in data[i].subs) {
			html += '<div class="name rel">' + data[i].subs[j].title;
			if (data[i].subs[j].icon != '') {
				html += '<div class="icon ' + data[i].subs[j].color + '">' + data[i].subs[j].icon;
				html += '<i class="fas fa-caret-right"></i>';
				html += '</div>';
			}
			html += '</div>';
		}
		html += '</div>';
	}
	html += '</div>';
	return html;
}

/** Main Navi 생성 **********************/
$.get('../json/navi.json', onNaviLoad);

function onNaviLoad(r) {
	console.log(r.navs);
	var html = '';
	for (var i in r.navs) {
		html = '<div class="navi ' + r.navs[i].class + '">';
		html += '<div class="title">' + r.navs[i].title + ' <i class="fa fa-angle-down"></i>';
		if (r.navs[i].icon != '') {
			html += '<div class="icon ' + r.navs[i].color + '">' + r.navs[i].icon;
			html += '<i class="fas fa-caret-right"></i>';
			html += '</div>';
		}
		html += '</div>';
		html += '<div class="sub-wrap">';
		if (r.navs[i].class.indexOf('IMAGE') > -1) {
			for (var j in r.navs[i].subs) {
				html += '<div class="sub">';
				html += '<div class="title">' + r.navs[i].subs[j].title + '</div>';
				html += '<div class="cont-img"><img src="' + r.navs[i].subs[j].src + '" class="w-100"></div>';
				html += '</div>';
			}
		}
		else if (r.navs[i].class.indexOf('FULL') > -1) {
			html += '<div class="wrapper">';
			html += '	<div class="lt">';
			html += columnMaker(r.navs[i].subs);
			console.log(html);
			html += '		<div class="infos">';
			for (var j in r.navs[i].infos) {
				html += '<div class="info">';
				html += '	<div class="title">';
				html += '		<i class="' + r.navs[i].infos[j].icon + '"></i> ';
				html += r.navs[i].infos[j].title;
				html += '	</div>';
				html += '	<div class="content">' + r.navs[i].infos[j].content + '</div>';
				html += '</div>';
			}
			html += '		</div>';
			html += '	</div>'; // .lt
			html += '	<div class="rt">';
			html += '		<div class="sub-slide">';
			html += '			<div class="stage">';
			html += '				<div class="wrap">';
			r.navs[i].slides.push(r.navs[i].slides[0]);
			for (var j in r.navs[i].slides) {
				html += '<div class="slide">';
				html += '	<div class="img-wrap">';
				for (var k in r.navs[i].slides[j].cases) {
					html += '<div class="img-case ' + (k == 0 ? "active" : "") + '">';
					for (var l in r.navs[i].slides[j].cases[k].img) {
						html += '<img src="' + r.navs[i].slides[j].cases[k].img[l] + '" class="w-100">';
					}
					html += '</div>';
				}
				html += '		<div class="bt bt-quick">';
				html += '			<i class="fa fa-shopping-cart"></i> QUICK SHOP';
				html += '		</div>';
				html += '		<div class="bt bt-icon bt-heart">';
				html += '			<div class="popper">';
				html += '				Login to use Wishlist <i class="fa fa-caret-right"></i>';
				html += '			</div>';
				html += '			<i class="far fa-heart"></i>';
				html += '		</div>';
				html += '		<div class="bt bt-icon bt-sync">';
				html += '			<div class="popper">';
				html += '				Compare <i class="fa fa-caret-right"></i>';
				html += '			</div>';
				html += '			<i class="fa fa-sync"></i>';
				html += '		</div>';
				html += '		<div class="bt bt-icon bt-search">';
				html += '			<div class="popper">';
				html += '				Quick View <i class="fa fa-caret-right"></i>';
				html += '			</div>';
				html += '			<i class="fa fa-search-plus"></i>';
				html += '		</div>';
				html += '	</div>';
				html += '	<div class="color">';
				for (var k in r.navs[i].slides[j].cases) {
					html += '<span class="' + r.navs[i].slides[j].cases[k].color + '">●</span>';
				}
				html += '	</div>';
				html += '	<div class="title">' + r.navs[i].slides[j].title + '</div>';
				html += '	<div class="brand">' + r.navs[i].slides[j].brand + '</div>';
				html += '	<div class="price">';
				if (r.navs[i].slides[j].price !== "")
					html += r.navs[i].slides[j].price;
				else {
					html += '<span class="price-def">' + r.navs[i].slides[j].priceDef + '</span> ';
					html += '<span class="price-sale">' + r.navs[i].slides[j].priceSale + '</span>';
				}
				html += '	</div>';
				html += '</div>'; // .slide
			}
			html += '				</div>'; // .wrap
			html += '				<div class="bt-pager bt-prev">〈</div>';
			html += '				<div class="bt-pager bt-next">〉</div>';
			html += '			</div>';
			html += '		</div>'; // .sub-slide
			html += '	</div>'; // .rt
			html += '<div>';
		}
		else if (r.navs[i].class.indexOf('COL') > -1) {
			html += columnMaker(r.navs[i].subs);
		}
		html += '</div>'; // .sub-wrap
		html += '</div>'; // .navi
		console.log(html);
		$(".navi-wrap").append(html);
	}
	$(".navi-wrap > .navi").mouseenter(onEnter);
	$(".navi-wrap > .navi").mouseleave(onLeave);
	$(".sub-slide .color").find("span").click(onColorClick);
	$(".sub-slide .wrap").swipe({
		swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
			if (direction == 'left') $(".sub-slide .bt-next").trigger("click");
			if (direction == 'right') $(".sub-slide .bt-prev").trigger("click");
		},
		threshold: 30
	});
	$(".sub-slide .bt-prev").click(onSubPrevClick);
	$(".sub-slide .bt-next").click(onSubNextClick);
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



<div class="sub-slide">
	<div class="stage">
		<div class="wrap">
			<div class="slide">
				<div class="img-wrap">
					<div class="img-case active">
						<img src="../img/ss-01-blue-01.jpg" class="w-100">
						<img src="../img/ss-01-blue-02.jpg" class="w-100">
					</div>
					<div class="bt bt-icon bt-heart">
						<div class="popper">
							Login to use Wishlist <i class="fa fa-caret-right"></i>
						</div>
						<i class="far fa-heart"></i>
					</div>
					<div class="bt bt-icon bt-sync">
						<div class="popper">
							Compare <i class="fa fa-caret-right"></i>
						</div>
						<i class="fa fa-sync"></i>
					</div>
					<div class="bt bt-icon bt-search">
						<div class="popper">
							Quick View <i class="fa fa-caret-right"></i>
						</div>
						<i class="fa fa-search-plus"></i>
					</div>
				</div>
				<div class="color">
					<span class="blue">●</span>
				</div>
				<div class="title">Yus condntum sapien</div>
				<div class="brand">BASEL</div>
				<div class="price">$592.00</div>
			</div>
		</div>
		<div class="bt-pager bt-prev">〈</div>
		<div class="bt-pager bt-next">〉</div>
	</div>
</div>
*/