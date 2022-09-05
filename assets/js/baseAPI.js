// 每次发起ajax请求前，都会自动先调用这个函数
$.ajaxPrefilter(function(options) {
    // 统一拼接根路径
    // options.url = 'http://www.liulongbin.top:3007' + options.url;
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url; // 备用接口
    // 为有权限才能访问的接口统一设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' };
    }
    // 统一挂载complete函数,无论请求成功还是失败都会调用这个函数，防止用户不登录直接访问后台主页
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})