// 每次发起ajax请求前，都会自动先调用这个函数
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
})