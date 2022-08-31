$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！';
            }
        }
    })
    initUserInfo();

    // 定义初始化用户信息的函数
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                form.val('formUserInfo', res.data);
            }
        })
    }

    // 重置按钮点击事件
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })

    // 表单提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败！');
                }
                layer.msg('修改用户信息成功！');
                // 调用父页面里的函数更新头像和欢迎文本
                window.parent.getUserInfo();
            }
        })
    })
})