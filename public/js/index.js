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
	// .mo-navi 생성
	for(var i in r.navs) {
		html  = '<li class="mo-navi">';
		html += '<div class="title">'+r.navs[i].title+'</div>';
		html += '<div class="bt-down">';
		html += '	<div class="slash slash-lt"></div>';
		html += '	<div class="slash slash-rt"></div>';
		html += '</div>';
		html += '<ul class="mo-sub">';
		html += '	<i class="mo-caret fa fa-caret-up"></i>';
		if(r.navs[i].subs && r.navs[i].subs.length == 1) {
			r.navs[i].subs = r.navs[i].subs[0].subs;
		}
		for(var j in r.navs[i].subs) {
			html += '<li class="mo-sub-navi">';
			html += '<div class="title">'+r.navs[i].subs[j].title+'</div>';
			// console.log(r.navs[2].subs[0].subs);
			if(r.navs[i].subs[j].subs && r.navs[i].subs[j].subs.length > 0) {
				html += '<div class="bt-down">';
				html += '	<div class="slash slash-lt"></div>';
				html += '	<div class="slash slash-rt"></div>';
				html += '</div>';
				html += '<ul class="mo-sub-sub">';
				html += '	<i class="mo-caret fa fa-caret-up"></i>';
				for(var k in r.navs[i].subs[j].subs) {
					html += '<li>'+r.navs[i].subs[j].subs[k].title+'</li>';
				}
				html += '</ul>';
			}
			html += '</li>';
		}
		html += '</ul>';
		html += '</li>';
		$(".mo-navi-wrap").append(html);
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
	$(".navi-mo-icon").on("click", onNaviMoClick); // .navi-mo-icon 클릭 
	$(".mo-wrapper").on("click", onMoWrapperClick);	// .mo-wrapper 클릭
	$(".mo-wrap").on("click", onMoWrapClick);	// .mo-wrap 클릭
	$(".mo-navi .bt-down").on("click", onMoNaviClick);	// .mo-navi .bt-down 클릭
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

// .mo-navi click 콜백
function onMoNaviClick(e) {
	$(this).toggleClass("active");
	if($(this).hasClass("active")) $(this).next().stop().slideDown(300);
	else $(this).next().stop().slideUp(300);
}


// resize 콜백
function onResize(e) {
	var winWid = $(this).outerWidth();
	if(winWid > 991 && $(".mo-wrapper").css("display") == 'block') {
		$(".mo-wrapper").trigger("click");
	}
	scrollImages(getBannerWidth() * bannerNow, 0);
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
}

function onMobileWrapScroll(e) {
	e.stopPropagation();
	var winHei = $(window).outerHeight();
	var meHei = $(this).find(".mo-navi-wrap").outerHeight();
	if(meHei <= winHei) e.preventDefault();
}


function onCateLoad(r) {
	var html = '';
	for(var i in r.cates) {
		html  = '<div class="cate">'+r.cates[i].title;
		if(r.cates[i].arrow) html += '<i class="fa fa-angle-right"></i>';
		html += '</div>';
		$(".cate-wrap").append(html);
	}
}

var bannerNow = 0;
var $banners = [];
function onBannerLoad(r) {
	var html = '';
	for(var i in r.banners) {
		html  = '<div class="slide" style="background-image: url('+r.banners[i].src+')">';
		html += '	<h3 class="slogan">'+r.banners[i].slogan+'</h3>';
		html += '	<h2 class="title">'+r.banners[i].title+'</h2>';
		html += '	<h4 class="price">$<span>'+r.banners[i].price+'</span></h4>';
		html += '	<button class="bt-banner">SHOP OTHER</button>';
		html += '</div>';
		$banners.push($(html).appendTo(".banner-wrapper .slide-wrap"));
	}
	// .banner-wrapper의 이벤트
	$(".banner-wrapper .slide-wrap").swipe({ swipeStatus: swipeStatus });
	$(".banner-wrapper .bt-prev").on("click", onBannerPrev);
	$(".banner-wrapper .bt-next").on("click", onBannerNext);
}

// .banner-wrapper .slide의 width()를 px로 리턴
function getBannerWidth() {
	return $(".banner-wrapper .slide").eq(0).outerWidth();
}

// .banner-wrapper .slide의 마지막 Index 리턴
function getBannerLast() {
	return $(".banner-wrapper .slide").length - 1;
}

function swipeStatus(evt, phase, dir, dist) {
	if (phase == "move" && (dir == "left" || dir == "right")) {
		scrollImages(getBannerWidth() * bannerNow + (dir == "left" ? dist : -dist) , 0);
	} 
	else if (phase == "cancel") {
		scrollImages(getBannerWidth() * bannerNow, 500);
	} 
	else if (phase == "end") {
		if (dir == "right") prevImage();
		else if (dir == "left") nextImage();
	}
}

function prevImage() {
	bannerNow = Math.max(bannerNow - 1, 0);
	scrollImages(getBannerWidth() * bannerNow, 500);
}

function nextImage() {
	bannerNow = Math.min(bannerNow + 1, getBannerLast());
	scrollImages(getBannerWidth() * bannerNow, 500);
}

function scrollImages(dist, duration) {
	var dir = duration || 0;
	var tar = (dist < 0 ? "" : "-") + Math.abs(dist).toString();
	$(".banner-wrapper .slide").css("transition-duration", (dir / 1000).toFixed(1) + "s");
	$(".banner-wrapper .slide").css("transform", "translate(" + tar + "px, 0)");
}

function onBannerPrev() {
	bannerNow = bannerNow == 0 ? getBannerLast() : bannerNow - 1;
	bannerAni();
}

function onBannerNext() {
	bannerNow = bannerNow == getBannerLast() ? 0 : bannerNow + 1;
	bannerAni();
}

function bannerAni() {
	var $s = $($banners[bannerNow].clone()).appendTo(".banner-wrapper .slide-stage").addClass("active");
	$s.stop().animate({"opacity": 1}, 500, function(){
		scrollImages(getBannerWidth() * bannerNow, 0);
		$(this).remove();
	});
}


/** 이벤트 등록 **********************/


// Main Navi 생성
$.get('../json/navi.json', onNaviLoad);

// Category 생성
$.get('../json/cate.json', onCateLoad);

// Banner 생성
$.get('../json/banner.json', onBannerLoad);

// 스크롤 이벤트
$(window).on("scroll", onScroll);
$(".mo-wrapper").on("scroll touchmove mousewheel", onMobileScroll);
$(".mo-wrap").on("scroll touchmove mousewheel", onMobileWrapScroll);

// 리사이즈 이벤트
$(window).on("resize", onResize);



