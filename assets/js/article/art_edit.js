$(function() {
    // 获取本地存储的数据
    var artStr = localStorage.getItem('art_data');
    var art_data = JSON.parse(artStr);
    $('[name=title]').val(art_data.title);
    $('[name=content]').val(art_data.content);
    $('[name=Id]').val(art_data.Id);

    var layer = layui.layer;
    var form = layui.form;

    initCate();
    // 初始化富文本编辑器
    initEditor()

    // 定义加载文章分类的函数
    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！');
                }
                // 调用模板引擎
                var htmlStr = template('tpl-cate', res);
                // console.log(res);
                $('[name=cate_id]').html(htmlStr);
                form.render();

                // 设置下拉框选择项
                $('[lay-value=' + art_data.cate_id + ']').click();

            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
        // 2. 裁剪选项
    var options = {
            aspectRatio: 400 / 280,
            preview: '.img-preview'
        }
        // 3. 初始化裁剪区域

    // 将服务器的图片加载到裁剪区
    $image.attr('src', 'http://api-breakingnews-web.itheima.net' + art_data.cover_img)
    $image.cropper(options)


    // 选择封面按钮的点击事件
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click();
    })

    // 监听file选择框的change事件
    $('#coverFile').on('change', function(e) {
        var files = e.target.files;
        if (files.length === 0) {
            return;
        }
        var newImgURL = URL.createObjectURL(files[0]);
        // console.log(newImgURL);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var art_state = '已发布';
    $('#btnSave2').on('click', function() {
        art_state = '草稿';
    })

    // 监听表单提交事件
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);

        // 将封面图片添加到fd里面
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                publishArticle(fd);
            })
    })

    // 定义发布文章的函数
    function publishArticle(fd) {
        $.ajax({
            type: 'POST',
            url: '/my/article/edit',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发表文章失败！');
                }
                layer.msg('发表文章成功！');
                location.href = '/article/art_list.html';
            }
        })
    }

    localStorage.removeItem('art_data');
})