$(function () {

  // 获取用户的基本信息
  function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }

        // 请求成功后调用渲染头像函数
        renderAvatar(res.data)
      }
    })
  }

  getUserInfo();

  // 渲染用户头像
  function renderAvatar(user) {
    // 1. 获取用户名的名称
    let uname = user.nickname || user.username;
    // console.log(uname);

    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp&nbsp' + uname);

    // 3. 按需渲染头像
    if (user.user_pic !== null) {
      // 渲染图片头像
      $('.layui-nav-img')
        .attr('src', user.user_pic)
        .show();
      $('.text-avatar').hide();
    } else {
      // 渲染文字头像
      $('.layui-nav-img').hide();
      let first = uname[0].toUpperCase();
      $('.text-avatar').html(first).show();
    }
  }

  // 实现退出登录的功能
  $('#btnLogout').on('click', function () {
    // 提示框，提示用户是否确认退出
    layui.layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem('token');
      location.href = '/login.html';
      layui.layer.close(index);
    });
  })
})
