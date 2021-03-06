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

  // 初始化富文本域
  initEditor();

  // 点击选择按钮，触发文件选择框、
  $('#btnChooseImage').on('click', function () {
    $('#coveFile').click();
  })

  // 1. 初始化图片裁剪器
  let $image = $('#image')

  // 2. 裁剪选项
  let options = {
    aspectRatio: 1,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)

  // 监听  coveFile  文本域的  change 事件
  $('#coveFile').change(function (e) {
    // 拿到用户选择的文件
    let file = e.target.files[0];
    if (file.length === 0) {
      return
    }
    // 根据选择的文件，创建一个对应的 URL 地址：
    let newImgURL = URL.createObjectURL(file);
    // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  })


  // 定义文章发布状态
  let data = {
    art_state: '',
  }

  // 点击 存为草稿 按钮，将发布状态改为  草稿
  $('#btnSave2').on('click', function () {
    data.art_state = '草稿';
  })
  // 点击 发布 按钮，将发布状态改为  已发布
  $('#btnSave1').on('click', function () {
    data.art_state = '已发布';
  })

  // 为 form  表单添加点击事件 
  $('#form-pub').submit(function (e) {
    // 1. 阻止表单默认事件
    e.preventDefault();
    // 2. 获取表单的值
    let formVal = new FormData(this);
    // 3. 将发布动态存到 formVal
    formVal.append('state', data.art_state)
    // 将封面裁剪过后的文件转化为文件对象
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将得到的图片(文章封面)  blob  添加到  formVal
        formVal.append('cover_img', blob);
        // 6. 发起  ajax 请求
        pubLishArticle(formVal)
      });
  })

  // 发起 Ajax 请求实现发布文章的功能
  function pubLishArticle(formVal) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: formVal,
      // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,

      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg(res.message);

        // 发布成功跳转到文章列表页面
        // location.href = '/article/art_list.html'
        window.parent.document.querySelector('#art_list').click();;
      }
    })
  }
})