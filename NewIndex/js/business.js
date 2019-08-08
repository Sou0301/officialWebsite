/**
 * Created by wangzhiwei on 2019/1/9.
 */
$.fn.extend({
    eqSolutionHeight: function() {
        var hs = [];
        $(this).children().each(function(){
            var h = $(this).outerHeight();
            hs.push(h);
        })
        var maxHeight = Math.max.apply(null,hs);
        $(this).children().each(function(){
            $(this).height(maxHeight);
        })
    }
});

$(function(){
    $(".title-region").each(function(){
        var title = $(this).find("h2").html();
        if(title.indexOf('®')!=-1 &&title.indexOf('<sup>')==-1 ) {
            title = title.replace('®','<sup>&reg;</sup>');
        }
        $(this).find("h2").html(title);
    })
    $(".solution-main").each(function(){
        var title = $(this).find("h3").html();
        if(title.indexOf('®')!=-1 &&title.indexOf('<sup>')==-1 ) {
            title = title.replace('®','<sup>&reg;</sup>');
        }
        $(this).find("h3").html(title);
    })

    $(".showhide-btn").click(function(){
        var showTxt = $(this).data("show"), hideTxt = $(this).data("hide");
        if($(this).hasClass("show")) {
            $(this).parent(".solution-main").next(".solution-detail").addClass("show");
            $(this).removeClass("show").addClass("hide").find("span").text(hideTxt);
        }
        else {
            $(this).parent(".solution-main").next(".solution-detail").removeClass("show");
            $(this).addClass("show").removeClass("hide").find("span").text(showTxt);
        }
    })

    $(".solutions .solution").each(function(i){
        $(this).attr("id","solution"+i);
        var len = $(this).find(".swiper-slide").length;
        if(len <= 1) {
            $(this).find(".solution-page").hide();
        }
        if(i == 0 && len > 1) {
            new Swiper('#solution0 .swiper-container',{
                watchOverflow: true,//因为仅有1个slide，swiper无效
                navigation: {
                    nextEl: '#solution0 .solution-next',//自动隐藏
                    prevEl: '#solution0 .solution-prev',//自动隐藏
                },
                pagination: {
                    el: '#solution0 .solution-pagination',//自动隐藏
                    type: 'custom',
                    renderCustom: function (swiper, current, total) {
                        return current + ' / ' + total;
                    }
                },
                autoHeight: true,
                observer:true,
                // setWrapperSize :true,
            });
        }
    })
    $(".solution-tab li").hover(function(){
        var i = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".solutions .solution").eq(i).show().siblings().hide();

        if($(".solutions .solution").eq(i).find(".swiper-slide").length > 1 ){
            new Swiper('#solution'+i+' .swiper-container',{
                watchOverflow: true,//因为仅有1个slide，swiper无效
                navigation: {
                    nextEl: '#solution'+i+' .solution-next',//自动隐藏
                    prevEl: '#solution'+i+' .solution-prev',//自动隐藏
                },
                pagination: {
                    el: '#solution'+i+' .solution-pagination',//自动隐藏
                    type: 'custom',
                    renderCustom: function (swiper, current, total) {
                        return current + ' / ' + total;
                    }
                },
                autoHeight: true,
                observer:true,
                // setWrapperSize :true,
            });
            // solutionSwiper.update();
        }
        // solutionSwiper.update();
    })
    var clearCase = null;
    var _isMobile = isMobile();
    $(".case-core-list").on("mouseover",function(){
        if(_isMobile) {
            return false;
        }
        clearTimeout(clearCase);
        var bg = $(this).data("bg");
        $(this).addClass("current").siblings().removeClass("current");
        $(this).parents(".case-core").addClass("case-core-hover").css({
            "background-image": "url("+bg+")"
        });
    });
    if(_isMobile) {
        $(".case-core-list").each(function(){
            var bg = $(this).data("bg");
            $(this).css({
                "background-image": "url("+bg+")"
            });
        })
    }

    $(".case-core").on("mouseout",function(){
        if(_isMobile) {
            return false;
        }
        var bg = $(".core-case-box").data("defaultsrc");
        // var bg = $(this).data("src");
        var $this = $(this);
        clearCase = setTimeout(function(){
            $this.removeClass("case-core-hover").css({
                "background-image": "url("+bg+")"
            });
            $this.find(".case-core-list.current").removeClass("current");
        },300)

    })

    if($(".core-case-box").length && !_isMobile) {
        var defaultCoreCaseBg = $(".core-case-box").data("defaultsrc");
        var caseLen = $(".case-core-list").length;
        $(".case-core").css({
            "background-image": "url("+ defaultCoreCaseBg +")"
        }).addClass("cell"+caseLen);
    }

    $(".video-full .play").click(function(){
        // $(this).parents(".video-full").find(".videobox").show();
        var vid = $(this).parents(".video-full").find(".videobox").find("video").attr("id");
        // document.getElementById(vid).play();
        $("#replaybtn").click();
        $(this).hide();
        $(this).parents(".video-full").find(".video-poster").css("z-index","-1");
    });

    if($(".solution-tab li").length) {
        $(".solution-tab li").eq(0).addClass("active");
    }
    
    
})
