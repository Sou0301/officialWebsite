/**
 * Created by wangzhiwei on 2018/11/30.
 */
var loArr = [];
var zhinengId = [];
var mode = getQueryStringRegExp('mode')||'social';
// var mode = 'campus';
var intern = getQueryStringRegExp('intern');
var keyword = '';

if(intern) {
    $(".career-mode").html('实习生热招');
}
else {
    if(mode == 'social') {
        $(".career-mode").html('社会招聘');
    }
    else {
        $(".career-mode").html('校园招聘');
    }
}
var orgDomain = 'https://api.mokahr.com', orgid = 'yitu-inc';

// getjobs();
// 工作地点接口
// getjobLocation();
// 职位类型接口
// getJobZhineng();
//获取职位地址列表
function getjobLocation(){
    getData('jobs-groupedby-location/'+orgid,{"mode":mode},function(data){
        var list = '';
        for(var i=0;i<data.jobs.length;i++){
            var rl = data.jobs[i].locationRows.length;
            var rlId = [];
            for(var j = 0; j < rl; j++) {
                rlId.push(data.jobs[i].locationRows[j].id);
            }
            if(data.jobs[i].id != '其他'){
                list+='<li data-id="'+rlId.join(',')+'">'+data.jobs[i].label+'</li>'
            }
        }
        $('#location').html('<li class="active" data-id="">全部</li>'+list);
    });
}

$('#location').on('click','li',function(){
    var id = $(this).data('id')+'';

    loArr = [];

    console.log(!!id);
    if(!!id){
        var ids = id.split(",");
        for(var i = 0 ; i< ids.length; i++) {
            loArr.push(parseInt(ids[i]));
        }
    }
    getjobs();
    $(this).addClass('active').siblings('li').removeClass('active');
});
//获取职位列表
function getjobs(page){
    var lo = loArr.length?JSON.stringify(loArr):[];
    var keywords = keyword||[];
    var page = page?page:[];
    var limit = mode == 'campus'?1000:30;
    if(page.length == 0 || page == 0) {
        $("#prevPage").addClass('disabled');
    }
    else {
        $("#prevPage").removeClass('disabled');
    }

    getData('jobs/'+orgid,{"mode":mode,"locationIds":lo,"zhinengId":zhinengId,"keyword":keywords,"limit":limit,"offset":page*limit},function(data){
        // var total = data.total;
        var jobArray = data.jobs;
        for(var i=0;i<jobArray.length;i++){//去除已关闭职位
            if(jobArray[i].status == "closed"){
                jobArray.splice(i,1);
                i--;
            }
        }
        if(mode == 'campus'&&!intern){//获取校招列表
            for(var i = 0;i<jobArray.length;i++){
                if(jobArray[i].commitment == '实习'){
                    jobArray.splice(i,1);
                    i--;
                }
            }
            total = jobArray.length;
        }else if(mode == 'campus'&&intern){//获取实习生列表
            for(var i = 0;i<jobArray.length;i++){
                if(jobArray[i].commitment == '全职'||jobArray[i].commitment == '兼职'){
                    jobArray.splice(i,1);
                    i--;
                }
            }
            total = jobArray.length;
        }
　　　
        //没有数据，显示无数据
        if(total == 0||jobArray.length == 0){
            $('.result').hide();
            $('.no-val').show();
            return false;
        }else{
            $('.result').show();
            $('.no-val').hide();
        }
        //只有一页，不显示分页
        var totalPage = Math.ceil(data.total/limit);
        $("#totalPage").html(totalPage);
        $("#totalNum").html(total);

        if(page == totalPage-1) {
            $("#nextPage").addClass('disabled');
        }
        else {
            $("#nextPage").removeClass('disabled');
        }
        if(totalPage > 1){
            $('.page-wrapper').show();

            var pagehtml = '';
            for(var i=1;i<=totalPage;i++){
                pagehtml += '<li><span>'+i+'</span></li>';
            }
            var activePage = page||0;
            $("#selectPage").html(pagehtml).find('li').eq(activePage).addClass('active');
        }else{
            $('.page-wrapper').hide();
        }
        if(page){
            $('#activePage').html(page+1);
        }
        var list = '';

        for (var i=0;i<jobArray.length;i++){
            var locationArr = [];
            for(var j=0;j<jobArray[i].locations.length;j++){
                if(!!(jobArray[i].locations[j].city)) {
                    locationArr.push(jobArray[i].locations[j].city);
                }else if(!!(jobArray[i].locations[j].province)){
                    locationArr.push(jobArray[i].locations[j].province);
                }
            }
            var location = '';
            if(locationArr.length>1) {
                location = locationArr.join('、');
            }
            else if( locationArr.length == 1){
                location = locationArr[0];
            }

            var zhinengName = jobArray[i].zhineng.name!=null?'<span>职能类型：'+jobArray[i].zhineng.name+'</span>':"";
            var zhinengDepartment = jobArray[i].department.name!=null?'<span>所属部门：'+jobArray[i].department.name+'</span>':"";
            var _location = location!=''?'<span>工作地点：'+location+'</span>':"";
            var description = jobArray[i].description?jobArray[i].description:'暂无职位描述';
            var applyType = mode == 'campus'?'campus_apply':'apply';
            list += '<li>\n' +
                '                    <div class="overview" data-id="'+jobArray[i].id+'" data-orgId="'+jobArray[i].orgId+'">\n' +
                '                        <h5>'+jobArray[i].title+'</h5>\n' +
                '                        <div class="info clearfix">\n' + zhinengName + zhinengDepartment + _location +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="requirement-wrapper">\n' +
                '                        <div class="requirement">\n' +
                '                            <div class="description">'+description+'</div>\n' +
                '                        </div>\n' +
                /*'                        <div class="requirement">\n' +
                 '                            <h6>任职要求</h6>\n' +
                 '                            <p>1. 拥有扎实的计算机基础。计算机相关专业，或者自修过计算机专业必修课程；</p>\n' +
                 '                            <p>2. 对前端有浓厚兴趣。熟悉前端常用技术，关注新技术，希望长期从事前端开发；</p>\n' +
                 '                            <p>3. 前端基础（HTML/CSS/JS）扎实，熟练使用并深入理解至少一个MVVM框架（ng/react/vue等）；</p>\n' +
                 '                            <p>4. 熟悉前端工程化和常用工具；</p>\n' +
                 '                            <p>5. 基础的后端开发能力（熟悉至少一个数据库和web后端框架）。</p>\n' +
                 '                        </div>\n' +*/
                '                       <div class="btns-wrapper">\n' +
                '                           <a href="https://app.mokahr.com/'+applyType+'/'+orgid+'/#/job/'+jobArray[i].id+'/apply?pure=1" target="_blank" class="btn btn-line-blue submit">立即申请</a>\n' +
                '                       </div>' +
                '                    </div>\n' +
                '                </li>';

        }
        $('.job-list').html(list);
    });
}
$('.job-list').on('click','li .overview',function () {
    $(this).parent().toggleClass('active').siblings('li').removeClass('active');
})
//获取职位职能列表
function getJobZhineng(){
    getData('jobs-groupedby-zhineng/'+orgid,{"mode":mode},function(data){
        var list = '';
        for(var i=0;i<data.jobs.length;i++){
            if(data.jobs[i].id != null){
                list+='<li data-id="'+data.jobs[i].id+'">'+data.jobs[i].label+'</li>'
            }
        }
        $('#zhineng').html('<li class="active">全部</li>'+list);
    });
}
$('#zhineng').on('click','li',function(){
    $(this).addClass('active').siblings('li').removeClass('active');
    var id = $(this).data('id');
    if(id != null){
        zhinengId = id;
    }else {
        zhinengId = [];
    }
    getjobs();
});
//获取单个职位信息
function getJobInfo(id){
    // var id = '7f36db7e-9e03-4d02-814c-363f0ec1d846';
    getData('jobs/yitutest/'+id,{},function(data){
        console.log(data);
    });
}
//申请职位
// https://app.mokahr.com/apply/{orgId}/{siteId}#/job/{jobId}/apply?pure=1
function jobApply(orgId,id){
    if(mode == 'campus'){
        location.href=orgDomain+'/campus_apply/'+orgId+'/#/job/'+id+'?pure=1';
    }else{
        location.href=orgDomain+'/apply/'+orgId+'/#/job/'+id+'?pure=1';
    }
}
//获取申请状态
function getJobApplications(id){
    getData('applications/'+id,{},function(data){
        console.log(data);
    });
}

//换页
$('#selectPage').on('click','li',function(){
    $(this).addClass('active').siblings('li').removeClass('active');
    var index = $(this).index();
    getjobs(index);
});
$('#prevPage').click(function(){
    if($(this).hasClass('disabled')){
        return false;
    }else{
        var index = $('#selectPage').find('.active').index();
        $('#selectPage').find('.active').removeClass('active').end().find('li').eq(index-1).addClass('active');
        getjobs(index-1);
    }
});
$('#nextPage').click(function(){
    if($(this).hasClass('disabled')){
        return false;
    }else{
        var index = $('#selectPage').find('.active').index();
        $('#selectPage').find('.active').removeClass('active').end().find('li').eq(index+1).addClass('active');
        getjobs(index+1);
    }
});

//搜索职位
$('#search').click(function(){
    keyword = $(this).prev().val();
    getjobs();
});

$("body").bind('keydown', function(event) {
    if(event.keyCode == 13){
        var myInput = document.getElementById('searchInput');
        if (myInput == document.activeElement) {
            $('#search').trigger('click');
        } else {
            return false;
        }
    }
});

$('.nav-btn').click(function(e){
    $('.m-menu').addClass('active');
    e.stopPropagation();
});
$('body').click(function(e){
    if($('.m-menu').hasClass('active')){
        var dom = $('.m-menu');
        if(!dom.is(e.target)&&dom.has(e.target).length === 0){
            $('.m-menu').removeClass('active')
        }
    }
});


function getData(command,params,fn){
    $.ajax({
        url: orgDomain+'/v1/'+command,
        data: params,
        type: 'Get',
        success: function(data){
            fn(data)
        },
    })
}
