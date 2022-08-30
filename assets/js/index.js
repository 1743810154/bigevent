$(function() {
    getUserInfo();

    // 退出按钮点击事件
    $('#btn-logout').on('click', function() {
        var layer = layui.layer;
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 点击确定要做的事
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})

// 定义获取用户信息的函数
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！');
            }
            renderAvatar(res.data);
        }
    })
}

// 定义渲染头像的函数
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp&nbsp' + name);
    if (user.user_pic !== null) {
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', user.user_pic).show();
    } else {
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avatar').html(first).show();
    }
}