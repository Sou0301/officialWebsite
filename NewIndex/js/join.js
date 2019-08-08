/**
 * Created by wangzhiwei on 2018/11/13.
 */

$(function(){
    var mySwiper = new Swiper('.one-word', {
        // loop: true,
        watchOverflow: true,
        pagination: {
            el: '.one-word-pagination',
            clickable :true
        },
        speed:500,
        autoplay: {
            delay:5000
        },
    })
    var mySwiper2 = new Swiper('.job-swiper-container', {
//        loop: true,
        watchOverflow: true,
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
        pagination: {
            el: '.lixing-pagination',
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
})
