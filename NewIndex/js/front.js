/**
 * Created by wangzhiwei on 2018/10/26.
 */
// 开屏动画，视频播放完加载轮播图
function frontPageFullScreen() {
    $("body").addClass("fixed");
    var openScreenVideo = document.getElementById("openScreenVideo");
    /* openScreenVideo.addEventListener('canplaythrough',function(){ //判断视频加载完成

     });*/
    openScreenVideo.addEventListener("ended", function () {
        $("body").removeClass("fixed").addClass("slide-in");
        var frontBanner = new Swiper(".front-banner .swiper-container", {
            // watchOverflow: true,
            parallax: true,
            speed: 1000,
            loop: true,
            autoplay: {
                delay: 5000
            },
            // autoHeight: true,
            pagination: {
                el: '.front-banner .swiper-pagination',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            on: {
                init: function () {
                    $(".front-banner video").each(function (i) {
                        if (i == 0) {
                            this.play();
                        }
                    })
                    // document.getElementById("frontVideo").play();
                },
            }
        });
    })
}
function swiperTid(tid) {
    var slidesPerPage = 8;
    // var _isMobile = isMobile();
    /*if(_isMobile) {
        slidesPerPage = 6;
    }*/
    // console.log(tid);
    var lang = getLocationFirstPath();
    if(lang=="") {
        lang="cn";
    }

    var html = $.trim($('#partner' + tid).html());
    if (html == "") {
        $.ajax({
            url: "/"+ lang +"/json/partner/" + tid,
            beforeSend: function() {
                $('#partner' + tid).html('<span class="loading">加载中...</span>');
            },
            success: function(data){
                var len = data.length;
                var itemsUl = '<ul class="swiper-slide">'
                $.each(data, function (i, item) {
                    itemsUl += '<li><img src="' + item.field_logo.src + '" alt="' + item.field_logo.alt + '" /> </li>';
                    if ((i + 1) % slidesPerPage == 0 && i < len - 1) {
                        itemsUl += '</ul><ul class="swiper-slide">';
                    }
                    else if (i == len - 1) {
                        itemsUl += "</ul>"
                    }
                });
                $('#partner' + tid).html('<div class="swiper-wrapper">'+itemsUl+'</div> <div class="partner-pagination partner-pagination-'+tid+'"></div>');

                if($('#partner' + tid + ' .swiper-notification').length) {
                    $('#partner' + tid + ' .swiper-notification').remove();
                }
                this.swiper = new Swiper('#partner' + tid, {
                    watchOverflow: true,
                    spaceBetween: 12,
                    observer: true,
                    observeParents:true,
                    observeSlideChildren:true,
                    pagination: {
                        el: '.partner-pagination',
                        clickable: true
                    },
                    on: {
                        init: function () {
                            if (this.slides.length ==1 ) {
                                $('.partner-pagination-' + tid).hide();
                            }
                        },
                        slideChangeTransitionStart: function(){
                            var i = this.activeIndex;

                            // alert(i);
                            // console.log("A:"+i);
                            $('.partner-pagination-' + tid + ' .swiper-pagination-bullet').eq(i).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active")
                        },
                    }
                })
            }
        });

    }
    else {
        if($('#partner' + tid + ' .swiper-notification').length) {
            $('#partner' + tid + ' .swiper-notification').remove();
        }
        this.swiper = new Swiper('#partner' + tid, {
            watchOverflow: true,
            spaceBetween: 12,
            observer: true,
            observeParents:true,
            observeSlideChildren:true,
            pagination: {
                el: '.partner-pagination',
                clickable: true
            },
            on: {
                init: function () {
                    // console.log(this.slides.length+":"+this.params.slidesPerView+"*"+this.params.slidesPerColumn);
                    if (this.slides.length ==1 ) {
                        $('.partner-pagination-' + tid).hide();
                    }
                },
                slideChangeTransitionStart: function(){
                    var i = this.activeIndex;

                    // alert(i);
                    // console.log("B:"+i);
                    $('.partner-pagination-' + tid + ' .swiper-pagination-bullet').eq(i).addClass("swiper-pagination-bullet-active").siblings().removeClass("swiper-pagination-bullet-active")
                },
            }
        })
    }


}
$(function () {
    var _isMobile = isMobile();
    if (_isMobile) {
        setCookie2('openScreen', '1');
    }
    var openScreen = getCookie('openScreen');
    if (openScreen == null && $(".open-screen").length > 0) {
        frontPageFullScreen();
        setCookie2('openScreen', '1');
    }
    else {
        if (!_isMobile) {
            $("body").addClass("slide-in");
        }
        var frontOneVideo = document.getElementById("frontVideo");
        // frontOneVideo.addEventListener("canplaythrough",function(){
        var frontBanner = new Swiper(".front-banner .swiper-container", {
            // watchOverflow: true,
            parallax: true,
            speed: 1000,
            loop: true,
            autoplay: {
                delay: 5000
            },
            // autoHeight: true,
            pagination: {
                el: '.front-banner .swiper-pagination',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            on: {
                init: function () {
                    if (!_isMobile) {
                        $(".front-banner video").each(function (i) {
                            if (i == 0) {
                                this.play();
                            }
                        })
                    }
                },
                slideChangeTransitionStart: function(){
                    var i = this.activeIndex;
                    if(this.slides.eq(i).find(".banner-main h2").length) {
                        var _title = this.slides.eq(i).find(".banner-main h2").html();
                        if(_title.indexOf("》")!=-1&&_title.indexOf("<br>")==-1) {
                            var rhtml = _title.replace("》","》<br>");
                            this.slides.eq(i).find(".banner-main h2").html(rhtml);
                        }
                    }

                },
            }
        });
        // })

    }

    // 顶部轮播图

    $(".type-tab li").hover(function () {
        if ($(this).hasClass("active")) {
            return false;
        }
        var i = $(this).index();
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".type-list li").eq(i).fadeIn().siblings("li").fadeOut();
        $(".hangye-imgs li.current").removeClass("current").addClass("prev");
        setTimeout(function () {
            $(".hangye-imgs li.prev").removeClass("prev");
        }, 500)
        $(".hangye-imgs li").eq(i).addClass("current").siblings("li").removeClass("current");
    })


    $(".partner-tab li").mouseover(function () {
        var i = $(this).index();
        $(this).addClass("active").siblings("li").removeClass("active");
        $(".partner-container").eq(i).show().siblings(".partner-container").hide();
        var tid = $(this).find("a").data("tid");
        swiperTid(tid);
    })

    var src = "";
    $("[data-hover]").hover(function () {
     var hoverSrc = $(this).data("hover");
     src = $(this).attr("src");
     if(hoverSrc) {
     $(this).attr("src", hoverSrc)
     }
     },function(){
     $(this).attr("src", src);
     })

    $(".core-icon li").hover(function () {
        var hoverSrc = $(this).find("img").not(".none").data("hover");
        src = $(this).find("img").not(".none").attr("src");
        if (hoverSrc) {
            $(this).find("img").not(".none").attr("src", hoverSrc)
        }
    }, function () {
        $(this).find("img").not(".none").attr("src", src);
    })

    if ($(".partner-container").length) {
        $(".partner-container").eq(0).show();
        $(".partner-tab ul li").eq(0).addClass("active");

        var tid = $(".partner-tab ul li").eq(0).find("a").data("tid");
        swiperTid(tid);

    }
})