$(function () {
  // 定义加载文章分类的方法
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        let htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr);
        // 通过 layui 重新渲染表单区域的 UI 结构
        layui.form.render(); //更新全部
      }
    })
  }
  initCate();

  initEditor();

  // 点击选择按钮，触发文件选择框、
  $('#btnChooseImage').on('click', function () {
    $('#coveFile').click();
  })




  // 1. 初始化图片裁剪器
  var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)


})