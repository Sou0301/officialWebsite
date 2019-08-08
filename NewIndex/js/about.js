var num = 0, cleati = null;
function showWordsOneByOne() {
    var l = $(".yj-content span").length;
    console.log(l);
    cleati = setInterval(function(){
        if(num < l) {
            $(".yj-content span.t"+num+"").addClass("on");
            num++;
        }
        else {
            clearInterval(cleati);
            num = 0;
        }
        // console.log(num)
    },10)
}
function initYjContent() {
    if($("body").hasClass("en")) {
        return ;
    }
    var len = $('.yj-content li').length;
    var tl= 0;
    for(var i=0; i<len;i++){
        var str =  $.trim($('.yj-content li').eq(i).text());
        $('.yj-content li').eq(i).empty();
        var len = str.length;

        if(i>0) {
            tl = tl + $.trim($('.yj-content li').eq(i-1).text()).length;
        }
        for(var j = 0; j < len; j++){
            var span = '<span class="t'+(tl+j)+'">'+str.charAt(j)+'</span>';
            $('.yj-content li').eq(i).append(span);
        }
    }
}
$(function () {
    initYjContent();
    var hash = getQueryStringRegExp('hash');
    if(hash) {
        toId(hash);
    }
    var historySwiper = new Swiper(".swiper-history",{
        effect : 'fade',
        parallax : true,
        fadeEffect: {
            crossFade: true,
        },
        pagination: {
            el: '.history-pagination',//自动隐藏
            clickable :true,
            renderBullet: function (index, className) {
                var len = this.slides.length;
                console.log(len+":"+index);
                // var index = Math.abs(len-index-1);
                var year = $(this.slides[index]).find(".history-time").text();
                return '<div class="' + className + '"><span class="pointer">&nbsp;</span>' + year + '</div>';
            },
        },
        on: {
            init: function() {
                var len = this.slides.length;
                var pl = $(".swiper-history").outerWidth()/len/2;
                $(".history-pagination-active").css({
                    "width": pl + "px"
                })
            },
            slideChangeTransitionStart: function(){
                var len = this.slides.length;
                var deg = 360/len;
                var aindex = this.activeIndex;
                // alert(this.activeIndex+":"+len);
                $(".about-history-circle").css({
                    "transform": "rotate("+deg*(aindex+1)+"deg)"
                })

                var pl = $(".history-pagination .swiper-pagination-bullet").eq(aindex).find("span").position().left;
                var pw = $(".history-pagination .swiper-pagination-bullet").outerWidth();
                if(aindex == 0) {
                    var activeWidth = pl;
                }
                else {
                    var activeWidth = pl+ aindex*pw
                }
                $(".history-pagination-active").css({
                    "width": activeWidth + "px"
                })
            },
        },
    });
    $(".history-pagination .swiper-pagination-bullet").on("mouseover",function() {
        var i = $(this).index();
        historySwiper.slideTo(i);
    })
    if($(".top-banner video").length) {
        $(".top-banner video").attr("loop","loop");
    }

    var zncsSwiper = new Swiper('.zncs-container', {
        watchOverflow: true,
        slidesPerView : 3,
        slidesPerGroup: 3,
        spaceBetween : 24,
        pagination: {
            el: '.zncs-pagination',//自动隐藏
            clickable :true
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                slidesPerGroup : 1,
                spaceBetween: 10
            }
        }
    })

    $(".about-play").click(function(){
        showDialog('popVideo');
        $("#popVideo video").each(function(i){
            var id = $(this).attr("id");
            // document.getElementById(id).play();
            $("#replaybtn").click();
        })
        // $('#aboutVideo .pop-video-wrapper').html('')
    })
    $("#popVideo a.close").click(function(){
        hideDialog('popVideo');
        $("#popVideo video").each(function(i){
            var id = $(this).attr("id");
            document.getElementById(id).pause();
        })
    });

    $(".team-tab li").hover(function(){
        $(this).addClass("active").siblings("li").removeClass("active");
        var index = $(this).index();
        $(".teams .team").eq(index).addClass("current").siblings().removeClass("current");
    });

    if($(".partner-list").length) {
        $(".partner-list .partner-container").show();
        var partnerSwiper = new Swiper('.partner-container',{
            watchOverflow: true,
            slidesPerView: 5,
            slidesPerColumn: 2,
            slidesPerGroup : 5,
            spaceBetween: 12,
            slidesPerColumnFill: 'row',
            observer:true,
            pagination: {
                el: '.partner-pagination',
                clickable: true
            },
            on: {
                init: function () {
                    if(this.slides.length < this.params.slidesPerView * this.params.slidesPerColumn) {
                        $(".partner-pagination").hide();
                    }
                }
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                    slidesPerGroup : 3,
                    spaceBetween: 10
                }
            }
            // navigation: {
            //     nextEl: '#partner'+ i +' .swiper-button-next',//自动隐藏
            //     prevEl: '#partner'+ i +' .swiper-button-prev',//自动隐藏
            // },
        })
    }
})
var hasShowYj = false;
$(window).scroll(function(){
    var yjtop = $(".yj").offset().top;
    if($(this).scrollTop() + $(this).outerHeight() > yjtop && hasShowYj == false) {
        num = 0;
        $(".yj").addClass("current");
        // clearInterval(cleati);
        showWordsOneByOne();
        hasShowYj = true;
    }
})