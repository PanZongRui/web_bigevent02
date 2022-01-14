// 每次调用 $.get() ,$.post(), $.ajax()
// 会调用  ajaxPrefilter 这个函数
// 这个函数可以拿到给 Ajax 提供的配置的对象 
$.ajaxPrefilter(function (option) {

  // 在发起 Ajax 之前,统一拼接请求的根路径
  option.url = 'http://www.liulongbin.top:3007' + option.url;


  // 统一为有权限的接口设置请求头 ()
  if (option.url.indexOf('/my/') !== -1) {
    option.headers = {
      Authorization: localStorage.getItem('token') || '',
    }
  }

  // 统一控制用户访问有权限的接口
  option.complete = function (res) {
    // console.log('执行了 complete');
    // console.log(res);

    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      localStorage.removeItem('token');
      location.href = '/login.html';
    }
  }

})