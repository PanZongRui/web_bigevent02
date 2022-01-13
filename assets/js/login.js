$(function () {
  // 点击 ‘去注册的div’
  $('#link-reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })

  // 点击 ‘去登陆的div’
  $('#link-login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })

  // 从lsyui中获取  form 对象
  let form = layui.form;

  // 导入  layer
  let layer = layui.layer;


  // 通过 form.verify 函数自定义验证规则:
  form.verify({
    // 自定义一个叫做  pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须 6-12位, 且不能出现空格'],

    // 二次校验,两次密码是否一致的规则
    repwd: function (value) {
      // 获得注册表单中,密码框中的值
      let pwd = $('.reg-box [name=password]').val();
      // 验证密码框中的值,与确认密码框中的值是否一致
      if (pwd !== value) {
        return '两次密码不一致';
      }
    }
  });


  // 注册表单 发起注册用户的 Ajax 请求
  $('#form-reg').on('submit', function (e) {
    // 1. 组织表单的默认提交行为
    e.preventDefault();

    // 2. 发起 Ajax 的 POST 请求
    // 请求需要提交的数据
    let data = {
      username: $('#form-reg [name=username]').val(),
      password: $('#form-reg [name=password]').val(),
    }

    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg(res.message);

      // 请求成功后自动点击 登录链接
      $('#link-login').click();
    })
  })


  // 登录表单 发起注册用户的 Ajax 请求
  $('#form-login').submit(function (e) {
    // 1. 组织表单的默认提交行为
    e.preventDefault();

    // 2. 发起 Ajax 的 POST 请求
    // console.log($('#form-login').serialize());
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $('#form-login').serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);

        // 将登陆成功后,返回的  token  值,保存到本地存储中
        localStorage.setItem('token', res.token);
        // 登陆成功后跳转到  index.html
        location.href = '/index.html'
      }
    })

  })


})