/**
 * Created by wangzhiwei on 2018/11/13.
 */

$(function(){
    var placeholder = $(".hidden-placeholder").text();
    $("#edit-title").attr("placeholder",placeholder);


})
window.onload = function() {

    $(".pager-load-more li.pager-next a").click(function () {
        console.log("hahha");
        return true;
    });
    $(".pager-load-more").click();
    console.log($(".pager-load-more li.pager-next a").attr("href"));
}
