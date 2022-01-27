/*
  uAlert//公用输出框
  uTip//公用提示框
  uGoPage//公用跳转新页面
  uPost//公用post提交
  uGet//公用get提交
  uSetLocal//公用设置缓存
  uGetLocal//公用读取缓存
  uSetLocalJson//公用设置缓存JOSN格式
  uGetLocalJson//公用读取缓存JOSN格式
  uGetParameter //公用获取链接参数
  uConfirm //公用确认
  uGoBack //返回上一个页面
  uGetDateTimestamp//根据时间,获取时间戳
  uIsNull //判断是否为空
  uIsPhone //是否为手机
  uGetJOSN //获取JSON
 */

function uAlert(content){
    alert( content);
}

var pageNum = 0;
var pageSize = 12;
function uInitScroll( callback ){
    pageNum = 0;
    pageSize = 12;
    callback(pageNum, pageSize);
    $(window).scroll(function(){
        //console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());
        //console.log("页面的文档高度 ："+$(document).height());
        //console.log('浏览器的高度：'+$(window).height());
        var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
        var range = 50;             //距下边界长度/单位px
        totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
        if(($(document).height()-range) <= totalheight ) {
            //uSetJuicerAppend("messageMedia", "messageListId" , "mediaListBox");//媒体关注数据
            pageNum++;
            callback(pageNum, pageSize);
        }
    });
}

var pageNum2 = 0;
var pageSize2 = 12;
function uInitScrollSec( callback ){
    callback(pageNum, pageSize);
    $(window).scroll(function(){
        //console.log("滚动条到顶部的垂直高度: "+$(document).scrollTop());
        //console.log("页面的文档高度 ："+$(document).height());
        //console.log('浏览器的高度：'+$(window).height());
        var srollPos = $(window).scrollTop();    //滚动条距顶部距离(页面超出窗口的高度)
        var range = 50;             //距下边界长度/单位px
        totalheight = parseFloat($(window).height()) + parseFloat(srollPos);
        if(($(document).height()-range) <= totalheight ) {
            //uSetJuicerAppend("messageMedia", "messageListId" , "mediaListBox");//媒体关注数据
            pageNum2++;
            callback(pageNum2, pageSize2);
        }
    });
}

function uTip(content){
    new $.flavr( content );
}

function uPop(content){
    $("#show_pop_text").html(content);
    $(".pop_box").show();
    $(".pop_bg").show();
}

function uGoPage(url){
    location.href=  url;
}

function uPost(url, data, callback){
    var param ={
        type: "POST",
        url: url,
        data: data,
        async : true,
        dataType: "JSON",
        callback: callback,
        errorCallback: function(res){
            uTip( res.msg );
        },
    }
    uAjax(param);
}

function uGet(url, data, callback){
    var param ={
        type: "get",
        url: url,
        data: data,
        dataType: "JSON",
        callback: callback,
        errorCallback: function(res){
            uTip( res.msg );
        },
    }
    uAjax(param);
}

function uAjax( param ){
    $.ajax({
        type: param.type,
        url: param.url,
        data: param.data,
        async : param.async,
        dataType: param.dataType,
        success: function (res){
            param.callback(res);
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("请求失败！");
        }
    });
}

function uGetLocal(key){
    var value = localStorage.getItem( key );
    return value;
}

function uSetLocal(key, value){
    localStorage.setItem( key, value);
}

function uGetLocalJson(key){
    var value = localStorage.getItem( key );
    value  = JSON.parse(value);
    return value;
}

function uSetLocalJson(key, value) {
    var value = JSON.stringify(value);
    uSetLocal( key, value);
}

function uGetParameter(param) {
    var query = window.location.search; //获取URL地址中？后的所有字符
    query = decodeURI(query);
    var iLen = param.length; //获取你的参数名称长度
    var iStart = query.indexOf(param); //获取你该参数名称的其实索引
    if(iStart == -1) //-1为没有该参数
        return "";
    iStart += iLen + 1;
    var iEnd = query.indexOf("&", iStart); //获取第二个参数的其实索引
    if(iEnd == -1) //只有一个参数
        return query.substring(iStart); //获取单个参数的参数值
    return query.substring(iStart, iEnd); //获取第二个参数的值
}

function uConfirm(content, callback) {
    var r=confirm( content );
    if(r){
        callback()
    }
}

function uGoBack() {
    window.history.back(-1);
}

function uGetDateTimestamp() {
    var d = (new Date()).valueOf();//根据时间戳生成的时间对象
    return d;
}

//根据时间戳获取时间
function uGetDate(timestamp) {
    var d = new Date( Number( timestamp ) );    //根据时间戳生成的时间对象
    var date = (d.getFullYear()) + "年" +
        (d.getMonth() + 1) + "月" +
        (d.getDate()) + "日  " +
        (d.getHours()) + ":" +
        (d.getMinutes()) ;
    return date;
}

function uIsPhone( content ) {
    if( content.match(/^(((1[0-9]{1}))+\d{9})$/)){
        return true;
    }else{
        return false;
    }
}

function uIsUnicomPhone( content ) {
    if( content.match(/^(((130)|(131)|(132)|(145)|(155)|(156)|(166)|(170)|(171)|(175)|(176)|(185)|(186))+\d{8})$/)){
        return true;
    }else{
        return false;
    }
}
function uIsPC () {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        return false;
    } else {
        return true;
    }
}