/** 전역변수선언 ************************************/
var subNow = 0;		// .navi.FULL 에서의 슬라이드변수
var subLast = 3;	// .navi.FULL 에서의 슬라이드변수


/** 사용자 지정 함수 ********************************/

// .navi.FULL 에서의 슬라이드
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

// .navi에서의 서브카테고리 생성
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

/** 이벤트 콜백 *************************************/

// .navi 의 .sub-wrap 토글
function onEnter() {
	$(this).find(".sub-wrap").css("display", "flex");
}

// .navi 의 .sub-wrap 토글
function onLeave() {
	$(this).find(".sub-wrap").css("display", "none");
}

// .navi.FULL 의 슬라이드 이미지 교체
function onColorClick() {
	$(this).addClass("active").siblings().removeClass("active");
	var $imgCase = $(this).parent().prev().find(".img-case");
	$imgCase.stop().fadeOut(100);
	$imgCase.eq($(this).index()).stop().delay(100).fadeIn(100);
}

// .navi.FULL 의 슬라이드 PREV
function onSubPrevClick() {
	if (subNow == 0) {
		subNow = subLast - 1;
		$(".sub-slide .wrap").css("left", -subLast * 100 + "%");
	} else subNow--;
	subAni();
}

// .navi.FULL 의 슬라이드 NEXT
function onSubNextClick() {
	if (subNow < subLast) subNow++;
	subAni();
}

// .navi의 ajax 콜백
function onNaviLoad(r) {
	// console.log(r.navs);
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
			// console.log(html);
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
		// console.log(html);
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
	$(".sub-slide .bt-prev").on("click", onSubPrevClick);
	$(".sub-slide .bt-next").on("click", onSubNextClick);
}

// .navi-mo-icon click 콜백
function onNaviMoClick(e) {
	$(".mo-wrapper").css("display", "block");
	$(".mo-wrapper").css("background-color");
	$(".mo-wrapper").css("background-color", "rgba(0,0,0,0.6)");
	$(".mo-wrap").css("left", 0);
}

// .mo-wrapper click 콜백
function onMoWrapperClick(e) {
	$(".mo-wrapper").css("background-color", "rgba(0,0,0,0)");
	$(".mo-wrapper").delay(500).hide(0);
	$(".mo-wrap").css("left", "-270px");
}

// .mo-wrap click 콜백
function onMoWrapClick(e) {
	e.stopPropagation();
}


// resize 콜백
function onResize(e) {

}

// window scroll 콜백
function onScroll(e) {
	var scTop = $(this).scrollTop();
	
	// header의 fixed
	if(scTop > 180) {
		$(".top-wrapper").css("display", "none");
		$(".search-wrapper").css("display", "none");
		$(".header-wrapper").css({ "position": "fixed", "top": 0, 
		"box-shadow": "0 0 6px rgba(0,0,0,0.3)" });
	}
	else {
		$(".top-wrapper").css("display", "block");
		$(".search-wrapper").css("display", "flex");
		$(".header-wrapper").css({ "position": "static", "top": "-85px", "box-shadow": "none" });
	}
}

// .mo-wrapper scroll 콜백
function onMobileScroll(e) {
	e.stopPropagation();
	e.preventDefault();
	// $("html, body").css({"overflow": "hidden", "height": "100vh"});
}


/** 이벤트 등록 **********************/


// Main Navi 생성
$.get('../json/navi.json', onNaviLoad);

// .navi-mo-icon 클릭
$(".navi-mo-icon").on("click", onNaviMoClick)

// .mo-wrapper 클릭
$(".mo-wrapper").on("click", onMoWrapperClick);

// .mo-wrap 클릭
$(".mo-wrap").on("click", onMoWrapClick);

// 스크롤 이벤트
$(window).on("scroll", onScroll);
$(".mo-wrapper").on("scroll touchmove mousewheel", onMobileScroll);

// 리사이즈 이벤트
$(window).on("resize", onResize);



