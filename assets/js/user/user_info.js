$(function () {

  // 从lsyui中获取  form 对象
  let form = layui.form;

  // 导入  layer
  let layer = layui.layer;


  // 验证表单，用户名称
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1~6 个字符之间！'
      }
    }
  })

  // 获取用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }

  initUserInfo();

  // 重置表单中的数据
  $('#btnReset').on('click', function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault();

    // 重新获取用户信息
    initUserInfo();
  })

  // 监听表单的提交事件
  $('.layui-form').submit(function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);

        // 调用 iframe 页面的父级页面的 getUserInfo()  方法
        window.parent.getUserInfo();
      }
    })
  })
})