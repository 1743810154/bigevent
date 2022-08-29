$(function() {
    // 注册框和登录框切换
    $('#link_reg').on('click', function() {
        $('.login').hide();
        $('.reg').show();
    })

    $('#link_login').on('click', function() {
        $('.login').show();
        $('.reg').hide();
    })

    // 密码校验
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value) {
            var pwd = $('.reg [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！';
            }
        }
    })

    // 注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = { username: $('.reg [name=username]').val(), password: $('.reg [name=password]').val() };
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！');
            $('#link_login').click();
        })
    })

    // 登录表单提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败！');
                }
                layer.msg('登陆成功！');
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})