$(function () {

  // 从lsyui中获取  form 对象
  let form = layui.form;

  // 导入  layer
  let layer = layui.layer;


  // 验证表单，用户名称
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码密必须是6~16位，且不能出现空格'],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同';
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码输入不一致';
      }
    },
  })

  // 监听表单的提交事件
  $('.layui-form').submit(function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);

        // 重置表单
        $('.layui-form')[0].reset();
      }
    })
  })



})