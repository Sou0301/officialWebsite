$('.jizhi-a-nav li').click(function () {
    var index = $(this).index();
    $(this).addClass('active').siblings('li').removeClass('active');
    $('.jizhi-a-description li').eq(index).addClass('active').siblings('li').removeClass('active');
});
$('.ai-left-nav li').hover(function () {
    var index = $(this).index();
    $(this).addClass('active').siblings('li').removeClass('active');
    $('.ai-image-wrapper img').eq(index).addClass('active').siblings('img').removeClass('active');
})
var furtureSwiper = new Swiper('.furture-swiper', {
    mousewheel: true,
    slidesPerView: 3,
    spaceBetween: 24,
    slidesPerGroup: 3,
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: false
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            slidesPerGroup : 1,
            spaceBetween: 10
        }
    }
});