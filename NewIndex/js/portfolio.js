/**
 * Created by wangzhiwei on 2019/3/11.
 */
$(function(){
    var tid = getQueryStringRegExp("case_type_tid");
    console.log(tid);
    if(tid) {
        $("#edit-case-tid-"+tid).find("a").click(function () {
            $(this).parents(".form-type-bef-link").siblings(".form-type-bef-link").find("a").removeClass("active");
        });
    }
})